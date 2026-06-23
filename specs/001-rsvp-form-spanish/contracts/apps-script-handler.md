# Contract: Google Apps Script Handler (`doPost`)

This is the behavioral contract for the handler the couple pastes into their Google Apps Script
project and deploys as a Web App. It is **not** part of the deployable website; it is delivered as an
artifact (FR-013). The reference implementation below supersedes the prior version that validated
only `invite_code`.

## Inputs

`e.parameters` — form-encoded fields from the submission contract. Note: `e.parameters` (plural)
yields **arrays**; coerce singular values with `String(...)` before comparing.

## Behavior

1. Read `mailData = e.parameters`.
2. **Invite-code gate**: if `String(mailData.codigo_invitacion)` ∉ `validCodes` → return Spanish
   error, record nothing.
3. **Protein gate**: if `String(mailData.comida)` ∉ `comidasValidas` → return Spanish error, record
   nothing.
4. **Drink gate**: if `String(mailData.trago)` ∉ `tragosValidos` → return Spanish error, record
   nothing.
5. Otherwise `record_data(e)` (append a row mapping each header to `e.parameter[header]`), send the
   couple an email alert, and return success JSON.
6. Any thrown error → generic Spanish server-error JSON.

## Responses

- Success: `{"result":"success","data":"<stringified params>"}`
- Error: `{"result":"error","message":"<Spanish message>"}`

Suggested Spanish messages:
- Invite: `Tu código de invitación (<valor>) no es correcto.`
- Comida: `La opción de comida (<valor>) no es válida.`
- Trago: `La opción de bebida (<valor>) no es válida.`
- Server: `Lo sentimos, hubo un problema con el servidor.`

## Reference implementation (paste into Apps Script)

```javascript
var TO_ADDRESS = "adrian.briceno.aguilar@gmail.com";

var validCodes    = ["990427", "920427", "950909", "257515"];
var comidasValidas = ["Carne", "Pollo", "Vegetariano"];
var tragosValidos  = ["Whisky", "Aguardiente", "Vino Blanco", "Vino Tinto", "Cerveza", "Vodka"];

function doPost(e) {
  try {
    Logger.log(e);
    var mailData = e.parameters;

    if (validCodes.indexOf(String(mailData.codigo_invitacion)) === -1) {
      return jsonError("Tu código de invitación (" + mailData.codigo_invitacion + ") no es correcto.");
    }
    if (comidasValidas.indexOf(String(mailData.comida)) === -1) {
      return jsonError("La opción de comida (" + mailData.comida + ") no es válida.");
    }
    if (tragosValidos.indexOf(String(mailData.trago)) === -1) {
      return jsonError("La opción de bebida (" + mailData.trago + ") no es válida.");
    }

    record_data(e);

    MailApp.sendEmail({
      to: TO_ADDRESS,
      subject: "Un invitado confirmó asistencia a la boda",
      replyTo: String(mailData.email),
      htmlBody: formatMailBody(mailData)
    });

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "data": JSON.stringify(e.parameters) }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log(error);
    return jsonError("Lo sentimos, hubo un problema con el servidor.");
  }
}

function jsonError(message) {
  return ContentService
    .createTextOutput(JSON.stringify({ "result": "error", "message": message }))
    .setMimeType(ContentService.MimeType.JSON);
}

function record_data(e) {
  Logger.log(JSON.stringify(e));
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('responses');
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    var row = [ new Date().toUTCString() ];
    for (var i = 1; i < headers.length; i++) {
      if (headers[i].length > 0) {
        row.push(e.parameter[headers[i]]);
      }
    }
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  } catch (error) {
    Logger.log(error);
    Logger.log(e);
    throw error;
  } finally {
    return;
  }
}

function formatMailBody(obj) {
  var result = "";
  for (var key in obj) {
    result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + obj[key] + "</div>";
  }
  return result;
}
```

## Required spreadsheet header row

`responses` sheet, row 1 (timestamp first, remaining order flexible but names exact):

```
(timestamp) | email | nombre | codigo_invitacion | musica | restricciones | comida | trago
```

## Deployment note

Redeploying as a **New deployment** (not "New version") changes the `/exec` URL; the new URL must be
copied into `js/scripts.js` and `js/scripts.min.js`. Web App access must be set so the form can POST
without authentication.
