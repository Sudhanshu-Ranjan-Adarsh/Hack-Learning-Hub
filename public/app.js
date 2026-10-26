const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
let currentUser = null;
let selectedQuiz = "web-basics";
let quizData = null;
let quizIndex = 0;
let quizAnswers = [];
let quizLibrary = [];
let quizDifficulty = "All";
let quizSearch = "";
let quizLibraryLoaded = false;

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}
async function api(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}
function setAuthTab(tab) {
  $$(".auth-tab").forEach((button) => button.classList.toggle("active", button.dataset.authTab === tab));
  $("#loginForm").classList.toggle("hidden", tab !== "login");
  $("#registerForm").classList.toggle("hidden", tab !== "register");
  $("#signedInBox").classList.add("hidden");
}
function showPage(pageName) {
  const valid = ["home", "account", "syllabus", "materials", "leaderboard"];
  const page = valid.includes(pageName) ? pageName : "home";
  $$(".page").forEach((section) => section.classList.toggle("active", section.id === `page-${page}`));
  $$(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.page === page));
  $("#pageCrumb").textContent = $(`#page-${page}`).dataset.title;
  $(".sidebar").classList.remove("open");
  if (page === "account") renderAccountState();
  if (page === "materials") renderQuizStart();
  if (page === "leaderboard") renderLeaderboard();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function navigate() {
  showPage(location.hash.replace("#", "") || "home");
}
async function renderAccountState() {
  try {
    const data = await api("/api/me");
    currentUser = data.user;
    $("#accountShortcut").textContent = currentUser ? currentUser.name.slice(0, 1).toUpperCase() : "?";
    if (currentUser) {
      $("#loginForm").classList.add("hidden");
      $("#registerForm").classList.add("hidden");
      $$(".auth-tab").forEach((button) => button.classList.remove("active"));
      $("#signedInBox").classList.remove("hidden");
      $("#signedInText").textContent = `Signed in as ${currentUser.name} (${currentUser.email}).`;
    } else {
      $("#signedInBox").classList.add("hidden");
      setAuthTab("login");
    }
  } catch { /* The page still remains usable if the API is temporarily unavailable. */ }
}
async function handleAuth(form, endpoint, messageId) {
  const message = $(messageId);
  message.textContent = "";
  message.classList.remove("success");
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const data = await api(endpoint, { method: "POST", body: JSON.stringify(payload) });
    currentUser = data.user;
    message.textContent = endpoint.endsWith("register") ? "Account created. You're signed in!" : "Welcome back. You're signed in!";
    message.classList.add("success");
    form.reset();
    await renderAccountState();
    toast("You're signed in.");
  } catch (error) { message.textContent = error.message; }
}
async function renderQuizStart() {
  const list = $("#quizLibraryList");
  const status = $("#quizLibraryStatus");
  if (!list || !status) return;

  status.textContent = "Loading quiz library...";
  list.innerHTML = "";

  try {
    if (!quizLibraryLoaded) {
      const data = await api("/api/quizzes");
      quizLibrary = data.quizzes || [];
      quizLibraryLoaded = true;
    }

    const searchInput = $("#quizSearch");
    if (searchInput) {
      searchInput.value = quizSearch;
      searchInput.oninput = () => {
        quizSearch = searchInput.value.trim().toLowerCase();
        renderQuizCards();
      };
    }

    $$(".difficulty-filter").forEach((button) => {
      button.classList.toggle("active", button.dataset.difficulty === quizDifficulty);
      button.onclick = () => {
        quizDifficulty = button.dataset.difficulty;
        $$(".difficulty-filter").forEach((item) =>
          item.classList.toggle("active", item === button)
        );
        renderQuizCards();
      };
    });

    renderQuizCards();
    renderSelectedQuizStart();
  } catch (error) {
    status.textContent = "Quiz library could not be loaded: " + error.message;
  }
}

