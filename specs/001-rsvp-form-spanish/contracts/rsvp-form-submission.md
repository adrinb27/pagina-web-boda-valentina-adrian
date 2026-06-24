# Contract: RSVP Form Submission (Browser → Apps Script)

**Direction**: Client `POST` (jQuery `$.post` of `$('#rsvp-form').serialize()`)
**Endpoint**: the couple's Google Apps Script Web App `/exec` URL (configured in
`js/scripts.js` and mirrored in `js/scripts.min.js`)
**Content-Type**: `application/x-www-form-urlencoded`

## Request body (form-encoded)

| Key                 | Required | Constraint                                                   |
|---------------------|----------|--------------------------------------------------------------|
| `email`             | yes      | valid email                                                  |
| `nombre`            | yes      | non-empty text                                               |
| `codigo_invitacion` | yes      | ∈ {990427, 920427, 950909, 257515}                           |
| `musica`            | yes      | non-empty text                                               |
| `restricciones`     | yes      | non-empty text ("No Aplica" allowed)                         |
| `comida`            | yes      | ∈ {Carne, Pollo, Vegetariano}                                |
| `trago`             | yes      | ∈ {Whisky, Aguardiente, Vino Blanco, Vino Tinto, Cerveza, Vodka} |

No `extras` key is sent. The invite key is `codigo_invitacion` (not `invite_code`).

## Client-side preconditions before POST

1. All inputs satisfy HTML `required`.
2. `MD5($('#codigo_invitacion').val())` ∈ the four-hash `validCodes` array. If not, the client shows
   a Spanish error and does **not** POST.

## Response body (JSON, `application/json`)

Success:

```json
{ "result": "success", "data": "{...echoed parameters...}" }
```

Error (invalid invite code, out-of-set comida/trago, or server fault):

```json
{ "result": "error", "message": "<Spanish message>" }
```

## Client handling of response

- `result === "error"` → render `message` in `#alert-wrapper` as a danger alert (Spanish).
- success → clear `#alert-wrapper`, show `#rsvp-modal` (modal content out of scope).
- transport failure (`.fail`) → show a generic Spanish server-error alert.

## Example (valid)

```text
email=ana%40example.com&nombre=Ana+Gómez&codigo_invitacion=990427
&musica=Vivir+Mi+Vida+-+Marc+Anthony&restricciones=No+Aplica
&comida=Pollo&trago=Aguardiente
```

Expected: HTTP 200, `{"result":"success",...}`, one new sheet row, one email alert to the couple.
