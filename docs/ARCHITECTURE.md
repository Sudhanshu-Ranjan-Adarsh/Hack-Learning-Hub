# Hack architecture

```text
Browser (HTML / CSS / JavaScript)
           |
           | HTTPS + fetch() / JSON
           v
Node.js + Express web service
  |       |        |
  |       |        +-- bcrypt password hashing
  |       +----------- session middleware
  +------------------- API routes + validation
           |
           | parameterized SQL over TLS
           v
Managed Mariadb / MySQL
  ├── users
  ├── quiz_attempts
  └── user_sessions
```

## Main data flow

1. The browser sends a registration or login request.
2. Express validates the request and verifies credentials.
3. The server stores only a password hash, never the raw password.
4. The server creates a session and sends an HTTP-only session cookie.
5. Protected quiz routes check the session.
6. Quiz scores are calculated on the server and saved to Mariadb / MySQL.

## Deployment note

Keep the database URL and session secret in the host's secret/environment-variable manager. Do not put them in browser JavaScript or commit them to source control.
