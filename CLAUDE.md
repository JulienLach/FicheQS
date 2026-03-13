# CLAUDE.md - AI Assistant Guide for FicheQS

## Project Overview

FicheQS is a fullstack Progressive Web Application (PWA) for digitizing quality and safety verification forms used in the real estate industry. The application allows users to create, view, and manage inspection forms ("FicheQS") for housing and equipment, with PDF generation and email capabilities.

**Current Version**: 1.0.93

## Tech Stack

### Frontend
- **React 19** with functional components and hooks
- **Vite 7** as build tool and dev server
- **TypeScript 5.8** for type safety
- **React Router DOM 7** for routing
- **vite-plugin-pwa** for PWA support

### Backend
- **Node.js 20+** runtime
- **Express 5** web framework
- **TypeScript 5.8** with ES2020 target
- **PostgreSQL 14** database (via `pg` driver)
- **PDFKit** for PDF generation
- **Nodemailer + Mailjet** for email services
- **JWT** for authentication
- **Vitest** for testing

### DevOps
- **Docker & Docker Compose** for containerization
- **GitHub Actions** for CI/CD
- **Ansible** for deployment automation

## Project Structure

```
FicheQS/
├── backend/                    # Express.js API server
│   ├── auth/                   # Authentication logic
│   ├── config/                 # Database configuration
│   ├── data/                   # Data access layer (DAL) classes
│   ├── fonts/                  # PDF fonts (Inter family)
│   ├── images/                 # PDF assets
│   ├── interfaces/             # TypeScript interfaces
│   ├── middleware/             # Express middleware (auth, sanitize)
│   ├── routes/                 # API route handlers
│   ├── services/               # Business logic layer
│   ├── test/                   # Vitest unit tests
│   ├── updates/                # Database migrations
│   ├── utils/                  # Utility functions (email)
│   ├── server.ts               # Application entry point
│   └── package.json
├── frontend/                   # React PWA client
│   ├── public/                 # Static assets, fonts, icons
│   └── src/
│       ├── assets/             # Images and static resources
│       ├── components/         # Reusable React components
│       ├── interfaces/         # TypeScript interfaces
│       ├── pages/              # Page components (routes)
│       ├── services/           # API client functions
│       ├── utils/              # Utility components (PrivateRoute, status)
│       ├── App.tsx             # Root component with routing
│       └── main.tsx            # Application entry point
├── ansible/                    # Deployment automation
│   └── roles/deploy/           # Ansible deployment role
├── .github/
│   ├── workflows/              # CI/CD pipelines
│   │   ├── ci.yml              # Unit tests on develop branch
│   │   ├── cd.yml              # Create release on tag push
│   │   └── deploy.yml          # Ansible deployment
│   └── Gitflow.md              # Git workflow documentation
├── database_script.sql         # PostgreSQL schema and seed data
├── docker-compose.yml          # Multi-service Docker setup
└── .env                        # Environment variables (not in repo)
```

## Development Setup

### Prerequisites
- Node.js v20+
- npm
- PostgreSQL 14+
- Docker (optional, for containerized development)

