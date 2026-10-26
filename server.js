require("dotenv").config();

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  console.error("SESSION_SECRET must contain at least 32 characters.");
  process.exit(1);
}

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "hack_db",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  ...(process.env.DB_SSL_CA
    ? { ssl: { ca: process.env.DB_SSL_CA } }
    : {})
};

const pool = mysql.createPool(dbConfig);

app.set("trust proxy", isProduction ? 1 : false);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
      mediaSrc: [
        "'self'",
        "https://www.youtube-nocookie.com",
        "https://www.youtube.com"
      ],
      frameSrc: [
        "https://www.youtube-nocookie.com",
        "https://www.youtube.com"
      ]
    }
  }
}));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));

const sessionStore = new MySQLStore({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  createDatabaseTable: true,
  connectionLimit: 3
});

app.use(session({
  store: sessionStore,
  name: "hack.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many attempts. Please try again later." }
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(80) NOT NULL,
      email VARCHAR(254) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id BIGINT UNSIGNED NOT NULL,
      quiz_key VARCHAR(80) NOT NULL,
      score INT NOT NULL,
      total INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_quiz_user_created (user_id, created_at),
      CONSTRAINT fk_quiz_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);
}

function safeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Please sign in first." });
  }
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, app: "Hack" });
});

app.get("/api/me", (req, res) => {
  res.json({ user: req.session.user || null });
});

app.post("/api/register", authLimiter, async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (name.length < 2 || name.length > 80) {
      return res.status(400).json({
        error: "Name must be 2–80 characters."
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        email.length > 254) {
      return res.status(400).json({
        error: "Enter a valid email address."
      });
    }

    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({
        error: "Password must be 8–128 characters."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, passwordHash]
    );

    const user = {
      id: result.insertId,
      name,
      email
    };

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.user = safeUser(user);

      req.session.save((saveErr) => {
        if (saveErr) return next(saveErr);
        res.status(201).json({ user: req.session.user });
      });
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "An account with this email already exists."
      });
    }
    next(err);
  }
});

app.post("/api/login", authLimiter, async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    const [rows] = await pool.execute(
      "SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({
        error: "Email or password is incorrect."
      });
    }

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.user = safeUser(user);

      req.session.save((saveErr) => {
        if (saveErr) return next(saveErr);
        res.json({ user: req.session.user });
      });
    });
  } catch (err) {
    next(err);
  }
});

app.post("/api/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.clearCookie("hack.sid");
    res.json({ ok: true });
  });
});

app.get("/api/progress", requireAuth, async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      `SELECT quiz_key, score, total, created_at
       FROM quiz_attempts
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 10`,
      [req.session.user.id]
    );

    res.json({ attempts: rows });
  } catch (err) {
    next(err);
  }
});

const quizzes = {
  "web-basics": [
    {
      question: "Which language defines the structure of a web page?",
      options: ["HTML", "CSS", "SQL", "Bash"],
      answer: 0
    },
    {
      question: "Which technology is mainly used to style a web page?",
      options: ["Node.js", "CSS", "PostgreSQL", "Git"],
      answer: 1
    },
    {
      question: "Which browser API can send an HTTP request from JavaScript?",
      options: ["fetch()", "print()", "SELECT()", "mkdir()"],
      answer: 0
    }
  ],
  "full-stack": [
    {
      question: "What is the backend mainly responsible for?",
      options: [
        "Only colors",
        "Server-side logic and APIs",
        "Only page headings",
        "Changing monitor brightness"
      ],
      answer: 1
    },
    {
      question: "Which is a relational database?",
      options: ["CSS", "HTML", "MySQL", "Figma"],
      answer: 2
    },
    {
      question: "What does an HTTP POST request commonly do?",
      options: [
        "Submit/create data",
        "Style a page",
        "Compile CSS",
        "Resize an image"
      ],
      answer: 0
    }
  ]
};

app.get("/api/quizzes/:key", requireAuth, (req, res) => {
  const quiz = quizzes[req.params.key];

  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found." });
  }

  res.json({
    key: req.params.key,
    questions: quiz.map(({ question, options }) => ({
      question,
      options
    }))
  });
});

app.post("/api/quizzes/:key/submit", requireAuth, async (req, res, next) => {
  try {
    const quiz = quizzes[req.params.key];

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    const answers = req.body.answers;

    if (!Array.isArray(answers) ||
        answers.length !== quiz.length ||
        answers.some((n) => !Number.isInteger(n) || n < 0 || n > 3)) {
      return res.status(400).json({
        error: "Invalid answers submitted."
      });
    }

    const score = quiz.reduce(
      (sum, question, index) =>
        sum + (question.answer === answers[index] ? 1 : 0),
      0
    );

    await pool.execute(
      `INSERT INTO quiz_attempts
       (user_id, quiz_key, score, total)
       VALUES (?, ?, ?, ?)`,
      [req.session.user.id, req.params.key, score, quiz.length]
    );

    res.json({ score, total: quiz.length });
  } catch (err) {
    next(err);
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    error: "Something went wrong. Please try again."
  });
});

async function start() {
  try {
    await initDb();

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`HACK is running at http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      console.error("Could not start the web server:", err.message);
      process.exitCode = 1;
    });
  } catch (err) {
    console.error("Could not initialize database:", err.message);
    process.exitCode = 1;
    await pool.end().catch(() => {});
    sessionStore.close();
  }
}

start();
