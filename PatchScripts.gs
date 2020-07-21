function ReplaceBackupFormulaWithName() {
  
  let val = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup")
  
  for (var i = 6; i < val.getMaxRows(); i++)
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