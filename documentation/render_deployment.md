# Render.com — Tuotantoon laitto ohjeet

## 1. Yleiskatsaus

ArtClub käyttää Render.com-palvelua sekä frontendin (React SPA) että backendin (Node.js/Express) isännöintiin. Tietokanta on MongoDB Atlas ja kuvat tallennetaan Cloudinaryyn.

---

## 2. Esivalmistelut

Ennen Renderiin vientiä varmista, että sinulla on:

- [ ] GitHub-tili ja repositoriot:
  - Frontend: `https://github.com/vsvala/Art_Club`
  - Backend: `https://github.com/vsvala/Art_Club_back`
- [ ] [Render.com](https://render.com)-tili
- [ ] [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) -tili ja cluster pystyssä
- [ ] [Cloudinary](https://cloudinary.com)-tili pystyssä

---

## 3. MongoDB Atlas — tietokannan valmistelu

1. Kirjaudu [MongoDB Atlas](https://cloud.mongodb.com) -palveluun.
2. Luo uusi **cluster** (Free tier riittää).
3. Luo tietokantakäyttäjä: **Database Access** → Add New Database User.
4. Salli yhteydet kaikista IP-osoitteista: **Network Access** → Add IP Address → `0.0.0.0/0`.
5. Kopioi yhteysmerkkijono: **Connect** → Drivers → kopioi `mongodb+srv://...`-merkkijono.

---

## 4. Backendin vienti Renderiin

1. Kirjaudu [Render.com](https://render.com)-palveluun.
2. Klikkaa **New** → **Web Service**.
3. Yhdistä GitHub-tili ja valitse backend-repositorio (`Art_Club_back`).
4. Täytä asetukset:

| Kenttä | Arvo |
|---|---|
| Name | `artclub-backend` (tai haluamasi nimi) |
| Region | Frankfurt EU (tai lähin) |
| Branch | `master` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

5. Lisää ympäristömuuttujat kohdassa **Environment**:

| Muuttuja | Arvo |
|---|---|
| `PORT` | `3001` |
| `MONGODB_URI` | `mongodb+srv://käyttäjä:salasana@cluster.mongodb.net/artclub` |
| `TEST_MONGODB_URI` | `mongodb+srv://käyttäjä:salasana@cluster.mongodb.net/artclub_test` |
| `SECRET` | Pitkä satunnainen merkkijono (JWT-salausavain) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

6. Klikkaa **Create Web Service**.
7. Odota, että build valmistuu. Render näyttää backendin URL:n muodossa `https://artclub-backend.onrender.com`.

---

## 5. Frontendin vienti Renderiin

### 5.1 Tuotantobuild paikallisesti

```bash
cd Art_Club
npm run build
```

Tämä luo `build/`-kansion, joka sisältää optimoidun tuotantosovelluksen.

### 5.2 Render Static Site

1. Klikkaa **New** → **Static Site**.
2. Yhdistä GitHub-tili ja valitse frontend-repositorio (`Art_Club`).
3. Täytä asetukset:

| Kenttä | Arvo |
|---|---|
| Name | `artclub-frontend` (tai haluamasi nimi) |
| Branch | `master` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `build` |

4. Lisää ympäristömuuttujat kohdassa **Environment**:

| Muuttuja | Arvo |
|---|---|
| `REACT_APP_BACKEND_URL` | `https://artclub-backend.onrender.com` (backendin URL Renderistä) |

5. Klikkaa **Create Static Site**.

### 5.3 SPA-reitityksen korjaus (tärkeä!)

React Router vaatii, että kaikki reitit ohjataan `index.html`-tiedostoon. Luo projektin juureen tiedosto `public/_redirects`:

```
/*    /index.html   200
```

Tämä varmistaa, että esim. `/artworks` tai `/login` toimii myös suoralla URL-osoitteella.

---

## 6. Ympäristömuuttujat (.env tiedosto paikalliseen kehitykseen)

Luo projektin juureen `.env`-tiedosto (älä commitoi tätä GitHubiin):

```
REACT_APP_BACKEND_URL=http://localhost:3001
```

`.env`-tiedosto on jo `.gitignore`-listalla `create-react-app`-projekteissa.

---

## 7. Päivitykset tuotantoon

Render seuraa automaattisesti valittua GitHub-haaraa. Jokainen `git push master` käynnistää automaattisen uudelleenbuildin ja deployauksen.

```bash
git add .
git commit -m "Muutos"
git push origin master
```

Render rakentaa uuden version ja ottaa sen käyttöön automaattisesti noin 2–5 minuutissa.

---

## 8. Tarkistuslista ennen julkaisua

- [ ] Backend-ympäristömuuttujat asetettu Renderiin
- [ ] `MONGODB_URI` osoittaa oikeaan Atlas-clusteriin
- [ ] MongoDB Atlas sallii yhteydet kaikista IP-osoitteista (`0.0.0.0/0`)
- [ ] Cloudinary-avaimet asetettu backendiin
- [ ] `REACT_APP_BACKEND_URL` osoittaa Renderin backend-URL:iin
- [ ] `public/_redirects`-tiedosto on olemassa SPA-reititystä varten
- [ ] Tuotantobuild toimii paikallisesti (`npm run build`)
- [ ] Sovellus toimii Renderin osoitteessa selaimessa

---

## 9. Yleisiä ongelmia

| Ongelma | Ratkaisu |
|---|---|
| Sivu ei lataudu suoralla URL:lla | Lisää `public/_redirects`-tiedosto |
| Backend ei yhdistä tietokantaan | Tarkista `MONGODB_URI` ja MongoDB Atlas -verkkoasetukset |
| Kuvien lataus epäonnistuu | Tarkista Cloudinary-avaimet backendissä |
| CORS-virhe selaimessa | Varmista, että backendissä on CORS-asetukset frontendin URL:lle |
| Free tier nukkuu | Render Free -taso nukahtaa 15 min inaktiivisuuden jälkeen — ensimmäinen pyyntö voi kestää 30–60 s |
