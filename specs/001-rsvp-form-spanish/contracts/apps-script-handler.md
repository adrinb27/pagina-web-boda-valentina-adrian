# Contract: Google Apps Script Handler (`doPost`)

This is the behavioral contract for the handler the couple pastes into their Google Apps Script
project and deploys as a Web App. It is **not** part of the deployable website; it is delivered as an
artifact (FR-013). The reference implementation below supersedes the prior version that validated
only `invite_code`. It deliberately keeps the original blog template's style (inline
`ContentService` returns, same comments, untouched `record_data`/`formatMailBody`) per Constitution
Principle II.

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

## Reference implementation (paste into Apps Script — replaces the whole file)

```javascript
var TO_ADDRESS = "adrian.briceno.aguilar@gmail.com"; // email to send the form data to

// Accepted invite codes and the allowed options for the two dropdowns
var validCodes = ["990427", "920427", "950909", "257515"];
var comidasValidas = ["Carne", "Pollo", "Vegetariano"];
var tragosValidos = ["Whisky", "Aguardiente", "Vino Blanco", "Vino Tinto", "Cerveza", "Vodka"];

/**
 * This method is the entry point.
 */
function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger

    var mailData = e.parameters; // just create a slightly nicer variable name for the data

    if (validCodes.indexOf(String(mailData.codigo_invitacion)) === -1) {// validate invite code before saving data
      Logger.log("Incorrect Invite Code");
      return ContentService
        .createTextOutput(JSON.stringify({"result":"error", "message": "Lo sentimos, tu código de invitación (" + mailData.codigo_invitacion + ") no es correcto."}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (comidasValidas.indexOf(String(mailData.comida)) === -1) {// validate protein choice
      Logger.log("Invalid comida");
      return ContentService
        .createTextOutput(JSON.stringify({"result":"error", "message": "Lo sentimos, la opción de comida (" + mailData.comida + ") no es válida."}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (tragosValidos.indexOf(String(mailData.trago)) === -1) {// validate drink choice
      Logger.log("Invalid trago");
      return ContentService
        .createTextOutput(JSON.stringify({"result":"error", "message": "Lo sentimos, la opción de bebida (" + mailData.trago + ") no es válida."}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    record_data(e);

    MailApp.sendEmail({
      to: TO_ADDRESS,
      subject: "Un invitado confirmó asistencia a la boda",
      replyTo: String(mailData.email), // This is optional and reliant on your form actually collecting a field named `email`
      htmlBody: formatMailBody(mailData)
    });

    return ContentService // return json success results
      .createTextOutput(JSON.stringify({"result":"success","data": JSON.stringify(e.parameters) }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
      .createTextOutput(JSON.stringify({"result":"error", "message": "Lo sentimos, hubo un problema con el servidor."}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * This method inserts the data received from the html form submission
 * into the sheet. e is the data received from the POST
 */
function record_data(e) {
  Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('responses'); // select the responses sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row = [ new Date().toUTCString() ]; // first element in the row should always be a timestamp
    // loop through the header columns
    for (var i = 1; i < headers.length; i++) { // start at 1 to avoid Timestamp column
      if(headers[i].length > 0) {
        row.push(e.parameter[headers[i]]); // add data to row
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  }
  catch(error) {
    Logger.log(error);
    Logger.log(e);
    throw error;
  }
  finally {
    return;
  }
}


/**
 * This method is just to prettify the email.
 */
function formatMailBody(obj) { // function to spit out all the keys/values from the form in HTML
  var result = "";
  for (var key in obj) { // loop over the object passed to the function
    result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + obj[key] + "</div>";
    // for every key, concatenate an `<h4 />`/`<div />` pairing of the key name and its value,
    // and append it to the `result` string created at the start.
  }
  return result; // once the looping is done, `result` will be one long string to put in the email body
}
```

## Required spreadsheet header row

`responses` sheet, row 1 (timestamp first; remaining names must match exactly, lowercase, no
accents):

```
timestamp | email | nombre | codigo_invitacion | musica | restricciones | comida | trago
```

Remove any old `extras` column so it does not receive form data.

## Deployment note

Redeploying as a **New deployment** (not "New version") changes the `/exec` URL; the new URL must be
copied into `js/scripts.js` and `js/scripts.min.js`. Web App access must be set so the form can POST
without authentication.
