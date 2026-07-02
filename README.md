# ArtClub — Full Stack Web Application

[![CI/CD Pipeline](https://github.com/vsvala/Art_Club/actions/workflows/ci.yml/badge.svg)](https://github.com/vsvala/Art_Club/actions/workflows/ci.yml)

A full stack web application for an art club, where users can browse artists and artworks, apply for membership, and manage their own profile and gallery. Originally built as an independent 10 ECTS project for the University of Helsinki's Full Stack Open program, this application has since been revived, updated, and continued as an ongoing personal hobby project.

## What This Project Demonstrates

- End-to-end feature delivery across frontend, backend integration, and production deployment
- Role-based access control (visitor/member/admin) with protected routing and JWT session flow
- Production-oriented workflow with CI/CD, Docker image publishing, and automated deployment pipeline
- Practical API integrations (Cloudinary image storage and Open-Meteo weather data)

> **[Live demo →](https://artclub-q41z.onrender.com/)**

### Demo access

Demo credentials are available on request for recruiters and reviewers. Please contact me by email for access details.

**Backend repository:** [Art_Club_back](https://github.com/vsvala/Art_Club_back)

---

## Features

**For visitors**

- Browse artists and their artwork galleries
- Search and filter artworks
- View links to exhibitions and current painting weather for any city
- Apply for club membership

**For members**

- Create and update a personal profile page with a short introduction
- Upload up to 10 images to a personal gallery
- View all member artwork in the main gallery
- Like artworks and see the 10 most liked paintings
- View club events

**For admins**

- List registered users and approve memberships
- Create and manage club events

---

## Tech Stack

| Layer         | Technologies                                      |
| ------------- | ------------------------------------------------- |
| Frontend      | React 18, Redux, React Router v6, React Bootstrap |
| Backend       | Node.js, Express, REST API                        |
| Database      | MongoDB, MongoDB Atlas                            |
| Image storage | Cloudinary                                        |
| Auth          | JWT (JSON Web Tokens), bcrypt                     |
| Testing       | Jest, React Testing Library, Playwright           |
| Weather API   | Open-Meteo (no API key required)                  |

---

## Screenshots

![Gallery](src/images/gallery.png)

![Sign In](src/images/sign_in.png)

![Admin View](src/images/admin_login.png)

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- A running instance of the [backend](https://github.com/vsvala/Art_Club_back)
- MongoDB Atlas connection string
- Cloudinary account for image uploads

### Installation

```bash
git clone https://github.com/vsvala/Art_Club.git
cd Art_Club
npm install
```

Create a `.env` file in the project root:

```
REACT_APP_BACKEND_URL=http://localhost:3001
```

### Running locally

```bash
# Start the development server
npm start
```

Opens at [http://localhost:3000](http://localhost:3000). The frontend proxies API requests to `http://localhost:3001` by default.

---

## Available Scripts

```bash
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
npm run test-coverage  # Run tests with coverage report
npm run lint        # Check code style with ESLint
```

Current automated test scope in this repository focuses on unit and integration tests. E2E tests are tracked as a planned follow-up.

---

## Architecture

### Application structure

```
Browser (React SPA)
       │
       │  HTTP / REST
       ▼
Express REST API (Node.js)
       │
       ├── MongoDB Atlas  (user & artwork data)
       └── Cloudinary     (image storage)
```

The frontend is a single-page application that communicates with the backend exclusively via a REST API. Images are uploaded directly to Cloudinary; only the image URLs are stored in MongoDB.

### Authentication & authorization

1. User submits credentials → backend validates and returns a **JWT token**
2. Token is stored in the browser's `localStorage`
3. On every page load the token is re-validated against the backend (`/api/tokenCheck`) to confirm it is still valid
4. The token payload carries the user's **role** (`member` / `admin`), which controls access to protected routes on both frontend and backend
5. Protected frontend routes use a `PrivateRoute` component that redirects unauthenticated or unauthorized users

**User roles**

| Role    | Access                                                 |
| ------- | ------------------------------------------------------ |
| Visitor | Public pages, membership application                   |
| Member  | Own profile & gallery, events, artwork likes           |
| Admin   | All member data, membership approval, event management |

---

## Project Structure

This is a **frontend-only repository**. The backend lives in [Art_Club_back](https://github.com/vsvala/Art_Club_back).

```
src/
├── components/
│   ├── artwork/    # Artwork list, single view, add/delete forms
│   ├── artist/     # Artist list and profile views
│   ├── user/       # Member profile, update and password forms
│   ├── event/      # Event list and creation form
│   ├── login/      # Login and registration forms
│   └── common/     # Shared UI: notifications, GDPR, PrivateRoute, DeleteButton
├── reducers/
│   ├── store.js              # Redux store with combined reducers
│   ├── artworkReducer.js     # Artwork state
│   ├── userReducer.js        # User/member state
│   ├── eventReducer.js       # Event state
│   ├── loginReducer.js       # Logged-in user session
│   ├── notificationReducer.js
│   ├── filterReducer.js      # Artwork search/filter
│   ├── singleArtworkReducer.js
│   └── actionCreators/       # Thunk action creators per domain
├── services/                 # Axios modules for each backend resource
│   ├── artworks.js
│   ├── users.js
│   ├── events.js
│   ├── login.js
│   ├── tokenCheck.js         # JWT re-validation on page load
│   └── config.js             # Base URL and auth header setup
├── utils/
│   ├── validations.js        # Form input validation rules
│   └── weatherUtils.js       # Open-Meteo API helpers
├── test/                     # Jest + React Testing Library tests
├── images/                   # Static image assets
├── App.js                    # Root component and route definitions
└── index.js                  # React entry point
```

---

## Weather Data

The Links page shows current weather for any city using the [Open-Meteo](https://open-meteo.com/) API — no API key required.

Weather is fetched in two steps directly from the frontend:

1. **Geocoding** — city name → coordinates and country  
   `https://geocoding-api.open-meteo.com/v1/search?name=Helsinki&count=1`

2. **Forecast** — coordinates → current temperature  
   `https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.94&current=temperature_2m`

The page loads with Helsinki as the default city. The user can search for any city by name.

---

## Libraries & Dependencies

A full list of used libraries with descriptions and links: [documentation/libraries.md](documentation/libraries.md)

---

## Documentation

- [Manual](documentation/manual.md)
- [Software Requirements Specification](documentation/software_requirements_specification.md)
- [Design Architecture](documentation/design_architecture.md)
- [Testing](documentation/tests.md)
- [Render.com Deployment](documentation/render_deployment.md)
- [Security & Maintenance](documentation/security_maintenance.md)
- [Security Policy](.github/SECURITY.md)
- [CI/CD Pipeline](documentation/ci_cd.md)

---

## Roadmap

- [ ] Expand frontend test coverage for critical user flows
- [x] CI/CD pipeline with github actions
- [x] Real-time weather data from Open-Meteo API to Links page
- [ ] Add curated links for artists (exhibitions, galleries) to Links page
- [ ] Add Playwright E2E smoke tests (public routes and authentication flow)

---

## License

[MIT](https://github.com/vsvala/Art_Club/blob/master/documentation/MIT_license.md)
