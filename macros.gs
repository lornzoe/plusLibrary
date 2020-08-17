function MyLibSorter() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary");
  spreadsheet.getRange('A6:X').activate()
  .sort({column: 4, ascending: true});
};