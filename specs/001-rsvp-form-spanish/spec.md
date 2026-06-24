# Feature Specification: Spanish RSVP Form with Updated Guest Preference Fields

**Feature Branch**: `001-rsvp-form-spanish`

**Created**: 2026-06-23

**Status**: Draft

**Input**: User description: "Change the RSVP form that is sent to our Google Sheet. Remove the 'Husband/Wife or kids' (extras) field. Add four new guest-preference fields (song to dance to, dietary restrictions, protein choice, drink choice) mapped to new sheet columns (musica, restricciones, comida, trago). Translate all guest-facing form text to Spanish, and rename the email/name/invite-code columns to Spanish (email, nombre, codigo_invitacion). Update the Google Apps Script accordingly so everything works end to end, and share the updated script."

## Clarifications

### Session 2026-06-23

- Q: Should the submission handler also validate protein (`comida`) and drink (`trago`) against their allowed option sets, not just the browser dropdown? → A: Yes — validate server-side too, and enforce single-select for both (mirrors invite-code validation).
- Q: Is the post-submission success modal (the Add-to-Calendar popup, currently English with the old wedding's event details) in scope for this spec? → A: No — out of scope for now; leave the success modal as-is. The "no English" goal applies to the form itself up to submission.
- Q: Should the invite-code field's submitted key be renamed to `codigo_invitacion` across the form, client script, and handler validation? → A: Yes — rename the key to `codigo_invitacion` everywhere so it both validates and records under one consistent name.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Guest submits RSVP with preference details (Priority: P1)

An invited guest opens the wedding site, scrolls to the confirmation section, and fills in their
email, full name, invite code, the song they want to dance to, any dietary restrictions, their
protein choice, and their preferred drink. They submit and receive an on-screen confirmation. The
couple later sees the guest's answers stored as a single row in their responses spreadsheet.

**Why this priority**: This is the core purpose of the feature — collecting the new preference
information from guests so the couple can plan food, drinks, and music. Without it, the feature
delivers no value.

**Independent Test**: Can be fully tested by completing and submitting the form with a valid invite
code and confirming a new row appears in the spreadsheet with every preference value in its correct
column, and that no "extras" value is collected.

**Acceptance Scenarios**:

1. **Given** a guest with a valid invite code, **When** they complete all fields and submit, **Then** a success confirmation is shown and a new response row is recorded with email, nombre, codigo_invitacion, musica, restricciones, comida, and trago in their correct columns.
2. **Given** a guest who selects a protein, **When** they submit, **Then** the recorded value is exactly one of Carne, Pollo, or Vegetariano.
3. **Given** a guest who selects a drink, **When** they submit, **Then** the recorded value is exactly one of Whisky, Aguardiente, Vino Blanco, Vino Tinto, Cerveza, or Vodka.
4. **Given** a guest with no dietary restrictions, **When** they enter "No Aplica" and submit, **Then** that value is recorded in the restricciones column.

---

### User Story 2 - Guest experiences the form entirely in Spanish (Priority: P2)

A Spanish-speaking guest sees the confirmation section, all field labels/placeholders, the submit
button, and any inline success or error messages in Spanish, so they can confirm attendance
comfortably without encountering English text **in the form itself (up to submission)**. The
post-submission success modal is explicitly out of scope for this feature (see Assumptions).

**Why this priority**: The guests are Spanish speakers; an English form creates friction and
confusion. Important for adoption, but the data collection (P1) is the more critical slice.

**Independent Test**: Can be tested by loading the form and verifying every guest-visible string in
the confirmation flow (heading, subheading, placeholders, button, success and error messages) is in
Spanish.

**Acceptance Scenarios**:

1. **Given** a guest viewing the confirmation section, **When** the page loads, **Then** the heading reads "CONFIRMA TU ASISTENCIA!" and the subheading reads the Spanish RSVP-deadline message.
2. **Given** a guest filling the form, **When** they read each field, **Then** the placeholders are "Tu email", "Tu nombre completo", "Codigo de invitación (se encuentra en tu invitación)", and the four new preference prompts, all in Spanish.
3. **Given** a guest who submits a wrong invite code, **When** the form responds, **Then** the error message shown is in Spanish.
4. **Given** a guest who submits successfully, **When** the inline confirmation appears, **Then** the submit button reads "LISTO PARA LA FIESTA" and any inline confirmation text in the form is in Spanish. (The subsequent success modal is out of scope and may remain unchanged.)

---

### User Story 3 - Couple reads clean, correctly-named responses and email alerts (Priority: P3)

The couple opens their responses spreadsheet and sees columns with clear Spanish/meaningful names
that line up with the new form fields, and they receive an email alert for each RSVP containing all
the submitted preference values.

**Why this priority**: Improves the couple's ability to act on the data, but depends on P1 already
recording the values; it is a refinement of presentation and notification.

**Independent Test**: Can be tested by submitting an RSVP and confirming (a) the spreadsheet header
row uses the agreed column names with no leftover "extras" column, and (b) an email alert arrives
listing every submitted field.

**Acceptance Scenarios**:

1. **Given** a recorded submission, **When** the couple views the sheet, **Then** the columns are email, nombre, codigo_invitacion, musica, restricciones, comida, trago (plus the existing timestamp), with no "extras" column receiving data.
2. **Given** a successful submission, **When** the couple checks email, **Then** an alert contains all submitted field values.

---

### Edge Cases

- What happens when a guest leaves a required preference field empty? The form must block submission and prompt (in Spanish) for the missing field.
- How does the system handle a valid invite code when the spreadsheet is missing one of the new columns? Recording must not crash; missing columns are simply not populated, and the failure must not silently misalign other columns.
- What happens if a form field's identifier does not match its spreadsheet column header? The value could land in the wrong column or be dropped — field identifiers and column headers must be kept in sync.
- What happens when a guest submits an invalid invite code? Submission is rejected with a Spanish error and nothing is recorded.
- What happens when a crafted submission sends a `comida` or `trago` value outside the allowed sets (bypassing the dropdown)? The handler rejects it with a Spanish error and records nothing.
- What happens to historical responses that used the old "extras" column? Out of scope — this feature concerns the going-forward form and sheet shape.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The RSVP form MUST remove the "Husband/Wife or kids" field that previously mapped to the "extras" column; no extras value is collected or recorded going forward.
- **FR-002**: The form MUST collect a preferred song as free text, prompted "Una canción que quieran bailar (con Nombre de la canción - Nombre del artista)", recorded in the "musica" column.
- **FR-003**: The form MUST collect dietary restrictions as free text, prompted "Restricciónes alimenticias (Si no tienes pon No Aplica)", recorded in the "restricciones" column.
- **FR-004**: The form MUST let the guest choose exactly one protein from the set {Carne, Pollo, Vegetariano}, prompted "Escoge tu proteina (Carne/Pollo/Vegetariano)", recorded in the "comida" column.
- **FR-005**: The form MUST let the guest choose exactly one drink from the set {Whisky, Aguardiente, Vino Blanco, Vino Tinto, Cerveza, Vodka}, prompted "Tu bebida de preferencia (whisky/aguardiente/Vino Blanco/Vino Tinto/Cerveza/Vodka)", recorded in the "trago" column.
- **FR-006**: All guest-facing text in the confirmation flow MUST be in Spanish, including at minimum:
  - Heading: "CONFIRMA TU ASISTENCIA!"
  - Subheading: "Apreciariamos que puedas confirmar antes de 1 de Enero del 2027. Agrega toda la información para que puedas disfrutar lo más posible el evento!"
  - Email placeholder: "Tu email"
  - Name placeholder: "Tu nombre completo"
  - Invite-code placeholder: "Codigo de invitación (se encuentra en tu invitación)"
  - Submit button: "LISTO PARA LA FIESTA"
- **FR-007**: The email, name, and invite-code inputs MUST be recorded in columns named "email", "nombre", and "codigo_invitacion" respectively. The invite-code input's submitted key MUST be "codigo_invitacion" (renamed from the prior "invite_code") so it validates and records under one consistent name.
- **FR-008**: The submission handler MUST continue to validate the invite code (submitted as "codigo_invitacion") against the accepted codes {990427, 920427, 950909, 257515}, rejecting any other value, before recording data.
- **FR-009**: On a valid submission, the handler MUST record one row containing all seven values (email, nombre, codigo_invitacion, musica, restricciones, comida, trago) in their correct columns and MUST send the couple an email alert containing those values.
- **FR-010**: The responses spreadsheet's header row MUST consist of the existing timestamp column followed by: email, nombre, codigo_invitacion, musica, restricciones, comida, trago — and MUST NOT contain an "extras" column that receives form data.
- **FR-011**: Guest-visible inline success and error messages within the form (including the invalid-invite-code message) MUST be presented in Spanish. (This excludes the post-submission success modal, which is out of scope.)
- **FR-012**: Each form field's submitted identifier MUST exactly match its target spreadsheet column header so values are recorded in the correct columns (email, nombre, codigo_invitacion, musica, restricciones, comida, trago).
- **FR-013**: The updated submission-handler script MUST be produced and shared with the couple once the form changes are in place, ready to paste into their Google Apps Script project.
- **FR-014**: The submission handler MUST reject any submission whose "comida" value is outside {Carne, Pollo, Vegetariano} or whose "trago" value is outside {Whisky, Aguardiente, Vino Blanco, Vino Tinto, Cerveza, Vodka}, returning a Spanish error and recording nothing — mirroring the invite-code validation. This guarantees recorded values stay within their option sets even if the browser dropdown is bypassed.
- **FR-015**: The protein and drink inputs MUST each allow exactly one selection (single-select); multiple selections are not possible.

### Key Entities *(include if feature involves data)*

- **RSVP Submission**: A single guest's confirmation. Attributes: email, nombre, codigo_invitacion, musica, restricciones, comida, trago. Each attribute's submitted key matches its spreadsheet column header. Replaces the prior submission shape that included "extras" and used the key "invite_code".
- **Response Record**: One row in the responses spreadsheet = timestamp + the seven submission attributes, one per named column.
- **Invite Code**: A short code that gates submission; valid set is {990427, 920427, 950909, 257515}.
- **Preference Option Sets**: Protein ∈ {Carne, Pollo, Vegetariano}; Drink ∈ {Whisky, Aguardiente, Vino Blanco, Vino Tinto, Cerveza, Vodka}.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A guest can complete and submit the RSVP form — from the confirmation section up to submission, including inline success/error messages — without encountering any English text. (The post-submission success modal is excluded from this criterion.)
- **SC-002**: 100% of submitted fields are recorded in their correct, correctly-named columns, and no submission produces a value in an "extras" column.
- **SC-003**: Submissions with an invalid invite code are rejected with a Spanish message and produce no recorded row; submissions with a valid code succeed.
- **SC-004**: Every successful RSVP produces exactly one spreadsheet row and one email alert containing all seven field values.
- **SC-005**: The protein and drink values recorded are always within their defined option sets (no free-text or out-of-set values), enforced both by single-select inputs and by server-side validation in the handler.

## Assumptions

- The four new preference fields are required (consistent with the existing form, where all fields were required; the "Si no tienes pon No Aplica" guidance implies dietary restrictions must always carry a value).
- Protein and drink are presented as single-select inputs constrained to the listed options; song and dietary restrictions are free-text inputs.
- All guest-visible inline messages in the form (inline success confirmation and error alerts) are translated to Spanish, beyond the six explicitly listed strings. The post-submission success modal (Add-to-Calendar popup) is NOT translated in this feature.
- The post-submission success modal, including its English labels and the old wedding's event details (title/date/venue), is intentionally left unchanged in this feature and deferred to a later content/translation spec.
- The couple will update the responses spreadsheet's header row to the new column names and order before going live, since recording maps values to columns by matching header names.
- The site continues to run locally for now and will be self-hosted later; no hosting/deployment changes are part of this feature.
- Out of scope for this feature: translating non-form sections of the site, broader content changes (venue text, calendar, Uber link), and migrating historical responses recorded under the old "extras" column.

## Dependencies

- An existing responses spreadsheet and a submission-handler script (Google Apps Script) that the couple controls and can edit/redeploy.
- The previously established invite-code list {990427, 920427, 950909, 257515}.
