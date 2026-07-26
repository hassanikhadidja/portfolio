/**
 * Paste this into: Google Sheet → Extensions → Apps Script
 * Then Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the /exec URL into designer.contactFormUrl in src/data/content.js
 */

function doGet() {
  return ContentService.createTextOutput('OK');
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var p = (e && e.parameter) || {};

    if (e && e.postData && e.postData.contents && (!p.name && !p.email)) {
      try {
        p = JSON.parse(e.postData.contents);
      } catch (ignore) {}
    }

    sheet.appendRow([
      new Date(),
      p.name || '',
      p.email || '',
      p.type || '',
      p.message || '',
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
