function DataImport()
{
  var importarray = ImportJSON("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + APIKEY + "&steamid="+ USERID +"%0A&include_appinfo=1", "/response/games", "");
  
   var exceptionsheet = SHEETS[3];
  var exceptionarray = exceptionsheet.getRange(1, 1, exceptionsheet.getMaxRows(), exceptionsheet.getMaxColumns()).getValues();
  Logger.log(exceptionarray)
  for (var i = 1; i < exceptionarray.length; i++)
  {
    importarray.push(new Array())
        importarray[importarray.length-1][0] = exceptionarray[i][0];
    importarray[importarray.length-1][1] = exceptionarray[i][1];
    Logger.log(importarray[importarray.length-1])
  }
  Logger.log(importarray);

  var localsheet = SHEETS[2];
  var localarray = localsheet.getRange(1, 1, localsheet.getMaxRows()).getValues();
  

    if (importarray.length <= 1)
  {
    Logger.log("importarray is not feeding a proper array, we're ending the function early for safety");
    return;
  }
  // Logger.log(localarray.length);

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
  
  //Logger.log(deletionlist)
  
 
  
    var removedgameslist = new Array();

  for (var i = 1; i < localarray.length; i++)
  {
    // compare local array with deletion list
    // if theres anyhting 
    var match = false;
    var indextopush = i;
    
    for (var k = 0; k < deletionlist.length; k++)
    {
      if (localarray[i] + '' == deletionlist[k] + '')
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
        if (deletionlist[i] + '' == importarray[k][0] + '')
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
  // Logger.log(removedgameslist.length);
  // Logger.log(removedgameslist);
  
  Logger.log(newgameslist);
  Logger.log(newgameslist.length);
  
  if (removedgameslist.length > 0)
  {
    for (var i = 0; i < removedgameslist.length; i++)
    {
      for (var j = localarray.length; j > 0; j--)
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

