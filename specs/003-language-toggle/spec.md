# Feature Specification: Bilingual Language Toggle (Spanish / English)

**Feature Branch**: `003-language-toggle`

**Created**: 2026-07-13

**Status**: Draft

**Input**: User description: "I want the web page to toggle between 2 languages, being Spanish the default and English the secondary."

## Clarifications

### Session 2026-07-13

- Q: When a first-time visitor's browser is set to English, what language should they see? → A: Always start in Spanish, regardless of browser language; English is reached only by manual toggle (no auto-detection).
- Q: How long should the site remember a guest's chosen language? → A: It does not remember. Every load/refresh/new tab starts in Spanish; the toggle affects the current page view only.
- Q: When a guest submits the RSVP form while viewing English, what language should the stored values be? → A: Always Spanish — the submission keys and values stay exactly as today; only the on-screen labels/placeholders translate. This MUST NOT change the form's submission logic.
- Q: Which content is in scope for translation? → A: Only site-authored copy. Embedded/third-party content (Google Map, add-to-calendar widget, external video links, photos, background video) is left as-is.
- Q: Where should the language control live and how should it look? → A: A small "ES / EN" text switch in the top navigation bar, both labels shown with the active one highlighted, working on mobile and desktop.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Spanish-speaking guest sees the site in Spanish by default (Priority: P1)

A guest opens the wedding website. Without doing anything, they see all content —
navigation, invitation, event details, the "Importante" information, "Recomendaciones", and
the RSVP form — in Spanish, exactly as the site reads today.

**Why this priority**: Spanish is the couple's and most guests' primary language. The site
must remain fully correct in Spanish with zero regression; this is the baseline the whole
feature is built on and delivers value even if no other language is ever added.

**Independent Test**: Load the site fresh and confirm every visible section renders in
Spanish with the same wording as the current live site.

**Acceptance Scenarios**:

1. **Given** any visitor, **When** the page loads or is refreshed, **Then** all content is displayed in Spanish by default.
2. **Given** the site is displayed in Spanish, **When** the visitor reads any section (menu, invitation, Proposito, events, "Importante" modal, "Recomendaciones" modal, map section, RSVP form, footer), **Then** the text matches the current Spanish content with no missing or placeholder strings.
3. **Given** a visitor whose browser/device language is English, **When** they open the site for the first time, **Then** the site still loads in Spanish.

---

### User Story 2 - English-speaking guest switches the site to English (Priority: P1)

An international guest who prefers English uses a visible control in the top navigation to
switch the whole site to English. All translatable, site-authored content updates to English
in place, without navigating away or losing their position on the page.

**Why this priority**: Serving the couple's international guests is the entire point of the
feature. Once Spanish (P1) is guaranteed, the English toggle is the core new capability.

**Independent Test**: From the Spanish site, use the ES/EN control to choose English and
confirm all translatable sections switch to English on the same page.

**Acceptance Scenarios**:

1. **Given** the site is in Spanish, **When** the visitor selects "EN" in the navigation control, **Then** all translatable, site-authored content switches to English without a full page navigation, and "EN" is shown as the active language.
2. **Given** the site is in English, **When** the visitor selects "ES", **Then** all content returns to Spanish and "ES" is shown as active.
3. **Given** the site is in English, **When** the visitor opens the "Importante" and "Recomendaciones" modals, **Then** their content is shown in English.
4. **Given** the site is in English, **When** the visitor refreshes the page or opens it in a new tab, **Then** it loads again in Spanish (the choice is not remembered).

---

### Edge Cases

- When a translatable string has no English translation yet, the site MUST fall back to the Spanish text so no element appears blank or broken.
- The RSVP form's visible labels, placeholders, and button text translate, but the values submitted to the responses sheet stay exactly as today, independent of display language (see FR-007). The invite-code check is unaffected.
- Guest-entered values, proper nouns, links, external video links, the background video, photos, and the embedded Google Map are never translated.
- Third-party/embedded widgets (Google Map, add-to-calendar) are out of scope and left in their default language.
- Switching language SHOULD also update the document's declared language for accessibility, without otherwise changing layout or design.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST display all site-authored content in Spanish by default on every page load, refresh, and new tab/session.
- **FR-002**: The site MUST provide a language control in the top navigation bar showing both "ES" and "EN" labels, with the currently active language visually highlighted.
- **FR-003**: Selecting a language MUST update all translatable, site-authored content to that language on the current page, in place, without navigating to a different URL or a full page reload from the visitor's perspective.
- **FR-004**: The feature MUST cover every visitor-facing, site-authored text region currently on the site, including: top navigation, the invitation/intro copy, the "Proposito" section, event details ("La Boda", date, time), the "Importante" modal (dress code, dancing, international network, Fiebre Amarilla), the "Recomendaciones" modal, the map/"Como llego" section, the RSVP form labels/placeholders/buttons, and the footer.
- **FR-005**: When a translation for a given string is unavailable, the system MUST fall back to the Spanish text so no content appears blank or broken.
- **FR-006**: The site MUST NOT persist the visitor's language choice; the toggle applies only to the current page view, and any reload/new session starts again in Spanish.
- **FR-007**: The language toggle MUST NOT change the RSVP form's submission logic or data contract. Submitted field keys and stored values MUST remain exactly as today (effectively Spanish), regardless of the display language; only the on-screen labels/placeholders/buttons translate.
- **FR-008**: The language control and all translated content MUST remain usable and legible on both mobile and desktop layouts, consistent with the existing responsive design.
- **FR-009**: The default language MUST be Spanish for every visitor regardless of their browser/device language; English is reached only by using the toggle (no automatic language detection).
- **FR-010**: Only site-authored copy is in scope. Embedded/third-party content — the Google Map, the add-to-calendar widget, external video links, photos, and the background video — MUST be left unchanged by the toggle.

### Key Entities *(include if feature involves data)*

- **Active language**: The language currently applied to the page view (Spanish or English). Defaults to Spanish on every load and is not stored between loads.
- **Translatable content unit**: A visitor-facing piece of site-authored text that has a Spanish version (authoritative/default) and an English version. Missing English versions fall back to Spanish.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the site's current visitor-facing, site-authored text regions have both a Spanish and an English version (or an explicit Spanish fallback) and none render blank in either language.
- **SC-002**: Every page load and refresh starts in Spanish, including for visitors whose browser is set to English.
- **SC-003**: A visitor can switch the entire site from Spanish to English (or back) in a single action, reflected across all sections without leaving or reloading the page from their perspective.
- **SC-004**: No regression to the current Spanish experience: every section reads identically to the pre-feature site when Spanish is active, and the RSVP form continues to submit successfully with a valid invite code and unchanged stored values.
- **SC-005**: Embedded/third-party content (map, calendar, videos, photos) is visually unchanged whether the site is in Spanish or English.

## Assumptions

- Only two languages are in scope for this version: Spanish (default) and English (secondary). Additional languages are out of scope.
- Only site-authored copy is translated; guest-entered data, proper nouns, links, the background video, photos, and the embedded Google Map are not translated.
- The English translations will be provided/approved by the couple; this spec covers the toggle behavior and coverage, not the quality or wording of the translations themselves.
- The feature is a client-side experience on the existing single-page static site; it does not introduce a server, separate per-language pages/URLs, or a new backend.
- The existing RSVP handler (Google Apps Script + Sheet) and its data contract remain unchanged; language is a presentation concern only and does not alter form submission logic.
- No language preference is stored on the device or server; the site intentionally resets to Spanish on each load.
