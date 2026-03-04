# Kurrent

A task tracking platform backed by a fully automated CI/CD pipeline enabling automated builds, testing, deployment, and production monitoring.

> ⚠️ This is a temporary README. Full documentation will be added once the project is complete.

## Tech Stack

- **Frontend** — Next.js
- **Backend** — Node.js, Express
- **Database** — MySQL, Prisma ORM
- **Containerization** — Docker, Docker Compose

## Services

| Service  | Port |
|----------|------|
| Frontend | 3000 |
| Backend  | 5000 |
| MySQL    | 3306 |

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

## Project Status

- [x] Fullstack application
- [x] Dockerization & image optimization
- [ ] CI/CD pipeline
- [ ] Cloud deployment
- [ ] Production monitoring