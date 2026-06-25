# Tasks: Recomendaciones Button & Modal

**Feature**: `002-recomendaciones-modal` | **Input**: specs/002-recomendaciones-modal/
**Spec**: spec.md (clarified) | **Plan**: plan.md | **Research**: research.md | **Quickstart**: quickstart.md

## Scope & Conventions

- **Single file changed**: `index.html` (one new trigger button row + one new `#rec-modal`).
- **No new JS** (Bootstrap `data-toggle="modal"` handles it). **No SCSS expected** (reuse
  existing `.modal`, `.btn`, `.btn-accent`, `.btn-small`, `.section-padding`, `.text-center`).
- **Testing**: manual local verification only (Constitution Principle IV) - no automated suite.
- **Encoding**: accented Spanish copy MUST be authored UTF-8-safe (Python patch script or
  UTF-8 editor), NOT naive PowerShell heredoc / `sed` / byte-level shell edits (research.md D6).
- **Git**: do NOT commit (pre-existing CRLF/LF churn across the tree). Touch only intended lines.
- `[P]` = parallelizable (independent, no ordering dependency). `[US1]` = User Story 1.

Reference anchors in `index.html` (current line numbers, may shift after edits):
- Existing Dress code trigger row: lines 202-208; existing `#dc-modal`: lines 215-257.
- Map info pane `#map-content`: line 388; "Book Uber | Show map" row: lines 400-410
  (insert the new button row after line 410, before `#map-content` closes at line 411).
- Insert `#rec-modal` right after `#dc-modal` (after line 257).

---

## Phase 1: Setup (prerequisites)

- [X] T001 Confirm working tree baseline: run `git --no-pager diff --stat` from repo root and
  note pre-existing churn so you can later confirm only `index.html` changed by this feature.
- [X] T002 Re-read the reference patterns in `index.html`: the Dress code trigger row
  (lines 202-208), `#dc-modal` markup (lines 215-257), and the "Book Uber | Show map" row
  inside `#map-content` (lines 400-410) to copy class names and structure exactly.

---

## Phase 2: Foundational

No foundational/blocking work: the feature reuses existing Bootstrap modal behaviour, grid,
and styles. Proceed directly to User Story 1.

---

## Phase 3: User Story 1 - Guest finds local recommendations from the map pane (P1)

**Goal**: A guest opening the map info pane sees a new "Recomendaciones" button below the
"Book Uber | Show map" row and taps it to open a modal with four Spanish sections
(Alojamientos, Transporte, Restaurantes/Turismo, Fuera de Bogota), each with placeholder
copy and 1-2 example links that open in a new tab. (FR-001..FR-009, SC-001..SC-005)

**Independent Test**: Serve locally, open `#map`, click "Show info", click "Recomendaciones",
confirm the modal opens with all 4 sections + links, links open in a new tab, modal closes.

### Implementation (author with a UTF-8-safe Python patch script per research.md D6)

- [X] T003 [US1] Add the new "Recomendaciones" trigger row in `index.html` inside
  `#map-content`, directly AFTER the "Book Uber | Show map" row (after line 410, before the
  `#map-content` closing `</div>`). Mirror the Dress code trigger: a `<div class="row
  section-padding">` (or `row text-center` to match the pane) containing a single
  `<div class="col-md-4 col-md-offset-4 text-center">` with
  `<a class="btn btn-accent btn-small" data-toggle="modal" data-target="#rec-modal">`
  and a Font Awesome 4 icon `<i class="fa fa-map-signs"></i>&nbsp;&nbsp;Recomendaciones</a>`.
  Leave the existing two-button row UNCHANGED. (FR-001, FR-002, FR-003)
- [X] T004 [US1] Add the `#rec-modal` block in `index.html` immediately AFTER `#dc-modal`
  (after line 257). Mirror `#dc-modal` exactly: `<div id="rec-modal" class="modal fade"
  tabindex="-1" role="dialog">` > `modal-dialog` > `modal-content` > `modal-body` with the
  same close button (`<button class="close" data-dismiss="modal" ...>`) and a centered
  `<h3 class="text-center section-padding">Recomendaciones</h3>`. (FR-003, FR-004)
- [X] T005 [US1] Inside `#rec-modal`, add exactly four `<h5>` sections in order -
  Alojamientos, Transporte, Restaurantes/Turismo, Fuera de Bogota - each followed by one or
  two `<p>` of placeholder Spanish copy (a few sentences). Author all accented characters
  UTF-8-safe. (FR-005, FR-006, FR-008, SC-003)
