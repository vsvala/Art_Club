# Konsulttitason Fullstack-projekti: React+Vite+TS / Node.js+Express

---

# SUOMI

## Projektin vaiheet oikeassa järjestyksessä

---

### VAIHE 0 — Päätä rakenne ennen kuin kirjoitat riviäkään koodia

**Monorepo (suositus konsulteille):**
```
my-project/
  ├── frontend/     ← Vite + React + TS
  ├── backend/      ← Node.js + Express + TS
  ├── shared/       ← Yhteiset TypeScript-tyypit
  ├── .github/      ← CI/CD workflows
  ├── .husky/       ← pre-commit hookit
  ├── package.json  ← root-tason skriptit
  └── README.md
```

**Miksi monorepo?** Konsulttiprojekteissa backend ja frontend elävät samassa repossa — tiimi näkee kokonaisuuden, CI/CD on yksinkertaisempaa, ja shared-tyypit estävät API-virheet.

---

### VAIHE 1 — Git-repositorio ja projektin perustus

```bash
# 1. Luo kansio ja initialisoi git
mkdir my-project && cd my-project
git init
echo "node_modules\ndist\n.env\n.env.local" > .gitignore

# 2. Root package.json (monorepo orchestrator)
npm init -y

# 3. Ensimmäinen commit heti
git add .
git commit -m "chore: initial project scaffold"
```

**Konsulttivinkki:** Git-historia on projektin päiväkirja. Ensimmäinen commit tehdään heti kun rakenne on paikallaan — ei vasta kun "jotain on valmista".

---

### VAIHE 2 — Backend: Node.js + Express + TypeScript

```bash
mkdir backend && cd backend
npm init -y

# Core deps
npm install express cors dotenv

# Dev deps
npm install -D typescript ts-node-dev @types/node @types/express @types/cors

# TypeScript konfig
npx tsc --init
```

**`backend/tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**Backend kansiorakenne:**
```
backend/src/
  ├── index.ts          ← Express-serverin käynnistys
  ├── app.ts            ← app-setup (erillään käynnistyksestä → testattavuus)
  ├── routes/           ← reittimäärittely
  ├── controllers/      ← pyyntöjen käsittely
  ├── middleware/       ← error handler, auth, logger
  ├── models/           ← tietokantamallit
  ├── services/         ← bisneslogiikka
  └── types/            ← backend-spesifit tyypit
```

**`backend/package.json` scripts:**
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

**Miksi `app.ts` erillään `index.ts`:stä?** Testit voivat importoida `app.ts` ilman että serveri käynnistyy — puhtaat yksikkötestit.

---

### VAIHE 3 — Frontend: React + Vite + TypeScript

```bash
cd ..
npm create vite@latest frontend -- --template react-ts
cd frontend && npm install
```

**Frontend kansiorakenne:**
```
frontend/src/
  ├── main.tsx
  ├── App.tsx
  ├── components/       ← uudelleenkäytettävät UI-komponentit
  ├── pages/            ← sivutason komponentit (reitit)
  ├── hooks/            ← custom hooks
  ├── services/         ← API-kutsut
  ├── types/            ← frontend-tyypit
  ├── utils/            ← apufunktiot
  └── assets/
```

**API-client setup (`frontend/src/services/api.ts`):**
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
});

export default api;
```

**Miksi axios-instanssi eikä suora fetch?** Yksi paikka muuttaa base URL, timeout ja auth-headerit. Konsulttiprojekteissa API:n osoite vaihtuu ympäristöittäin.

---

### VAIHE 4 — Yhteiset TypeScript-tyypit (shared/)

```bash
mkdir shared && cd shared
npm init -y && npx tsc --init
mkdir -p src/types
```

```
shared/src/types/
  ├── user.ts        ← User, CreateUserDto, UpdateUserDto
  ├── api.ts         ← ApiResponse<T>, PaginatedResponse<T>
  └── index.ts       ← re-export kaikki
```

**Esimerkki (`shared/src/types/api.ts`):**
```typescript
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
```

Backend ja frontend importoivat samasta paikasta — jos tyyppi muuttuu, TypeScript varoittaa molemmissa.

---

### VAIHE 5 — Koodilaatu: ESLint + Prettier

```bash
npm install -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier
```

**`.prettierrc`:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

