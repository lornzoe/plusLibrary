function AchievementUpdater()
{
  var localsheet = SHEETS[2]
  
  // Get the existing list of games
  var idarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues()
  //Logger.log(idarray)
  //Logger.log(idarray.length)
  
  //now get an array of achievement stats
  for (var i = 0; i < idarray.length - 1; i++)
  {
    var acharray = getAchievementStats(idarray[i]);
    localsheet.getRange(i+2, 10).setValue(acharray[0])
    localsheet.getRange(i+2, 11).setValue(acharray[1])
    localsheet.getRange(i+2, 12).setValue(acharray[2])
  }
  
}

function getAchievementStats(appid) 
{  
  var returnarray = new Array();
  
  var puller =  ImportJSON("http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=" + appid + "&key=" + APIKEY + "&steamid="+ USERID ,"/playerstats/achievements", "noHeaders");
  returnarray[0] = Object.keys(puller).length;
  
  puller = ImportJSON("http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid="+ appid, "/achievementpercentages/achievements", "noHeaders");
  returnarray[1] = Object.keys(puller).length;
  
  if (returnarray[1] != 0)
  {
    returnarray[2] = returnarray[0]/returnarray[1];
  }
  else
    returnarray[2] = '-';
  
  //Logger.log('A' +appid + '//' + returnarray)
  return returnarray;
}