function MyLibUpdater()
{
  var mainarray = SHEETS[1].getRange("D6:D").getValues();
  var importarray = SHEETS[2].getRange("A2:A").getValues();
  
  for (let i = importarray.length-1; i >= 0; i--)
  {
    for (let j = mainarray.length-1; j >= 0; j--)
    {
      if (mainarray[j][0] + '' == importarray[i][0] + '')
      {
        mainarray.splice(j, 1);
        importarray.splice(i, 1);
        
        break;
      }
    }
  }
  
  // mainarray leftover: delete.
  if(SHEETS[1].getMaxRows() > 5) 
  {
    let referencearray = SHEETS[1].getRange("D6:D").getValues();
    for (let j = mainarray.length -1; j >= 0; j--)
    {
      for (let k = referencearray.length-1; k >=0; k--)
      {
        if (referencearray[k][0] == mainarray[j][0])
        {
          SHEETS[1].deleteRow(k+6);
          break;
        }
      }
    }
  }  
  
  // importarray leftover: import.
  if (importarray.length > 0)
  {
    let backupsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup")
    let cellrule = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup").getRange("B2").getDataValidation();
    for (let i = 0; i < importarray.length && i <= ITERATIONLIMIT; i++) // iteration limit
    {
      let refid = importarray[i][0];
      let refrow = SHEETS[1].getMaxRows() + 1;
      
      SHEETS[0].appendRow(['']);
      
      SHEETS[1].appendRow([''
                           , "FALSE"
                           , '=IMAGE("https://steamcdn-a.akamaihd.net/steam/apps/' + refid + '/capsule_184x69.jpg")'
                           , refid
                          , "=VLOOKUP(" + refid + ", '2 - DataProcessing'!A:C, 3, FALSE)"
                          , "=VLOOKUP(" + refid + ", '2 - DataProcessing'!A:D, 4, FALSE)/60"
                          , "=IFERROR(VLOOKUP(" + refid + ", '2 - DataProcessing'!A:E, 5, FALSE)/60, VLOOKUP(" + refid + ", '2 - DataProcessing'!A:E, 5, FALSE))"
                          , "=IF(F" + refrow + " >1, IFERROR(I" + refrow + "/F" + refrow + ", I" + refrow + "), I" + refrow + ")"
                          , ''
                          , '' 
                          , '' 
                          , "FALSE"
                          , "=VLOOKUP("+ refid +",'2 - DataProcessing'!A:L, 7, FALSE) & " + '" / "' + " & VLOOKUP("+ refid +", '2 - DataProcessing'!A:L, 8, FALSE)"
                          , "=VLOOKUP("+ refid +", '2 - DataProcessing'!A:L, 9, FALSE)"
                          , '' 
                          , "=IF(F"+refrow+">1, IFERROR(Q"+refrow+"/F"+refrow+",Q"+refrow+"), Q"+refrow+")"
                          , "=IF(ISNUMBER(U" + refrow + "), U" + refrow + ", V" + refrow + ")"
                          , "=I"+refrow+"-Q"+refrow+""
                          , "=IFERROR(R"+refrow+"/Q"+refrow+",R"+refrow+"/1)"
                          , ''
                          , "=TRANSPOSE(CheckStorePrice(D" + refrow + "))"]);
            
     
      
      
      // check if it already exists in the backup database
      // if not, add it there.
      let backuparray = backupsheet.getRange("C6:C").getValues();
      
      // else add a new row of the game
      for (let i = 0; i < backuparray.length; i++)
      {
        if (backuparray[i][0] == refid)
        {
          // if id exists on backuparray, we use said value to override the variables
          let backups;
          backups = backupsheet.getRange(i + 6, 8).copyTo(SHEETS[1].getRange(refrow, 9),SpreadsheetApp.CopyPasteType.PASTE_VALUES);
          backups = backupsheet.getRange(i + 6, 9).copyTo(SHEETS[1].getRange(refrow, 22),SpreadsheetApp.CopyPasteType.PASTE_VALUES);
          backups = backupsheet.getRange(i + 6, 5, 1, 3).copyTo(SHEETS[1].getRange(refrow, 10),SpreadsheetApp.CopyPasteType.PASTE_VALUES);
          backups = backupsheet.getRange(i + 6, 10).copyTo(SHEETS[1].getRange(refrow, 2),SpreadsheetApp.CopyPasteType.PASTE_VALUES);

          break;
        }
        if ( i == backuparray.length -1) 
        {
          backupsheet.appendRow([ '', '=IMAGE("https://steamcdn-a.akamaihd.net/steam/apps/' + refid + '/capsule_184x69.jpg")', refid, "=VLOOKUP(" + refid + ", '2 - DataProcessing'!A:C, 3, FALSE)"]);
        }
      }
      SHEETS[1].getRange(refrow, 2).insertCheckboxes();
      SHEETS[1].getRange(refrow, 12).insertCheckboxes();
      SHEETS[1].getRange(refrow, 10).setDataValidation(cellrule);
    }
    FORMATRANGE.copyFormatToRange(SHEETS[1], 2, 22, 6, SHEETS[1].getMaxRows())
    SHEETS[1].setRowHeights(6, SHEETS[1].getMaxRows() - 5, GAMEROWHEIGHT)
  }
}