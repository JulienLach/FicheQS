<p align="center">
  <img src="frontend/src/assets/images/logo-mobile.png" alt="FicheQS Logo" width="100" height="100">
</p>

<p align="center">
  <a href="https://github.com/JulienLach/FicheQS/releases">
    <img src="https://img.shields.io/badge/Release-0.0.0-00DD80?logo=github" alt="Release" />
  </a>
</p>

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Requirements](#requirements)
-   [Objectives](#objectives)
-   [Syntaxes and paradigms](#syntaxes-and-paradigms-to-practice)
-   [How to run the app](#acces-app-on-local-network)
-   [Testing](#testing)
-   [CI/CD](#cicd)
-   [Deployment with Docker](#deployment-with-docker)
-   [Environment Variables](#env-file)

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

-   This projet uses **vitest** for unit and integration tests.
-   To run tests, use `npm run test` in `backend` folder.

### CI/CD

### Deployment with Docker

### .env file