**Konsulttivinkki:** Prettier poistaa koodaustyyliriidan tiimistä kokonaan. Kukaan ei enää kommentoi PR:ssä "käytä lainausmerkkejä" — se on automaattista.

---

### VAIHE 6 — Git-hookit: Husky + lint-staged

```bash
npm install -D husky lint-staged
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

**`package.json` lint-staged config:**
```json
{
  "lint-staged": {
    "**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "**/*.{json,md}": ["prettier --write"]
  }
}
```

**Miksi?** Husky estää "rikkinäisen koodin" committoinnin. CI ei yllätä myöhemmin — virheen huomaat heti omalla koneella.

---

### VAIHE 7 — Ympäristömuuttujat

```bash
touch backend/.env backend/.env.example
touch frontend/.env frontend/.env.example
```

**`backend/.env.example`:**
```
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
JWT_SECRET=change-me
```

**`frontend/.env.example`:**
```
VITE_API_URL=http://localhost:3001
```

**TÄRKEÄÄ:** `.env` aina `.gitignore`:ssa. `.env.example` commitoidaan — näin uusi tiimin jäsen tietää mitä tarvitaan.

---

### VAIHE 8 — Root-tason kehitysskriptit

**`package.json` (root):**
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\"",
    "build": "npm run build --prefix backend && npm run build --prefix frontend",
    "lint": "npm run lint --prefix backend && npm run lint --prefix frontend"
  }
}
```

```bash
npm install -D concurrently
```

`npm run dev` rootista käynnistää sekä backendin että frontendin yhdellä komennolla.

---

### VAIHE 9 — Tietokanta: Prisma (PostgreSQL)

```bash
cd backend
npm install @prisma/client
npm install -D prisma
npx prisma init
```

**`backend/prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
}
```

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### VAIHE 10 — Error handling -middleware

```typescript
// backend/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = err.statusCode ?? 500;
  res.status(status).json({ success: false, message: err.message });
}
```

Yksi paikka käsittelee kaikki virheet — ei error-logiikkaa yksittäisiin reitteihin.

---

### VAIHE 11 — Testaus

```bash
# Backend
cd backend && npm install -D vitest supertest @types/supertest

# Frontend — Vitest tulee Viten mukana
cd frontend && npm install -D @testing-library/react @testing-library/jest-dom
```

**Testijärjestys konsulttiprojekteissa:**
1. **Yksikkötestit** — `services/` ja `utils/` (nopeat, ei ulkoisia riippuvuuksia)
2. **Integraatiotestit** — API-endpointit `supertest`:illä
3. **E2E** — Playwright kriittisille käyttäjäpolkuille

---

### VAIHE 12 — CI/CD: GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci --prefix backend
      - run: npm run lint --prefix backend
      - run: npm test --prefix backend
      - run: npm ci --prefix frontend
      - run: npm run lint --prefix frontend
      - run: npm run build --prefix frontend
```

**Konsulttivinkki:** CI on automaattinen laadunvartija. Jokainen push ajaa testit ja linttauksen automaattisesti.

---

### VAIHE 13 — Git-branching strategy

```
main          ← tuotanto, suojeltu branch
  └── develop ← kehitysintegraatio
        └── feature/user-auth
        └── fix/login-redirect
        └── chore/update-deps
```

**Conventional Commits -formaatti:**
```
feat(auth): add JWT login endpoint
fix(ui): correct mobile padding on forms
chore(deps): upgrade express to 5.x
docs(api): document /users endpoint
test(auth): add login controller unit tests
```

---

### Yhteenveto: oikea järjestys

| # | Vaihe | Miksi ensin |
|---|-------|-------------|
| 0 | Rakennepäätös | Rakenteen perustaa on vaikea muuttaa myöhemmin |
| 1 | Git + .gitignore | Historia alkaa heti, .env ei päädy repoon |
| 2 | Backend TS setup | Tyyppiturvallisuus alusta alkaen |
| 3 | Frontend Vite + React + TS | Riippuu backendistä vain API-urlin kautta |
| 4 | Shared types | Estää tyyppien duplikoinnin |
| 5 | ESLint + Prettier | Ennen kuin koodia on paljon |
| 6 | Husky + lint-staged | Ennen tiimityötä |
| 7 | Ympäristömuuttujat | Ennen ensimmäistä API-kutsua |
| 8 | Dev-skriptit | Mukavuus alusta alkaen |
| 9 | Tietokanta + Prisma | Kun datamallit ovat selvät |
| 10 | Error handling | Ennen API-endpointtien rakentamista |
| 11 | Testit | Samanaikaisesti koodin kirjoittamisen kanssa |
| 12 | CI/CD | Ensin toimii lokaaleissa, sitten pilveen |
| 13 | Branching-strategia | Koko projektin ajan |

---

---

# ENGLISH

## Project Phases in the Right Order

---

### PHASE 0 — Decide the structure before writing a single line of code

**Monorepo (recommended for consultants):**
```
my-project/
  ├── frontend/     ← Vite + React + TS
  ├── backend/      ← Node.js + Express + TS
  ├── shared/       ← Shared TypeScript types
  ├── .github/      ← CI/CD workflows
  ├── .husky/       ← pre-commit hooks
  ├── package.json  ← root-level scripts
  └── README.md
```

**Why monorepo?** In consultant projects, backend and frontend live in the same repo — the team sees the whole picture, CI/CD is simpler, and shared types prevent API mismatches.

---

### PHASE 1 — Git repository and project foundation

```bash
# 1. Create folder and initialize git
mkdir my-project && cd my-project
git init
echo "node_modules\ndist\n.env\n.env.local" > .gitignore

# 2. Root package.json (monorepo orchestrator)
npm init -y

# 3. First commit immediately
git add .
git commit -m "chore: initial project scaffold"
```

**Consultant tip:** Git history is the project's diary. Make the first commit as soon as the structure is in place — not when "something is finished".

---

### PHASE 2 — Backend: Node.js + Express + TypeScript

```bash
mkdir backend && cd backend
npm init -y

# Core deps
npm install express cors dotenv

# Dev deps
npm install -D typescript ts-node-dev @types/node @types/express @types/cors

# TypeScript config
npx tsc --init
```

**`backend/tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**Backend folder structure:**
```
backend/src/
  ├── index.ts          ← Express server entry point
  ├── app.ts            ← app setup (separate from startup → testability)
  ├── routes/           ← route definitions
  ├── controllers/      ← request handling logic
  ├── middleware/       ← error handler, auth, logger
  ├── models/           ← database models
  ├── services/         ← business logic
  └── types/            ← backend-specific types
```

**`backend/package.json` scripts:**
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

**Why `app.ts` separate from `index.ts`?** Tests can import `app.ts` without starting the server — clean unit tests.

---

### PHASE 3 — Frontend: React + Vite + TypeScript

```bash
cd ..
npm create vite@latest frontend -- --template react-ts
cd frontend && npm install
```

**Frontend folder structure:**
```
frontend/src/
  ├── main.tsx
  ├── App.tsx
  ├── components/       ← reusable UI components
  ├── pages/            ← page-level components (routes)
  ├── hooks/            ← custom hooks
  ├── services/         ← API calls
  ├── types/            ← frontend types
  ├── utils/            ← helper functions
  └── assets/
```

**API client setup (`frontend/src/services/api.ts`):**
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
});

export default api;
```

**Why an axios instance instead of raw fetch?** One place to change base URL, timeout, and auth headers. In consultant projects, the API address changes per environment.

---

### PHASE 4 — Shared TypeScript types (shared/)

```bash
mkdir shared && cd shared
npm init -y && npx tsc --init
mkdir -p src/types
```

```
shared/src/types/
  ├── user.ts        ← User, CreateUserDto, UpdateUserDto
  ├── api.ts         ← ApiResponse<T>, PaginatedResponse<T>
  └── index.ts       ← re-export everything
```

**Example (`shared/src/types/api.ts`):**
```typescript
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
```

Backend and frontend import from the same place — if a type changes, TypeScript warns in both places.

---

### PHASE 5 — Code quality: ESLint + Prettier

```bash
npm install -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier
```

**`.prettierrc`:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

**Consultant tip:** Prettier eliminates code-style debates entirely. No one comments in a PR "use quotes" — it's automatic.

---

### PHASE 6 — Git hooks: Husky + lint-staged

```bash
npm install -D husky lint-staged
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

**`package.json` lint-staged config:**
```json
{
  "lint-staged": {
    "**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "**/*.{json,md}": ["prettier --write"]
  }
}
```

**Why?** Husky prevents committing broken code. CI won't surprise you later — you catch errors immediately on your own machine.

---

### PHASE 7 — Environment variables

```bash
touch backend/.env backend/.env.example
touch frontend/.env frontend/.env.example
```

**`backend/.env.example`:**
```
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
JWT_SECRET=change-me
```

**`frontend/.env.example`:**
```
VITE_API_URL=http://localhost:3001
```

**IMPORTANT:** `.env` always in `.gitignore`. `.env.example` is committed — this way a new team member knows what's needed.

---

### PHASE 8 — Root-level dev scripts

**`package.json` (root):**
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\"",
    "build": "npm run build --prefix backend && npm run build --prefix frontend",
    "lint": "npm run lint --prefix backend && npm run lint --prefix frontend"
  }
}
```

