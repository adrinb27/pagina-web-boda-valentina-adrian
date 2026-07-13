# Implementation Plan: Bilingual Language Toggle (Spanish / English)

**Branch**: `003-language-toggle` | **Date**: 2026-07-13 | **Spec**: specs/003-language-toggle/spec.md

**Input**: Feature specification from `specs/003-language-toggle/spec.md`

## Summary

Add an "ES / EN" text switch to the top navigation that toggles the whole single-page site
between Spanish (default) and English, client-side and in place. Spanish stays authored
directly in `index.html` as the source of truth, so with no JavaScript the site is already
fully Spanish (satisfies the Spanish-default and Spanish-fallback requirements). Each
site-authored, visitor-facing string gets a `data-i18n` key (and `data-i18n-ph` for input
placeholders); an English dictionary object (ES5 literal) in `js/scripts.js` maps those keys
to English. Clicking "EN" walks the tagged elements with jQuery and swaps text/placeholders
to English (falling back to the original Spanish when a key is missing); clicking "ES"
restores the cached Spanish. The choice is NOT persisted — any reload starts in Spanish.
The RSVP form's `name` attributes and `<option value>`s are untouched, so `serialize()`
sends byte-identical data regardless of display language; the form handler is not modified.

## Technical Context

**Language/Version**: HTML5 + CSS3 (SCSS source) + ES5/jQuery 1.11, matching the existing site.

**Primary Dependencies**: jQuery 1.11 (already loaded), Bootstrap 3 (nav/grid), Font Awesome 4
(existing). No new runtime dependency; no i18n library added.

**Storage**: None. Language is in-memory for the current page view only (FR-006 — no
persistence); the site resets to Spanish on every load.

**Testing**: Manual local verification only — `python3 -m http.server` per Constitution
Principle IV. No automated test suite exists.

**Target Platform**: Static single-page site (`index.html`), viewed on modern desktop and
mobile browsers; also hostable via the repo's Docker/nginx setup.

**Project Type**: Static website (single project, repository root).

**Performance Goals**: No regression. Adds one small dictionary and a short toggle handler to
`scripts.js` (a few KB minified); no new network requests, fonts, or blocking work. Toggling
is a synchronous DOM text swap, effectively instant for the site's element count.

**Constraints**:
- MUST NOT change the RSVP submission logic or data contract (FR-007); `serialize()` output
  stays identical because only labels/placeholders/option-text translate, never `name` or
  `<option value>`.
- MUST match existing patterns (Constitution II): ES5/jQuery, Bootstrap 3 nav, gulp build.
- UTF-8-safe authoring is required (accented Spanish + English apostrophes). Naive WSL shell
  heredoc/`sed` editing can corrupt UTF-8 and MUST be avoided — use file-based Python patches
  (see research.md).
- Build discipline: `js/scripts.js` edits MUST be re-minified and `sass/styles.scss` edits
  recompiled, so the loaded `*.min.*` assets stay consistent.

**Scale/Scope**: ~40-60 translatable strings across one file (`index.html`), one English
dictionary + one toggle handler in `js/scripts.js`, and a small nav control with minimal
SCSS for the active-state highlight.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Assessment | Status |
|-----------|-----------|--------|
| I. Minimal Footprint (No Redesign) | Adds `data-i18n` attributes (no visual/layout effect), one small nav control, one dictionary, and one toggle handler. No section is redesigned, moved, or restyled; Spanish output is identical to today. | PASS |
| II. Match the Original Code's Patterns | ES5 object literal + jQuery `.each()/.text()/.attr()` handler in the same `scripts.js` style; nav control uses existing Bootstrap 3 `header`/`member-actions` markup and `.header a` styling; built with the existing gulp tasks. | PASS |
| III. Keep Solutions Simple (Anti Over-Engineering) | Plain attribute + dictionary approach; no i18n framework, no routing, no per-language pages, no storage. Spanish-in-HTML doubles as the default and the fallback. | PASS |
| IV. Test Every Feature Locally First | quickstart.md defines local serve + click-through verification for both languages, modal content, and an RSVP submit proving unchanged data. | PASS (planned) |
| V. master Is Production | Work stays on branch `003-language-toggle`; merges to master only after local verification. | PASS |

**Data-contract note (FR-007)**: The RSVP form submits via `$('#rsvp-form').serialize()`.
Every real `<option>` already has an explicit `value` (e.g. `value="Carne"`) and every input
has a stable `name`; translation only touches visible text and `placeholder` attributes, so
the serialized payload and the invite-code (`MD5`) check are unaffected. No handler change.

**Build-discipline note**: This feature edits `js/scripts.js` (re-minify via
`npx gulp minify-js`) and `sass/styles.scss` (recompile via `npx gulp sass`). `index.html`
gains attributes + one nav block. All three recompiled/committed together.

**Result**: PASS — no violations. Complexity Tracking not required.

## Project Structure

### Documentation (this feature)

```text
specs/003-language-toggle/
├── plan.md              # This file (/speckit.plan output)
├── spec.md              # Feature specification (clarified 2026-07-13)
├── research.md          # Phase 0 output — approach decisions & rationale
├── data-model.md        # Phase 1 output — language state + translatable-string inventory
├── quickstart.md        # Phase 1 output — build + local verification steps
└── contracts/
    └── README.md        # Phase 1 output — preserved RSVP contract + DOM/dictionary contract
```

### Source Code (repository root)

```text
index.html               # Add data-i18n/data-i18n-ph attributes to site-authored strings;
                         #   add the ES/EN control to the header nav.
js/scripts.js            # Add EN dictionary object + ES/EN toggle handler (ES5/jQuery).
js/scripts.min.js        # Rebuilt via `npx gulp minify-js`.
sass/styles.scss         # Minimal rule for the language control + active-state highlight.
css/styles.min.css       # Rebuilt via `npx gulp sass`.
```

**Structure Decision**: Single static project at the repository root. The feature spans the
three existing customization surfaces — content/markup (`index.html`), behavior
(`js/scripts.js`), and presentation (`sass/styles.scss`) — with their compiled outputs
rebuilt. No new files, directories, routes, or dependencies are introduced.

## Complexity Tracking

> No Constitution violations. No entries required.
