# Phase 1 Data Model: Recomendaciones Button & Modal

**Status: Not applicable (no data model).**

This feature adds static presentational HTML only. There are no entities, persistence,
state, API payloads, or form fields introduced or modified. Nothing is read from or
written to any store; the Google Apps Script / responses-sheet data contract is untouched.

For reference, the static *content structure* the implementation will add is described
below. This is informational markup structure, not a data model.

## Content structure (informational)

- **Trigger button** (in `#map-content`, new row below the existing button row)
  - label: "Recomendaciones"
  - classes: `btn btn-accent btn-small`
  - icon: `fa fa-map-signs` (FA4)
  - behaviour: `data-toggle="modal" data-target="#rec-modal"`

- **Modal** `#rec-modal` (mirrors `#dc-modal`)
  - close control (`button.close` with `data-dismiss="modal"`)
  - title: `<h3 class="text-center section-padding">Recomendaciones</h3>`
  - four sections, each = one `<h5>` heading + one or more `<p>` paragraphs containing
    1-2 inline example links:

    | Order | Section heading (h5)     | Copy        | Example links (target=_blank rel=noopener) |
    |-------|--------------------------|-------------|--------------------------------------------|
    | 1     | Alojamientos             | placeholder Spanish | 1-2 example URLs |
    | 2     | Transporte               | placeholder Spanish | 1-2 example URLs |
    | 3     | Restaurantes/Turismo     | placeholder Spanish | 1-2 example URLs |
    | 4     | Fuera de Bogota          | placeholder Spanish | 1-2 example URLs |

All wording is in Spanish (FR-008). Copy and URLs are placeholders to be replaced by the
couple in a later content pass (Assumptions in spec.md).
