# Quickstart: Bilingual Language Toggle — build & local verification

**Feature**: 003-language-toggle | **Phase**: 1 | **Date**: 2026-07-13

Per Constitution Principle IV, verify locally before merging. All commands run from the repo
root inside WSL: `cd ~/repos/boda/wedding-website`.

## 1. Build the compiled assets

The page loads minified assets, so recompile after editing source:

```bash
npx gulp minify-js     # js/scripts.js  -> js/scripts.min.js  (dictionary + toggle handler)
npx gulp sass          # sass/styles.scss -> css/styles.min.css (language-control styles)
# or simply:
npx gulp default       # runs both
node --check js/scripts.js   # sanity: no JS syntax error before/after minify
```

## 2. Serve locally

```bash
setsid python3 -m http.server 8000 --bind 127.0.0.1 >/tmp/preview.log 2>&1 < /dev/null &
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8000/   # expect 200
```

Open http://127.0.0.1:8000/ in Brave/Chrome and one other browser.

## 3. Functional checklist (maps to spec acceptance scenarios)

Default state (FR-001, SC-001)
- [ ] On first load the entire site is in Spanish; the nav shows **ES** highlighted, **EN** not.

Toggle to English (FR-002, FR-003, SC-002)
- [ ] Click **EN** → nav labels, hero/intro, "La Boda", map pane copy, "Importante" modal
      (incl. Fiebre Amarilla), Recomendaciones modal, RSVP labels/placeholders/option text,
      and footer switch to English in place; no page reload; scroll position preserved.
- [ ] **EN** is now highlighted, **ES** is not; `<html lang>` = `en`.

Toggle back to Spanish (FR-003)
- [ ] Click **ES** → every string returns to its exact original Spanish (round-trip lossless).

No persistence (FR-006, SC-003)
- [ ] While in English, reload the page → it comes back in **Spanish** (nothing remembered).

Fallback (FR-005)
- [ ] Temporarily remove one `EN_DICT` key → that element stays Spanish in English mode; no
      blank text, no console error. (Restore the key afterward.)

Scope — only site copy (FR-004)
- [ ] The Google Map iframe, Instagram embed, and any third-party widget text do NOT change.
- [ ] Text a guest typed into an RSVP field is not altered by toggling.

RSVP data contract UNCHANGED (FR-007, SC-005) — the critical check
- [ ] In **English** mode, fill the RSVP form (valid invite code, choose a `comida`/`trago`)
      and submit → success modal appears.
- [ ] Confirm the Google Sheet row stores **Spanish** values (`Carne`, `Whisky`, …) exactly as
      a Spanish-mode submission would — i.e. display language did not change submitted data.
- [ ] Repeat with an invalid invite code → same rejection behavior as before (MD5 check
      unaffected).

Responsive (SC-004)
- [ ] Shrink to a mobile width / open the hamburger nav → the ES/EN control is reachable and
      toggles correctly on touch.

Regression
- [ ] Countdown, smooth-scroll nav, modals, and the map all behave exactly as before in both
      languages; no new console errors.

## 4. Done criteria

- All boxes above checked in at least two browsers (incl. mobile width).
- `js/scripts.min.js` and `css/styles.min.css` regenerated and consistent with source.
- Only the intended files changed (`index.html`, `js/scripts.js`, `js/scripts.min.js`,
  `sass/styles.scss`, `css/styles.min.css`); no unrelated CRLF churn staged.
