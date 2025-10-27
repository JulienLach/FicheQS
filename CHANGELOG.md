# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## 1.0.77 (2025-10-27)

### Fixes

-   Remove hardcoded EXPOSE port in backend Dockerfile to allow dynamic port assignment with docker-compose environment variables

## 1.0.75 (2025-10-23)

### Fixes

-   Fix ansible playbook to deploy multiple clients with one subfolder for each

## 1.0.74 (2025-10-23)

### Changes

-   Update cd.yml to deploy on demo.ficheqs.ovh

## 1.0.73 (2025-10-23)

### Changes

-   Add loader to submit button in FicheQS form

## 1.0.72 (2025-10-21)

### Fixes

-   Fix sendmail container for IOS devices

## 1.0.71 (2025-10-19)

### Changes

-   Add auto fill visite date with current date

## 1.0.70 (2025-10-19)

### Fixes

-   Fix date input field appearance on Safari IOS

### Changes

-   Optimize img sizes
-   UI/UX updates

## 1.0.69 (2025-10-19)

### Changes

-   Improve email validation in login form with regex
-   Add server headers for security
-   Add global error handling middleware in Express
-   Add uncaught exception handler in server.ts

## 1.0.68 (2025-10-12)

### Changes

-   Cleanup code
-   Optimize styles
-   Add more unit tests

## 1.0.67 (2025-09-21)

### Changes

-   Add delete FicheQS feature

## 1.0.62 (2025-09-17)

### Changes

-   Remove database exposed port in docker-compose

## 1.0.61 (2025-09-14)

### Changes

-   Add legal mentions page for GDPR compliance

## 1.0.6 (2025-09-13)

### Changes

-   UI/UX updates

## 1.0.59 (2025-09-13)

### Changes

-   Add validated alert message when user validate a FicheQS

### Fixes

-   Fix CI/CD pipeline

## 1.0.2 (2025-09-07)

### Fixes

-   Fix ansible playbook and inventory paths from cd.yml

## 1.0.1 (2025-09-06)

### Changes

-   Add toggle switch to show/hide balcon section in FicheQS form

## 1.0.0 (2025-09-05)

### Changes

-   Add user authentication system
-   Creation of FicheQS
-   Add validated FicheQS history
-   Add send FicheQS PDF by email
-   Update user account information
