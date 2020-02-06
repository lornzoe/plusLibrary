function puller()
{
  var importarray = ImportJSON("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=A38DA95FFA665E6405259280AA8E58C8&steamid=76561198133758253%0A&include_appinfo=1", "/response/games", "");
  var localsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("dpv2");
  var localarray = localsheet.getRange(1, 1, localsheet.getMaxRows()).getValues();
  

  //Logger.log(importarray[1][0]);
  //Logger.log(localarray[1]);

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
  
  var exceptionsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet21")
  var exceptionarray = exceptionsheet.getRange(1, 1, exceptionsheet.getMaxRows(), exceptionsheet.getMaxColumns());

  for (var i = 1; i < exceptionarray.length; i++)
  {
    deletionlist.push(exceptionarray[i][0]);
  }
  // comparing the deletionlist
  var removedgameslist = new Array();
  var newgameslist = new Array();
  
  //... with the 2 arrays
  
  for (var i = 0; i < deletionlist.length; i++)
  {
    for (var k = 1; k < localarray.length; k++)
    {
      var match = false;
      if (deletionlist[i] == localarray[k])
      {
        match = true;
        continue;
      }
      if (match == false && k == localarray.length - 1)
      {
        removedgameslist.push(localarray[k]);
      }
    }
    
    for (var k = 1; k < importarray.length; k++)
    {
      var match2 = false;
      if (deletionlist[i] == importarray[k][0])
      {
        match2 = true;
        continue;
      }
      if (match2 == false && k == importarray.length - 1)
      {
        newgameslist.push(localarray[k]);
      }
    }
  }
  // after creating the new arrays, 
  Logger.log(removedgameslist.length);
  Logger.log(newgameslist.length);
  
  if (removedgameslist.length > 0)
  {
    // function to remove games from DP and myLib
    
  }
  
  if (newgameslist.length >0)
  {
    // function to add games to DP and myLib
  }
}