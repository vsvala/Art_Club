# CI/CD Pipeline

## Overview

The project uses two separate GitHub repositories:

| Repo | Role |
|---|---|
| `Art_Club` (frontend) | React SPA — tests, builds, pushes the build to the backend repo |
| `Art_Club_back` (backend) | Node.js/Express — tests, deploys to Render, creates version tags |

In production, the frontend is served as a static build from the backend. The CI/CD pipeline automates building the frontend and deploying the combined app to Render.com.

---

## Pipeline Flow

```
Push to Art_Club master
        │
        ▼
[Art_Club CI]
  1. Install dependencies
  2. Lint (ESLint)
  3. Run tests (Jest)
  4. Build (react-scripts build)
  5. Security audit
  6. Push build/ → Art_Club_back master
        │
        ▼
[Art_Club_back CI]  (triggered by the build commit)
  1. Install dependencies
  2. Lint
  3. Run tests
  4. Security audit
  5. Trigger Render deploy (HTTP POST to deploy hook)
  6. Create version tag (patch bump)
```

---

## Frontend CI (`Art_Club`)

File: `.github/workflows/ci.yml`

**Triggers:** push or pull request to `master`

### Jobs

#### `ci-build-and-test`
Runs on every push and pull request.

| Step | Command |
|---|---|
| Install | `npm ci` |
| Lint | `npm run lint` |
| Test | `npm test` |
| Build | `npm run build` |
| Security audit | `npm audit --audit-level=high` |
| Upload artifact | saves `build/` for the deploy job |

#### `deploy-to-backend`
Runs only on push to `master` (not on pull requests). Skipped if commit message contains `#skip`.

1. Downloads the `build/` artifact from the previous job
2. Clones `Art_Club_back` using `BACKEND_REPO_TOKEN`
3. Copies `build/` into the backend repo
4. Commits and pushes — this triggers `Art_Club_back` CI

---

## Backend CI (`Art_Club_back`)

File: `.github/workflows/ci.yml` (in the `Art_Club_back` repo)

**Triggers:** push or pull request to `master` — including the automated build commit from the frontend CI.

### Jobs

#### `ci-build-and-test`

Spins up a real MongoDB instance as a service container so integration tests hit an actual database (no mocks).

**Services:**
| Service | Image | Port |
|---|---|---|
| MongoDB | `mongo:6` | `27017` |

**Environment variables:**
| Variable | Value |
|---|---|
| `TEST_MONGODB_URI` | `mongodb://localhost:27017/art_club_test` |
| `SECRET` | `secrets.SECRET` (JWT signing secret) |

| Step | Command |
|---|---|
| Install | `npm ci` |
| Lint | `npm run lint` |
| Test | `npm test -- --forceExit` |
| Security audit | `npm audit --audit-level=high` |

`--forceExit` ensures Jest exits after tests complete even if the MongoDB connection is still open.

#### `deploy`
Runs only on push to `master`. Skipped if commit message contains `#skip`.

Sends an HTTP POST to the Render deploy hook URL, which triggers a new production build on Render.com.

#### `tag_release`
Runs after `deploy` succeeds. Automatically bumps the patch version and pushes a git tag (e.g. `v1.0.4 → v1.0.5`) using [anothrNick/github-tag-action](https://github.com/anothrNick/github-tag-action).

---

## Required Secrets

### `Art_Club` repo (frontend)

| Secret | Description | Where to get it |
|---|---|---|
| `BACKEND_REPO_TOKEN` | GitHub Personal Access Token with `repo` scope for `Art_Club_back` | GitHub → Settings → Developer settings → Personal access tokens → Generate new token (classic), select `repo` scope |

### `Art_Club_back` repo (backend)

| Secret | Description | Where to get it |
|---|---|---|
| `RENDER_DEPLOY_HOOK_URL` | Render deploy hook URL | Render dashboard → Your service → Settings → Deploy Hook |
| `SECRET` | JWT signing secret used in tests | Any strong random string — same value as in your production environment |

---

## Skipping a Deploy

Add `#skip` anywhere in the commit message to run CI tests without triggering a deploy or version tag:

```bash
git commit -m "update readme #skip"
```

---

## Adding Secrets to GitHub

1. Go to the repo on GitHub
2. Settings → Secrets and variables → Actions
3. Click **New repository secret**
4. Enter the name and value, click **Add secret**
