# Software Requirements Specification — ArtClub

## 1. Johdanto

### 1.1 Tarkoitus

Tämä dokumentti kuvaa ArtClub-web-sovelluksen toiminnalliset ja ei-toiminnalliset vaatimukset. Sovellus on taidekerholle tarkoitettu alusta, jossa jäsenet voivat esitellä taideteoksiaan ja hallinnoida omaa profiiliaan.

### 1.2 Laajuus

Sovellus koostuu kahdesta erillisestä repositoriosta:

- **Frontend** (tämä repo): React-pohjainen SPA (Single Page Application)
- **Backend**: [Art_Club_back](https://github.com/vsvala/Art_Club_back) — Node.js/Express REST API

### 1.3 Määritelmät

| Termi | Selitys |
|---|---|
| SPA | Single Page Application — yksi HTML-sivu, jota päivitetään dynaamisesti |
| JWT | JSON Web Token — käyttöoikeuden todentamiseen käytetty token |
| Cloudinary | Pilvipalvelu kuvatiedostojen tallentamiseen |
| MongoDB Atlas | Pilvipalvelu MongoDB-tietokannan isännöintiin |

---

## 2. Käyttäjäroolit ja kohderyhmä

| Rooli | Kuvaus |
|---|---|
| Vierailija | Rekisteröitymätön tai kirjautumaton käyttäjä |
| nonMember | Rekisteröitynyt mutta ei vielä hyväksytty jäseneksi |
| member | Hyväksytty jäsen — pääsy jäsensisältöihin |
| admin | Järjestelmän ylläpitäjä — täydet hallintaoikeudet |

---

## 3. Toiminnalliset vaatimukset

### 3.1 Autentikointi ja käyttäjähallinta

| ID | Vaatimus | Rooli |
|---|---|---|
| AUTH-1 | Käyttäjä voi rekisteröityä sähköpostilla ja salasanalla | Vierailija |
| AUTH-2 | Käyttäjä voi kirjautua sisään ja ulos | Kaikki |
| AUTH-3 | Kirjautuminen palauttaa JWT-tokenin, joka tallennetaan localStorageen | Järjestelmä |
| AUTH-4 | Token tarkistetaan jokaisella sivulatauksella (`/api/tokenCheck`) | Järjestelmä |
| AUTH-5 | Käyttäjä voi vaihtaa salasanansa | member, admin |
| AUTH-6 | Admin voi hyväksyä käyttäjän jäseneksi (rooli nonMember → member) | admin |

### 3.2 Taideteokset (Artworks)

| ID | Vaatimus | Rooli |
|---|---|---|
| ART-1 | Kaikkien jäsenten taideteokset näkyvät julkisessa galleriassa | Kaikki |
| ART-2 | Yksittäisen teoksen sivu näyttää kuvan ja tekijätiedot | Kaikki |
| ART-3 | Kirjautunut jäsen voi ladata kuvan ja lisätä teoksen | member, admin |
| ART-4 | Kuvat ladataan Cloudinaryyn; vain URL tallennetaan tietokantaan | Järjestelmä |
| ART-5 | Jäsen voi ladata enintään 10 teosta | member, admin |
| ART-6 | Jäsen voi poistaa oman teoksensa | member, admin |
| ART-7 | Jäsen voi tykätä teoksesta | member, admin |
| ART-8 | Galleria näyttää 10 eniten tykättyä teosta | Kaikki |
| ART-9 | Teoksia voi hakea ja suodattaa | Kaikki |

### 3.3 Taiteilijat (Artists)

| ID | Vaatimus | Rooli |
|---|---|---|
| ARTIST-1 | Taiteilijalista näyttää kaikki jäsenet, joilla on taideteoksia | Kaikki |
| ARTIST-2 | Yksittäisen taiteilijan profiilisivu näyttää esittelyn ja kuvagallerian | Kaikki |

### 3.4 Käyttäjäprofiili

| ID | Vaatimus | Rooli |
|---|---|---|
| USER-1 | Jäsen voi päivittää nimensä ja yhteystietonsa | member, admin |
| USER-2 | Jäsen voi kirjoittaa ja päivittää lyhyen esittelyn | member, admin |
| USER-3 | MyPage näyttää oman profiilin ja kuvagallerian | member, admin |

### 3.5 Tapahtumat (Events)

| ID | Vaatimus | Rooli |
|---|---|---|
| EVENT-1 | Admin voi luoda kerhotapahtuman | admin |
| EVENT-2 | Kirjautuneet jäsenet voivat nähdä tapahtumalistan | member, admin |

### 3.6 Julkiset sivut

| ID | Vaatimus | Rooli |
|---|---|---|
| PUB-1 | Etusivu on kaikkien saatavilla | Kaikki |
| PUB-2 | Linkit-sivu näyttää näyttelylinkit ja maalaussään | Kaikki |
| PUB-3 | GDPR-tietosuojaseloste ja käyttöehdot ovat saatavilla | Kaikki |

---

## 4. Ei-toiminnalliset vaatimukset

### 4.1 Suorituskyky

- Sivujen tulee latautua alle 3 sekunnissa normaalilla yhteydellä.
- Kuvien lataus Cloudinaryyn ei saa estää käyttöliittymää.

### 4.2 Tietoturva

- Salasanat hashataan bcryptillä backendissä.
- JWT-tokenin vanhenemisaika on rajoitettu.
- Suojatut reitit tarkistetaan sekä frontendissä (`PrivateRoute`) että backendissä.
- Käyttäjä näkee ja voi muokata vain omia tietojaan (admin poikkeus).
- Sovellus noudattaa GDPR-vaatimuksia: tietosuojaseloste ja käyttöehdot ovat saatavilla.

### 4.3 Käytettävyys

- Responsiivinen ulkoasu — toimii mobiililla ja työpöydällä (React Bootstrap).
- Navigaatio mukautuu kirjautumisroolin mukaan.
- Ilmoituskomponentti (`Notification`) antaa palautetta käyttäjälle toiminnoista.

### 4.4 Ylläpidettävyys

- Frontend ja backend ovat erillisiä repositorioita.
- Redux-tilanhallinnan ansiosta sovelluslogiikka on eriytetty komponenteista.
- Koodi on testattu Jest- ja React Testing Library -testeillä.

### 4.5 Saatavuus

- Sovellus on julkaistu Render.com-palvelimelle.
- Tietokanta on MongoDB Atlas -pilvipalvelussa.
- Kuvat ovat Cloudinaryssä.

---

## 5. Rajaukset

- Sovellus ei tue reaaliaikaista viestintää (ei WebSocket/chat).
- Sovellus ei lähetä sähköpostia (esim. rekisteröitymisvahvistus).
- Maksujärjestelmää ei ole.
- Mobiilisovellusta ei ole — pelkkä web.