```bash
npm install -D concurrently
```

`npm run dev` from the root starts both backend and frontend with a single command.

---

### PHASE 9 — Database: Prisma (PostgreSQL)

```bash
cd backend
npm install @prisma/client
npm install -D prisma
npx prisma init
```

**`backend/prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
}
```

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### PHASE 10 — Error handling middleware

```typescript
// backend/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = err.statusCode ?? 500;
  res.status(status).json({ success: false, message: err.message });
}
```

One place handles all errors — no error logic scattered across individual routes.

---

### PHASE 11 — Testing

```bash
# Backend
cd backend && npm install -D vitest supertest @types/supertest

# Frontend — Vitest comes with Vite
cd frontend && npm install -D @testing-library/react @testing-library/jest-dom
```

**Testing order in consultant projects:**
1. **Unit tests** — `services/` and `utils/` (fast, no external dependencies)
2. **Integration tests** — API endpoints with `supertest`
3. **E2E** — Playwright for critical user flows

---

### PHASE 12 — CI/CD: GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci --prefix backend
      - run: npm run lint --prefix backend
      - run: npm test --prefix backend
      - run: npm ci --prefix frontend
      - run: npm run lint --prefix frontend
      - run: npm run build --prefix frontend
```

**Consultant tip:** CI is your automatic quality gatekeeper. Every push runs tests and linting automatically. No one can merge broken code.

---

### PHASE 13 — Git branching strategy

```
main          ← production, protected branch
  └── develop ← integration branch
        └── feature/user-auth
        └── fix/login-redirect
        └── chore/update-deps
