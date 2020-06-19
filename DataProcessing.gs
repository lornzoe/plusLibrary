function DataImporter()
{
  var localsheet = SHEETS[2];
  var idarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues();
  var importarray = IMPORTJSONAPI("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + APIKEY + "&steamid="+ USERID +"%0A&include_appinfo=1", "$.response.games[*]", "appid, name, playtime_forever, playtime_2weeks");
  var exceptionsheet = SHEETS[3];
  var exceptionarray = exceptionsheet.getRange(1, 1, exceptionsheet.getMaxRows(), exceptionsheet.getMaxColumns()).getValues();

  // binding exceptionarray to importarray
  for (var i = 1; i < exceptionarray.length; i++)
  {
    importarray.push(new Array())
    importarray[importarray.length-1][0] = exceptionarray[i][0];
    importarray[importarray.length-1][1] = exceptionarray[i][1];
    importarray[importarray.length-1][2] = '';
    importarray[importarray.length-1][3] = ''; 
    Logger.log(importarray[importarray.length-1])
  }
  
  // comparison phase
  for (var i = importarray.length-1; i >= 0; i--)
  {
    for (var j = idarray.length-1; j >= 0; j--)
    {
      if (idarray[j] + '' == importarray[i][0] + '')
      {
        idarray.splice(j, 1);
        importarray.splice(i, 1);
        
        break;
      }
    }
  }
  
  // deletion phase
  var localarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues();
  if (idarray.length > 0) 
  {
    for (var i = 0; i < idarray.length; i++)
    {
      for (var j =0; j < localarray.length; j++)
      {
        if (idarray[i] == localarray[j])
        {
          localsheet.deleteRow(j+1);
          break;
        }
      }
    }
  }
  
  //addition phase
  if(importarray.length > 0)
  {
    for (var i = 0; i < importarray.length; i++)
    {
       localsheet.appendRow([importarray[i][0],
                             '=IMAGE("https://steamcdn-a.akamaihd.net/steam/apps/' + importarray[i][0] +'/capsule_184x69.jpg")', 
                             importarray[i][1],
                             importarray[i][2]
                           ]);
    }
    DPSort();
    CombinedTimePuller();
  }
}

function DPSort() {
  var spreadsheet = SHEETS[2];
  spreadsheet.getRange('A1').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion().activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRange().offset(1, 0, spreadsheet.getActiveRange().getNumRows() - 1).sort({column: 1, ascending: true});
};