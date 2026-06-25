# Quickstart: Build & Locally Verify the Recomendaciones Modal

Local verification is the gate for this feature (Constitution Principle IV). Run from the
repository root: `~/repos/boda/wedding-website`.

## 1. Build (only if SCSS changed)

This feature is expected to need NO CSS change. If you did edit `sass/styles.scss`,
recompile the committed CSS:

```bash
npx gulp sass        # sass/styles.scss -> css/styles.min.css
```

No JS change is made, so `npx gulp minify-js` is NOT needed. The page loads
`js/scripts.min.js`; since `js/scripts.js` is untouched, the minified file stays valid.

## 2. Serve the site locally

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open http://127.0.0.1:8000/ in a browser.

## 3. Verify the feature (acceptance walkthrough)

1. Scroll to the map / "How do I get there?" section (`#map`).
2. Click "Show info" to reveal the info pane (`#map-content`).
3. Confirm the existing "Book Uber | Show map" row is unchanged, and a NEW centered
   "Recomendaciones" button appears in its own row directly below it (FR-001, SC-001).
4. Confirm the button uses the same `btn btn-accent btn-small` styling and shows a Font
   Awesome icon (FR-002).
5. Click "Recomendaciones". A modal opens with the centered title "Recomendaciones"
   (FR-003, FR-004).
6. Confirm exactly four headed sections in order: Alojamientos, Transporte,
   Restaurantes/Turismo, Fuera de Bogota - each with Spanish copy and at least one example
   link (FR-005, FR-006, FR-007, SC-002, SC-003).
7. Click an example link: it opens the example URL in a NEW browser tab; the wedding page
   stays open in the original tab (FR-007).
8. Close the modal via the X control and by clicking the dark backdrop; both return to the
   page unchanged (acceptance scenario 4).

## 4. Regression / cross-checks

- Open the existing Dress code modal and the RSVP modal - they still work and only one
  modal is open at a time (Bootstrap default; edge case "Multiple modals").
- Narrow the browser to a mobile width: the new button stays tappable and the modal is
  readable without horizontal scrolling, like the Dress code modal (edge case
  "Small screens", SC-004).
- Visually confirm no other section of the page shifted or restyled (Constitution I,
  SC-004).

## 5. Encoding check (accented Spanish)

After editing, confirm the accented characters render correctly in the browser (no
mojibake) and that `index.html` is still UTF-8 with only the intended lines changed:

```bash
git --no-pager diff --stat        # expect only index.html (and css if SCSS changed)
file index.html                   # should report UTF-8 text (or ASCII if entities used)
```

If accents look broken, re-apply the copy with a UTF-8-safe method (Python patch script
or UTF-8 editor) per research.md Decision 6 - do not fix with byte-level shell edits.