```

**Conventional Commits format:**
```
feat(auth): add JWT login endpoint
fix(ui): correct mobile padding on forms
chore(deps): upgrade express to 5.x
docs(api): document /users endpoint
test(auth): add login controller unit tests
```

---

### Summary: the right order

| # | Phase | Why first |
|---|-------|-----------|
| 0 | Structure decision | Hard to refactor the foundation later |
| 1 | Git + .gitignore | History starts immediately, no .env in repo |
| 2 | Backend TS setup | Type safety from day one |
| 3 | Frontend Vite + React + TS | Only depends on backend via API URL |
| 4 | Shared types | Prevents type duplication |
| 5 | ESLint + Prettier | Before there's a lot of code |
| 6 | Husky + lint-staged | Before team collaboration |
| 7 | Environment variables | Before writing the first API call |
| 8 | Dev scripts | Convenience from the start |
| 9 | Database + Prisma | Once data models are clear |
| 10 | Error handling | Before building API endpoints |
| 11 | Tests | Written alongside the code |
| 12 | CI/CD | Works locally first, then to the cloud |
| 13 | Branching strategy | Throughout the entire project |

---

### Key files to know

| File | Purpose |
|------|---------|
| `backend/src/app.ts` | Express app (separate from server startup) |
| `backend/src/middleware/errorHandler.ts` | Global error handling |
| `shared/src/types/index.ts` | Shared API types |
| `frontend/src/services/api.ts` | Axios instance |
| `.github/workflows/ci.yml` | Automated CI |
| `.husky/pre-commit` | Lint before every commit |

---

### Verification checklist

1. `npm run dev` from root → both services start
2. `curl http://localhost:3001/health` → `{ success: true }`
3. Frontend renders data from backend
4. `git commit` runs ESLint automatically
5. GitHub Actions goes green on push
