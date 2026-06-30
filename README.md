# ArtClub — Full Stack Web Application

A full stack web application for an art club, where users can browse artists and artworks, apply for membership, and manage their own profile and gallery. Originally built as an independent 10 ECTS project for the University of Helsinki's Full Stack Open program, this application has since been revived, updated, and continued as an ongoing personal hobby project.

**Live demo:** [artclub-q41z.onrender.com](https://artclub-q41z.onrender.com/)

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

| Layer | Technologies |
|---|---|
| Frontend | React 18, Redux, React Router v6, React Bootstrap |
| Backend | Node.js, Express, REST API |
| Database | MongoDB, MongoDB Atlas |
| Image storage | Cloudinary |
| Auth | JWT (JSON Web Tokens), bcrypt |
| Testing | Jest, React Testing Library, Playwright |
| Weather API | Open-Meteo (no API key required) |

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

| Role | Access |
|---|---|
| Visitor | Public pages, membership application |
| Member | Own profile & gallery, events, artwork likes |
| Admin | All member data, membership approval, event management |

---

## Project Structure

```
src/
├── components/
│   ├── artwork/    # Artwork list, single view, add/delete forms
│   ├── artist/     # Artist list and profile views
│   ├── user/       # Member profile, update forms, MyPage
│   ├── event/      # Event list and creation form
│   └── common/     # Shared components (notifications, GDPR, routing)
├── reducers/       # Redux state management
├── services/       # Axios API service modules
└── utils/          # Validation helpers
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
- [CI/CD Pipeline](documentation/ci_cd.md)

---

## Roadmap
- [ ] Update and do more test fo front
- [x] CI/CD pipeline with github actions
- [ ] Real-time weather data from Open-Meteo API to Links page
- [ ] More curated links for artists (exhibitions, galleries) to Lin nks page

---

## License

[MIT](https://github.com/vsvala/Art_Club/blob/master/documentation/MIT_license.md)
