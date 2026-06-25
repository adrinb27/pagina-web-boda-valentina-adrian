# Implementation Plan: Recomendaciones Button & Modal

**Branch**: `002-recomendaciones-modal` | **Date**: 2026-06-24 | **Spec**: specs/002-recomendaciones-modal/spec.md

**Input**: Feature specification from `specs/002-recomendaciones-modal/spec.md`

## Summary

Add a "Recomendaciones" trigger button to the map info pane (`#map-content`) and a new
Bootstrap 3 modal (`#rec-modal`) that mirrors the existing Dress code modal (`#dc-modal`).
The modal holds four Spanish sections (Alojamientos, Transporte, Restaurantes/Turismo,
Fuera de Bogota), each with placeholder copy and 1-2 example links that open in a new tab
(`target="_blank" rel="noopener"`). This is a static HTML-only change: it reuses
Bootstrap's existing `data-toggle="modal"` mechanism and adds NO new JavaScript. No SCSS
changes are expected (existing `.modal`, `.btn`, `.section-padding` styles are reused).

## Technical Context

**Language/Version**: HTML5 + CSS3 (SCSS source), ES5/jQuery 1.11 (no JS change here)

**Primary Dependencies**: Bootstrap 3 (modal, grid), Font Awesome 4 (icon), jQuery 1.11
(loaded by the page; not modified). All already vendored in the repo.

**Storage**: N/A (static presentational content)

**Testing**: Manual local verification only - `python3 -m http.server` per Constitution
Principle IV. No automated test suite exists.

**Target Platform**: Static single-page site (`index.html`) served from GitHub Pages;
viewed in modern desktop and mobile browsers.

**Project Type**: Static website (single project, repository root).

**Performance Goals**: No regression. Adds a few KB of static markup; no new requests,
scripts, or fonts.

**Constraints**: No new JS (FR-009 / SC-005). Reuse existing modal + button patterns
(Constitution II). UTF-8-safe authoring required for accented Spanish content
(e.g. "Bogota" with accent, "Restaurantes/Turismo"); naive shell heredoc/sed editing from
this Windows+WSL environment can corrupt UTF-8 and MUST be avoided (see research.md).

**Scale/Scope**: One trigger button + one modal in one file (`index.html`). ~50-70 lines
of added markup. Possibly zero, otherwise minimal, SCSS.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Assessment | Status |
|-----------|-----------|--------|
| I. Minimal Footprint (No Redesign) | Adds one button row + one modal; existing "Book Uber / Show map" row and all other sections are untouched. No layout/theme/redesign changes. | PASS |
| II. Match the Original Code's Patterns | Trigger copies the Dress code `<a class="btn btn-accent btn-small" data-toggle="modal" data-target>` pattern in a `col-md-4 col-md-offset-4 text-center` row; modal copies the `#dc-modal` modal/dialog/content/body + close-button + `<h3 class="text-center section-padding">` + repeated `<h5>`/`<p>` structure. Bootstrap 3 grid + FA4 icon. | PASS |
| III. Keep Solutions Simple (Anti Over-Engineering) | Pure static markup reusing existing CSS/JS behaviour. No new dependencies, build steps, abstractions, or config. | PASS |
| IV. Test Every Feature Locally First | quickstart.md defines the local serve-and-click verification (open map, Show info, click Recomendaciones, confirm 4 sections + links open in new tab). | PASS (planned) |
| V. master Is Production | Work stays on branch `002-recomendaciones-modal`; merges to master only after local verification. | PASS |

**Build discipline note**: The page loads minified assets, but this feature changes only
`index.html` (no `js/scripts.js` edit -> no re-minify needed). If any SCSS proves
necessary, `sass/styles.scss` must be recompiled to `css/styles.min.css` via
`npx gulp sass`; the current plan expects NO SCSS change.

**Result**: PASS - no violations. Complexity Tracking not required.

## Project Structure

### Documentation (this feature)

```text
specs/002-recomendaciones-modal/
├── plan.md              # This file (/speckit.plan output)
├── spec.md              # Feature specification (already clarified)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (N/A content - structure documented)
├── quickstart.md        # Phase 1 output (build + local verification steps)
└── contracts/
    └── README.md        # Phase 1 output (no programmatic contracts - rationale)
```

### Source Code (repository root)

```text
index.html               # ONLY file changed: add #rec trigger button + #rec-modal markup
sass/styles.scss         # Not expected to change (reuses existing modal/btn styles)
css/styles.min.css       # Only if SCSS changes (rebuild via npx gulp sass)
js/scripts.js            # NOT changed (Bootstrap data-toggle handles the modal)
js/scripts.min.js        # NOT changed
```

**Structure Decision**: Single static project at the repository root. The entire feature
lives in `index.html`: (1) a new centered button row inside `#map-content` directly below
the existing "Book Uber / Show map" row (~line 410), and (2) a new `#rec-modal` block
placed adjacent to `#dc-modal` (~after line 260), so related modals sit together.

## Complexity Tracking

> No Constitution violations. No entries required.
