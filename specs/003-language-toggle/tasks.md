---
description: "Task list for feature 003-language-toggle implementation"
---

# Tasks: Bilingual Language Toggle (Spanish / English)

**Input**: Design documents from `specs/003-language-toggle/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/README.md (all present)

**Tests**: None. No automated test suite exists and the spec does not request tests
(Constitution IV = manual local verification). Verification is the quickstart checklist.

**Organization**: Grouped by user story. Both stories are Priority **P1**. US1 (Spanish
baseline) is delivered by tagging without regression; US2 (English toggle) adds the switch.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files / independent, no ordering dependency)
- **[Story]**: US1 = Spanish default baseline, US2 = English toggle
- All paths are relative to the repository root (`~/repos/boda/wedding-website`)

## Path Conventions

Single static project at repo root. Files touched: `index.html`, `js/scripts.js`
(→ `js/scripts.min.js`), `sass/styles.scss` (→ `css/styles.min.css`). No new files.
Edit source files with UTF-8-safe file-based Python patches (research.md Decision 6); never
shell heredoc/`sed`. Recompile via gulp after editing JS/SCSS (the page loads minified assets).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the build + preview loop works before changing anything.

- [X] T001 Confirm the toolchain: from repo root run `npx gulp default` and `node --check js/scripts.js` succeed; start the local preview `setsid python3 -m http.server 8000 --bind 127.0.0.1 >/tmp/preview.log 2>&1 < /dev/null &` and confirm `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8000/` returns 200.
- [X] T002 Capture a Spanish baseline: record the current visible text of each region listed in data-model.md (nav, hero/intro, Proposito, La Boda, map pane, #dc-modal incl. Fiebre Amarilla, #rec-modal, RSVP form, footer) to compare against after tagging (regression reference for US1).

**Checkpoint**: Build works, preview serves, Spanish baseline recorded.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the translation mechanism (attributes + dictionary + handler) that BOTH
user stories rely on. US1 needs the attributes to prove no-regression; US2 needs the handler.

**⚠️ CRITICAL**: No user-story acceptance can be validated until this phase is complete.

- [X] T003 Define the key namespacing convention and the attribute contract in a short comment block at the top of the i18n code in `js/scripts.js`: text nodes use `data-i18n="<region.key>"`, input placeholders use `data-i18n-ph="<region.key>"`, per contracts/README.md Contract B and data-model.md.
- [X] T004 Add the ES/EN toggle handler to `js/scripts.js` (ES5/jQuery, matching existing style): an in-memory `lang` var defaulting to `"es"`; a `setLanguage(lang)` that, for each `[data-i18n]`, caches the original Spanish once via `.data('i18n-es', ...)` then sets `EN_DICT[key] || cachedSpanish`; same for `[data-i18n-ph]` placeholders; updates `document.documentElement.lang`; toggles the active-state class on the nav control. NO persistence (no localStorage). Do NOT modify the `#rsvp-form` submit handler or `MD5`/`validCodes` logic (FR-007).
- [X] T005 Add an empty-but-structured `EN_DICT = { ... }` object literal in `js/scripts.js` (flat ES5 map) as the single home for English overrides; entries are filled per region in US2 tasks.
- [X] T006 Rebuild `js/scripts.min.js` via `npx gulp minify-js` and re-run `node --check js/scripts.js`; confirm the page still loads with no console errors and existing behavior (countdown, smooth scroll, modals, map, RSVP) is unchanged.

**Checkpoint**: Mechanism in place and inert (no keys yet → everything still Spanish). Ready for both stories.

---

## Phase 3: User Story 1 — Spanish default, no regression (Priority: P1) 🎯 MVP

**Goal**: Every visitor-facing, site-authored string is tagged with a `data-i18n`/`data-i18n-ph`
key while rendering identical Spanish to today, on load and reload, with no browser-language
detection.

**Independent Test**: Load the site fresh; confirm every region renders the exact Spanish from
the T002 baseline; confirm a browser set to English still loads in Spanish.

### Implementation for User Story 1

