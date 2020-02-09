function StorePriceUpdater()
{
     
  var lock = LockService.getScriptLock();
  var success = lock.tryLock(10000);
  if (!success) {
  Logger.log('Could not obtain lock after 10 seconds.');
    return;
  }
    var importarray = getStorePriceArray();
    var localsheet = SHEETS[2];
    for (var i = 0;  i < importarray.length; i++)
    {
      if(isNaN(importarray[i][1]) == false)
        localsheet.getRange(i+2 , 7).setValue(importarray[i][1] / 100)
      else
        localsheet.getRange(i+2 , 7).setValue(importarray[i][1])
    }
  lock.releaseLock()
}

function getStorePriceArray()
{
  var localsheet = SHEETS[2];
  Logger.log(localsheet.getMaxRows())
  var localarray = localsheet.getRange(1, 1, localsheet.getMaxRows()).getValues();
  
    //Logger.log(localarray.length);
    //Logger.log(localarray)
  
  var apilink = "http://store.steampowered.com/api/appdetails?appids=";
  for (var i = 1; i < localarray.length; i++)
  {
        //Logger.log(localarray[i])

    apilink += '' + localarray[i]
    if (i != (localarray.length - 1))
      apilink += ','
  }
  apilink += '&cc=sg&filters=price_overview'
      Logger.log(apilink)


  
  var apipulled = ImportJSON(apilink, "", "rawHeaders");
    Logger.log(apipulled.length)
    Logger.log(apipulled[0].length)

  return StoreArrayPrettifier(apipulled);
}

function StoreArrayPrettifier(importarray)
{
  var localsheet = SHEETS[2];
  var localarray = localsheet.getRange(1, 1, localsheet.getMaxRows()).getValues();
 
  var returnarray = new Array();
  var highestindex = 0;
  for (var j = 1; j < localarray.length; j++)
  {
    returnarray[j-1] = new Array();
    returnarray[j-1][0] = localarray[j]+ "";
    //Logger.log(localarray[j])
    
    var searchterm = "/" + localarray[j] +"/success";
    
    //search for the index with the success flag
    for (var k = highestindex; k < importarray[0].length;k++)
    {
      if (importarray[0][k] == searchterm)
      {
        highestindex = k;
        Logger.log(importarray[0][k] + "//" + highestindex + "//" + importarray[1][k])

        break;
      }

    }
    
    
    if (importarray[1][k] === "TRUE" || importarray[1][k] === "true")
    {
     var searchterm2 = "/" + localarray[j] + "/data/price_overview/final";
      
     var isfound = false;
     for (var m = k; m <= k + 5; m++) //limit to +10 searches 
     {
       if (importarray[0][m] == searchterm2)
       {
         isfound = true;
         returnarray[j-1][1] = importarray[1][m]; // CASE A
         break;
       }
     }
      if (isfound == false) // CASE B
      {
        returnarray[j-1][1] = "ERROR_NOPRICE";
      }
    }
    else if(importarray[1][k] == "FALSE" || importarray[1][k] === "false")
    {
      returnarray[j-1][1] = "ERROR_FALSE"
      continue;
    }
    else
    {
      returnarray[j-1][1] = "UNK_VAL"
    }
    
  }
  //Logger.log(returnarray);
  return returnarray;
}