# Kurrent

A task management platform backed by a fully automated CI/CD pipeline enabling automated builds, testing, deployment.

## System Architecture

![System Architecture](https://i.imgur.com/YJQ8y8s.png)

- **Frontend** communicates with the backend via REST API.
- **Backend** handles authentication, task management, and database interactions.
- **Database** stores user and task data.
- **CI/CD** automation ensures that code changes are tested, built, and deployed automatically.

## Tech Stack

| Component        | Technology / Details |
|-----------------|--------------------|
| Frontend         | Next.js |
| Backend          | Node.js, Express |
| Database         | MySQL, Prisma ORM |
| Authentication   | JWT-based auth (access & refresh tokens) |
| Containerization | Docker, Docker Compose |
| Deployment       | Render, Vercel, Aiven |
| CI/CD            | GitHub Actions |

## CI/CD Pipeline Overview
- **Backend**: Git push → GitHub Actions builds Docker image → pushes to Docker Hub → Render webhook triggers automatic redeploy.
- **Frontend**: Git push → Vercel detects changes → auto-deploys frontend.
- **Environment Variables**: Configured in both frontend and backend for secure API and database access.
- **End-to-End Flow**: Frontend communicates with backend, backend interacts with managed database, authentication handled via cookies, all automated via CI/CD.

## Getting Started

### Prerequisites
- Docker & Docker Compose installed

### Run the app

1. Clone the repository
2. Create `.env` files for the root and backend (`.env.example` will be provided at a later notice)
3. Build and start the containers (first time only):

```bash
docker compose up --build
```

4. On subsequent runs:

```bash
docker compose up -d
```

## Contributions

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.