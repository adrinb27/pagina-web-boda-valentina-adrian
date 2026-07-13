# Boda de Valentina & Adrián 💍

Nuestro sitio web de boda — Bogotá, Colombia · 26 de Junio de 2027.

A bilingual (Español / English) wedding website with online RSVP, an
add-to-calendar button, our story in pictures, travel and health tips for
guests coming to Colombia, and a map to the venue.

> **Gracias / Thank you.** This website is a personal customization of the
> wonderful open-source [wedding-website](https://github.com/rampatra/wedding-website)
> created by [Ram Patra (@rampatra)](https://github.com/rampatra). His project
> gave us a beautiful, thoughtfully engineered starting point, and we're deeply
> grateful for his generosity in open-sourcing it. Muchísimas gracias, Ram! 🙏

---

## What we customized

Building on Ram's original template, we adapted the site for our wedding:

1. **Bilingual site (Español / English).** Spanish is the default; a small
   **ES / EN** switch in the navigation bar toggles the whole page in place.
   The RSVP submission always stores its data in a single, consistent format
   regardless of the language shown.
2. **Localized add-to-calendar.** The "Agrégalo a tu calendario" button and the
   event it creates (title and description) are translated along with the page.
3. **Our own branding.** New couple logo in the navigation bar and a matching,
   freshly generated favicon / touch-icon set.
4. **Our story & photos.** Custom illustrations and photographs throughout the
   hero, intro, and gallery sections.
5. **Guest information for Colombia.** A recommendations modal with our favorite
   spots, plus an *"Importante"* section covering travel details — including a
   note about the **yellow fever (fiebre amarilla)** vaccine so guests can check
   requirements before flying.
6. **RSVP via Google Sheets.** Guests RSVP with an invite code; entries are
   written straight to a Google Sheet through a Google Apps Script — no backend
   server or database required.
7. **Custom Google Map** pointing to our venue.
8. **Docker setup** for building and serving the static site in a container.

---

## Getting started (local build)

The site is static — Sass is compiled to CSS and the JavaScript is minified
with Gulp.

1. `git clone https://github.com/adrinb27/pagina-web-boda-valentina-adrian.git`
2. `cd pagina-web-boda-valentina-adrian`
3. `npm install` — install dependencies
4. `npx gulp` — compile Sass → CSS and minify JS
5. Open `index.html` in your browser (or serve the folder, e.g.
   `python3 -m http.server 8000`).

> **Note:** The page loads the *minified* assets, so re-run `npx gulp` after
> editing any `.scss` or `.js` file. `npx gulp sass` rebuilds CSS only and
> `npx gulp minify-js` rebuilds JS only.

## Run with Docker

Build and serve the site in a container instead of installing Node locally. The
build stage compiles the assets with Gulp and the runtime stage serves them with
nginx.

### Using docker compose (recommended)
1. `cp .env.example .env` — optional, lets you change the ports
2. `docker compose up --build` — build the image and start the site
3. Open `http://localhost:8080`

Change the port without editing any file:
```
HOST_PORT=9000 PORT=9000 docker compose up --build
```
- `HOST_PORT` — the port on your machine (what you browse to)
- `PORT` — the port nginx listens on inside the container

### Using plain docker
```
docker build -t wedding-website .
docker run -p 8080:8080 -e PORT=8080 wedding-website
```

---

## How it works

The original author wrote a great
[blog post describing all the features of the base wedding website](https://blog.rampatra.com/wedding-website)
and how to customize each of them (RSVP, Google Sheet, map, calendar, etc.). It
remains the best reference for the underlying mechanics.

---

## Credits

- **Original project:** [wedding-website](https://github.com/rampatra/wedding-website)
  by [Ram Patra (@rampatra)](https://github.com/rampatra) — the foundation this
  site is built on. Thank you! 🙏
- **This customization:** Valentina & Adrián, for our wedding in Bogotá.

## License

This project is licensed under the **GNU General Public License v3.0**, the same
license as the original project. See the [LICENSE](./LICENSE) file for details.