- [X] T007 [P] [US1] Tag the **top navigation** strings in `index.html` with `data-i18n` (`nav.intro`=Proposito, `nav.wedding`=La Boda, `nav.instagram`, `nav.network`, `nav.bogota`, `map/place`=Lugar, `cta.rsvp`=RSVP) without changing their visible Spanish text or `href`s.
- [X] T008 [P] [US1] Tag the **hero + Proposito/intro** copy in `index.html` (title, subtitle, body paragraphs) with `data-i18n`, preserving current Spanish text.
- [X] T009 [P] [US1] Tag the **"La Boda" / events** section in `index.html` (headings, ceremony/reception labels, date/time/venue captions — NOT proper nouns, dates as numbers, or map links) with `data-i18n`.
- [X] T010 [P] [US1] Tag the **map / "Como llego" pane** site-authored copy in `index.html` with `data-i18n` (buttons/labels only; the Google Map iframe and its URL are excluded per FR-010).
- [X] T011 [P] [US1] Tag the **"Importante" modal `#dc-modal`** in `index.html` (title, dress-code, dancing, international-network, and the Fiebre Amarilla heading + body) with `data-i18n`.
- [X] T012 [P] [US1] Tag the **"Recomendaciones" modal `#rec-modal`** in `index.html` (title, section headings and copy) with `data-i18n`; leave external link URLs untouched.
- [X] T013 [US1] Tag the **RSVP form** visible strings in `index.html`: section heading + submit button via `data-i18n`; the five input `placeholder`s via `data-i18n-ph` (`rsvp.ph.email/nombre/codigo/musica/restricciones`); the two select prompt options and the real option **labels** via `data-i18n`. **Do NOT touch any `name=` attribute or any `<option value="…">`** (FR-007 / contracts Contract A). Same-file, sequential after other tagging to avoid conflicts.
- [X] T014 [P] [US1] Tag the **footer** site-authored copy in `index.html` with `data-i18n` (leave credits/links/proper nouns as appropriate).
- [X] T015 [US1] Regression check: reload the preview and diff every region against the T002 Spanish baseline — text must be byte-identical (attributes must not alter rendering). Verify a browser/profile set to English still loads Spanish (FR-009). No console errors.

**Checkpoint**: Site is fully tagged and still 100% Spanish with zero visible change → US1 delivered (MVP baseline safe).

---

## Phase 4: User Story 2 — Switch the site to English (Priority: P1)

**Goal**: A visible ES/EN nav control switches all tagged content to English in place (with
Spanish fallback for any missing key), toggles back to Spanish, does not persist, and never
alters submitted RSVP data.

**Independent Test**: From the Spanish site, click EN → all tagged regions become English on
the same page; click ES → back to Spanish; reload → Spanish; submit in EN → sheet stores
Spanish values.

### Implementation for User Story 2

- [X] T016 [US2] Add the **ES / EN control** markup to the header nav in `index.html` (both labels always visible, e.g. `.lang-es` / `.lang-en` activators inside `member-actions`), reachable in the mobile/hamburger nav (FR-002, FR-008). Wire clicks to `setLanguage('es')` / `setLanguage('en')`.
- [X] T017 [US2] Add a minimal SCSS block in `sass/styles.scss` for the language control: separator between ES/EN, active-state highlight (reuse existing `.header a` color vars), and mobile legibility; then recompile with `npx gulp sass` → `css/styles.min.css`.
- [X] T018 [P] [US2] Populate `EN_DICT` in `js/scripts.js` with English for **navigation + hero/intro + Proposito** keys (T007–T008).
- [X] T019 [P] [US2] Populate `EN_DICT` with English for **events, map pane, footer** keys (T009, T010, T014).
- [X] T020 [P] [US2] Populate `EN_DICT` with English for **`#dc-modal` (incl. Fiebre Amarilla) and `#rec-modal`** keys (T011, T012).
- [X] T021 [US2] Populate `EN_DICT` with English for the **RSVP form** display strings (heading, placeholders, submit, select prompts, and option **labels** only — values stay Spanish) (T013).
- [X] T022 [US2] Rebuild `js/scripts.min.js` (`npx gulp minify-js`) and `node --check js/scripts.js`; confirm no syntax/console errors.
- [X] T023 [US2] Verify the toggle end-to-end on the preview: EN switches all regions (incl. both modals) in place with no reload and EN highlighted; ES restores exact Spanish (lossless round-trip); `<html lang>` updates. Confirm mobile-width toggle works (FR-008).
- [X] T024 [US2] Verify **fallback** (FR-005): temporarily remove one `EN_DICT` key → that element stays Spanish in EN mode, no blank/console error; restore the key.
- [X] T025 [US2] Verify **RSVP data contract** (FR-007, contracts Contract A): in EN mode submit a valid RSVP (choose a comida/trago) → success modal; confirm the Google Sheet row stores Spanish values (`Carne`, `Whisky`, …) identical to a Spanish-mode submission; confirm an invalid invite code is still rejected (MD5 check unaffected).

