function MyLibUpdater()
{
  var mainarray = SHEETS[1].getRange("D6:D").getValues(); //get appid list from library
  var importarray = SHEETS[2].getRange("A2:A").getValues(); // get appid list from dataprocessing
  var importarray2 = SHEETS[2].getRange("C2:C").getValues(); // get name list from dataprocessing
  
  for (let i = importarray.length-1; i >= 0; i--)
  {
    for (let j = mainarray.length-1; j >= 0; j--)
    {
      // if the appid matches, delete entries from both sides
      if (mainarray[j][0] + '' == importarray[i][0] + '')
      {
        mainarray.splice(j, 1);
        importarray.splice(i, 1);
        importarray2.splice(i, 1);
        
        break;
      }
    }
  }
  
  // mainarray leftover: delete.
  Logger.log("--delete mainarray leftovers")
  Logger.log(mainarray)
  if(SHEETS[1].getMaxRows() > 5) 
  {
    for (let j = mainarray.length -1; j >= 0; j--)
    {
      let referencearray = SHEETS[1].getRange("D6:D").getValues();
      let indextarget = referencearray.indexOf(mainarray[j])
      if(indextarget != -1)
      {
        SHEETS[1].deleteRow(k+6);
        continue;
        
      }
      
      for (let k = referencearray.length-1; k >=0; k--)
      {
        if (referencearray[k]+'' == mainarray[j]+'')
        {
          SHEETS[1].deleteRow(k+6);
          break;
        }
      }
    }
  }
  Logger.log("--finish delete")
  
  // importarray leftover: import.
  if (importarray.length > 0)
  {
    let backupsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup")
    let cellrule = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup").getRange("B2").getDataValidation();
    let cellrule2 = SHEETS[1].getRange("B4").getDataValidation();

    for (let i = 0; i < importarray.length && i <= ITERATIONLIMIT; i++) // iteration limit
    {
      let refid = importarray[i][0];
      let refname = importarray2[i][0]
      let refrow = SHEETS[1].getMaxRows() + 1;
      
      SHEETS[0].appendRow(['']);
      
      SHEETS[1].appendRow([''
                           , "Game"
                           , '=HYPERLINK(D2 & ROW(),IMAGE("https://steamcdn-a.akamaihd.net/steam/apps/' + refid + '/capsule_184x69.jpg"))'
                           , '=HYPERLINK(D3 & ' + refid + ', ' + refid + ')'
                           , refname
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
                           , ''
                           , '' 
                           , "=IF(F"+refrow+">1, IFERROR(S"+refrow+"/F"+refrow+",S"+refrow+"), S"+refrow+")"
                           , "=IF(ISNUMBER(W" + refrow + "), W" + refrow + ", X" + refrow + ")"
                           , "=I"+refrow+"-S"+refrow+""
                           , "=IFERROR(T"+refrow+"/S"+refrow+",T"+refrow+"/1)"
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
          backups = backupsheet.getRange(i + 6, 8).copyTo(SHEETS[1].getRange(refrow, 9),SpreadsheetApp.CopyPasteType.PASTE_VALUES); // cost
          backups = backupsheet.getRange(i + 6, 9).copyTo(SHEETS[1].getRange(refrow, 24),SpreadsheetApp.CopyPasteType.PASTE_VALUES); // manual store price
          backups = backupsheet.getRange(i + 6, 5, 1, 3).copyTo(SHEETS[1].getRange(refrow, 10),SpreadsheetApp.CopyPasteType.PASTE_VALUES); //nzoscore, thoughts, tickmark
          backups = backupsheet.getRange(i + 6, 10).copyTo(SHEETS[1].getRange(refrow, 2),SpreadsheetApp.CopyPasteType.PASTE_VALUES); // 
          backups = backupsheet.getRange(i + 6, 12).copyTo(SHEETS[1].getRange(refrow, 16),SpreadsheetApp.CopyPasteType.PASTE_VALUES);
          break;
        }
        if ( i == backuparray.length -1 && backuparray[i][0] != refid) 
        {
          backupsheet.appendRow([
            '',
            '=IMAGE("https://steamcdn-a.akamaihd.net/steam/apps/' + refid + '/capsule_184x69.jpg")',
            refid,
            refname,
            '',
            '',
            "FALSE",
            '',
            '',
            "Bundle Trash",
            "=VLOOKUP(" + refid + ", '2 - DataProcessing'!A:C, 3, FALSE)",
            ''
          ]);
          BKUPFORMATRANGE.copyFormatToRange(BKUPSHEET,2,10,BKUPSHEET.getMaxRows(), BKUPSHEET.getMaxRows())
          
          BKUPSHEET.getRange(BKUPSHEET.getMaxRows(),2,1,10).setDataValidations(BKUPFORMATRANGE.getDataValidations())
        }
      }
      //SHEETS[1].getRange(refrow, 2).insertCheckboxes();
      SHEETS[1].getRange(refrow, 2).setDataValidation(cellrule2);
      SHEETS[1].getRange(refrow, 12).insertCheckboxes();
      SHEETS[1].getRange(refrow, 10).setDataValidation(cellrule);
    }
    FORMATRANGE.copyFormatToRange(SHEETS[1], 2, 24, 6, SHEETS[1].getMaxRows())
    //SHEETS[1].setRowHeights(6, SHEETS[1].getMaxRows() - 5, GAMEROWHEIGHT)
    
    SHEETS[1].getRange(6, 3, SHEETS[1].getMaxRows() - 6, 3).setBorder(true, true, true, true, false, true)
    SHEETS[1].getRange(6, 6, SHEETS[1].getMaxRows() - 6, 3).setBorder(true, true, true, true, false, false)
    SHEETS[1].getRange(6, 9, SHEETS[1].getMaxRows() - 6, 1).setBorder(true, true, true, true, false, true)
    SHEETS[1].getRange(6, 10, SHEETS[1].getMaxRows() - 6, 3).setBorder(true, true, true, true, false, true)
    SHEETS[1].getRange(6, 13, SHEETS[1].getMaxRows() - 6, 2).setBorder(true, true, true, true, false, true)
    SHEETS[1].getRange(6, 18, SHEETS[1].getMaxRows() - 6, 4).setBorder(true, true, true, true, false, true)
    
    SHEETS[4].getRange("A5").setValue(getPlayedGameCount());
    SHEETS[4].getRange("B5").setValue(gameCount());
    OverviewAdjust() 
        
        
    SortMyBlacklist()
    SortMyLib()
  }
}

function SortMyLib(){
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary").getRange('A6:X').sort({column: 4, ascending: true});
}

function SortMyBlacklist(){
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup").getRange('A6:L').sort({column: 3, ascending: true});
}