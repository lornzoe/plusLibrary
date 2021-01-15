function CheckStorePrice(appid) {
  Utilities.sleep(Math.random() * 10000);
  
  let sourcearray = SHEETS[2].getRange("A2:F").getValues();
  
  for(let i = 0; i < sourcearray.length; i++)
  {
    
    if (sourcearray[i][0] == appid)
    {
      if (sourcearray[i][5] == '')
        return ["N/A", "N/A"];
      else if (typeof(sourcearray[i][5]) == 'number')
        return [sourcearray[i][5], '-'];
      else if (typeof(sourcearray[i][5]) == 'string')
        return sourcearray[i][5];
    }
    
  }
  return ["UNK","UNK"];
}

function CheckStorePriceUpdater()
{
  let sourcearray = SHEETS[2].getRange("A2:F").getValues();
  
  for (var i = 6; i <= SHEETS[1].getMaxRows(); i++)
  {
    let appid = SHEETS[1].getRange(i, 4).getValue()
    
    for (let j = 0; j < sourcearray.length; j++)
    {
      if (sourcearray[j][0] == appid)
      {
        if (sourcearray[j][5] == '')
        {
          SHEETS[1].getRange(i, 23).setValue("N/A")
          SHEETS[1].getRange(i, 24).setValue("N/A")
        }
        else if (typeof(sourcearray[j][5]) == 'number')
        {
          SHEETS[1].getRange(i, 23).setValue(sourcearray[j][5])
          SHEETS[1].getRange(i, 24).setValue("-")
        }
        else if (typeof(sourcearray[j][5]) == 'string')
          SHEETS[1].getRange(i, 23).setValue(sourcearray[j][5])
          
          break;
      }
    }
  }
  
}