function DataPuller() {
    
  // filter blacklists from
  var mainarray = SHEETS[2].getRange(2,1,SHEETS[2].getMaxRows() - 1).getValues(); 
  var subsetarray = SHEETS[1].getRange(6, 3, SHEETS[1].getMaxRows() - 5).getValues();
  
  //Logger.log(mainarray);
  //Logger.log(subsetarray);
  
  var missinglist = getMissingElements(mainarray,subsetarray);
  
  Logger.log(missinglist);
  // Logger.log(missinglist.length);

  // Look for blacklisted entries and splice them out
  var blacklist = SHEETS[2].getRange(2,6,SHEETS[2].getMaxRows() - 1).getValues();
  // Logger.log(blacklist);
  
  var removalarray = new Array();
  for (var i = 0; i < blacklist.length; i++)
  {
    if (blacklist[i] == 'true')
      removalarray.push(mainarray[i]);
  }
  // Logger.log(removalarray);

  for (var i = missinglist.length; i >= 0; i--)
  {
    for (var j = 0; j < removalarray.length; j++)
    {
      if (missinglist[i] == removalarray[j])
      {
        missinglist.splice(i, 1);
      }
    }
  }
  // Logger.log(missinglist)
  
  Logger.log(SHEETS[1].getMaxRows())
  
  var limiter = (missinglist.length > 5) ? 4: missinglist.length;
   for (var i = 0; i < limiter; i++)
  {
    var refrow = (SHEETS[1].getMaxRows() + 1)  + '';
    var refid = missinglist[i] + '';
    
    SHEETS[0].appendRow(['']);
    SHEETS[0].getRange(SHEETS[0].getMaxRows(), 14, 1, 2).setBorder(false, true, false, true, null, null);
      
    SHEETS[1].appendRow([''
                         , "=VLOOKUP(" + missinglist[i] + ", '2 - DataProcessing'!A:C, 2, FALSE)"
                         , refid
                         ,"=VLOOKUP(" + missinglist[i] + ", '2 - DataProcessing'!A:C, 3, FALSE)"
                         ,"=K" +refrow +' /60'
                         , "=IF(E"+ refrow+ ">1, IFERROR(G"+refrow+"/E"+refrow+",G"+refrow+"), G" +refrow+")"
                         , "=VLOOKUP("+ refid +", '2 - DataProcessing'!$A$2:I, 9, FALSE)"
                         , ''
                         ,'' 
                         ,'' 
                         , "=VLOOKUP("+ refid +", '2 - DataProcessing'!A:D, 4, FALSE)"
                         ,'' 
                         ,'' 
                         , "=VLOOKUP("+ refid +",'2 - DataProcessing'!A$2:L, 10, FALSE) & " + '"/"' + " & VLOOKUP("+ refid +", '2 - DataProcessing'!A$2:L, 11, FALSE)"
                         ,"=VLOOKUP("+ refid +", '2 - DataProcessing'!A$2:L, 12, FALSE)"
                         , '' 
                         ,"=IF(E"+refrow+">1, IFERROR(R"+refrow+"/E"+refrow+",R"+refrow+"), R"+refrow+")"
                         ,"=IF(ISNUMBER(VLOOKUP("+ refid +", '2 - DataProcessing'!A$2:G, 7, FALSE)),VLOOKUP("+ refid +", '2 - DataProcessing'!A$2:G, 7, FALSE), VLOOKUP("+ refid +", '2 - DataProcessing'!A$2:H, 8, FALSE))"
                         , "=G"+refrow+"-R"+refrow+""
                         , "=TO_PERCENT(IFERROR(S"+refrow+"/R"+refrow+",S"+refrow+"/1))" ]);
    SHEETS[1].getRange(SHEETS[1].getMaxRows(), 14, 1, 2).setBorder(false, true, false, true, null, null);  
  }
  
  OverviewAdjust();
}

function getMissingElements(mainarray, subsetarray){

  var returnarray = new Array();
  var hasmatch = true;
  
  for (var i = 0; i < mainarray.length; i++)
  {
    hasmatch = false;
    for (var j = 0; j < subsetarray.length; j++)
    {
      if (subsetarray[j] + '' == mainarray[i] + '') // i dont know why the 2 arrays are not the same data type (have to convert both to string, like nanda the fucking kore.
      {
        hasmatch = true;
              // Logger.log('Comparing ' + subsetarray[j] + ' w/ ' + mainarray[i] + ' , ' + hasmatch)

        break;
      }
    }
    
    if (hasmatch == false)
    {
      returnarray.push(mainarray[i]);
    }
  }
  
  return returnarray;
}