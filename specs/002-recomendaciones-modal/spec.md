# Feature Specification: Recomendaciones Button & Modal

**Feature Branch**: `002-recomendaciones-modal`

**Created**: 2026-06-24

**Status**: Draft

**Input**: User description: "Add a 'Recomendaciones' (Recommendations) button and modal panel to the wedding website. A new button labeled 'Recomendaciones' appears in the map info pane (#map-content) alongside the existing 'Book Uber' and 'Show map' buttons, mirroring the existing 'Dress code' button/modal pattern. Clicking it opens a new Bootstrap modal styled like #dc-modal, containing four Spanish sections (Alojamientos, Transporte, Restaurantes/Turismo, Fuera de Bogota) with placeholder copy and example hyperlinks. Static HTML/CSS content addition only, no new JS."

## Clarifications

### Session 2026-06-24

- Q: Where should the "Recomendaciones" button sit relative to the existing "Book Uber" / "Show map" button row in `#map-content`? → A: In its OWN new centered row directly below the existing two-button row; the existing 50/50 "Book Uber | Show map" row is left UNCHANGED (mirrors the existing Dress code trigger pattern: a `row` with a single `col-md-4 col-md-offset-4 text-center` column).
- Q: How should the example hyperlinks inside the Recomendaciones modal open? → A: In a NEW browser tab, using `target="_blank"` plus `rel="noopener"`. This is an intentional, scoped exception to the site's prevailing same-tab convention, justified because the links point to external third-party sites (hotels, restaurants, transport, tourism); the exception applies ONLY to the recommendation links.
## User Scenarios & Testing *(mandatory)*

### User Story 1 - Guest finds local recommendations from the map pane (Priority: P1)

A wedding guest is reading the "How do I get there?" map section and opens the map
info pane. Alongside the existing "Book Uber" and "Show map" buttons, they see a new
"Recomendaciones" button. They tap it and a popup opens with curated recommendations in
Spanish grouped into Alojamientos, Transporte, Restaurantes/Turismo, and Fuera de
Bogota, each containing helpful links they can follow.

**Why this priority**: This is the entire feature. Without it there is no way for guests
to reach the recommendations, so it must work end-to-end to deliver any value.

**Independent Test**: Serve the site locally, scroll to the map section, open the info
pane, click "Recomendaciones", and confirm the modal opens with the four sections and
working example links, then closes again. This fully exercises the feature on its own.

**Acceptance Scenarios**:

1. **Given** the map section info pane is visible, **When** the guest views the button
   row containing "Book Uber" and "Show map", **Then** a "Recomendaciones" button is also
   present in a new centered row directly below that row and is visually consistent with
   the other buttons.
2. **Given** the guest is looking at the info pane, **When** they click/tap the
   "Recomendaciones" button, **Then** a modal opens showing the title "Recomendaciones".
3. **Given** the Recomendaciones modal is open, **When** the guest reads it, **Then** it
   shows four headed sections (Alojamientos, Transporte, Restaurantes/Turismo, Fuera de
   Bogota), each with Spanish descriptive text and at least one example hyperlink.
4. **Given** the Recomendaciones modal is open, **When** the guest clicks the close
   control (or outside the dialog), **Then** the modal closes and returns them to the
   page unchanged.

### Edge Cases

- **Small screens**: On mobile widths the button row already stacks; the new button must
  remain tappable and the modal readable without horizontal scrolling, the same way the
  existing Dress code modal behaves.
- **Example links**: The placeholder hyperlinks point at obvious example URLs and are not
  real destinations yet; following one opens the example
  domain in a new browser tab (`target="_blank" rel="noopener"`). Final URLs will be
  supplied later by the couple and are out of scope here.
- **Multiple modals**: Opening "Recomendaciones" must not interfere with the existing
  Dress code or RSVP modals; only one modal is open at a time per Bootstrap's default
  behaviour.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST present a new button labeled "Recomendaciones" inside the map
  info pane (the `#map-content` panel of the `#map` section), in a new centered row directly
  below the existing "Book Uber" and "Show map" button row, which is left unchanged. The
  new row mirrors the existing Dress code trigger pattern (a single centered column).
- **FR-002**: The "Recomendaciones" button MUST reuse the existing button styling
  conventions used by the surrounding buttons (the same Bootstrap `btn` class family and
  sizing) and include a Font Awesome 4 icon consistent with the site's existing icons.
- **FR-003**: Activating the "Recomendaciones" button MUST open a single Bootstrap modal
  using the site's existing data-toggle/data-target modal mechanism (no custom
  JavaScript).
- **FR-004**: The Recomendaciones modal MUST mirror the structure and styling of the
  existing Dress code modal (`#dc-modal`): the same modal/dialog/content/body markup, a
  close control, and a centered `<h3>` title reading "Recomendaciones".
- **FR-005**: The modal MUST contain exactly four sections, each introduced by an `<h5>`
  heading, in this order: "Alojamientos", "Transporte", "Restaurantes/Turismo", and
  "Fuera de Bogota".
- **FR-006**: Each of the four sections MUST contain one or more `<p>` paragraphs of
  placeholder descriptive copy written in Spanish (a few sentences each) to occupy the
  space until final copy is provided.
- **FR-007**: Each of the four sections MUST embed at least one (preferably one or two)
  example hyperlink(s) within its text, using obvious placeholder example URLs that the
  couple can later replace with real links. Because these point to external third-party
  sites, each link MUST open in a new browser tab using `target="_blank"` together with
  `rel="noopener"` (a scoped exception to the site's usual same-tab convention).
- **FR-008**: All guest-facing wording introduced by this feature (button label, modal
  title, section headings, body copy) MUST be in Spanish, consistent with the recently
  localized site.
- **FR-009**: The change MUST be limited to static HTML/CSS content. It MUST NOT introduce
  new JavaScript behaviour beyond Bootstrap's existing data-toggle modal mechanism, and
  MUST NOT alter the map itself or redesign existing sections.

### Key Entities

Not applicable - this feature adds static presentational content only and involves no
data model.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A guest viewing the map info pane can locate and open the recommendations
  in a single tap on the "Recomendaciones" button.
- **SC-002**: The opened modal displays all four recommendation sections (Alojamientos,
  Transporte, Restaurantes/Turismo, Fuera de Bogota) with visible Spanish copy and at
  least one example link per section.
- **SC-003**: 100% of guest-facing text introduced by the feature is in Spanish.
- **SC-004**: The recommendations modal looks and behaves like the existing Dress code
  modal (open, scroll, close) with no visual regressions to other sections of the page,
  as verified during local testing.
- **SC-005**: No new JavaScript files or scripts are added; the feature works using only
  the existing Bootstrap modal behaviour already present on the site.

## Assumptions

- The placeholder Spanish copy and example URLs are intentionally generic; the couple will
  replace them with final recommendations and real links in a later content pass.
- The new modal uses an id such as `#rec-modal` (final id chosen during implementation),
  following the naming style of the existing `#dc-modal`.
- A suitable existing Font Awesome 4 icon (e.g. `fa-star` or `fa-map-signs`) is used for
  the button; the exact icon is an implementation detail as long as it fits the site's
  visual style. (`fa-info-circle` is already used by the pane's "Show info" toggle, so a
  different icon is preferred to avoid confusion.)
- No SCSS/CSS changes are expected because the feature reuses existing modal and button
  styles; if minor styling proves necessary it stays within the existing stylesheet
  conventions and build (Constitution Principles I and II).
- "Fuera de Bogota" covers out-of-town / day-trip recommendations outside Bogota; the
  city context comes from the wedding location.
