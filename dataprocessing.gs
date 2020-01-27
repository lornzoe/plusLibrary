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

function ImportSteamAchievementData(appid)
{
  var inserter = new Array(1);
  inserter[0] = new Array(3);
  
  var test =  ImportJSON("http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=" + appid + "&key=A38DA95FFA665E6405259280AA8E58C8&steamid=76561198133758253",
                        "/playerstats/achievements", "noHeaders");
  inserter[0][0] = Object.keys(test).length;
  
  test = ImportJSON("http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid="+ appid, "/achievementpercentages", "noHeaders");
  inserter[0][1] = Object.keys(test).length;
  
  if (inserter[0][1] != 0)
  {
  inserter[0][2] = inserter[0][0]/inserter[0][1];
  }
  else
    inserter[0][2] = "-"
 return inserter;

}

function RawCopyCat() // import data from RawImport to DataProcessor
{
// get 1st column of current sheet and ss
  var ss1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2 - RawImport").getRange("A2:A").getValues();

  // put both of them into an array
  var array1 = ss1.reduce(function(ar,e) {
    if (e[0])
      ar.push(e[0])
      return ar;
  },[]);
                                  
  var ss2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("3 - DataProcessing")
  var ss2v2 = ss2.getRange("A2:A").getValues()
  var array2 = ss2v2.reduce(function(ar,e) {
    if (e[0])
      ar.push(e[0])
      return ar;
     },[]);
// compare arrays
  var array3 = new Array(); // to import
  for (var i = 0; i < array1.length; i++)
  {
    if (array2.indexOf(array1[i]) == -1)
      array3.push(array1[i]);
  };
   
  if (array3.length <= 0)
  {
    Logger.log("no new entries detected")
    return;
  }
  
// put extras into current spreadsheet
  var array4 = new Array(array3.length);
  for (var i =0; i < array3.length; i++)
  {
    array4[i] = new Array();
    array4[i][0] = array3[i];
    array4[i][1] = "=VLOOKUP(" + array3[i] + ", '2 - RawImport'!A:C, 3, FALSE)";
    array4[i][2] = "=ImportSteamAchievementData(" + array3[i] + ")";
    array4[i][3] = "";
    array4[i][4] = "";
    array4[i][5] = "=ImportSteamStorePrice(" +array3[i] +") / 100";
    array4[i][6] = "";
    
    addGame(array3[i]); // adds game to library
  }
  
  ss2.setActiveRange(ss2.getRange(ss2.getLastRow()+1, 1, array4.length, array4[0].length)).setValues(array4);
   
  Logger.log("added numbers: ", array4.length);
  
}