function TimePuller() {
  // get numbers, iterate through the list, update the numbers.
  localsheet = SHEETS[2];
  var idarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues();
  importarray = ImportJSON("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + APIKEY + "&steamid="+ USERID +"%0A&include_appinfo=0", "/response/games", "");
  
  for (var i = 1; i < importarray.length; i++)
  {
    for (var j = 0; j < idarray.length ; j++) 
    {
      if (idarray[j] == importarray[i][0])
      {
        // copy-paste time here 
        localsheet.getRange(j+2, 4).setValue(importarray[i][1]);
        localsheet.getRange(j+2, 5).setValue(importarray[i][1]/60);
      }
    }
  }
}

function RecentTimePuller(){
  var localsheet = SHEETS[2];
  var idarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues();
  var importarray = IMPORTJSONAPI("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=9C2F8B579B777036AD7B17C6A5BEC8FA&steamid=76561198133758253&include_appinfo=0", "$.response.games[*]", "appid, playtime_2weeks");
  
  for (var i = 1; i < importarray.length; i++)
  {
    for (var j = 0; j < idarray.length ; j++) 
    {
      if (idarray[j] == importarray[i][0])
      {
        // copy-paste time here 
        localsheet.getRange(j+2, 16).setValue(importarray[i][1]);
        localsheet.getRange(j+2, 17).setValue(importarray[i][1]/60);
      }
    }
  }
  
}