function renderQuizCards() {
  const list = $("#quizLibraryList");
  const status = $("#quizLibraryStatus");
  if (!list || !status) return;

  const filtered = quizLibrary.filter((quiz) => {
    const matchesDifficulty =
      quizDifficulty === "All" || quiz.difficulty === quizDifficulty;
    const haystack = [quiz.title, quiz.category, quiz.key, quiz.difficulty]
      .join(" ")
      .toLowerCase();
    return matchesDifficulty && haystack.includes(quizSearch);
  });

  status.textContent = filtered.length
    ? `${filtered.length} quiz${filtered.length === 1 ? "" : "zes"} found · ${quizLibrary.length} total`
    : "No quizzes match your search. Try another topic or difficulty.";

  list.innerHTML = filtered.map((quiz) => {
    const active = quiz.key === selectedQuiz;
    const difficulty = ["Easy", "Medium", "Hard"].includes(quiz.difficulty)
      ? quiz.difficulty : "Medium";
    return `
      <button type="button" class="quiz-library-card ${active ? "selected" : ""}"
        data-quiz-key="${escapeHtml(quiz.key)}" aria-pressed="${active}">
        <span class="quiz-card-main">
          <strong>${escapeHtml(quiz.title)}</strong>
          <small>${escapeHtml(quiz.category)}</small>
        </span>
        <span class="quiz-card-meta">
          <span class="difficulty-tag difficulty-${difficulty.toLowerCase()}">${difficulty}</span>
          <small>${quiz.questionCount} questions</small>
        </span>
      </button>`;
  }).join("");

  list.querySelectorAll("[data-quiz-key]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedQuiz = button.dataset.quizKey;
      renderQuizCards();
      renderSelectedQuizStart();
    });
  });
}

