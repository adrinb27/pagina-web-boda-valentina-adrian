# Contracts: Bilingual Language Toggle

**Feature**: 003-language-toggle | **Phase**: 1 | **Date**: 2026-07-13

This feature exposes **no programmatic/network API** — it is a client-side presentation change
on a static site. There are, however, two contracts that implementation MUST honor: one
preserved (the RSVP submission) and one internal (the DOM/dictionary shape).

## Contract A — RSVP submission payload (PRESERVED, must not change)

**Source of truth**: `$('#rsvp-form').serialize()` → `$.post(<Google Apps Script /exec>, data)`.

The serialized payload MUST be byte-identical whether the site is displayed in Spanish or
English. This is guaranteed by construction:

| Field (`name`) | Submitted value source | Translation touches it? |
|----------------|------------------------|-------------------------|
| `email` | typed `.value` | no (placeholder only) |
| `nombre` | typed `.value` | no (placeholder only) |
| `codigo_invitacion` | typed numeric `.value` (checked via `MD5`) | no (placeholder only) |
| `musica` | typed `.value` | no (placeholder only) |
| `restricciones` | typed `.value` | no (placeholder only) |
| `comida` | `<option value>` (`Carne`/`Pollo`/`Vegetariano`) | **no** — only visible label translates |
| `trago` | `<option value>` (`Whisky`/`Aguardiente`/…) | **no** — only visible label translates |

Rules enforced by the implementation:
1. No element inside `<form id="rsvp-form">` may have its `name` attribute translated/removed.
2. No `<option value="…">` may be changed; only the option's visible text may carry
   `data-i18n`.
3. The submit handler `$('#rsvp-form').on('submit', …)` and the `validCodes`/`MD5` invite-code
   check are NOT modified.

**Verification**: quickstart §3 submits in English and confirms the stored Google Sheet row
holds the same Spanish values as a Spanish-mode submission.

## Contract B — DOM + dictionary shape (INTERNAL)

Markup:
- Text nodes to translate carry `data-i18n="<key>"`; input placeholders carry
  `data-i18n-ph="<key>"`. Keys are stable, namespaced strings (see data-model.md).
- The nav language control exposes two activators (e.g. `.lang-es` and `.lang-en`) and reflects
  state with an `is-active` (or equivalent) class; the handler also sets
  `document.documentElement.lang`.

Dictionary (`js/scripts.js`):
- `EN_DICT` is a flat ES5 object literal `{ "<key>": "<English>" }`.
- Lookup contract: `text = EN_DICT[key] || originalSpanish`. A missing/empty entry MUST fall
  back to the cached Spanish (no blank output, no throw).

Behavior:
- `es → en`: for each `[data-i18n]`, cache original Spanish once, then set English (or keep
  Spanish on miss); same for `[data-i18n-ph]` placeholders.
- `en → es`: restore cached Spanish text/placeholders exactly.
- No persistence is read or written; default is Spanish on load.

## No other contracts

There are no REST endpoints, schemas, events, or shared libraries introduced by this feature,
so `contracts/` contains only this document (mirrors the 002 feature's convention).