**Checkpoint**: Full ES⇄EN toggle works, no persistence, RSVP data unchanged → US2 delivered.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [X] T026 [P] Confirm scope exclusions (FR-010): toggling does NOT change the Google Map iframe, add-to-calendar widget, Instagram embed, photos, background video, or external links, in either language.
- [X] T027 [P] Cross-browser + responsive pass: run the full quickstart.md checklist in two browsers and at a mobile width; no regressions to countdown, smooth-scroll nav, modals, or map.
- [X] T028 Final build hygiene: ensure `js/scripts.min.js` and `css/styles.min.css` are regenerated and consistent with source; confirm only intended files changed (`index.html`, `js/scripts.js`, `js/scripts.min.js`, `sass/styles.scss`, `css/styles.min.css`) with no unrelated CRLF churn.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup — **BLOCKS both user stories** (T003–T006).
- **US1 (Phase 3)**: Depends on Foundational. Delivers the tagged, still-Spanish baseline (MVP).
- **US2 (Phase 4)**: Depends on Foundational; the `EN_DICT` population tasks (T018–T021) depend
  on the corresponding US1 tagging (each key must exist on an element first). The control markup
  (T016) and SCSS (T017) depend only on Foundational.
- **Polish (Phase 5)**: Depends on US2 complete.

### Within/Across Stories

- Both stories are P1; recommended order is US1 → US2 because US2's dictionary references keys
  created in US1. US1 alone is a safe, shippable increment (no visible change, safety net).
- Most `index.html` tagging tasks (T007–T012, T014) are `[P]` — independent regions — but T013
  (RSVP) and T015 (regression check) run after the others to avoid same-file merge conflicts and
  because the check needs all tags present.
- `EN_DICT` population tasks (T018–T021) are `[P]` relative to each other (distinct key blocks in
  the same object — coordinate to avoid literal edit conflicts, or apply sequentially).

### Parallel Opportunities

- Setup: T001/T002 sequential (baseline needs a working serve).
- US1: T007–T012 and T014 can be prepared in parallel (different regions of `index.html`).
- US2: T018–T021 dictionary blocks can be authored in parallel, then a single rebuild (T022).

---

## Implementation Strategy

### MVP first
1. Phase 1 Setup → 2. Phase 2 Foundational → 3. Phase 3 US1 → **STOP & VALIDATE** the site is
   still perfectly Spanish (zero regression). This is a safe checkpoint even if English is
   deferred.

### Incremental delivery
- After US1 validates, do US2 (control + dictionary) → validate ES⇄EN, fallback, and the RSVP
  data contract → then Polish. Commit after each logical group (per Constitution V, staging only
  the five intended files).

## Notes

- `[P]` = different files or independent regions, no ordering dependency.
- The RSVP submit handler, `name` attributes, and `<option value>`s are OFF-LIMITS (FR-007).
- Recompile minified assets after every JS/SCSS edit — the page loads `*.min.*`.
- Use UTF-8-safe file-based Python patches for all content edits (accents + apostrophes).
- No persistence anywhere: default Spanish on every load (FR-006).
