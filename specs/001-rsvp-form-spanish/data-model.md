# Phase 1 Data Model: Spanish RSVP Form

This feature has no database schema of its own; "data" means the shape of a form submission and the
row it produces in the couple's Google Sheet. Entities below mirror the spec's Key Entities.

## Entity: RSVP Submission (wire payload)

The URL-encoded body the browser POSTs to the Apps Script `/exec` endpoint. Each key MUST exactly
equal the target sheet column header.

| Field (submitted key) | Input type        | Required | Allowed values / format                                   | Sheet column        |
|-----------------------|-------------------|----------|-----------------------------------------------------------|---------------------|
| `email`               | `input[type=email]` | yes    | Valid email address                                       | `email`             |
| `nombre`              | `input[type=text]`  | yes    | Free text (full name)                                     | `nombre`            |
| `codigo_invitacion`   | `input[type=number]`| yes    | One of {990427, 920427, 950909, 257515}                   | `codigo_invitacion` |
| `musica`              | `input[type=text]`  | yes    | Free text ("Nombre de la canción - Nombre del artista")   | `musica`            |
| `restricciones`       | `input[type=text]`  | yes    | Free text ("No Aplica" when none)                         | `restricciones`     |
| `comida`              | `select`            | yes    | One of {Carne, Pollo, Vegetariano}                        | `comida`            |
| `trago`               | `select`            | yes    | One of {Whisky, Aguardiente, Vino Blanco, Vino Tinto, Cerveza, Vodka} | `trago` |

**Removed**: `extras` (the old "Husband/Wife or kids" headcount) — no longer collected or recorded.

**Renamed**: `invite_code` → `codigo_invitacion`.

### Validation rules

- **Client (browser)**: all fields `required`; `comida`/`trago` constrained to their option sets by
  being `<select>` dropdowns; `codigo_invitacion` validated via `MD5(value)` against the four hashes
  before any network call.
- **Server (Apps Script)**: `String(mailData.codigo_invitacion)` must be in the accepted-codes
  array; `String(mailData.comida)` must be in the protein set; `String(mailData.trago)` must be in
  the drink set. Any failure → Spanish error response, no row written.

## Entity: Response Record (spreadsheet row)

One row appended to the `responses` sheet on a valid submission.

| Column                | Source                                  |
|-----------------------|-----------------------------------------|
| (timestamp)           | `new Date().toUTCString()` (handler)    |
| `email`               | submission `email`                      |
| `nombre`              | submission `nombre`                     |
| `codigo_invitacion`   | submission `codigo_invitacion`          |
| `musica`              | submission `musica`                     |
| `restricciones`       | submission `restricciones`              |
| `comida`              | submission `comida`                     |
| `trago`               | submission `trago`                      |

`record_data` iterates the header row and pulls `e.parameter[header]` for each header after the
timestamp column. **Consequence**: header names ARE the contract — they must match the submitted
keys character-for-character, in any column order after the leading timestamp.

## Entity: Invite Code

A gating credential. Valid set: {990427, 920427, 950909, 257515}.

- Client stores them as MD5 hashes: `01dd565b7c7a7a742792da478fd40e7a` (990427),
  `923c8638360b525238cbaf92508f7092` (920427), `ffcb13ec2d56f158fbd744a56de77de9` (950909),
  `cbee0d6d7663efd6e0c99b42fdb4ed41` (257515).
- Server stores them as plain strings in a `validCodes` array.
- Both lists must stay in agreement.

## Entity: Preference Option Sets

Closed enumerations used by both the dropdown `<option>`s and the server validation arrays.

- **Protein (`comida`)**: `Carne`, `Pollo`, `Vegetariano`
- **Drink (`trago`)**: `Whisky`, `Aguardiente`, `Vino Blanco`, `Vino Tinto`, `Cerveza`, `Vodka`

## State / flow

A submission has no persistent state machine. Transient client flow:

1. `submit` → show Spanish "saving" info alert.
2. MD5 invite check fails → Spanish error alert; stop.
3. Else POST to `/exec`:
   - response `result === "error"` → show the handler's Spanish `message`.
   - response success → clear alert, show success modal (modal content out of scope).
   - network failure → Spanish generic server-error alert.