### Environment Variables
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT_BACKEND=3001
PORT_FRONTEND=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ficheqs
DB_PASSWORD=<password>
DB_PORT=5432
JWT_SECRET=<secret>
EMAIL=no_reply@ficheqs.ovh
MAILJET_API_KEY=<key>
MAILJET_SECRET_KEY=<secret>
ORIGIN_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
```

### Running Locally

**Backend:**
```bash
cd backend
npm install
npm run start    # Uses nodemon for hot reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev      # Vite dev server on port 3000
```

**Database:**
```bash
psql -U postgres -d ficheqs -f database_script.sql
```

## Architecture Patterns

### Backend Architecture (3-Layer)

1. **Routes Layer** (`routes/*.routes.ts`)
   - HTTP request handling
   - Input validation
   - Response formatting
   - Uses Express Router

2. **Services Layer** (`services/*.services.ts`)
   - Business logic
   - Orchestrates data operations
   - Thin layer delegating to DAL

3. **Data Access Layer** (`data/*.ts`)
   - Database queries using `pg` pool
   - Static class methods pattern
   - SQL query construction
   - Data transformation (snake_case to camelCase)

### Frontend Architecture

- **Pages**: Route-level components in `pages/`
- **Components**: Reusable UI components in `components/`
- **Services**: API client in `services/api.ts`
- **Protected Routes**: Using `PrivateRoute` wrapper component
- **State**: Local component state with hooks (no global state manager)

## Database Schema

### Tables

**users**
- `id_user` (SERIAL PK)
- `email` (VARCHAR UNIQUE)
- `password` (VARCHAR - SHA256 hash)
- `firstname`, `lastname`

**ficheqs** (Main inspection forms)
- `id_fiche` (SERIAL PK)
- `status` (INTEGER: 1=En cours, 2=Validée)
- `visite_date` (DATE)
- `logement` (VARCHAR - property reference)
- `id_user` (FK to users)

**fields** (Predefined inspection fields)
- `id_field` (SERIAL PK)
- `name` (VARCHAR UNIQUE - field identifier)

**ficheqs_has_field** (Form field values - junction table)
- `id_fiche`, `id_field` (Composite PK)
- `valeur` (BOOLEAN: true=OK, false=Not operational, null=N/A)
- `description` (VARCHAR - required when valeur=false)

## API Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/login` | No | Authenticate user, returns JWT |
| GET | `/ficheqs` | Yes | Get all ficheqs |
| GET | `/ficheqs/:idFiche` | Yes | Get ficheqs by ID with fields |
| POST | `/ficheqs` | Yes | Create new ficheqs |
| DELETE | `/ficheqs/:idFiche` | Yes | Delete ficheqs |
| POST | `/account` | Yes | Update user account |
| POST | `/email` | Yes | Send PDF via email |
| POST | `/pdf/generate` | Yes | Generate PDF |

## Testing

Tests use **Vitest** with mocking for the data layer.

```bash
cd backend
npm run test           # Run tests
npm run test:ui        # Run with Vitest UI
npm run test:ui:coverage  # Run with coverage
```

Test files are in `backend/test/` and follow the pattern `*.test.ts`.

Example test structure:
```typescript
import { describe, it, expect, vi } from "vitest";
vi.mock("../data/ficheqs");  // Mock data layer

describe("FicheQS Service", () => {
    it("should retrieve FicheQS by id", async () => {
        vi.mocked(Ficheqs.getFicheQSById).mockResolvedValue(mockData);
        const result = await ficheqsService.getFicheQSById(1);
        expect(result).toEqual(mockData);
    });
});
```

## CI/CD Pipeline

### Continuous Integration (`ci.yml`)
- Triggered on push/PR to `develop` branch
- Runs: install, build, test, coverage

### Continuous Deployment (`cd.yml` + `deploy.yml`)
1. Push tag to `main` branch triggers release creation
2. Release dispatches deployment workflow
3. Ansible deploys to VPS via SSH

### Release Process
```bash
# Update versions in frontend/package.json, backend/package.json, CHANGELOG.md
git checkout main
git pull origin main
git tag -a x.x.x -m "Release version x.x.x"
git push origin x.x.x
```

## Git Workflow

Uses **Git Flow** pattern:

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature-*`: Feature branches from develop
- `release-*`: Release preparation branches
- `<issue-number>-*`: Issue fix branches

**Branch naming examples:**
- `feature-add-companies`
- `1440-fix-appointment-stats`
- `release-1.2.0`

## Coding Conventions

### TypeScript
- Use strict mode enabled
- Interfaces defined in `interfaces/` directories
- camelCase for TypeScript, snake_case for SQL columns
- async/await for all asynchronous operations

### React
- Functional components only (no class components)
- Use React.FC type annotation
- Hooks for state and effects
- CSS files alongside components

### Naming Conventions
- **Files**: kebab-case for multi-word files, PascalCase for components
- **Components**: PascalCase (`LoginForm.tsx`)
- **Interfaces**: PascalCase with `Data` suffix (`FicheqsData`)
- **Routes**: kebab-case URLs (`/all-fichesqs`)

### Code Organization
- One component per file
- Services export individual functions
- Data layer uses static class methods
- Middleware uses function exports

## Security Features

- JWT authentication with HTTP-only considerations
- Rate limiting (100 requests/min)
- Input sanitization middleware (DOMPurify)
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- SQL parameterized queries (no raw string interpolation)

## Common Tasks

### Adding a New API Endpoint
1. Create/update route in `backend/routes/`
2. Add service function in `backend/services/`
3. Add data method in `backend/data/`
4. Update interfaces if needed in `backend/interfaces/`
5. Add tests in `backend/test/`
6. Update frontend API client in `frontend/src/services/api.ts`

### Adding a New Frontend Page
1. Create page component in `frontend/src/pages/`
2. Add route in `frontend/src/App.tsx`
3. Wrap with `PrivateRoute` if authentication required
4. Create any needed components in `frontend/src/components/`

### Adding a Database Migration
1. Add migration logic in `backend/updates/migration.ts`
2. Migrations run automatically on server start via `runMigrations()`

### Type Checking
```bash
# Frontend
cd frontend && npx tsc --noEmit

# Backend
cd backend && npm run build
```

## Docker Development

```bash
# Build and run all services
docker-compose up --build

# Services:
# - db: PostgreSQL on internal network
# - backend-h76: Backend on localhost:3001
# - frontend-h76: Frontend on localhost:8080
# - backend-demo/frontend-demo: Demo environment
```

## Important Files

| File | Purpose |
|------|---------|
| `backend/server.ts` | Express app setup, middleware, routes |
| `backend/config/db.config.ts` | PostgreSQL connection pool |
| `backend/middleware/auth.middleware.ts` | JWT verification |
| `frontend/src/App.tsx` | React routing configuration |
| `frontend/src/services/api.ts` | API client functions |
| `database_script.sql` | Database schema and seed data |
| `docker-compose.yml` | Container orchestration |

## Notes for AI Assistants

1. **Always check existing patterns** before implementing new features
2. **Use the 3-layer architecture** for backend changes (routes → services → data)
3. **Add tests** for new service functions
4. **Update interfaces** when changing data structures
5. **French language** is used in some comments and UI text
6. **The database uses snake_case** while TypeScript uses camelCase - transformations happen in the data layer
7. **PDF generation** happens on the backend (moved from frontend for bundle size optimization)
8. **Authentication** uses JWT stored in localStorage with HTTP-only cookie considerations
