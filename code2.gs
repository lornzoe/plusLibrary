function ImportSteamStorePrice(appid)
{
  var paramOne = "https://store.steampowered.com/api/appdetails?appids=" + appid + "cc=sg&filters=price_overview";
  var paramTwo = "/" + appid + "/data/price_overview/initial";
 
  Sleeper();
      return ImportJSON(paramOne, paramTwo, "noHeaders");
  
}

function ImportAchievementCount(appid)
{
  if(appid == null || appid == "")
    return "";
  var parone = "http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=" + appid +"&format=xml";
  var partwo = "//achievementpercentages/achievements";
  return ImportXML(parone,partwo).count();
}

function testfunc()
{
  Utilities.sleep(333);
  
  return ImportJSON("https://store.steampowered.com/api/appdetails?appids=211050&cc=sg&filters=price_overview",
                    "/211050/data/price_overview/initial", "noHeaders, noInherit");
}

function Sleeper()
{
   var randnumber = Math.random()*5000;

      Utilities.sleep(randnumber);
      Utilities.sleep(randnumber);
}