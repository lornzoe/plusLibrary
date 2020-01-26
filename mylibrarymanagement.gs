// functions to make:
// 1. when a number is added to the blacklist, remove the respective row in MyLibrary
function GetBlacklist()
{
  var ss1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2 - RawImport").getRange("J7:J").getValues();
    var array1 = ss1.reduce(function(ar,e) {
    if (e[0])
      ar.push(e[0])
      return ar;
  },[]);
  
  return array1;
}

function GetLibrarylist()
{
   var ss2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary").getRange("B6:B").getValues()
  var array2 = ss2.reduce(function(ar,e) {
    if (e[0])
      ar.push(e[0])
      return ar;
     },[]); 
  
  return array2;
}
