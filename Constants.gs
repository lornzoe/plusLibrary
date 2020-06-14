var USERID = "76561198133758253";
var APIKEY = "9C2F8B579B777036AD7B17C6A5BEC8FA" ;

var OVERVIEW = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("0 - Overview");
var MYLIBRARY= SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary");
var DATAPROCESSING = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2 - DataProcessing");
var EXCEPTIONLIST = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("3 - ExceptionList");
var PLAYERSTATS = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("4 - PlayerStats");

var SHEETS = new Array();
SHEETS = [OVERVIEW, MYLIBRARY, DATAPROCESSING, EXCEPTIONLIST, PLAYERSTATS];

var SHEETNAMES = new Array();
SHEETNAMES = ['0 - Overview', '1 - MyLibrary', '2 - DataProcessing', '3 - ExceptionList', '4 - PlayerStats'];

function ReloadSheets()
{
  OVERVIEW = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("0 - Overview");
  MYLIBRARY= SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary");
  DATAPROCESSING = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2 - DataProcessing");
  EXCEPTIONLIST = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("3 - ExceptionList");
  PLAYERSTATS = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("4 - PlayerStats");
}

