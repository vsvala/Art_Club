# Render.com — Deployment Instructions

## 1. Overview

ArtClub uses a **single** Render.com Web Service: the backend (Node.js/Express) serves the React production build as static files. No separate Static Site service is needed. The database is MongoDB Atlas and images are stored in Cloudinary.

```
Browser
  │
  ▼
Render Web Service (Art_Club_back)
  ├── GET /api/*   → Express REST API
  └── GET /*       → React build (index.html)
```

---

## 2. Prerequisites

Before deploying to Render, make sure you have:

- [ ] GitHub account and repositories:
  - Frontend: `https://github.com/vsvala/Art_Club`
  - Backend: `https://github.com/vsvala/Art_Club_back`
- [ ] [Render.com](https://render.com) account
- [ ] [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account with a cluster set up
- [ ] [Cloudinary](https://cloudinary.com) account set up

---

## 3. MongoDB Atlas — Database Setup

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com).
2. Create a new **cluster** (Free tier is sufficient).
3. Create a database user: **Database Access** → Add New Database User.
4. Allow connections from all IP addresses: **Network Access** → Add IP Address → `0.0.0.0/0`.
5. Copy the connection string: **Connect** → Drivers → copy the `mongodb+srv://...` string.

---

## 4. Building the Frontend and Copying to Backend

The frontend is built locally and copied into the backend repository, from which Render deploys it.

### 4.1 Create the production build

```bash
cd Art_Club
npm run build
```

This creates the `build/` folder with the optimized production application.

### 4.2 Copy the build to the backend

```bash
cp -r build ../Art_Club_back/
```

### 4.3 Push the backend (with build included)

```bash
cd ../Art_Club_back
git add build
git commit -m "update frontend build"
git push origin master
```

> Render automatically triggers a new deploy after each push.

### 4.4 Shortcut: deploy script

`package.json` includes a `deploy` script that runs all the steps above in one command:

```bash
cd Art_Club
npm run deploy
```

This builds the frontend, copies the build to the backend, and pushes it to GitHub in one go.

---

## 5. Deploying the Backend to Render

This is done **once** — Render then watches the repository automatically.

1. Log in to [Render.com](https://render.com).
2. Click **New** → **Web Service**.
3. Connect your GitHub account and select the backend repository (`Art_Club_back`).
4. Fill in the settings:

| Field | Value |
|---|---|
| Name | `artclub` (or your preferred name) |
| Region | Frankfurt EU (or nearest) |
| Branch | `master` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

5. Add environment variables under **Environment**:

| Variable | Value |
|---|---|
| `PORT` | `10000` (Render sets this automatically — not required) |
| `MONGODB_URI` | `mongodb+srv://user:password@cluster.mongodb.net/artclub` |
| `TEST_MONGODB_URI` | `mongodb+srv://user:password@cluster.mongodb.net/artclub_test` |
| `SECRET` | Long random string (JWT signing key) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

6. Click **Create Web Service**.
7. Wait for the build to finish. Render will show the service URL as `https://artclub-xxxx.onrender.com`.

---

## 6. Backend Requirements for Serving Static Files

The backend (`Art_Club_back`) `app.js` or `index.js` must include these lines for the React build to work correctly:

```js
const path = require('path')

// Serve the React build files
app.use(express.static(path.join(__dirname, 'build')))

// ... all /api/* routes go here ...

// Catch-all: let React Router handle browser-side routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
```

> API routes (`/api/...`) must be defined **before** the catch-all route.

---

## 7. Deploying Updates

When you change the frontend or backend:

```bash
# Option 1: use the deploy script (recommended)
cd Art_Club
npm run deploy

# Option 2: manual steps
cd Art_Club
npm run build
cp -r build ../Art_Club_back/
cd ../Art_Club_back
git add build
git commit -m "update frontend build"
git push origin master
```

Render builds and deploys the new version automatically in about 2–5 minutes.

If you only change the backend (no frontend changes):

```bash
cd Art_Club_back
git add .
git commit -m "backend change"
git push origin master
```

---

## 8. Pre-deployment Checklist

- [ ] Backend environment variables set in Render
- [ ] `MONGODB_URI` points to the correct Atlas cluster
- [ ] MongoDB Atlas allows connections from all IP addresses (`0.0.0.0/0`)
- [ ] Cloudinary keys set in the backend
- [ ] Backend serves static files (`express.static('build')`) and includes the catch-all route
- [ ] Frontend build copied to backend and pushed to GitHub
- [ ] Application works at the Render URL in the browser

---

## 9. Common Issues

| Problem | Solution |
|---|---|
| Page doesn't load on direct URL | Check that the backend has the catch-all route `app.get('*', ...)` |
| API calls return index.html | Catch-all is defined before API routes — move it to the end |
| Backend can't connect to database | Check `MONGODB_URI` and MongoDB Atlas network settings |
| Image upload fails | Check Cloudinary keys in the backend |
| CORS error in browser | Frontend and backend are on the same service — CORS shouldn't be an issue. If it is, check API route CORS settings |
| Free tier sleeping | Render Free tier sleeps after 15 min of inactivity — first request may take 30–60 s |
| Old build showing | Remember to copy the new build to the backend and push it |
