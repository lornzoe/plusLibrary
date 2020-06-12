function AchievementUpdater()
{  var lock = LockService.getScriptLock();
  var success = lock.tryLock(10000);
  if (!success) {
  Logger.log('Could not obtain lock after 10 seconds.');
    return;
  }
    Logger.log(USERID)

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
  lock.releaseLock()
}

function AchievementUpdaterV2()
{  var lock = LockService.getScriptLock();
  var success = lock.tryLock(10000);
  if (!success) {
  Logger.log('Could not obtain lock after 10 seconds.');
    return;
  }
    //Logger.log(USERID)

  var localsheet = SHEETS[2]
  
  // Get the existing list of games
  var idarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues()
  //Logger.log(idarray)
  //Logger.log(idarray.length)
  
  // read E2 in 4 - PlayerStats, compare to D2. max count 100 games.
  var currentcounter = SHEETS[4].getRange("E2").getValue();
  
  var iterationcount = 0;
  //now get an array of achievement stats
  for (var i = currentcounter; i < idarray.length - 1 ; i++)
  {
    //Logger.log(idarray[i]);
    //Logger.log(i);

    var acharray = getAchievementStats(idarray[i]);
    localsheet.getRange(i+2, 10).setValue(acharray[0])
    localsheet.getRange(i+2, 11).setValue(acharray[1])
    localsheet.getRange(i+2, 12).setValue(acharray[2])
    
    iterationcount++;
    SHEETS[4].getRange('E2').setValue(currentcounter + iterationcount);

    if (iterationcount >= 100)
      break;
  }
 
 currentcounter = SHEETS[4].getRange("E2").getValue();
 if (currentcounter == (SHEETS[4].getRange("D2").getValue()))
 {
   SHEETS[4].getRange("E2").setValue('0');
 }
 
 
  lock.releaseLock()
}

function getAchievementStats(appid) 
{  
  var returnarray = new Array();
  
  
  var apilink = "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=" + appid + "&key=" + APIKEY + "&steamid="+ USERID
  //Logger.log(apilink);
  var puller =  ImportJSON(apilink,"/playerstats/achievements", "noHeaders");
  returnarray[0] = Object.keys(puller).length;
  
  puller = ImportJSON("http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid="+ appid, "/achievementpercentages/achievements", "noHeaders");
  returnarray[1] = Object.keys(puller).length;
  Utilities.sleep(100)
  if (returnarray[1] != 0  && JSON.stringify(puller) != '[[""]]')
  {
    returnarray[2] = returnarray[0]/returnarray[1];
  }
  else
  {
    returnarray[1] = 0;
    returnarray[2] = '-';
  }
  //Logger.log('A' +appid + '//' + returnarray)
  
  return returnarray;
}