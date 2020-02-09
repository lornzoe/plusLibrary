function DPSort() {
 
  var lock = LockService.getScriptLock();
  var success = lock.tryLock(100000);
  if (!success) {
  Logger.log('Could not obtain lock after 10 seconds.');
    return;
  }
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion().activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRange().offset(1, 0, spreadsheet.getActiveRange().getNumRows() - 1).sort({column: 1, ascending: true});
  
  lock.releaseLock()
};

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