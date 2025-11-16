# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.90] - 2025-11-16

### Added

-   Add createFicheQS unit test

### Changed

-   Update CI.yml file to optimize test runs and add code coverage report generation
-   Update cd.yml to optimize release creation speed with shallow clone (light Git clone), modern actions, and automatic release notes generation

## [1.0.89] - 2025-11-13

## [1.0.88] - 2025-11-11

### Fixed

-   Add PostgreSQL healthcheck in docker-compose to ensure database is ready before backend starts to avoid getaddrinfo EAI_AGAIN db errors

## [1.0.87] - 2025-11-10

### Fixed

-   Fix notification message position on iOS devices with safe area insets
-   Fix loader spinner

## [1.0.86] - 2025-11-05

_No changes in this release_

## [1.0.85] - 2025-11-04

_No changes in this release_

## [1.0.84] - 2025-11-03

### Fixed

-   Fix Ansible deployment script to correctly set up the application on the server

## [1.0.78] - 2025-10-27

### Changed

-   Refactor FicheqsForm with React memo and useCallback to optimize rendering performance
-   Fix Ansible deployment to create only one database container, separate release and client deployment workflows in CI/CD pipeline

## [1.0.77] - 2025-10-27

### Fixed

-   Remove hardcoded EXPOSE port in backend Dockerfile to allow dynamic port assignment with docker-compose environment variables

## [1.0.76] - 2025-10-23

### Fixed

-   Fix Ansible playbook to deploy multiple clients with one subfolder for each

## [1.0.75] - 2025-10-23

### Changed

-   Update cd.yml to deploy on demo.ficheqs.ovh

## [1.0.74] - 2025-10-23

### Changed

-   Add loader to submit button in FicheQS form

## [1.0.73] - 2025-10-21

### Fixed

-   Fix sendmail container for iOS devices

## [1.0.72] - 2025-10-19

### Changed

-   Add auto fill visite date with current date

## [1.0.71] - 2025-10-19

### Fixed

-   Fix date input field appearance on Safari iOS

### Changed

-   Optimize image sizes
-   UI/UX updates

## [1.0.70] - 2025-10-19

### Changed

-   Improve email validation in login form with regex
-   Add server headers for security
-   Add global error handling middleware in Express
-   Add uncaught exception handler in server.ts

## [1.0.69] - 2025-10-12

### Changed

-   Cleanup code
-   Optimize styles
-   Add more unit tests

## [1.0.68] - 2025-09-21

### Changed

-   Add delete FicheQS feature

## [1.0.62] - 2025-09-17

### Changed

-   Remove database exposed port in docker-compose

## [1.0.61] - 2025-09-14

### Changed

-   Add legal mentions page for GDPR compliance

## [1.0.60] - 2025-09-13

### Changed

-   UI/UX updates

## [1.0.59] - 2025-09-13

### Changed

-   Add validated alert message when user validate a FicheQS

### Fixed

-   Fix CI/CD pipeline

## [1.0.58] - 2025-09-07

### Fixed

-   Fix Ansible playbook and inventory paths from cd.yml

## [1.0.57] - 2025-09-06

### Changed

-   Add toggle switch to show/hide balcon section in FicheQS form

## [1.0.0] - 2025-09-05

### Added

-   Add user authentication system
-   Add FicheQS creation functionality
-   Add validated FicheQS history
-   Add send FicheQS PDF by email feature
-   Add user account information update functionality
