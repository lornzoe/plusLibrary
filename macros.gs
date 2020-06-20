function BackupPrices() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A:C').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('2.5 - Cost/Price Backup'), true);
  spreadsheet.getRange('A1').activate();
  spreadsheet.getRange('\'2 - DataProcessing\'!A:C').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('2 - DataProcessing'), true);
  spreadsheet.getRange('H:I').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('2.5 - Cost/Price Backup'), true);
  spreadsheet.getRange('D1').activate();
  spreadsheet.getRange('\'2 - DataProcessing\'!H:I').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
};

function LibSort() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('B5:V').activate();
  spreadsheet.getActiveRange().offset(1, 0, spreadsheet.getActiveRange().getNumRows() - 1).sort({column: 3, ascending: true});
};
