/**
 * Go through all sheets in a spreadsheet, identify and remove all spreadsheet
 * import functions, then replace them a while later. This causes a "refresh"
 * of the "import" functions. For periodic refresh of these formulas, set this
 * function up as a time-based trigger.
 *
 * Caution: Formula changes made to the spreadsheet by other scripts or users
 * during the refresh period COULD BE OVERWRITTEN.
 *
 * From: https://stackoverflow.com/a/33875957/1677912
 */
function RefreshImports() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;             // Wait up to 5s for previous refresh to end.
  // At this point, we are holding the lock.

  var id = "1yQssTQRW7HN1Y_m-z1J7j-zBet_vkqfJHnicLTtilv0";
  var ss = SpreadsheetApp.openById(id);
  var sheets = ss.getSheets();

  for (var sheetNum=0; sheetNum<sheets.length; sheetNum++) {
    var sheet = sheets[sheetNum];
    var dataRange = sheet.getDataRange();
    var formulas = dataRange.getFormulas();
    var tempFormulas = [];
    for (var row=0; row<formulas.length; row++) {
      for (col=0; col<formulas[0].length; col++) {
        // Blank all formulas containing any "import" function
        // See https://regex101.com/r/bE7fJ6/2
        var re = /.*[^a-z0-9]import(?:xml|data|feed|html|range)\(.*/gi;
        if (formulas[row][col].search(re) !== -1 ) {
          tempFormulas.push({row:row+1,
                             col:col+1,
                             formula:formulas[row][col]});
          sheet.getRange(row+1, col+1).setFormula("");
        }
      }
    }

    // After a pause, replace the import functions
    for (var i=0; i<tempFormulas.length; i++) {    
      var cell = tempFormulas[i];
      sheet.getRange( cell.row, cell.col ).setFormula(cell.formula);
            Utilities.sleep(5000);

    }

    // Done refresh; release the lock.
    lock.releaseLock();
  }
}