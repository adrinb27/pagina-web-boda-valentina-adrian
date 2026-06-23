# Tasks: Spanish RSVP Form with Updated Guest Preference Fields

**Input**: Design documents from `/specs/001-rsvp-form-spanish/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No automated test suite exists in this repo and TDD was not requested, so no automated
test tasks are generated. Per Constitution Principle IV, every story includes a **local manual
verification** task instead.

**Organization**: Tasks are grouped by user story so each can be implemented and verified
independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story the task belongs to (US1, US2, US3)
- Exact file paths are included in each description

## Path Conventions

Single static-site project. Web files at repo root: `index.html`, `js/scripts.js`,
`js/scripts.min.js` (built). The Apps Script handler is external (delivered as the artifact
`specs/001-rsvp-form-spanish/contracts/apps-script-handler.md` for the couple to paste + redeploy).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the toolchain needed to build and verify changes locally.

- [X] T001 Verify the local toolchain works: run `npx gulp minify-js` (builds `js/scripts.js` → `js/scripts.min.js`) and start a local server (`python3 -m http.server 8000 --bind 127.0.0.1`) serving `index.html` without errors.
- [X] T002 [P] Record the current live Apps Script `/exec` endpoint URL and confirm it matches in both `js/scripts.js` (~line 226) and `js/scripts.min.js`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The data sink (sheet + handler) must accept the new shape before any end-to-end story
verification can pass.

**⚠️ CRITICAL**: Story verification (T008, T013, T015, T016) cannot succeed until this phase is done
and the couple has redeployed the handler.

- [ ] T003 Produce the updated Google Apps Script handler from `specs/001-rsvp-form-spanish/contracts/apps-script-handler.md` (renamed key `codigo_invitacion`, server-side `comida`/`trago` validation, `String(...)` coercion, Spanish messages) and deliver it to the couple to paste into their Apps Script project and redeploy as a new version.
- [ ] T004 Update the `responses` sheet header row to exactly: `timestamp | email | nombre | codigo_invitacion | musica | restricciones | comida | trago` (couple action; documented in `specs/001-rsvp-form-spanish/quickstart.md`). No `extras` column receives data.

**Checkpoint**: Sheet + handler accept the new submission shape — story work can proceed.

---

## Phase 3: User Story 1 - Guest submits RSVP with preference details (Priority: P1) 🎯 MVP

**Goal**: Replace the old "extras" field with the four new preference fields and make the form submit
and record correctly under the new field/column names.

**Independent Test**: Submit the form with a valid invite code and all fields; confirm a new sheet
row appears with email, nombre, codigo_invitacion, musica, restricciones, comida, trago in their
correct columns and no "extras" value.

- [X] T005 [P] [US1] In `index.html` (#rsvp-form, ~lines 445-478): remove the `extras` number input; add a `musica` text input and a `restricciones` text input; add a `comida` single-select `<select>` with options {Carne, Pollo, Vegetariano}; add a `trago` single-select `<select>` with options {Whisky, Aguardiente, Vino Blanco, Vino Tinto, Cerveza, Vodka}; rename the invite input's `name`/`id` from `invite_code` to `codigo_invitacion`. Keep the existing Bootstrap grid/markup style (Principle I & II).
- [X] T006 [P] [US1] In `js/scripts.js` (RSVP block ~line 211): change the invite selector `$('#invite_code')` to `$('#codigo_invitacion')`. Leave the `$.post` flow and MD5 validCodes array unchanged.
- [X] T007 [US1] Re-minify with `npx gulp minify-js` so `js/scripts.min.js` reflects T006; verify with `grep -c codigo_invitacion js/scripts.min.js` (page loads the min file). If gulp is unavailable, mirror the edit by hand to keep both files consistent.
- [ ] T008 [US1] Local end-to-end verification: serve the site, submit with a valid code (e.g. 990427) and all fields; confirm success modal shows and one new row records every value in its correct column with no `extras` data (maps to SC-002).

**Checkpoint**: Core RSVP data collection works end to end — this is the shippable MVP.

---

## Phase 4: User Story 2 - Guest experiences the form entirely in Spanish (Priority: P2)

**Goal**: All guest-visible text in the form up to submission (labels, placeholders, button, inline
alerts) is in Spanish. The success modal is out of scope.

**Independent Test**: Load the form and confirm every guest-visible string up to submission is in
Spanish, including the wrong-code error.

- [X] T009 [US2] In `index.html` translate the confirmation section copy to Spanish per FR-006: heading "CONFIRMA TU ASISTENCIA!", the subheading RSVP-deadline message, placeholders ("Tu email", "Tu nombre completo", "Codigo de invitación (se encuentra en tu invitación)"), the four new field prompts (musica/restricciones/comida/trago labels), and the submit button "LISTO PARA LA FIESTA".
- [X] T010 [US2] In `js/scripts.js` translate the inline alert messages to Spanish: the "saving" info alert, the invalid-invite-code error, and the generic server-error in `.fail`. Do not touch the `#rsvp-modal` success popup (out of scope).
- [X] T011 [US2] Re-minify (`npx gulp minify-js`) and local-verify: no English text in the form up to submission; submitting a wrong code shows a Spanish error and performs no POST (maps to SC-001, SC-003).

