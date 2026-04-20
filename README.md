<p align="center">
  <img src="frontend/src/assets/images/logo-mobile.png" alt="Audit Logo" width="150" height="38">
</p>

<p align="center">
  <a href="https://github.com/JulienLach/Audit/releases">
    <img src="https://img.shields.io/badge/Release-2.1.0-424242?logo=github" alt="Release" />
  </a>
</p>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Access app on local network](#acces-app-on-local-network)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Deployment with Docker](#deployment-with-docker)
- [Environment Variables](#env-file)
- [Frontend setup](#frontend-setup)
- [Backend setup](#backend-setup)

### Overview

Audit is a fullstack PWA for security audits

### Features

- Create security audits from desktop or mobile devices with PWA
- View validated audits with history
- Send audit PDF via email
- Corrective actions management
- User authentication and account management
- Delete audits

### Requirements

- Node.js v22+
- npm
- React v19+
- Vite v7+
- Express v5+
- TypeScript v5+
- PostgreSQL v14+
- Docker

### Acces app on local network

On your local machine, if your ports are not yet opened in your firewall, run :

- Open port with `sudo ufw allow 3000` and `sudo ufw allow 3001`

To access the app from another device on the same local network:

- In allowedOrigins in `backend/server.ts`, add the network URL: `http://your-local-ip:3000`

### Testing

- This project uses **vitest** for unit and integration tests.

- To run tests, use `npm run test` in `backend` folder.

To check type errors, use `npx tsc --noEmit` in the `frontend` folder.

### CI/CD

This project uses **GitHub Actions** and **Docker** for CI/CD. The workflow is defined in `.github/workflows/deploy.yml`.

To trigger the workflow, push a new tag :

Update versions in both `frontend/package.json` and `backend/package.json`.
Update version in `CHANGELOG.md` with the new version and date.

Push on `develop` branch and merge to `main` branch.

Then run locally the following commands :

```
git checkout main
git pull origin main
git tag -a x.x.x -m "Release version x.x.x"
git push origin x.x.x
```

### Deployment with Docker

The application is containerized using Docker. The `docker-compose.yml` file defines the frontend, backend, and PostgreSQL database services.

### .env file

Create a `.env` file in the root directory with the following variables:

```
# Environment
NODE_ENV=development

# Database
DB_USER=postgres
DB_HOST=localhost
DB_NAME=auditqs
DB_PASSWORD=**************************************
DB_PORT=5432

# Authentication
JWT_SECRET=*****************************************

# Email
EMAIL=no_reply@auditqs.fr
MAILJET_API_KEY=************************************
MAILJET_SECRET_KEY=*********************************

# URLs
ORIGIN_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
```

### Frontend setup

`npm create vite@latest frontend -- --template react-ts`

Additional frontend setup :

- Installed React Router: `npm install react-router-dom`
- PWA support via manual `public/manifest.webmanifest` and `public/sw.js`
- Configured proxy in vite.config.ts to connect with backend API

### Backend setup

`npm install -D typescript @types/node`
`npx tsc --init`

List of backend dependencies:

- Express framework: `npm install express cors`
- PostgreSQL: `npm install pg`
- Email service: `npm install nodemailer`
- PDF generation: `npm install pdfkit`
- JWT authentication: `npm install jsonwebtoken`
- Password hashing: native Node.js `crypto` (scrypt)
