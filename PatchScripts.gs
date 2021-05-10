function ReplaceBackupFormulaWithName() {
  
  let val = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup")
  
  for (var i = 6; i <= val.getMaxRows(); i++)
  {
    // check value of Dx    
    let value = val.getRange(i,4).getValue()
    
    // if Dx is #N/A , get the value of Cx 
    if (value != "#N/A")
      continue;
    
    // use GetSchemaForGame to grab game name and replace
    let appid = val.getRange(i,3).getValue()
    let queryapi = "https://store.steampowered.com/api/appdetails?appids=" + appid
    let grabbedname = IMPORTJSONAPI(queryapi, "$.*.data.name", "@")
    Logger.log(grabbedname)
    
    if (grabbedname != null)
    val.getRange(i,4).setValue(grabbedname)    
  }
}

function LibraryFromBackupPatch(){
}

function ReplaceBackupBlacklistWithTypeFilter(){
  let backup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup")
  let lib = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary")

  // sort them first
  backup.getRange('A6:L').activate().sort({column: 3, ascending: true})
  lib.getRange('A6:X').activate().sort({column: 4, ascending: true})
  
  // match ids
  for (var l = 6; l <= lib.getMaxRows(); l++)
  {
    for (var b = l; b <= backup.getMaxRows(); b++)
    {
      //match by id.
      Logger.log( "Lib entry: " + lib.getRange(l,4).getValue()+ ", Backup entry: " + backup.getRange(b,3).getValue())
      if (backup.getRange(b,3).getValue() != lib.getRange(l,4).getValue())
        continue

      //copy 
      backup.getRange(b,10).setValue(lib.getRange(l,2).getValue())
      Logger.log("Success.")
      break;
    }
  }
}

function ReplaceBackupBlacklistWithReview(){
  let backup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup")
  let lib = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary")

  // sort them first
  backup.getRange('A6:L').activate().sort({column: 3, ascending: true})
  lib.getRange('A6:X').activate().sort({column: 4, ascending: true})
  
  // match ids
  for (var l = 6; l <= lib.getMaxRows(); l++)
  {
    for (var b = l; b <= backup.getMaxRows(); b++)
    {
      //match by id.
      Logger.log( "Lib entry: " + lib.getRange(l,4).getValue()+ ", Backup entry: " + backup.getRange(b,3).getValue())
      if (backup.getRange(b,3).getValue() != lib.getRange(l,4).getValue())
        continue

      //copy 
      backup.getRange(b,6).setValue(lib.getRange(l,11).getValue())
      Logger.log("Success.")
      break;
    }
  }
}

function SortMyLib(){
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary").getRange('A6:X').activate().sort({column: 4, ascending: true});
}

function SortMyBlacklist(){
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup").getRange('A6:L').activate().sort({column: 3, ascending: true});
}

function RecursiveBinarySearchBackup(left, right, target)
{
  let backup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup").getRange('C1:C').getValues();
  // Logger.log(backup[1][0])
  // Logger.log(backup[mid][0])
  Logger.log("Recurse. Left/Right: " + left + '/' + right)

  if (right >= left) {
      let mid = Number(((left + right) / 2).toFixed(0));

      // If the element is present at the
      // middle itself
      Logger.log("Mid index: " + mid)
      Logger.log("Value: " + backup[mid][0])
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
    return -1
}

function testSearch()
{
  let backup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup");
  Logger.log(backup.getMaxRows())
  Logger.log(RecursiveBinarySearchBackup(5,backup.getMaxRows()-1,294860) + 1)
}

function BackupSearchWrapper(id){
  return RecursiveBinarySearchBackup(5,backup.getMaxRows()-1,id) + 1
}
