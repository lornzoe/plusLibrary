function DataImporter()
{
  var localsheet = SHEETS[2];
  var idarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues();
  var importarray = IMPORTJSONAPI("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + APIKEY + "&steamid="+ USERID +"%0A&include_appinfo=1&include_played_free_games=1&include_free_sub=0&skip_unvetted_apps=0", "$.response.games[*]", "appid, name, playtime_forever, playtime_2weeks");
  var exceptionsheet = SHEETS[3];
  var exceptionarray = exceptionsheet.getRange(1, 1, exceptionsheet.getMaxRows(), exceptionsheet.getMaxColumns()).getValues();
  
  // binding exceptionarray to importarray
  for (var i = 1; i < exceptionarray.length; i++)
  {
    importarray.push(new Array())
    importarray[importarray.length-1][0] = exceptionarray[i][0];
    importarray[importarray.length-1][1] = exceptionarray[i][1];
    importarray[importarray.length-1][2] = exceptionarray[i][2];
    importarray[importarray.length-1][3] = ''; 
    Logger.log(importarray[importarray.length-1])
  }
  
  // comparison phase
  for (var i = importarray.length-1; i >= 0; i--)
  {
    for (var j = idarray.length-1; j >= 0; j--)
    {
      if (idarray[j][0] + '' == importarray[i][0] + '')
      {
        idarray.splice(j, 1);
        importarray.splice(i, 1);
        
        break;
      }
    }
  }
  
  // deletion phase
  Logger.log("--beginning deletion phase")
  Logger.log(idarray)
  if (idarray.length > 0) 
  {
    for (let i = 0; i < idarray.length; i++)
    {
      let searcher = SHEETS[2].getRange(2, 1, localsheet.getMaxRows()).getValues();
      let indextarget = searcher.indexOf(parseInt(idarray[i][0]));
      if (indextarget != -1)
      {
        localsheet.deleteRow(indextarget+2);
        continue;
      }
      
      else
      {
        searcher = SHEETS[2].getRange(2, 1, localsheet.getMaxRows()-1).getValues();
        for (let j = 0; j < searcher.length; j++)
        {
          if (idarray[i][0] + '' == searcher[j] + '')
          {
            localsheet.deleteRow(j+2);
            break;
          }
        }
        continue;
      }
    }
  }
  Logger.log("--finished deletion phase")
  
  //addition phase
  Logger.log("++starting addition phase")
  Logger.log(importarray)
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
  }
  Logger.log("++finished addition phase")
  DPSort();
  CombinedTimePuller();
  
}

function DPSort() {
  var spreadsheet = SHEETS[2];
  spreadsheet.getRange('A1').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion().activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRange().offset(1, 0, spreadsheet.getActiveRange().getNumRows() - 1).sort({column: 1, ascending: true});
};