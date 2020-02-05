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

  // comparing the deletionlist
  var removedgameslist = new Array();
  var newgameslist = new Array();
  
  //... with localarray
  for (var i = 1; i < localarray.length; i++)
  {
    var foundmatch = false;
    for (var j = 0; j < deletionlist.length; j++)
    {
      if (localarray[i] == deletionlist[j])
        foundmatch = true;
    }
     for (var k = 1; k < exceptionarray.length; k++)
    {
      if (localarray[i] == exceptionarray[k])
        foundmatch = true;
    }
    
    if (foundmatch == false)
      removedgameslist.push(localarray[i]);

  }
                            
  Logger.log(removedgameslist); 

}