**Checkpoint**: Spanish-speaking guests can complete the form with no English up to submission.

---

## Phase 5: User Story 3 - Couple reads clean, correctly-named responses and email alerts (Priority: P3)

**Goal**: Confirm the couple's outputs — correctly named columns, one row + one email per RSVP, and
server-side guarding of preference values.

**Independent Test**: Submit RSVPs and confirm (a) the sheet header has the new names with no leftover
`extras` data column and (b) an email alert lists every submitted field.

- [ ] T012 [US3] Verify the email alert and column mapping: submit with each invite code {990427, 920427, 950909, 257515}; confirm exactly one row per submission and one email listing all seven fields (maps to SC-004).
- [ ] T013 [US3] Verify server-side validation (FR-014) via direct curl proxy POSTs from `specs/001-rsvp-form-spanish/quickstart.md`: out-of-set `comida` (e.g. "Pescado") and out-of-set `trago` (e.g. "Tequila") each return `{"result":"error"}` and write no row (maps to SC-005).

**Checkpoint**: Couple-facing outputs are correct and inputs are guarded server-side.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T014 [P] If the handler was redeployed as a new deployment, update the `/exec` URL in both `js/scripts.js` and `js/scripts.min.js` and re-verify one submission.
- [X] T015 Consistency + constitution check: diff the RSVP logic in `js/scripts.js` vs `js/scripts.min.js` to confirm they agree; confirm the change is minimal with no design/layout changes (Principles I-III) and that all stories were verified locally (Principle IV).
- [ ] T016 Commit the feature on branch `001-rsvp-form-spanish`; merge to `master` only after local verification passes (Principle V).

---

## Dependencies & Execution Order

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **User Stories (Phases 3-5)** → **Polish (Phase 6)**.
- Phase 2 (T003, T004) blocks all end-to-end verification (T008, T011, T012, T013).
- **US1 (P1)** is the MVP and should land first. **US2 (P2)** and **US3 (P3)** build on the same form
  but are independently verifiable once US1's fields exist.
- Within US1: T005 and T006 are parallel `[P]` (different files); T007 depends on T006; T008 depends
  on T005+T007+Phase 2.
- US2's T009 (index.html) and T010 (scripts.js) are different files but both follow US1's structural
  edits to those same files, so run them after US1 to avoid edit conflicts.

## Parallel Opportunities

- T002 alongside T001.
- T005 (index.html) alongside T006 (scripts.js) within US1.
- T014 is independent polish and can run alongside T015 prep.

## Implementation Strategy

- **MVP = User Story 1** (Phases 1-3): functional Spanish-agnostic form that collects the four new
  preferences and records them correctly. Ship/verify this first.
- Then layer **US2** (full Spanish) and **US3** (couple-facing verification + server guards)
  incrementally, re-minifying and locally verifying after each (Principle IV).
