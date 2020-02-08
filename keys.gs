var USERID = "76561198133758253";
var APIKEY = "A38DA95FFA665E6405259280AA8E58C8" ;

var OVERVIEW = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("0 - Overview");
var MYLIBRARY= SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1 - MyLibrary");
var DATAPROCESSING = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2 - DataProcessing");
var EXCEPTIONLIST = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("3 - ExceptionList");
var PLAYERSTATS = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("4 - PlayerStats");

var SHEETS = new Array();
SHEETS = [OVERVIEW, MYLIBRARY, DATAPROCESSING, EXCEPTIONLIST, PLAYERSTATS];

var SHEETNAMES = new Array();
SHEETNAMES = ['0 - Overview', '1 - MyLibrary', '2 - DataProcessing', '3 - ExceptionList', '4 - PlayerStats'];