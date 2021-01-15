function MyLibSorter() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary");
  spreadsheet.getRange('A6:X').activate()
  .sort({column: 4, ascending: true});
};

function testerer() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('301:301').activate();
  spreadsheet.getRange('8:8').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
  spreadsheet.getRange('8:8').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false);
  spreadsheet.getRange('301:301').activate();
  spreadsheet.getRange('8:8').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_CONDITIONAL_FORMATTING, false);
};