function Sortshit() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('B5:T1707').activate();
  spreadsheet.getActiveRange().offset(1, 0, spreadsheet.getActiveRange().getNumRows() - 1).sort({column: 4, ascending: true});
};

function testfunk()
{
var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
if (sheets.length > 0) {
  for (var x = 0; x <sheets.length; x++)
  {
  Logger.log(sheets[x].getName());
}
}
}