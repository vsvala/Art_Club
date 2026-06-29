# ArtClub — Käyttöohje

## Sisällys

1. [Yleiskatsaus](#yleiskatsaus)
2. [Käyttäjäroolit](#käyttäjäroolit)
3. [Rekisteröityminen](#rekisteröityminen)
4. [Kirjautuminen](#kirjautuminen)
5. [Vierailija — julkiset sivut](#vierailija--julkiset-sivut)
6. [Jäsen — jäsensivut](#jäsen--jäsensivut)
7. [Admin — hallintasivut](#admin--hallintasivut)
8. [Salasanan vaihto](#salasanan-vaihto)
9. [Uloskirjautuminen](#uloskirjautuminen)

---

## Yleiskatsaus

ArtClub on web-sovellus taidekerholle. Sovelluksessa voi selata taiteilijoita ja taideteoksia, hakea jäsenyyttä sekä hallita omaa profiilia ja galleriaa. Sovellus on saatavilla osoitteessa [artclub-q41z.onrender.com](https://artclub-q41z.onrender.com/).

---

## Käyttäjäroolit

| Rooli | Kuvaus |
|---|---|
| Vierailija | Ei kirjautunut. Pääsy julkisille sivuille ja rekisteröintilomakkeelle. |
| Jäsen (member) | Kirjautunut hyväksytty jäsen. Pääsy omaan profiiliin, galleriaan ja tapahtumiin. |
| Admin | Hallintaoikeudet: käyttäjien hyväksyntä, tapahtumien luonti. |

---

## Rekisteröityminen

1. Klikkaa navigaatiossa **Register**.
2. Täytä lomake: nimi, sähköpostiosoite ja salasana.
3. Hyväksy käyttöehdot.
4. Lähetä lomake — tilisi luodaan `nonMember`-roolilla.
5. Odota, että admin hyväksyy jäsenhakemuksesi. Saat tämän jälkeen `member`-roolin.

---

## Kirjautuminen

1. Klikkaa navigaatiossa **Login**.
2. Syötä sähköpostiosoite ja salasana.
3. Klikkaa **Login** — sinut ohjataan etusivulle.

Kirjautumistiedot tallennetaan selaimen `localStorage`-muistiin. Istunto pysyy voimassa, kunnes kirjaudut ulos tai token vanhenee.

---

## Vierailija — julkiset sivut

### Etusivu (Home)

Sovelluksen etusivu. Näyttää yleistä tietoa kerhosta.

### Gallery

Reitti: `/artworks`

- Näyttää kaikki jäsenten lataamat taideteokset.
- Yksittäistä teosta voi klikata — avautuu teoskohtainen sivu (`/artworks/:id`), jossa näkyy teos, tekijä ja teos voidaan tykätä (kirjautuneet jäsenet).

### Artists

Reitti: `/artists`

- Lista kaikista taiteilijoista.
- Yksittäistä taiteilijaa klikkaamalla avautuu heidän profiilisivunsa (`/artists/:id`) kuvagallerioineen.

### Links

Reitti: `/links`

- Linkkejä näyttelyihin ja ajankohtaisiin tapahtumiin.
- Näyttää maalaussään.

### Register

Reitti: `/register`

Uuden käyttäjän rekisteröintilomake (katso [Rekisteröityminen](#rekisteröityminen)).

---

## Jäsen — jäsensivut

Nämä sivut vaativat kirjautumisen. Kirjautumaton käyttäjä ohjataan `/login`-sivulle.

### MyPage

Reitti: `/users/:id/myPage`

- Oma profiilisivu: nimi, esittelyteksti ja kuvagalleria.
- Painike **Update profile** vie lomakkeelle, jossa voit muokata nimeä ja yhteystietoja.
- Painike **Edit intro** vie lomakkeelle, jossa voit kirjoittaa lyhyen esittelyn itsestäsi.

### Taideteoksen lisääminen

Reitti: `/users/addArtwork`

1. Valitse kuvatiedosto (tuetut formaatit: JPEG, PNG).
2. Kirjoita teoksen nimi.
3. Klikkaa **Upload** — kuva ladataan Cloudinaryyn ja tallentuu galleriaan.
4. Voit ladata enintään **10 teosta**.

Voit poistaa teoksen omalta MyPage-sivultasi.

### Events

Reitti: `/users/events`

Lista kaikista kerhotapahtumista: nimi, päivämäärä ja kuvaus.

### Change password

Reitti: `/users/password`

1. Syötä nykyinen salasana.
2. Syötä uusi salasana ja vahvista se.
3. Klikkaa **Update**.

---

## Admin — hallintasivut

Nämä sivut vaativat `admin`-roolin. Muut käyttäjät ohjataan kirjautumissivulle.

### Users

Reitti: `/admin/users`

- Lista kaikista rekisteröityneistä käyttäjistä ja heidän roolistaan.
- Klikkaamalla käyttäjää avautuu käyttäjäsivu (`/admin/users/:id`), jossa voit **hyväksyä jäsenyyden** vaihtamalla roolin `nonMember` → `member`.

### Add event

Reitti: `/admin/addEvent`

1. Täytä tapahtuman nimi, päivämäärä ja kuvaus.
2. Klikkaa **Create** — tapahtuma lisätään tapahtumaluetteloon.

---

## Salasanan vaihto

Katso kohta [Change password](#change-password) yllä.

---

## Uloskirjautuminen

Klikkaa navigaatiossa **Logout**. Istunto päättyy ja sinut ohjataan etusivulle.
