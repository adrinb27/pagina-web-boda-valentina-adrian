# Implementation Plan: Spanish RSVP Form with Updated Guest Preference Fields

**Branch**: `001-rsvp-form-spanish` | **Date**: 2026-06-23 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-rsvp-form-spanish/spec.md`

## Summary

Redesign the existing RSVP form so guests confirm attendance in Spanish and provide four new
preferences (song, dietary restrictions, protein, drink) instead of the old "extras" headcount.
The change spans three layers that must stay in lockstep: the form markup in `index.html`, the
client submission/validation logic in `js/scripts.js` (re-minified to `js/scripts.min.js`), and the
Google Apps Script handler the couple pastes into their own Apps Script project. Field submitted
keys must exactly match the responses-sheet column headers (`email`, `nombre`, `codigo_invitacion`,
`musica`, `restricciones`, `comida`, `trago`). The invite-code key is renamed from `invite_code` to
`codigo_invitacion`. Both the browser (single-select inputs) and the handler (server-side set
validation) enforce that `comida`/`trago` stay within their allowed option sets, mirroring the
existing invite-code validation. The post-submission success modal is out of scope.

## Technical Context

**Language/Version**: HTML5, CSS3 (SCSS compiled), JavaScript ES5 (jQuery 1.11.2); Google Apps
Script (server handler, ECMAScript-based, runs on Google's V8 runtime)

**Primary Dependencies**: jQuery 1.11.2; Bootstrap 3 (modal/grid); a vendored MD5 function in
`scripts.js`; Google Maps JS API (unrelated to this feature); gulp 5 + gulp-uglify + gulp-sass +
gulp-rename for the build

**Storage**: Google Sheet ("responses" tab) accessed by the Apps Script via
`SpreadsheetApp`; the website itself holds no storage

**Testing**: No automated test framework in the repo (`npm test` is a placeholder). Verification is
manual: serve the static site locally (`python3 -m http.server`) and exercise the form; validate the
Apps Script via direct POSTs with proxy data including a valid invite code

**Target Platform**: Static site served over HTTP (currently local; self-hosted later). Modern
desktop + mobile browsers. Apps Script runs as a Google-hosted Web App (`/exec` endpoint)

**Project Type**: Static marketing/single-page website (Option 1, single project) with an external
serverless form-handler script

**Performance Goals**: Not performance-sensitive — a handful of RSVP submissions total. No latency or
throughput targets beyond "form submit feels instant" (single XHR to Apps Script)

**Constraints**: ES5-compatible JS only (no build-time transpiler for app JS; jQuery 1.11 era).
Any `scripts.js` change MUST be re-minified into `scripts.min.js` because the page loads the
minified file. Field submitted keys MUST equal sheet column headers. Apps Script `e.parameters`
returns arrays, so server-side comparisons must coerce with `String(...)`

**Scale/Scope**: ~4 invite codes, low tens of guests. Scope is one form section in `index.html`, one
RSVP block in `scripts.js`/`scripts.min.js`, and one Apps Script handler file shared with the couple

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution (`.specify/memory/constitution.md`) is an unpopulated template with no
ratified principles, sections, or governance rules. There are therefore no constitutional gates to
evaluate. **Result: PASS (vacuously).** No violations, no entries required in Complexity Tracking.

If the couple later ratifies a constitution (e.g. requiring tests-first), this feature's lack of an
automated test harness would need to be revisited.

## Project Structure

### Documentation (this feature)

```text
specs/001-rsvp-form-spanish/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── rsvp-form-submission.md   # Browser → Apps Script POST contract
│   └── apps-script-handler.md    # Handler behavior + response contract
├── checklists/
│   └── requirements.md  # Spec quality checklist (already validated)
├── spec.md              # Feature spec (clarified)
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created here)
```

### Source Code (repository root)

```text
index.html               # Contains the #rsvp section + #rsvp-form (lines ~417-490)
js/
├── scripts.js           # Source: RSVP submit handler + MD5 invite validation (~line 211)
└── scripts.min.js       # Built artifact loaded by the page — MUST be regenerated from scripts.js
sass/
└── styles.scss          # Source styles (compiled to css/styles.min.css; only if new field styling needed)
css/
└── styles.min.css       # Built CSS artifact
gulpfile.js              # `gulp` default task: sass + minify-js (scripts.js -> scripts.min.js)

# External (NOT in this repo — delivered as an artifact to paste into Google Apps Script):
specs/001-rsvp-form-spanish/contracts/apps-script-handler.md  # documents the handler the couple pastes
```

**Structure Decision**: Single static-site project (Option 1). All web changes live at the repo
root (`index.html`, `js/`, optionally `sass/`). The Apps Script handler is not part of the deployable
site — it is authored as a documented contract/snippet the couple installs in their own Google Apps
Script project and redeploys. The build step (`gulp` or `gulp minify-js`) bridges `scripts.js` →
`scripts.min.js`; this is the single most error-prone step and is called out explicitly in tasks.

## Complexity Tracking

> No constitution violations — table intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | —          | —                                    |
