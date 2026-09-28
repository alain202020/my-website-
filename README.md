# Omar Hassan — persoonlijke website

Interactieve portfolio-website met meerdere pagina's en 3D-effecten (Three.js).
Gemaakt met HTML, CSS en JavaScript — geen build-stap nodig.

## Pagina's

| Bestand | Pagina |
| --- | --- |
| `index.html` | Home: 3D-datanetwerk, intro, uitgelichte projecten |
| `over-mij.html` | Profiel, werkervaring (tijdlijn), opleiding en certificaten |
| `projecten.html` | Alle projecten als 3D-kantelkaarten, met filters en details |
| `vaardigheden.html` | Draaiende 3D-bol met vaardigheden, talen |
| `contact.html` | E-mail en LinkedIn |

## Teksten aanpassen

De website is er in drie talen. Rechtsboven in het menu kies je **NL · EN · ع**.
Elke taal heeft een eigen bestand met dezelfde opbouw:

| Bestand | Taal |
| --- | --- |
| `assets/i18n/nl.js` | Nederlands (standaard) |
| `assets/i18n/en.js` | Engels |
| `assets/i18n/ar.js` | Arabisch (van rechts naar links) |

Hierin staan naam, titel, over mij, werkervaring, opleiding, projecten, vaardigheden, talen,
e-mail en LinkedIn, en onder `ui` de vaste teksten van de pagina's. Pas de tekst tussen de
aanhalingstekens aan en sla op. Verander je iets in één taal, doe het dan ook in de andere twee.

De gekozen taal wordt onthouden. Je kunt ook een link delen met `?lang=en` of `?lang=ar`,
bijvoorbeeld `https://alain202020.github.io/my-website-/?lang=en`.

- Kleuren en lettertypes: `assets/style.css`, bovenaan bij `:root` (`--mint` en `--amber`).
- 3D-scène: `assets/scene.js`.
- Menu, taalknop, animaties en interactie: `assets/main.js`.
- Foto: `assets/omar.jpg`. Zet `photo: ""` om je initialen te tonen.

**Na een wijziging in `assets/`:** verhoog in alle 5 HTML-bestanden het getal achter `?v=`
(bijvoorbeeld `?v=5` → `?v=6`). Dan laden bezoekers meteen de nieuwe versie in plaats van een
oude kopie uit het geheugen van hun browser.

## Online zetten met GitHub Pages

1. Ga naar **Settings → Pages** van deze repository.
2. Kies bij **Source**: *Deploy from a branch*.
3. Kies de branch `main` en de map `/ (root)` en klik op **Save**.
4. Na 1–2 minuten staat de site op `https://alain202020.github.io/my-website-/`.

## Lokaal bekijken

De 3D-scène gebruikt een JavaScript-module; die werkt niet als je het bestand direct opent.
Start daarom een kleine server in deze map:

```
python3 -m http.server
```

en open daarna `http://localhost:8000`.
