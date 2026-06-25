# Contracts: Recomendaciones Button & Modal

**Status: No programmatic contracts (N/A).**

This feature exposes no external interface: no HTTP endpoints, no CLI, no library API, no
form submission, and no message/event schema. It adds static presentational HTML that
reuses Bootstrap 3''s existing client-side modal behaviour. There is nothing to contract
between systems.

The only "interface" is the user-facing UI contract, which is fully specified by the
functional requirements (FR-001..FR-009) in spec.md and verified manually via
quickstart.md. The closest thing to a contract is the Bootstrap data-attribute coupling:

- Trigger: `data-toggle="modal" data-target="#rec-modal"`
- Modal container: `id="rec-modal"`

These two must match for the modal to open. This is validated during local verification
(quickstart step 3.5), not by an automated contract test, consistent with the project''s
manual-testing approach (Constitution Principle IV).

No files are generated in this directory.
