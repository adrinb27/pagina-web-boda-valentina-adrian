# Phase 0 Research: Spanish RSVP Form

All Technical Context items were resolvable from the existing codebase and the clarified spec; there
were no open `NEEDS CLARIFICATION` markers. This document records the design decisions and the
existing constraints that shape them.

## Decision 1 — Keep the existing stack (HTML + jQuery + gulp), no new frameworks

- **Decision**: Implement the form change as plain HTML inputs plus edits to the existing jQuery
  submit handler. No build-system, framework, or dependency changes.
- **Rationale**: The site is a single static page already wired with jQuery, Bootstrap, and a gulp
  minify step. The change is purely additive form fields + string translation + one renamed key. A
  framework would add disproportionate complexity for a four-code, low-tens-of-guests wedding site.
- **Alternatives considered**: Rebuild the form as a small component (React/Vue) — rejected as
  massive over-engineering. Use native HTML5 `required`/`pattern` validation only — kept for
  client-side UX, but the spec requires server-side set validation too (FR-014), so the handler
  remains the source of truth.

## Decision 2 — Input types for the four new fields

- **Decision**: `musica` (song) and `restricciones` (dietary) are free-text `<input type="text">`.
  `comida` (protein) and `trago` (drink) are single-select `<select>` dropdowns whose `<option>`
  values are exactly the allowed set members.
- **Rationale**: FR-002/FR-003 specify free text; FR-004/FR-005/FR-015 require exactly one choice
  from a closed set. A `<select>` is the simplest ES5/Bootstrap-friendly single-select control and
  naturally yields a single value matching the option set. Radio buttons were an option but consume
  more vertical space and complicate the two-column grid layout.
- **Alternatives considered**: Radio groups (rejected: layout cost), free-text with client regex
  (rejected: weaker guarantee than a closed dropdown + server validation).

## Decision 3 — Rename invite-code key to `codigo_invitacion` end to end

- **Decision**: The invite input's `name`/`id` becomes `codigo_invitacion`; the client reads it via
  that selector for MD5 validation; the Apps Script validates `String(mailData.codigo_invitacion)`
  and records it under the `codigo_invitacion` column.
- **Rationale**: FR-007/FR-012 + Clarification Q3 require one consistent key that both validates and
  records. The handler maps fields to columns by header-name match, so the submitted key, the client
  selector, and the column header must all be the identical string.
- **Alternatives considered**: Keep `invite_code` as the wire key but rename only the column
  (rejected: breaks header-name mapping and contradicts the clarification).

## Decision 4 — Server-side validation for protein/drink (defense in depth)

- **Decision**: The Apps Script rejects any submission whose `comida` is outside {Carne, Pollo,
  Vegetariano} or whose `trago` is outside {Whisky, Aguardiente, Vino Blanco, Vino Tinto, Cerveza,
  Vodka}, returning a Spanish error and recording nothing — mirroring the existing invite-code check.
- **Rationale**: FR-014 + Clarification Q1. The browser dropdown prevents out-of-set values in normal
  use, but a crafted POST could bypass it. Server validation guarantees SC-005 regardless of client.
- **Alternatives considered**: Trust the dropdown only (rejected: spec explicitly requires server
  enforcement). Coerce/normalize unknown values to a default (rejected: silently corrupts intent).

## Decision 5 — Coerce Apps Script parameters with `String(...)`

- **Decision**: All handler-side value comparisons (invite code, comida, trago) read
  `String(mailData.<key>)` before comparing against the allowed arrays via `indexOf`.
- **Rationale**: Established the hard way in prior work — Apps Script `e.parameters` (plural) returns
  arrays, so `["990427"]` never `===` `"990427"` and `indexOf` rejects everything. `String(...)`
  flattens the single-valued array to its string form. This is a known, load-bearing constraint.
- **Alternatives considered**: Use `e.parameter` (singular) which returns scalars — viable, but the
  existing handler is built around `e.parameters`; standardizing on `String(mailData.x)` is the
  smaller, proven diff.

## Decision 6 — Re-minify `scripts.js` → `scripts.min.js` via gulp

- **Decision**: After editing `scripts.js`, regenerate `scripts.min.js` by running the gulp
  `minify-js` task (or `gulp` default). Verify the minified file contains the new endpoint logic.
- **Rationale**: `index.html` loads `js/scripts.min.js`, not the source. Editing only `scripts.js`
  would ship no behavior change. gulp 5 is already configured. If gulp is unavailable in the
  environment, a hand-mirrored edit of the minified file is the documented fallback (both files must
  end up consistent).
- **Alternatives considered**: Point the page at the unminified `scripts.js` (rejected: changes the
  site's loading contract and diverges from upstream layout).

## Decision 7 — Success modal left unchanged (out of scope)

- **Decision**: Do not translate or re-content the `#rsvp-modal` success popup / Add-to-Calendar
  block in this feature.
- **Rationale**: Clarification Q2 scoped the "no English" requirement to the form up to submission.
  The modal's calendar event details belong to a later content spec.
- **Alternatives considered**: Translate the modal now (rejected: expands scope; the calendar event
  details are wrong for this wedding and need their own data-gathering pass).

## Existing constraints captured (for downstream phases)

- The responses sheet's **header row** must be updated by the couple to: timestamp, `email`,
  `nombre`, `codigo_invitacion`, `musica`, `restricciones`, `comida`, `trago` (record_data maps by
  header name; a missing/renamed header silently drops that field's value).
- App JS must remain **ES5-compatible** (no arrow functions / `let` in `scripts.js`) to match the
  surrounding code and minifier expectations.
- The four invite-code **MD5 hashes** are already embedded client-side and validated server-side by
  raw code; both lists must continue to agree on {990427, 920427, 950909, 257515}.
