# Quickstart: Spanish RSVP Form

How to build, run, and verify this feature locally.

## Prerequisites

- Node + npm installed (for gulp build), or accept the documented hand-mirroring fallback.
- Python 3 (for the local static server), or any static file server.
- A deployed Google Apps Script Web App `/exec` URL with the `responses` sheet header row set to:
  `timestamp | email | nombre | codigo_invitacion | musica | restricciones | comida | trago`.

## 1. Build (after editing source)

From the repo root:

```bash
npx gulp           # runs sass + minify-js (scripts.js -> scripts.min.js)
# or just the JS:
npx gulp minify-js
```

Confirm `js/scripts.min.js` now contains the new field logic and the `codigo_invitacion` selector:

```bash
grep -o "codigo_invitacion" js/scripts.min.js | head
```

If gulp cannot run in your environment, mirror the same logic edits by hand into
`js/scripts.min.js` so the two files stay consistent (the page loads the minified file).

## 2. Serve locally

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/` and scroll to the **Confirma tu asistencia** section.

## 3. Verify the form (User Story 1 + 2)

- All labels/placeholders/button text render in Spanish; no English in the form.
- Fields present: email, nombre, codigo_invitacion, musica, restricciones, comida (dropdown),
  trago (dropdown). No "extras" field.
- `comida` offers exactly {Carne, Pollo, Vegetariano}; `trago` offers exactly {Whisky, Aguardiente,
  Vino Blanco, Vino Tinto, Cerveza, Vodka}.
- Submit with a wrong code → Spanish error alert, no network POST.
- Submit with a valid code (e.g. 990427) and all fields → success modal shows; a new row appears in
  the sheet with each value in its matching column; the couple receives an email.

## 4. Verify the handler directly (proxy data, no browser)

Test the Apps Script in isolation with a valid invite code and in-set choices:

```bash
curl -L -s -X POST "<EXEC_URL>" \
  --data-urlencode "email=ana@example.com" \
  --data-urlencode "nombre=Ana Gómez" \
  --data-urlencode "codigo_invitacion=990427" \
  --data-urlencode "musica=Vivir Mi Vida - Marc Anthony" \
  --data-urlencode "restricciones=No Aplica" \
  --data-urlencode "comida=Pollo" \
  --data-urlencode "trago=Aguardiente"
# expect: {"result":"success",...}
```

Negative checks (each should return `{"result":"error",...}` and write no row):

```bash
# bad code
curl -L -s -X POST "<EXEC_URL>" --data-urlencode "codigo_invitacion=000000" \
  --data-urlencode "comida=Pollo" --data-urlencode "trago=Vodka"
# out-of-set protein
curl -L -s -X POST "<EXEC_URL>" --data-urlencode "codigo_invitacion=990427" \
  --data-urlencode "comida=Pescado" --data-urlencode "trago=Vodka"
# out-of-set drink
curl -L -s -X POST "<EXEC_URL>" --data-urlencode "codigo_invitacion=990427" \
  --data-urlencode "comida=Pollo" --data-urlencode "trago=Tequila"
```

## 5. Acceptance mapping

| Check                                   | Spec ref            |
|-----------------------------------------|---------------------|
| New row with all 7 values in columns    | US1 / FR-009 / SC-002 |
| Protein/drink within set                | FR-004/5/15 / SC-005 |
| No English in form (modal excluded)     | US2 / SC-001        |
| Wrong code rejected, Spanish message    | US2 / FR-008 / SC-003 |
| Out-of-set comida/trago rejected server | FR-014 / SC-005     |
| codigo_invitacion key used end to end   | FR-007 / FR-012     |
| Email alert per RSVP                    | US3 / FR-009 / SC-004 |
