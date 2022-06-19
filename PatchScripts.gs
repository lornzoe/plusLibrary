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

function AddHyperlinkToLogoAndAppID(){
  let lib = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary")

  // c is the starting row. default should be 6, but chances are there's too many games for the damned script to run through
  for (let c = 6; c <= lib.getMaxRows(); c++)
  {
    let appid = lib.getRange(c,4).getValue()
    lib.getRange(c,3).setValue('=HYPERLINK(INDIRECT("D2") & ROW(),IMAGE("https://steamcdn-a.akamaihd.net/steam/apps/' + appid + '/capsule_184x69.jpg"))')
    lib.getRange(c,4).setValue('=HYPERLINK(INDIRECT("D3") & ' + appid + ', ' + appid + ')')
  }
  FORMATRANGE.copyFormatToRange(SHEETS[1], 2, 24, 6, SHEETS[1].getMaxRows())
}