function renderSelectedQuizStart() {
  const quiz = quizLibrary.find((item) => item.key === selectedQuiz);
  if (!quiz) {
    $("#quizLabel").textContent = "QUIZ LIBRARY";
    $("#quizCount").textContent = "Choose a quiz";
    $("#quizContent").innerHTML = "<h3>Select a quiz to begin</h3>";
    return;
  }

  $("#quizLabel").textContent = quiz.title.toUpperCase();
  $("#quizCount").textContent =
    `${quiz.difficulty.toUpperCase()} · ${quiz.questionCount} QUESTIONS`;
  $("#quizContent").innerHTML = `
    <h3>${escapeHtml(quiz.title)}</h3>
    <p>${escapeHtml(quiz.category)} · ${quiz.difficulty} difficulty.</p>
    <p>${currentUser
      ? "Your score will be saved to your account."
      : "Sign in first to take the quiz and save your score."}</p>
    <button class="btn btn-primary" id="startQuiz">Start quiz →</button>`;
  $("#quizMessage").textContent = "";
  $("#startQuiz").addEventListener("click", startQuiz);
}
async function startQuiz() {
  if (!currentUser) {
    toast("Sign in to take and save a quiz.");
    location.hash = "#account";
    return;
  }
  try {
    quizData = await api(`/api/quizzes/${selectedQuiz}`);
    quizIndex = 0;
    quizAnswers = Array(quizData.questions.length).fill(null);
    renderQuestion();
  } catch (error) { $("#quizMessage").textContent = error.message; }
}
function renderQuestion() {
  const q = quizData.questions[quizIndex];
  $("#quizCount").textContent = `QUESTION ${quizIndex + 1} OF ${quizData.questions.length}`;
  $("#quizContent").innerHTML = `
    <p class="quiz-question">${quizIndex + 1}. ${escapeHtml(q.question)}</p>
    <div class="quiz-options">${q.options.map((option, i) => `
      <label class="quiz-option"><input type="radio" name="answer" value="${i}" ${quizAnswers[quizIndex] === i ? "checked" : ""}>
      <span>${escapeHtml(option)}</span></label>`).join("")}</div>
    <div class="quiz-nav"><button class="btn btn-quiet" id="prevQuestion" ${quizIndex === 0 ? "disabled" : ""}>← Previous</button>
    <button class="btn btn-primary" id="nextQuestion">${quizIndex === quizData.questions.length - 1 ? "Submit quiz" : "Next →"}</button></div>`;
  $("#quizContent").querySelectorAll('input[name="answer"]').forEach((input) => input.addEventListener("change", () => { quizAnswers[quizIndex] = Number(input.value); }));
  $("#prevQuestion").addEventListener("click", () => { quizIndex--; renderQuestion(); });
  $("#nextQuestion").addEventListener("click", submitOrNext);
}
async function submitOrNext() {
  if (quizAnswers[quizIndex] === null) {
    $("#quizMessage").textContent = "Choose an answer before continuing.";
    return;
  }
  $("#quizMessage").textContent = "";
  if (quizIndex < quizData.questions.length - 1) { quizIndex++; renderQuestion(); return; }
  try {
    const result = await api(`/api/quizzes/${selectedQuiz}/submit`, {
      method: "POST", body: JSON.stringify({ answers: quizAnswers })
    });
    $("#quizCount").textContent = "QUIZ COMPLETE";
    $("#quizContent").innerHTML = `<div class="success-mark">✓</div><h3>Your score: ${result.score} / ${result.total}</h3><p>${result.score === result.total ? "Excellent work. Keep the momentum going." : "Good practice. Review the concepts and give it another try."}</p><button class="btn btn-primary" id="retryQuiz">Try again ↻</button>`;
    $("#retryQuiz").addEventListener("click", startQuiz);
    toast("Quiz result saved.");
  } catch (error) {
    $("#quizMessage").textContent = error.message;
    if (error.message.includes("sign in")) { currentUser = null; }
  }
}
async function renderLeaderboard() {
  const message = $("#leaderboardMessage");
  const body = $("#leaderboardBody");
  const refresh = $("#refreshLeaderboard");

  if (!message || !body || !refresh) return;

  message.textContent = "Loading rankings...";
  body.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
  refresh.disabled = true;

  try {
    const data = await api("/api/leaderboard");

    if (!data.leaderboard.length) {
      message.textContent = "No quiz attempts yet. Complete a quiz to appear here.";
      body.innerHTML = '<tr><td colspan="5">No rankings available yet.</td></tr>';
      return;
    }

    body.innerHTML = data.leaderboard.map((user) => `
      <tr>
        <td>${user.rank}</td>
        <td>${escapeHtml(user.name)}</td>
        <td>${user.points} / ${user.possible}</td>
        <td>${user.accuracy}%</td>
        <td>${user.attempts}</td>
      </tr>
    `).join("");

    message.textContent = "Rankings based on total correct answers across recorded quiz attempts.";
  } catch (error) {
    body.innerHTML = '<tr><td colspan="5">Rankings could not be loaded.</td></tr>';
    message.textContent = error.message;
  } finally {
    refresh.disabled = false;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
}

window.addEventListener("hashchange", navigate);
$$(".nav-link").forEach((link) => link.addEventListener("click", (event) => {
  if (location.hash === link.getAttribute("href")) showPage(link.dataset.page);
}));
$("#accountShortcut").addEventListener("click", () => { location.hash = "#account"; });
$("#refreshLeaderboard").addEventListener("click", renderLeaderboard);
$("#menuToggle").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
$$(".auth-tab").forEach((button) => button.addEventListener("click", () => setAuthTab(button.dataset.authTab)));
$("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault(); handleAuth(event.currentTarget, "/api/login", "#loginMessage");
});
$("#registerForm").addEventListener("submit", (event) => {
  event.preventDefault(); handleAuth(event.currentTarget, "/api/register", "#registerMessage");
});
$("#logoutButton").addEventListener("click", async () => {
  try { await api("/api/logout", { method: "POST" }); currentUser = null; await renderAccountState(); toast("Logged out."); }
  catch (error) { toast(error.message); }
});
$$(".quiz-pick").forEach((button) => button.addEventListener("click", () => {
  selectedQuiz = button.dataset.quiz;
  $$(".quiz-pick").forEach((item) => item.classList.toggle("active", item === button));
  renderQuizStart();
}));
$("#startQuiz").addEventListener("click", startQuiz);
async function init() {
  navigate();
  await renderAccountState();
  currentUser = currentUser || null;
  if (location.hash === "#leaderboard") await renderLeaderboard();
}
init();