- [X] T006 [US1] Embed 1-2 example hyperlinks within each of the four sections using obvious
  placeholder URLs (e.g. `https://example.com/...`), each with `target="_blank"
  rel="noopener"`. Confirm every recommendation link carries BOTH attributes. (FR-007, SC-002)
- [X] T007 [US1] Verify the edit introduced NO new JavaScript and did NOT modify `js/scripts.js`,
  `js/scripts.min.js`, the map, or any other section - only the two new `index.html` blocks.
  (FR-009, SC-005, Constitution I)

**Checkpoint**: User Story 1 is fully implemented in markup and ready for local verification.

---

## Phase 4: Local Verification & Polish (Constitution Principle IV)

> Replaces an automated test phase. Run from repo root: `~/repos/boda/wedding-website`.

- [X] T008 (Conditional - SCSS only) If and ONLY if `sass/styles.scss` was changed, recompile
  via `npx gulp sass` -> `css/styles.min.css`. Expected: NO SCSS change, so SKIP. (research.md D7)
- [X] T009 (Conditional - JS only) If any JS was touched (it should NOT be), re-minify via
  `npx gulp minify-js`. Expected: NO JS change, so SKIP. (research.md D1)
- [X] T010 Serve locally: `python3 -m http.server 8000 --bind 127.0.0.1`, open
  http://127.0.0.1:8000/, scroll to `#map`, click "Show info" to reveal `#map-content`.
- [X] T011 Verify placement/styling: the "Book Uber | Show map" row is UNCHANGED and a new
  centered "Recomendaciones" button appears in its own row directly below, using
  `btn btn-accent btn-small` with the Font Awesome icon. (FR-001, FR-002, SC-001)
- [X] T012 Click "Recomendaciones": the modal opens with the centered title "Recomendaciones"
  and exactly four sections in order (Alojamientos, Transporte, Restaurantes/Turismo, Fuera de
  Bogota), each with Spanish copy and at least one example link. (FR-003..FR-007, SC-002, SC-003)
- [X] T013 [P] Click an example link: it opens the placeholder URL in a NEW browser tab while
  the wedding page stays open; spot-check the rendered HTML shows `target="_blank" rel="noopener"`
  on each recommendation link. (FR-007)
- [X] T014 [P] Close the modal via the X control and by clicking the dark backdrop; both return
  to the page unchanged. (Acceptance scenario 4)
- [X] T015 [P] Regression: open the existing Dress code modal and the RSVP modal - both still
  work and only one modal is open at a time. (Edge case "Multiple modals", SC-004)
- [X] T016 [P] Responsive check: narrow the browser to mobile width - the new button stays
  tappable and the modal is readable without horizontal scrolling, like Dress code. (SC-004)
- [X] T017 [P] Visual regression: confirm no other section shifted or restyled. (Constitution I, SC-004)
- [X] T018 Encoding check: confirm accents render correctly (no mojibake) in the browser, then
  run `git --no-pager diff --stat` (expect only `index.html`; plus `css/styles.min.css` only if
  SCSS changed) and `file index.html` (expect UTF-8/ASCII). If accents are broken, re-apply with
  a UTF-8-safe method - do NOT byte-level shell-edit. (research.md D6, FR-008)

---

## Dependencies & Execution Order

- **Setup (T001-T002)** -> **User Story 1 (T003-T007)** -> **Verification (T008-T018)**.
- Within US1: T003 and T004 establish markup; T005 depends on T004 (sections live in the modal);
  T006 depends on T005 (links live in section copy); T007 is a post-edit audit. Author T003-T006
  together in one UTF-8-safe patch script, then run T007.
- Verification: T010-T012 are sequential (serve -> open -> inspect). T013-T017 are `[P]`
  (independent checks against the running server). T008/T009 are conditional and expected to skip.

## Parallel Opportunities

- `[P]` verification tasks T013, T014, T015, T016, T017 can be performed in any order / together
  once the site is served (T010) and the modal verified (T012).
- The implementation itself is effectively one coordinated edit to a single file, so T003-T006
  are authored together rather than in parallel.

## Implementation Strategy (MVP)

User Story 1 IS the entire feature (the only story, P1). MVP = Phase 1 + Phase 3 + Phase 4.
Deliver by authoring the trigger row and `#rec-modal` in one UTF-8-safe pass, then gate the
merge on the local verification walkthrough. Do NOT commit (pre-existing line-ending churn).
