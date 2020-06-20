function CombinedTimePuller(){
  var localsheet = SHEETS[2];
  var idarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues();
  var importarray = IMPORTJSONAPI("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + APIKEY + "&steamid="+ USERID +"%0A&include_appinfo=0", "$.response.games[*]", "appid, playtime_forever, playtime_2weeks");
  
  localsheet.getRange(2, 5, localsheet.getMaxRows() - 1).setValue('-')
  for (var i = 1; i < importarray.length; i++)
  {
    for (var j = 0; j < idarray.length ; j++) 
    {
      if (idarray[j] == importarray[i][0])
      {
        localsheet.getRange(j+2, 4).setValue(importarray[i][1]);
        if(importarray[i][2] != null)
          localsheet.getRange(j+2, 5).setValue(importarray[i][2]);
      }
    }
  }
  
}
