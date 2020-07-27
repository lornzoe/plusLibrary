var OVERVIEW = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("0 - Overview");
var MYLIBRARY= SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary");
var DATAPROCESSING = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2 - DataProcessing");
var EXCEPTIONLIST = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("3 - ExceptionList");
var PLAYERSTATS = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("4 - PlayerStats");

var BKUPSHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup")

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

var USERID = SHEETS[4].getRange("A2").getValue();
var APIKEY = SHEETS[4].getRange("B2").getValue();

var GAMEROWHEIGHT = 48;
var FORMATRANGE = SHEETS[1].getRange("B4:V4")
var BKUPFORMATRANGE = BKUPSHEET.getRange("B4:K4")
var ITERATIONLIMIT = 50;

