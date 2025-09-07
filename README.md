<p align="center">
  <img src="frontend/src/assets/images/logo-mobile.png" alt="FicheQS Logo" width="200" height="100">
</p>

<p align="center">
  <a href="https://github.com/JulienLach/FicheQS/releases">
    <img src="https://img.shields.io/badge/Release-1.0.2-00DD80?logo=github" alt="Release" />
  </a>
</p>

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Requirements](#requirements)
-   [Objectives](#objectives)
-   [Syntaxes and paradigms](#syntaxes-and-paradigms-to-practice)
-   [Acces app on local network](#acces-app-on-local-network)
-   [Testing](#testing)
-   [CI/CD](#cicd)
-   [Deployment with Docker](#deployment-with-docker)
-   [Environment Variables](#env-file)
-   [Frontend setup](#frontend-setup)
-   [Backend setup](#backend-setup)

### Overview

FicheQS is a fullstack PWA for digitizing quality and safety forms in housing and real estate industry.

### Features

-   Create FicheQS from desktop or mobile devices with PWA
-   View validated FicheQS with history
-   Send FicheQS PDF via email
-   User authentication and account management

### Requirements

-   Node.js v20+
-   npm v9+
-   React v19+
-   Vite
-   Express
-   TypeScript
-   PostgreSQL
-   Docker

### Objectives

-   Use **React v19** with the latest functional component syntax to benefit from improved performance, hooks, and modern React features.
-   Use **Vite** as the frontend build tool and development server, replacing the deprecated Create React App, for faster builds and a better development experience.
    To create the frontend folder as a React project with Vite, run:
    `npm create vite@latest frontend -- --template react`
    Then, navigate into the folder and start the development server:
    ```
    cd frontend
    npm install
    npm run dev
    ```
-   Deploy the frontend as a **Progressive Web App (PWA)**, optimised for mobile devices, to provide an app-like experience.
-   Use **npm** as the package manager and **Node.js** as the JavaScript runtime environment for both frontend and backend.
-   Use **Express** as the backend web framework for building robust REST APIs.
-   Use **TypeScript** throughout the project to ensure type safety, better code quality, and easier maintenance.
-   Use **PostgreSQL** as the relational database for reliable and scalable data storage.
-   Use **Docker** to containerise the application, ensuring consistency across development, testing, and production environments.

### Syntaxes and paradigms to practice

-   Use the latest **React v19 functional component syntax** (with hooks and ES2020 features).
-   Use **async/await** for asynchronous code to avoid callback hell and improve readability.
-   Use **TypeScript** for static type checking and safer code.
-   Use **ES2020 import/export** syntax for modular and maintainable code.

### Acces app on local network

-   Open port with `sudo ufw allow 3000` and `sudo ufw allow 3001`
-   In allowedOrigins in `backend/server.ts`, add the network URL: `http://your-local-ip:3000`

### Testing

`npm install -D vitest @vitest/ui @vitest/coverage-v8`

-   This projet uses **vitest** for unit and integration tests.
-   To run tests, use `npm run test` in `backend` folder.

### CI/CD

### Deployment with Docker

### .env file

Create a `.env` file in the root directory with the following variables:

```
# Environment
# NODE_ENV=production
NODE_ENV=development
PORT_BACKEND=3001
PORT_FRONTEND=3000

# Database
DB_USER=postgres
# DB_HOST=db
DB_HOST=localhost
DB_NAME=FichesQS
DB_PASSWORD=postgres
DB_PORT=5432

# Authentication
JWT_SECRET=*****************************************

# Email SMTP
EMAIL=mail@mail.ovh
MAILJET_API_KEY=************************************
MAILJET_SECRET_KEY=*********************************

# URLs
ORIGIN_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
```

In frontend, create a `.env` file with:

```
VITE_API_URL=http://localhost:3001
```

### Frontend setup

`npm create vite@latest frontend -- --template react-ts`

Only kept these TS config files:

-   vite.config.ts
-   tsconfig.json
-   vite-env.d.ts

Additional frontend setup:

-   Installed React Router: `npm install react-router-dom`
-   Added PWA support: `npm install -D vite-plugin-pwa`
-   Set up folder structure with components, pages, and services
-   Configured proxy in vite.config.ts to connect with backend API

### Backend setup

TypeScript configuration for the backend was created with:
`npm install -D typescript @types/node`
`npx tsc --init`

The tsconfig.json is customized with:

-   ES2020 target for modern JavaScript features
-   NodeNext module system for ESM compatibility
-   Strict type checking enabled
-   Output directory set to './dist'

Additional backend setup:

-   Express framework: `npm install express cors cookie-parser`
-   Type definitions: `npm install -D @types/express @types/cors @types/cookie-parser`
-   PostgreSQL integration: `npm install pg`
-   Development utilities: `npm install -D nodemon ts-node dotenv`
-   Email service: `npm install nodemailer`
-   PDF generation: `npm install jspdf`

```

```
