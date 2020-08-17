function OverviewAdjust()
{
  ReloadSheets()
  
  var gamecount = SHEETS[1].getRange("B6:B").getValues()
  var bl = new Array()
  for (let val in gamecount)
  {
    if (gamecount[val][0] == true)
      bl.push(gamecount[val][0])
      }  
  
  var discriminant = SHEETS[0].getMaxRows() - 17 - gamecount.length + bl.length;
  
  
  Logger.log(discriminant)
  
  if (discriminant > 0) //overview has more 
  {
    Logger.log("APPROACH TAKEN: DELETEROW()")
    SHEETS[0].deleteRows(gamecount.length + 17 - bl.length, discriminant);
  }
  
  else if (discriminant < 0) // overview has less
  {
    Logger.log("APPROACH TAKEN: APPENDROW()")
    
    discriminant *= -1;
    Logger.log(discriminant);
    
    SHEETS[0].insertRowsAfter(17, discriminant)
    //for (var i = discriminant; i > 0; i--)
    //{
    //  Logger.log(i)
    //  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("0 - Overview").appendRow(['']);      
    //}
  }
  
  else
  {
    Logger.log("APPROACH TAKEN: NIL")
    
  }
  
  // border formatting
  SHEETS[0].getRange(17, 2, SHEETS[0].getMaxRows() - 17, 3).setBorder(true, true, true, true, false, true);
  SHEETS[0].getRange(17, 5, SHEETS[0].getMaxRows() - 17, 3).setBorder(true, true, true, true, false, false);
  SHEETS[0].getRange(17, 8, SHEETS[0].getMaxRows() - 17, 1).setBorder(true, true, true, true, false, true);
  SHEETS[0].getRange(17, 9, SHEETS[0].getMaxRows() - 17, 5).setBorder(true, true, true, true, false, true);
  
  SHEETS[0].getRange(17, 12, SHEETS[0].getMaxRows() - 17, 2).setBorder(true, true, true, true, false, true);
  SHEETS[0].getRange(17, 17, SHEETS[0].getMaxRows() - 17, 4).setBorder(true, true, true, true, false, true);
  //SHEETS[0].getRange(17, 6, SHEETS[0].getMaxRows() - 17, 1).setBorder(true, true, true, true, null, false);
  SHEETS[0].getRange(17, 17, SHEETS[0].getMaxRows() - 17, 4).setBorder(true, true, true, true, false, true);
  
  SHEETS[0].getRange(17, 15, SHEETS[0].getMaxRows() - 17, 1).setBorder(true, true, true, true, false, true);

  // clear the bottom format and remove borders
  SHEETS[0].getRange(SHEETS[0].getMaxRows(),2,1,12).setBorder(true, false, false, false, false, false).clearFormat()
  SHEETS[0].getRange(SHEETS[0].getMaxRows(),17,1,4).setBorder(true, false, false, false, false, false).clearFormat()
  SHEETS[0].getRange(SHEETS[0].getMaxRows(),15,1,1).setBorder(true, false, false, false, false, false).clearFormat()

  // checkbox formatting
  SHEETS[0].getRange(17, 11, SHEETS[0].getMaxRows() - 17, 1).insertCheckboxes().setValue("");
  SHEETS[0].getRange(SHEETS[0].getMaxRows(), 11).removeCheckboxes().setValue("");
  
}