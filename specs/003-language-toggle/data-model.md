# Data Model: Bilingual Language Toggle

**Feature**: 003-language-toggle | **Phase**: 1 | **Date**: 2026-07-13

This is a presentational, client-side feature with no database and no persisted records. The
"data" here is the in-memory language state and the static translatable-content inventory.

## Entities

### 1. Active Language (runtime state)
| Field | Values | Notes |
|-------|--------|-------|
| `lang` | `"es"` \| `"en"` | Single in-memory variable. **Default `"es"`** on every page load. |
| persistence | none | Not stored anywhere (FR-006); resets to `"es"` on reload. |

Transitions: `es → en` (click EN), `en → es` (click ES). Also mirrored onto
`document.documentElement.lang` and the active-highlight class on the nav control.

### 2. Translatable Content Unit
| Field | Meaning |
|-------|---------|
| `key` | Stable identifier on the element: `data-i18n="key"` (text) or `data-i18n-ph="key"` (placeholder). |
| Spanish source | The literal element text / `placeholder` in `index.html` — canonical, always present. |
| English value | `EN_DICT[key]` in `js/scripts.js`; optional. |
| fallback | If `EN_DICT[key]` is missing/empty, the Spanish source is retained (FR-005). |
| cached ES | On first toggle, stored via `.data('i18n-es', …)` so ES restore is lossless. |

Scope rule: a Content Unit exists **only** for site-authored, visitor-facing copy (FR-004).
Excluded: guest-entered RSVP values, form `name` attributes, `<option value>`s, third-party
widget text (map iframe, Instagram embed), URLs, and asset filenames.

### 3. Translation Dictionary
`EN_DICT` — a flat ES5 object literal, `{ "key": "English string", … }`. One entry per English
override. Keys are namespaced by region for readability (see inventory). No nested objects,
no build step.

## Translatable-string inventory (by region)

Keys are illustrative namespaces to be finalized during implementation; the count guides scope
(~40-60 units total). Each row = one or more Content Units.

| Region (in `index.html`) | Example keys | Kind |
|--------------------------|--------------|------|
| Header nav | `nav.intro`, `nav.wedding`, `nav.instagram`, `nav.network`, `nav.bogota`, `nav.place`, `nav.rsvp` | text |
| Language control | `lang.es`, `lang.en` | text (labels only; not swapped by dict) |
| Hero / intro | `intro.title`, `intro.subtitle`, `intro.body` | text |
| Events ("La Boda") | `events.heading`, `events.ceremony`, `events.reception`, date/venue labels | text |
| Countdown / RSVP CTA | `cta.rsvp`, countdown labels | text |
| Map pane | `map.info`, `map.showMap`, any Spanish button copy (NOT the iframe) | text |
| "Importante" modal (`#dc-modal`) | `dc.title`, dress-code paragraphs, `dc.fiebre.title`, `dc.fiebre.body` | text |
| Recomendaciones modal (`#rec-modal`) | `rec.title`, section headings + copy | text |
| RSVP form | `rsvp.heading`, input placeholders (`rsvp.ph.email`, `rsvp.ph.nombre`, `rsvp.ph.codigo`, `rsvp.ph.musica`, `rsvp.ph.restricciones`), select prompts (`rsvp.comida.prompt`, `rsvp.trago.prompt`), option labels (`rsvp.comida.carne`…), submit button `rsvp.submit` | text + placeholder |
| RSVP confirmation modal | success/error messages that are site-authored | text |
| Footer | footer copy, credits (site-authored parts) | text |

**Data-safety annotations**:
- RSVP `<input name="…">` and `<select name="…">` — NEVER tagged (structural, submitted).
- `<option value="Carne">Carne</option>` — only the visible text "Carne" may be tagged; the
  `value="Carne"` is preserved, so `serialize()` still sends `comida=Carne` in English mode.
- Disabled prompt options (`value=""`, e.g. "Escoge tu proteina") — text tagged safely (empty
  value + `required` prevent submission of the prompt).

## Validation rules (implementation-time)

- Every `data-i18n` / `data-i18n-ph` key SHOULD have an `EN_DICT` entry; a missing key is a
  soft failure (Spanish shown), never an error.
- No element inside the RSVP `<form>` may have its `name` or `<option value>` altered.
- Toggling EN then ES MUST return every Content Unit to its exact original Spanish (verified
  by the quickstart round-trip check).
