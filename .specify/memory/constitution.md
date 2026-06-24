<!--
Sync Impact Report
==================
Version change: (template / unversioned) → 1.0.0
Rationale: First concrete ratification of the project constitution (initial adoption
of 5 principles + governance). Treated as 1.0.0 rather than a bump from the empty
template.

Modified principles:
- [PRINCIPLE_1_NAME] → I. Minimal Footprint (No Redesign)
- [PRINCIPLE_2_NAME] → II. Match the Original Code's Patterns
- [PRINCIPLE_3_NAME] → III. Keep Solutions Simple (Anti Over-Engineering)
- [PRINCIPLE_4_NAME] → IV. Test Every Feature Locally First
- [PRINCIPLE_5_NAME] → V. master Is Production

Added sections:
- Core Principles (5 principles)
- Additional Constraints
- Development Workflow
- Governance

Removed sections: none (all template placeholders populated)

Templates requiring updates:
- ✅ .specify/templates/plan-template.md (Constitution Check is generic; principles
  now map cleanly — no structural change required)
- ✅ .specify/templates/spec-template.md (no mandatory section changes implied)
- ✅ .specify/templates/tasks-template.md (local-testing discipline aligns with
  existing task phases — no change required)
- ✅ .github/copilot-instructions.md (points at the active plan; unaffected)

Follow-up TODOs: none
-->

# Pagina Web Boda Constitution

Project: the wedding website for Valentina & Adrian (a customized fork of
`rampatra/wedding-website`). This constitution governs how we customize and extend the
site. It is intentionally small and pragmatic, matching the size of the project.

## Core Principles

### I. Minimal Footprint (No Redesign)

Changes MUST be minimal and surgical. We are customizing an existing template, not
redesigning it. Implementations MUST NOT alter the site's visual design, layout, theme,
or structure beyond what a requested feature strictly requires. When a change can be
achieved by editing content, copy, or a small amount of existing logic, that MUST be
preferred over restructuring markup, styles, or build setup.

**Rationale**: The template already looks and works the way the couple wants. Every
unnecessary change adds risk of breaking a working site for no benefit.

### II. Match the Original Code's Patterns

New functionality MUST follow the conventions already present in the original codebase.
This includes: ES5-style jQuery for site JavaScript, the existing form/handler pattern
(client `$.post` to a Google Apps Script `/exec` endpoint), Bootstrap 3 grid and modal
markup, and the gulp build that compiles `scripts.js` → `scripts.min.js` and SCSS → CSS.
New code MUST look like it belongs next to the code already there; introducing a new
framework, language style, or architectural pattern requires explicit justification in
the plan's Complexity Tracking.

**Rationale**: A consistent codebase is easier for a beginner to understand, maintain,
and debug, and keeps us close to upstream so fixes and updates remain mergeable.

### III. Keep Solutions Simple (Anti Over-Engineering)

Feature solutions MUST be the simplest approach that satisfies the requirement. We do
not add abstractions, configuration, dependencies, build steps, or generality that the
current requirement does not need (YAGNI). When two approaches both work, the one with
fewer moving parts MUST be chosen. Added complexity MUST be justified by a concrete,
present need — not a hypothetical future one.

**Rationale**: This is a small wedding site maintained by a beginner; complexity is the
main threat to it staying working and understandable.

### IV. Test Every Feature Locally First

Every feature MUST be verified locally before it is considered done or merged to
production. At minimum this means serving the static site locally (e.g.
`python3 -m http.server`) and exercising the changed behavior, and — for form/handler
changes — validating the Google Apps Script directly with proxy data including a valid
invite code. A change MUST NOT be marked complete on the strength of code inspection
alone.

**Rationale**: There is no automated test suite; local verification is our safety net
and the only reliable way to catch regressions before guests see them.

### V. master Is Production

The `master` branch is the production branch and MUST always be in a deployable,
working state. Feature work MUST happen on dedicated feature branches (e.g.
`001-rsvp-form-spanish`) and only merge into `master` after the feature has been tested
locally (Principle IV). Direct, unverified changes to `master` are not allowed.

**Rationale**: Keeping production clean and gated behind local testing protects the live
site the couple's guests rely on.

## Additional Constraints

- **Stack**: Static HTML/CSS/JS site (jQuery 1.11, Bootstrap 3) built with gulp; the
  form handler is Google Apps Script backed by a Google Sheet. These are fixed for the
  foreseeable future; changing them is a constitution-level decision.
- **Build discipline**: The page loads `js/scripts.min.js`. Any edit to `js/scripts.js`
  MUST be re-minified (gulp) so both files stay consistent; likewise SCSS edits MUST be
  compiled to the committed CSS.
- **Data contract**: Form field submitted keys MUST exactly match the responses-sheet
  column headers. The Apps Script handler remains the source of truth for validation.
- **Attribution**: The project remains a credited customization of
  `rampatra/wedding-website`; upstream attribution in the README MUST be preserved.

## Development Workflow

- Use the Spec Kit flow for features: `/speckit.specify` → `/speckit.clarify` →
  `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`.
- Each feature gets its own branch off `master`; the plan's Constitution Check MUST
  confirm alignment with these principles before implementation.
- Local testing (Principle IV) is the gate before a feature branch merges to `master`.
- Commits should be small and descriptive; spec artifacts live under `specs/<feature>/`.

## Governance

This constitution supersedes ad-hoc practices for this project. Amendments are made by
editing `.specify/memory/constitution.md` via the `/speckit.constitution` flow, with a
Sync Impact Report and a version bump.

Versioning policy (semantic):
- **MAJOR**: Backward-incompatible removal or redefinition of a principle or governance
  rule.
- **MINOR**: A new principle/section is added or guidance is materially expanded.
- **PATCH**: Clarifications, wording, or non-semantic refinements.

Compliance: Every feature plan MUST pass the Constitution Check. Any deviation MUST be
recorded and justified in the plan's Complexity Tracking; unjustified violations block
the feature until resolved.

**Version**: 1.0.0 | **Ratified**: 2026-06-23 | **Last Amended**: 2026-06-23
