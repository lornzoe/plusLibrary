function RecursiveBinarySearchBackup(left, right, target)
{
  let backup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup").getRange('C1:C').getValues();
  // Logger.log(backup[1][0])
  // Logger.log(backup[mid][0])
  Logger.log("[RBSB] Recurse. Left/Right: " + left + '/' + right)

  if (right >= left) {
    let mid = Number(((left + right) / 2).toFixed(0));

    // If the element is present at the
    // middle itself
    Logger.log("[RBSB] Mid index: " + mid)
    Logger.log("[RBSB] Value: " + backup[mid][0])
    if (backup[mid][0] == target)
        return mid;

    // If element is smaller than mid, then
    // it can only be present in left subarray
    if (backup[mid][0] > target)
        return RecursiveBinarySearchBackup(left, --mid, target);

    // Else the element can only be present
    // in right subarray
      return RecursiveBinarySearchBackup(++mid, right, target);

  }
 
    // We reach here when element is not present
    // in array
    Logger.log("[RBSB] id " + target + " is not found.");
    return -1
}

function testSearch()
{
      let backup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup");
  Logger.log(backup.getMaxRows())
  Logger.log(RecursiveBinarySearchBackup(5,backup.getMaxRows()-1,2016580) + 1)
}

function BackupSearchWrapper(id){
    let backup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup");
  return RecursiveBinarySearchBackup(5,backup.getMaxRows()-1,id) + 1
}
