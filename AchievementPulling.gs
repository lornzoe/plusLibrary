function AchievementUpdater()
{
  var localsheet = SHEETS[2]
  var idarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues()
  var currentcounter = SHEETS[4].getRange("D2").getValue();
  
  var iterationcount = 0;
  //now get an array of achievement stats
  for (var i = currentcounter; i < idarray.length - 1 ; i++)
  {
    var acharray = getAchievementStats(idarray[i]);
    localsheet.getRange(i+2, 7).setValue(acharray[0]);
    localsheet.getRange(i+2, 8).setValue(acharray[1]);
    localsheet.getRange(i+2, 9).setValue(acharray[2]).setNumberFormat("0.00%");
    
    iterationcount++;
    SHEETS[4].getRange('D2').setValue(currentcounter + iterationcount);

    if (iterationcount >= 100)
      break;
  }
 
  currentcounter = SHEETS[4].getRange("D2").getValue();
  if (currentcounter >= (SHEETS[4].getRange("C2").getValue()))
  {
    SHEETS[4].getRange("D2").setValue('0');
  }
}

function getAchievementStats(appid) 
{  
  var returnarray = new Array();
  var puller =  IMPORTJSONAPI("http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=" + appid + "&key=" + APIKEY + "&steamid="+ USERID,"$.playerstats.achievements[*]", "@");
  if (puller != null)
    returnarray[0] = puller.length;
  else
    returnarray[0] = 0;

  puller = IMPORTJSONAPI("http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=582010","$.achievementpercentages.achievements[*]", "@");

  if (returnarray[0] != 0  && puller != null)
  {
    returnarray[1] = puller.length;
    returnarray[2] = returnarray[0]/returnarray[1];
  }
  else
  {
    returnarray[1] = 0;
    returnarray[2] = '-';
  }  
  return returnarray;
}