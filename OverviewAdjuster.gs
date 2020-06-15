function OverviewAdjust()
{
    var lock = LockService.getScriptLock();
  var success = lock.tryLock(10000);
  if (!success) {
  Logger.log('Could not obtain lock after 10 seconds.');
    return;
  }
  
  var mainarray = SHEETS[2].getRange(2,1,SHEETS[2].getMaxRows() - 1).getValues();
  var blacklist = SHEETS[2].getRange(2,6,SHEETS[2].getMaxRows() - 1).getValues();
  var removalarray = new Array();
  
  for (var i = 0; i < blacklist.length; i++)
  {
    if (blacklist[i] == 'false')
      removalarray.push(mainarray[i]);
  }
  
  var gamecount = removalarray.length + 5; 
  
  var overviewrow = SHEETS[0].getMaxRows()-16;
  
  var discriminant = overviewrow - gamecount;
  
  Logger.log(discriminant)
  
    if (discriminant > 0) //overview has more 
  {
    Logger.log("APPROACH TAKEN: DELETEROW()")
    for (var i = discriminant; i > 0; i--)
    {
      SHEETS[0].deleteRow(gamecount+16);
    }
  }
  else if (discriminant < 0) // overview has less
  {
    Logger.log("APPROACH TAKEN: APPENDROW()")

    discriminant *= -1;
    for (var i = discriminant; i > 0; i--)
    {
      SHEETS[0].appendRow(['']);
      // SHEETS[0].getRange(SHEETS[0].getMaxRows(), 14, 1, 2).setBorder(false, true, false, true, null, null);
      
    }
  }
  else
  {
        Logger.log("APPROACH TAKEN: NIL")

  }
  ReloadSheets()
  
  // border formatting
  SHEETS[0].getRange(17, 2, SHEETS[0].getMaxRows() - 17, 3).setBorder(true, true, true, true, false, true);
  SHEETS[0].getRange(17, 5, SHEETS[0].getMaxRows() - 17, 3).setBorder(true, true, true, true, false, false);
  SHEETS[0].getRange(17, 8, SHEETS[0].getMaxRows() - 17, 1).setBorder(true, true, true, true, false, true);
  SHEETS[0].getRange(17, 9, SHEETS[0].getMaxRows() - 17, 5).setBorder(true, true, true, true, false, true);

  SHEETS[0].getRange(17, 14, SHEETS[0].getMaxRows() - 17, 2).setBorder(true, true, true, true, false, true);
  SHEETS[0].getRange(17, 17, SHEETS[0].getMaxRows() - 17, 4).setBorder(true, true, true, true, false, true);
  //SHEETS[0].getRange(17, 6, SHEETS[0].getMaxRows() - 17, 1).setBorder(true, true, true, true, null, false);
  
  // checkbox formatting
  SHEETS[0].getRange(17, 13, SHEETS[0].getMaxRows() - 17, 1).insertCheckboxes().setValue("");
  SHEETS[0].getRange(SHEETS[0].getMaxRows(), 13).removeCheckboxes().setValue("");

  lock.releaseLock()

}