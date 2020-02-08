function PlayerStatsPuller() {

  var localsheet = SHEETS[4];
  localsheet.getRange("A5").setValue(getPlayedGameCount());
  localsheet.getRange("B5").setValue(gameCount());

  localsheet.getRange("A8:E8").setValues(getPlayerLevelSummary());
  localsheet.getRange("A11:C11").setValues(accCreationSummarise(1397882446))
}

function getTimePlayedList()

{
    var ss2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary").getRange("K6:K").getValues()
  var array2 = ss2.reduce(function(ar,e) {
    if (e[0] != "#N/A")
      ar.push(e[0])
      return ar;
     },[]); 
  
  //Logger.log(array2);
  //Logger.log(array2.length);
  return array2;
}

function getPlayedGamelist() {
  var arr1 = GetLibrarylist();
  var arr2 = getTimePlayedList();
  
  if (arr1.length != arr2.length)
  {
    Logger.log("arr1 != arr2, please check");
    Logger.log(arr1.length);
    Logger.log(arr2.length);
    return;
  }
  
  var arr3 = new Array();
 for (var i = 0; i < arr1.length; i++)
 {
   if (arr2[i] ==0)
     continue;
   
   arr3.push(arr1[i]);
 }
  
  return arr3;
}

function getPlayedGameCount()
{
  var ar = new Array();
  ar = getPlayedGamelist();
  
  Logger.log(ar.length);
  return ar.length;
}

function getPlayerLevelSummary()
{
  var ar = ImportJSON("https://api.steampowered.com/IPlayerService/GetBadges/v1/?key=A38DA95FFA665E6405259280AA8E58C8&steamid=76561198133758253", "/response/", "noHeaders");
  Logger.log(ar);
  //return ar;
  
  var rtn = new Array;
  rtn[0] = new Array;
  rtn[0].push(ar[ar.length-1][9]);
  rtn[0].push(ar[ar.length-1][8]);
  rtn[0].push(ar[ar.length-1][11]);
  rtn[0].push((rtn[0][1] - rtn[0][2]));
  var expn = parseFloat(rtn[0][3]) + parseFloat(ar[ar.length-1][10]);
  rtn[0].push(expn);
  return rtn;
}

function unixtimestamptodatestring(unix_timestamp)
{
// Months array
 var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

 // Convert timestamp to milliseconds
 var date = new Date(unix_timestamp*1000);

 // Year
 var year = date.getFullYear();

 // Month
 var month = months_arr[date.getMonth()];
 var monthint = date.getMonth() + 1;
 // Day
 var day = date.getDate();

 // Hours
 var hours = date.getHours();

 // Minutes
 var minutes = "0" + date.getMinutes();

 // Seconds
 var seconds = "0" + date.getSeconds();

 // Display date time in MM-dd-yyyy h:m:s format
  var convdataTime = new Array();
  convdataTime[0] = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  convdataTime[1] = day+'/'+monthint+'/'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
 return convdataTime;
}

function accCreationSummarise(unix_timestamp)
{
  var timestamps = new Array();
  timestamps[0] = new Array();
  timestamps[0][0] = unix_timestamp;
  var doc = unixtimestamptodatestring(unix_timestamp)
  timestamps[0][1] = doc[0];
  doc2 = unixtimestamptodatestring(parseFloat(unix_timestamp) + parseFloat(28800));
  timestamps[0][2] = doc2[1];
  return timestamps;
}