# Research: Bilingual Language Toggle (Spanish / English)

**Feature**: 003-language-toggle | **Phase**: 0 | **Date**: 2026-07-13

This document records the technical decisions behind the plan. All decisions honor the
constitution (minimal footprint, match existing patterns, keep it simple) and the clarified
spec (Spanish default, no persistence, only site-authored copy, RSVP logic unchanged).

## Decision 1 — Client-side, attribute-based, in-place translation

**Decision**: Keep the existing single `index.html` and translate in place on the client.
Tag each site-authored string with a `data-i18n="key"` attribute; hold English strings in a
JS dictionary; swap text with jQuery when the visitor picks a language.

**Rationale**: The site is one static page with no build-time templating and no backend.
Attribute + dictionary swapping is the smallest change that reuses the existing ES5/jQuery +
gulp stack and touches no server. It keeps all copy in one place (the HTML) as the canonical
Spanish source.

**Alternatives rejected**:
- *Separate `index.html` / `index-en.html` pages*: doubles the maintenance surface, needs
  routing/links, and duplicates the RSVP form and all modals — violates Minimal Footprint and
  Keep-It-Simple.
- *A third-party i18n library (i18next, Polyglot, etc.)*: adds a dependency and a new pattern
  the rest of the site does not use — violates Match-Patterns and Keep-It-Simple for ~50
  strings.

## Decision 2 — Spanish authored in HTML is the source of truth (default + fallback)

**Decision**: Leave the Spanish copy as the literal text/`placeholder` content of each
element. English lives only in the dictionary. Toggling to EN overwrites text; toggling to ES
restores the cached original Spanish.

**Rationale**: This makes Spanish the default with zero JavaScript (FR-001) and the guaranteed
fallback for any untranslated key (FR-005) — if the dictionary lacks a key, the element simply
keeps its Spanish text. It also means "reset to Spanish on reload" is free: the page's own
markup is Spanish, so no restore logic runs on load.

**Mechanism detail**: On first toggle, cache each element's original Spanish via
`$el.data('i18n-es', $el.text())` (and placeholder equivalent) so ES ⇄ EN is lossless.

## Decision 3 — No persistence (per-page-view only)

**Decision**: Do not use `localStorage`, cookies, or the URL. Language is a single in-memory
variable that resets on every load.

**Rationale**: Directly implements the clarified FR-006 ("Don't remember — always starts in
Spanish every load"). Removing storage also removes a class of bugs (stale/blocked storage,
privacy prompts) and keeps the handler tiny.

## Decision 4 — RSVP data contract is preserved without touching the handler

**Decision**: Translate only visible labels, headings, button captions, input `placeholder`s,
and `<option>` display text. Never touch `name` attributes or `<option value>`s. Do not modify
`$('#rsvp-form').on('submit', ...)`.

**Rationale / evidence**: Submission uses `$(this).serialize()`, which emits `name=value`
pairs. Inspection of `index.html` confirms every real choice carries an explicit value
(`value="Carne"`, `value="Whisky"`, …) and the disabled prompt options are `value=""`. So a
guest can read "Beef" while the sheet still receives `Carne`. The invite-code field is
`type="number"` and its `MD5` check reads `.val()` (the typed number), which display language
never changes. Result: FR-007 holds with no handler edit — the serialized payload is identical
in either language.

**Guardrail**: A quickstart step submits the form in English and confirms the Google Sheet row
matches a Spanish submission (Spanish values), proving the contract.

## Decision 5 — Toggle placement in the top navigation

**Decision**: Add a compact `ES / EN` control to the header nav (near `member-actions`), both
labels always visible, the active one highlighted. Style it with the existing `.header a`
rules plus one small SCSS block for the active/separator treatment. Ensure it is reachable in
the mobile nav as well.

**Rationale**: Matches the clarified UX choice (A), fits Bootstrap 3's existing nav, and needs
no new component. Setting `document.documentElement.lang` on toggle keeps the `<html lang>`
accurate for accessibility.

## Decision 6 — UTF-8-safe authoring in the Windows + WSL environment

**Decision**: Make all `index.html` / `scripts.js` / `styles.scss` edits with file-based
Python patch scripts (`io.open(..., encoding="utf-8", newline="")`, assert single-match before
replace). Avoid shell heredocs and `sed`/`awk` for content edits.

**Rationale**: The repo mixes accented Spanish ("invitación", "canción", "Aguardiente") with
English apostrophes; prior work in this repo hit a decomposed-accent corruption
(`Adrián.jpg`). Heredocs also break across the PowerShell→WSL boundary here. File-based Python
edits preserve encoding and line endings and fail loudly on ambiguous matches.

## Decision 7 — Build & verification discipline

**Decision**: After editing, run `npx gulp minify-js` (→ `js/scripts.min.js`) and
`npx gulp sass` (→ `css/styles.min.css`), because the page loads the minified assets. Verify
locally on `127.0.0.1:8000` before any merge.

**Rationale**: Editing only the source files would ship no visible change (the page ignores
non-minified sources). Local verification is Constitution Principle IV.

## Open items (deferred, not blocking the plan)

- Final English wording is content, authored during implementation from the Spanish source;
  the plan only fixes the mechanism and key inventory.
- Whether to also translate the browser tab `<title>`/meta description (site-authored) — treat
  as in-scope copy but low priority; covered by the same mechanism if desired.
