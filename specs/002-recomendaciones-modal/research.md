# Phase 0 Research: Recomendaciones Button & Modal

All Technical Context items were resolvable from the existing codebase and the clarified
spec; there were no open NEEDS CLARIFICATION items. The decisions below lock in the
approach so implementation is mechanical.

## Decision 1: Reuse Bootstrap 3 modal via data-toggle (no new JS)

- **Decision**: Implement the panel as a standard Bootstrap 3 modal opened by
  `data-toggle="modal" data-target="#rec-modal"` on the trigger `<a>`, exactly like the
  existing Dress code trigger/modal. Add NO JavaScript.
- **Rationale**: Bootstrap's modal plugin is already loaded and drives `#dc-modal` and the
  RSVP modal today. Satisfies FR-003/FR-009 and SC-005, and Constitution Principles II
  (match patterns) and III (simplest approach). The page loads `js/scripts.min.js`; adding
  JS would force a re-minify and add risk for zero benefit.
- **Alternatives considered**: Custom jQuery show/hide, or a separate page/section -
  rejected as unnecessary complexity that diverges from the established pattern.

## Decision 2: Trigger placement and markup

- **Decision**: Add a NEW row inside `#map-content`, directly below the existing
  "Book Uber | Show map" row, using `<div class="row ..."><div class="col-md-4
  col-md-offset-4 text-center"> <a class="btn btn-accent btn-small" data-toggle="modal"
  data-target="#rec-modal">...</a></div></div>`. Leave the existing two-button row
  unchanged.
- **Rationale**: Matches the clarified placement (own centered row below) and mirrors the
  Dress code trigger's single-centered-column pattern (`col-md-4 col-md-offset-4
  text-center`). Reuses `btn btn-accent btn-small` so it is visually consistent (FR-001,
  FR-002). On mobile the column stacks full-width like the existing buttons (edge case
  handled by existing grid behaviour).
- **Alternatives considered**: Adding a third button into the existing 50/50 row -
  rejected by clarification (would change that row and unbalance the grid).

## Decision 3: Icon choice (Font Awesome 4)

- **Decision**: Use `fa fa-map-signs` for the Recomendaciones button.
- **Rationale**: FA4 is already used throughout the pane (`fa-taxi`, `fa-map-marker`,
  `fa-info-circle`, `fa-mobile`). `fa-map-signs` reads as "directions/recommendations" and
  is distinct from `fa-info-circle` (already used by the pane's "Show info" toggle), per
  the spec assumption to avoid icon confusion. `fa-star` is an acceptable fallback.
- **Alternatives considered**: `fa-info-circle` (rejected - collides with Show info),
  `fa-star` (acceptable alternative, slightly less semantic).

## Decision 4: Link target behaviour (scoped exception)

- **Decision**: Each example link uses `target="_blank" rel="noopener"`.
- **Rationale**: Clarified decision (Session 2026-06-24). These point to external
  third-party sites (hotels, transport, restaurants, tourism); opening in a new tab keeps
  the wedding page open. `rel="noopener"` prevents reverse-tabnabbing on `_blank`. This is
  an intentional, documented exception scoped ONLY to the recommendation links; the rest
  of the site keeps its same-tab convention.
- **Alternatives considered**: Same-tab (site default) - rejected for external links since
  it navigates guests away from the invitation.

## Decision 5: Modal id, title, and section structure

- **Decision**: id `#rec-modal`; `<h3 class="text-center section-padding">Recomendaciones</h3>`;
  exactly four `<h5>` sections in order - Alojamientos, Transporte, Restaurantes/Turismo,
  Fuera de Bogota - each with one or two `<p>` of placeholder Spanish copy and 1-2 example
  links. Place the `#rec-modal` block right after `#dc-modal` in `index.html`.
- **Rationale**: Mirrors `#dc-modal` markup (modal-dialog > modal-content > modal-body with
  a close button and centered h3, then repeated h5/p). Satisfies FR-004/FR-005/FR-006/
  FR-007. `#rec-modal` follows the `#dc-modal` naming style (spec assumption).
- **Alternatives considered**: Placing the modal inside `#map-content` - rejected; modals
  live at section level next to peers for clarity, like `#dc-modal`.

## Decision 6: UTF-8-safe authoring of accented Spanish content

- **Decision**: Author the accented Spanish copy (e.g. "Bogota"/"Restaurantes/Turismo" and
  any accented words/punctuation) using a UTF-8-safe edit method - a small Python patch
  script that reads/writes `index.html` as UTF-8, or an editor that preserves UTF-8.
  Do NOT use naive PowerShell heredocs, `sed`, or byte-level shell rewrites for the
  accented content from this Windows+WSL environment.
- **Rationale**: The repo is on WSL accessed from Windows; careless shell editing can
  re-encode the file (mojibake / BOM / CRLF churn). `index.html` currently mixes line
  endings across the tree, so the patch must touch ONLY the added lines and must preserve
  the file's existing encoding. Keeping copy UTF-8-clean satisfies FR-008 (Spanish) and
  Constitution I (no incidental file-wide changes).
- **Alternatives considered**: HTML numeric entities for accents (e.g. `&aacute;`) -
  acceptable fallback if a UTF-8-safe editor is unavailable, but raw UTF-8 matches how the
  rest of the localized site is written and is preferred.

## Decision 7: No SCSS/CSS change expected

- **Decision**: Add no new styles; rely entirely on existing `.modal`, `.btn`,
  `.btn-accent`, `.btn-small`, `.section-padding`, `.text-center` rules.
- **Rationale**: The Dress code modal already renders correctly with these classes, so the
  new modal needs nothing more (Constitution I/III). If a minor tweak ever proves
  necessary it goes in `sass/styles.scss` and is recompiled with `npx gulp sass`; the
  current plan expects zero CSS change and therefore no rebuild.
- **Alternatives considered**: Bespoke CSS for the recommendations modal - rejected as
  unnecessary.
