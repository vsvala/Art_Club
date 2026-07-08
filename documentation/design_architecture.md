# Design Architecture — ArtClub

## 1. Yleiskuva

ArtClub on täyden pinon web-sovellus, joka koostuu erillisestä frontend- ja backend-palvelusta. Frontend on React-pohjainen SPA, joka kommunikoi backendin kanssa REST API -rajapinnan kautta.

```
Selain (React SPA)
        │
        │  HTTP / REST (JSON)
        ▼
Express REST API (Node.js)
        │
        ├── MongoDB Atlas  (käyttäjä- ja teosdata)
        └── Cloudinary     (kuvat)
```

---

## 2. Frontend-arkkitehtuuri

### 2.1 Teknologiapino

| Teknologia | Versio | Käyttötarkoitus |
|---|---|---|
| React | 18.x | UI-komponentit |
| Redux | 5.x | UI- ja sessiotilan hallinta |
| Redux Thunk | 3.x | Asynkroniset Redux-toiminnot |
| TanStack React Query | 5.x | Palvelintilan haku, välimuisti ja taustasynkronointi |
| React Router v6 | 6.x | Reititys |
| Axios | 1.x | HTTP-kutsut backendiin |
| React Bootstrap | 2.x | UI-komponenttikirjasto |
| React Datepicker | 7.x | Päivämäärän valitsin |

### 2.2 Hakemistorakenne

```
src/
├── App.js                  # Juurikomponentti: Navbar, reititys, suojatut reitit
├── index.js                # React-juuri, Redux Provider
├── index.css               # Globaalit tyylit
├── components/
│   ├── artwork/            # Taideteoskomponentit
│   │   ├── ArtworkList.js      # Gallerianäkymä
│   │   ├── SingleArtwork.js    # Yksittäinen teos
│   │   ├── AddArtworkForm.js   # Teoksen lisäys
│   │   ├── Artwork.js          # Yksittäinen kortti
│   │   └── ArtworkDelete.js    # Poistopainike
│   ├── artist/             # Taiteilijakomponentit
│   │   ├── ArtistList.js       # Taiteilijalista
│   │   ├── SingleArtist.js     # Taiteilijan profiili
│   │   └── Artist.js           # Yksittäinen kortti
│   ├── user/               # Käyttäjäkomponentit
│   │   ├── SingleUser.js       # MyPage / admin-käyttäjänäkymä
│   │   ├── UserList.js         # Admin: käyttäjälista
│   │   ├── UpdateUserForm.js   # Profiilin muokkaus
│   │   ├── UserIntroForm.js    # Esittelyn muokkaus
│   │   ├── UpdatePassword.js   # Salasanan vaihto
│   │   └── User.js             # Yksittäinen kortti
│   ├── event/              # Tapahtumakomponentit
│   │   ├── EventList.js        # Tapahtumalista
│   │   └── EventForm.js        # Tapahtuman luonti (admin)
│   ├── login/              # Kirjautumis- ja rekisteröitymislomakkeet
│   │   ├── LoginForm.js
│   │   └── RegisterUserForm.js
│   ├── Home.js             # Etusivu
│   ├── LinksAndWeather.js  # Linkit ja maalaussää
│   ├── NonMember.js        # Hyväksymätön jäsen -sivu
│   └── common/             # Jaetut komponentit
│       ├── Notification.js     # Ilmoituskomponentti
│       ├── PrivateRoute.js     # Reittisuojaus
│       ├── GDPRInfo.js         # Tietosuojaseloste
│       └── TermsOfUse.js       # Käyttöehdot
├── reducers/
│   ├── store.js                # Redux store
│   ├── artworkReducer.js
│   ├── eventReducer.js
│   ├── filterReducer.js
│   ├── loginReducer.js
│   ├── notificationReducer.js
│   ├── singleArtworkReducer.js
│   ├── userReducer.js
│   └── actionCreators/         # Thunk-toiminnot
│       ├── artworkActions.js
│       ├── eventActions.js
│       ├── filterActions.js
│       ├── loginActions.js
│       ├── notificationActions.js
│       ├── singleArtworkActions.js
│       └── userActions.js
├── services/               # Axios-palvelumoduulit
│   ├── artworks.js
│   ├── events.js
│   ├── login.js
│   ├── users.js
│   ├── tokenCheck.js
│   └── config.js
└── utils/
    ├── validations.js          # Lomakekenttien validointisäännöt
    ├── weatherUtils.js         # Open-Meteo API -apufunktiot
    └── cloudinary-optimize.js  # Cloudinary URL-muunnosapuri (w_n, f_auto, q_auto)
```

### 2.3 Tilanhallinnan malli

Sovellus käyttää kahta tilanhallintatapaa eri tarkoituksiin:

**React Query — palvelintila (server state)**

