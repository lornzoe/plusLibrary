function MyLibUpdater()
{
  var mainarray = SHEETS[2].getRange("D6:D").getValues();
  var importarray = SHEETS[1].getRange("A2:A").getValues();
  
  for (let i = importarray.length-1; i >= 0; i--)
  {
    for (let j = mainarray.length-1; j >= 0; j--)
    {
      if (mainarray[j] + '' == importarray[i] + '')
      {
        mainarray.splice(j, 1);
        importarray.splice(i, 1);
        
        break;
      }
    }
  }
  
  // mainarray leftover: delete.
  {
    let referencearray = SHEETS[1].getRange("D6:D").getValues();
    for (let j = mainarray.length -1; j >= 0; j--)
    {
      for (let k = referencearray.length-1; k >=0; k--)
      {
        if (referencearray[k] == mainarray[j])
        {
          SHEETS[2].deleteRow(k+6);
          break;
        }
      }
    }
  }  
  
  // importarray leftover: import.
  {
    let cellrule = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup").getRange("B2").getDataValidation();
    for (let i = 0; i < importarray.length; i++)
    {
      let refid = importarray[i];
      let refrow = SHEETS[1].getMaxRows() + 1;
      
      SHEETS[0].appendRow(['']);
      
      SHEETS[1].appendRow([''
                           , "FALSE"
                           , '=IMAGE("https://steamcdn-a.akamaihd.net/steam/apps/' + refid + '/capsule_184x69.jpg")'
                           , refid
                          , "=VLOOKUP(" + refid + ", '2 - DataProcessing'!A:C, 3, FALSE)"
                          , "=VLOOKUP(" + refid + ", '2 - DataProcessing'!A:D, 4, FALSE)"
                          , "=VLOOKUP(" + refid + ", '2 - DataProcessing'!A:E, 5, FALSE)"
                          , "=IF(F" + refrow + " >1, IFERROR(I" + refrow + "/F" + refrow + ", I" + refrow + "), I" + refrow + ")"
                          , ''
                          , '' 
                          , '' 
                          , "FALSE"
                          , "=VLOOKUP("+ refid +",'2 - DataProcessing'!A:L, 7, FALSE) & " + '" / "' + " & VLOOKUP("+ refid +", '2 - DataProcessing'!A:L, 8, FALSE)"
                          , "=VLOOKUP("+ refid +", '2 - DataProcessing'!A:L, 9, FALSE)"
                          , '' 
                          , "=IF(F"+refrow+">1, IFERROR(Q"+refrow+"/F"+refrow+",Q"+refrow+"), Q"+refrow+")"
                          , ''
                          , "=I"+refrow+"-Q"+refrow+""
                          , "IFERROR(R"+refrow+"/Q"+refrow+",R"+refrow+"/1)" ]);
            
      SHEETS[1].getRange(refrow, 2).insertCheckboxes();
      SHEETS[1].getRange(refrow, 11).insertCheckboxes();
      SHEETS[1].getRange(refrow, 9).setDataValidation(cellrule);
    }
  }
}