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

Alle teksten staan in **`assets/data.js`**: naam, titel, over mij, werkervaring, opleiding,
projecten, vaardigheden, talen, e-mail en LinkedIn. Pas de tekst tussen de aanhalingstekens
aan en sla op; alle pagina's worden automatisch bijgewerkt.

- Kleuren en lettertypes: `assets/style.css`, bovenaan bij `:root` (`--mint` en `--amber`).
- 3D-scène: `assets/scene.js`.
- Menu, animaties en interactie: `assets/main.js`.
- Foto: `assets/omar.jpg`. Zet `photo: ""` in `data.js` om je initialen te tonen.

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
