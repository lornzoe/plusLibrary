function DataImport()
{
  var importarray = ImportJSON("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=A38DA95FFA665E6405259280AA8E58C8&steamid=76561198133758253%0A&include_appinfo=1", "/response/games", "");
  var localsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("dpv2");
  var localarray = localsheet.getRange(1, 1, localsheet.getMaxRows()).getValues();
  

  Logger.log(importarray.length);
    if (importarray.length <= 1)
  {
    Logger.log("importarray is not feeding a proper array, we're ending the function early for safety");
    return;
  }
  Logger.log(localarray.length);

  // create deletion list here
  var deletionlist = new Array();
  for (var i = 1; i < localarray.length; i++)
  {
    for (var j = 1; j < importarray.length; j++)
    {
      if (localarray[i] == importarray[j][0])
      {
        deletionlist.push(localarray[i]);
      }
    }
  }
  
  Logger.log(deletionlist)
  
  var exceptionsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet21")
  var exceptionarray = exceptionsheet.getRange(1, 1, exceptionsheet.getMaxRows(), exceptionsheet.getMaxColumns());

  for (var i = 1; i < exceptionarray.length; i++)
  {
    deletionlist.push(exceptionarray[i][0]);
  }
    
    var removedgameslist = new Array();

  for (var i = 1; i < localarray.length; i++)
  {
    // compare local array with deletion list
    // if theres anyhting 
    var match = false;
    var indextopush = i;
    
    for (var k = 0; k < deletionlist.length; k++)
    {
      if (localarray[i] == deletionlist[k])
      {
        match = true;
        break;
      }
    }
    if (match == false)
    {
      removedgameslist.push(localarray[i]);
    }
  }
  
  // comparing for new game entries
  var newgameslist = new Array();
  for (var k = 1; k < importarray.length; k++)
    {
      var match2 = false;
      
      for (var i = 0; i < deletionlist.length; i++)
      {
        if (deletionlist[i] == importarray[k][0])
        {
          match2 = true;
        }
      }
      
      if (match2 == false)
      {
        newgameslist.push(new Array());
        newgameslist[newgameslist.length-1] = [importarray[k][0],importarray[k][1], importarray[k][2]];
      }
    }
  
  // after creating the new arrays, 
  Logger.log(removedgameslist.length);
    Logger.log(removedgameslist);

  Logger.log(newgameslist.length);
  
  if (removedgameslist.length > 0)
  {
    for (var i = 0; i < removedgameslist.length; i++)
    {
      for (var j = localarray.length-1; j > 0; j--)
      {
        if (localarray[j] == removedgameslist[i])
        {
          localsheet.deleteRow(j+1);
          break;
        }
      }
    }
  }
  
  if (newgameslist.length > 0)
  {
    for (var i = 0; i < newgameslist.length; i++)
    {
       localsheet.appendRow([newgameslist[i][0], '=IMAGE("https://steamcdn-a.akamaihd.net/steam/apps/' + newgameslist[i][0] +'/capsule_184x69.jpg")', newgameslist[i][1] , newgameslist[i][2], newgameslist[i][2]/60  ])
    }
  }
}

function getStorePriceArray()
{
  var localsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("dpv2");
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
      //Logger.log(apilink)


  
  var apipulled = ImportJSON(apilink, "", "rawHeaders");
    Logger.log(apipulled.length)
    Logger.log(apipulled[0].length)

  return StoreArrayPrettifier(apipulled);
}

function StoreArrayPrettifier(importarray)
{
  var localsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("dpv2");
  var localarray = localsheet.getRange(1, 1, localsheet.getMaxRows()).getValues();
 
  var returnarray = new Array();
  var highestindex = 0;
  for (var j = 1; j < localarray.length; j++)
  {
    returnarray[j-1] = new Array();
    returnarray[j-1][0] = localarray[j].toString();
    Logger.log(localarray[j])
    
    var searchterm = "/" + localarray[j] +"/success";
    
    //search for the index with the success flag
    for (var k = highestindex; k < importarray[0].length;k++)
    {
      if (importarray[0][k] == searchterm)
      {
        highestindex = k;
        break;
      }
    }
    if (importarray[1][k] == "TRUE" || importarray[1][k] == "true")
    {
     var searchterm2 = "/" + localarray[j] + "/data/price_overview/final";
     var isfound = false;
     for (var m = k; m < k + 5; m++) //limit to +10 searches 
     {
       if (importarray[0][m] == searchterm2)
       {
         isfound = true;
         returnarray[j-1][1] = importarray[1][m]; // CASE A
         break;
       }
     }
      if (!isfound) // CASE B
      {
        returnarray[j-1][1] = "ERROR_NOPRICE";
      }
    }
    else //  (importarray[1][k] == "FALSE" || importarray[1][k] == "false")
    {
      returnarray[j-1][1] = "ERROR_FALSE"
      continue;
    }
  }
  Logger.log(returnarray);
  return returnarray;
}

//access sheet, 

function StorePriceUpdater()
{
    var importarray = getStorePriceArray();
    var localsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("dpv2");
    for (var i = 0;  i < importarray.length; i++)
    {
      if(isNaN(importarray[i][1]) == false)
        localsheet.getRange(i+2 , 7).setValue(importarray[i][1] / 100)
      else
        localsheet.getRange(i+2 , 7).setValue(importarray[i][1])
    }

}