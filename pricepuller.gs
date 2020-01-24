function ImportSteamStorePrice(appid)
{
  var paramOne = "https://store.steampowered.com/api/appdetails?appids=" + appid + "cc=sg&filters=price_overview";
  var paramTwo = "/" + appid + "/data/price_overview/initial";
 
  Sleeper();
      return ImportJSON(paramOne, paramTwo, "noHeaders");
  
}

function Sleeper()
{
   var randnumber = Math.random()*5000;

      Utilities.sleep(randnumber);
      Utilities.sleep(randnumber);
}