`ArtworkList` hakee teosdata suoraan React Queryn `useQuery`-hookilla. React Query hoitaa välimuistiin tallennuksen, taustasynkronoinnin ja virheenkäsittelyn automaattisesti. Välimuistin `staleTime` on 5 minuuttia — tänä aikana uudelleennavigaatio ei laukaise uutta verkko­pyyntöä.

```
Komponentti (useQuery)
    │ queryFn: artworkService.getAll
    ▼
React Query cache ['artworks']
    │ hakee backendistä vain tarvittaessa
    ▼
Komponentti saa datan (data, isLoading)
```

Mutaatiot (tykkäys, poisto) toteutetaan edelleen Redux-thunkeina. Mutaation jälkeen `queryClient.invalidateQueries(['artworks'])` käynnistää uuden haun, jotta galleria päivittyy.

**Redux — UI- ja sessiotila**

Redux hallinnoi tilaa, joka ei ole suoraan palvelimelta haettavaa dataa:

| Osa | Kuvaus |
|---|---|
| `loggedUser` | Kirjautuneen käyttäjän tiedot ja JWT-token |
| `singleArtwork` | Yksittäisen teoksen tiedot |
| `filter` | Gallerian hakusuodatin |
| `users` | Käyttäjälista (admin) |
| `events` | Tapahtumalista |
| `notification` | Ilmoituksen teksti ja tyyppi |

---

## 3. Autentikointi ja reititys

### 3.1 Autentikointivirta

```
1. Käyttäjä lähettää kirjautumislomakkeen
2. Backend validoi tunnukset → palauttaa JWT-tokenin
3. Token tallennetaan localStorageen
4. Jokaisella sivulatauksella token tarkistetaan /api/tokenCheck -endpointista
5. Tokenin payload sisältää käyttäjän id ja roolin (member / admin)
```

### 3.2 Reittisuojaus (PrivateRoute)

`PrivateRoute` on wrapper-komponentti, joka tarkistaa `condition`-propin:
- Jos ehto täyttyy → näyttää sisäiset reitit (`<Outlet />`)
- Muuten → ohjaa `redirectPath`-reitille

Esimerkit:
- `/admin/*` vaatii `isAdmin === true`
- `/users/*` vaatii `!!loggedUser`
- `/login` on saatavilla vain kirjautumattomille

### 3.3 Reittitaulukko

| Reitti | Komponentti | Pääsy |
|---|---|---|
| `/` | Home | Kaikki |
| `/artworks` | ArtworkList | Kaikki |
| `/artworks/:id` | SingleArtwork | Kaikki |
| `/artists` | ArtistList | Kaikki |
| `/artists/:id` | SingleArtist | Kaikki |
| `/links` | LinksAndWeather | Kaikki |
| `/register` | RegisterUserForm | Kaikki |
| `/login` | LoginForm | Kirjautumattomat |
| `/privacy` | GDPRInfo | Kaikki |
| `/terms` | TermsOfUse | Kaikki |
| `/nonMember` | NonMember | Kaikki |
| `/users/:id/myPage` | SingleUser | Kirjautuneet |
| `/users/addArtwork` | AddArtworkForm | Kirjautuneet |
| `/users/events` | EventList | Kirjautuneet |
| `/users/password` | UpdatePassword | Kirjautuneet |
| `/users/update` | UpdateUserForm | Kirjautuneet |
| `/users/intro` | UserIntroForm | Kirjautuneet |
| `/admin/addEvent` | EventForm | Admin |
| `/admin/users` | UserList | Admin |
| `/admin/users/:id` | SingleUser | Admin |

---

## 4. API-palvelut (services/)

Jokainen palvelumoduuli on Axios-pohjainen ja vastaa yhdestä resurssista:

| Tiedosto | Endpointit |
|---|---|
| `login.js` | POST /api/login |
| `users.js` | GET/POST/PUT/DELETE /api/users |
| `artworks.js` | GET/POST/DELETE /api/artworks |
| `events.js` | GET/POST /api/events |
| `tokenCheck.js` | GET /api/tokenCheck |

JWT-token lisätään Authorization-headeriin `config.js`-moduulin kautta.

---

## 5. Kuvien hallinta (Cloudinary)

Taideteoskuvat ladataan suoraan Cloudinaryyn frontendistä:
1. Käyttäjä valitsee kuvan `AddArtworkForm`-komponentissa.
2. Kuva lähetetään Cloudinary API:lle.
3. Cloudinary palauttaa kuvan URL:n.
4. URL tallennetaan MongoDB-tietokantaan yhdessä teoksen muiden tietojen kanssa.

Tämä rakenne pitää kuvatiedostot erillään sovelluksen palvelimesta.

---

## 6. Tuotantoympäristö

| Palvelu | Käyttötarkoitus |
|---|---|
| Render.com | Frontend ja backend -palvelinhosting |
| MongoDB Atlas | Tietokanta (pilvi) |
| Cloudinary | Kuvatiedostojen tallennus |
