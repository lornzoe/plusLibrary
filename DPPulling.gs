function DataPuller() {
  
  // filter blacklists from
  var mainarray = SHEETS[2].getRange(2,1,SHEETS[2].getMaxRows() - 1).getValues(); 
  var subsetarray = SHEETS[1].getRange(6, 3, SHEETS[1].getMaxRows() - 5).getValues();
  
  //Logger.log(mainarray);
  //Logger.log(subsetarray);
  
  var missinglist = getMissingElements(mainarray,subsetarray);
  
   Logger.log(missinglist);
   Logger.log(missinglist.length);
}

function getMissingElements(mainarray, subsetarray){

  var returnarray = new Array();
  var hasmatch = true;
  
  for (var i = 0; i < mainarray.length; i++)
  {
    hasmatch = false;
    for (var j = 0; j < subsetarray.length; j++)
    {
      if (subsetarray[j] + '' == mainarray[i] + '')
      {
        hasmatch = true;
              Logger.log('Comparing ' + subsetarray[j] + ' w/ ' + mainarray[i] + ' , ' + hasmatch)

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