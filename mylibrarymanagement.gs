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
   var ss2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary").getRange("C6:C").getValues()
  var array2 = ss2.reduce(function(ar,e) {
    if (e[0])
      ar.push(e[0])
      return ar;
     },[]); 
  
  return array2;
}

function arrayComparerForSimilarElement(array1, array2)
{
  // tldr; array1 > array2; look through array2 for any elements missing when compared to array1. add said element to the list.
  
    var array3 = new Array(); // to import
  for (var i = 0; i < array1.length; i++)
  {
    if (array1.indexOf(array2[i]) != -1) // if theres a match
    {
      //Logger.log(array2[i]);
      array3.push(array2[i]);
    }
  };
   
  if (array3.length <= 0)
  {
    //Logger.log("no new entries detected")
    return;
  }
  return array3;
}

function onDPEdit()
{
  var ll = GetLibrarylist();
  var bl =  GetBlacklist();
  
  var dl = new Array();
  // comparing for similarities
  dl = arrayComparerForSimilarElement(ll,bl); 
  Logger.log(dl);
  
  // if there's nothing, no point going on
  if (dl.length == 0)
    return;
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary");
  var ss = sheet.getDataRange().getValues();

  for (var i = 0; i < dl.length; i++)
  {
    for (var j = ss.length-1; j >=0; j--)
    {
      if(ss[j][2] == dl[i])
      {
        sheet.deleteRow(j+1);
        //Logger.log(j+1);
      }
    }
  }
}