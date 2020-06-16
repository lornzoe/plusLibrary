function CombinedTimePuller(){
  var localsheet = SHEETS[2];
  var idarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues();
  var importarray = IMPORTJSONAPI("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + APIKEY + "&steamid="+ USERID +"%0A&include_appinfo=0", "$.response.games[*]", "appid, playtime_forever, playtime_2weeks");
  
  for (var i = 1; i < importarray.length; i++)
  {
    for (var j = 0; j < idarray.length ; j++) 
    {
      if (idarray[j] == importarray[i][0])
      {
        localsheet.getRange(j+2, 4).setValue(importarray[i][1]);
        localsheet.getRange(j+2, 5).setValue(importarray[i][1]/60);
        localsheet.getRange(j+2, 17).setValue('-');
        localsheet.getRange(j+2, 16).setValue(importarray[i][2]);
        if (importarray[i][2]/60 != 0)
          localsheet.getRange(j+2, 17).setValue(importarray[i][2]/60);
      }
    }
  }
  
}
