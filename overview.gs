//when spreadsheet is edited, check if edited cell is in gametable

function onOverviewEdit(e)
{
    // Checks
  if(e.source.getSheetName() != "0 - Overview")
  {
    Logger.log("Sheetnamerejection")
    return;
  }
  if(e.range.getColumn() != 8 && e.range.getColumn() != 9)
  {
   Logger.log("columnrejection")

    return;
  }  
  if (e.range.getRow() <= 16)
  {
        Logger.log("rowrejection")
    return;
  }
  Logger.log("jesus christ");
  
   // Storing the cell in overview
  var holder = e.range.getValue();
    Logger.log(holder);
   
  // Delete cell content in overview
    e.range.clearContent();
  
    var idreference = e.source.getSheetByName("0 - Overview").getRange(e.range.getRow(), 3).getValue();
  Logger.log(idreference);  

  // Find appid in myLib
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary");
  var ss = sheet.getDataRange().getValues();
  for (var j = ss.length-1; j >=0; j--)
  {
    if(ss[j][2] == idreference)
    {
      if (e.range.getColumn() == 8)
      {
        if (holder < 1 && holder > 5)
        {
          sheet.getRange(j+1, e.range.getColumn()).clearContent()
          Logger.log("arg1");
          return;
        }
      }
      if (holder == ">del")
      {
        sheet.getRange(j+1, e.range.getColumn()).clearContent()
                  Logger.log("arg2");

      }
      else
      {
        sheet.getRange(j+1, e.range.getColumn()).setValue(holder);
                Logger.log("arg3");

      }
        return;
    }
  }
}