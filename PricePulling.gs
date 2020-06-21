function StorePriceUpdater()
{
  var localsheet = SHEETS[2];
  var localarray = localsheet.getRange(2, 1, localsheet.getMaxRows()).getValues();
  var currentcounter = SHEETS[4].getRange("E2").getValue();

    //Logger.log(localarray.length);
    //Logger.log(localarray)
  
  var apilink = "http://store.steampowered.com/api/appdetails?appids=";
  var iterationcount = SHEETS[4].getRange("E2").getValue();
  var iterations = 0;
  for (var i = iterationcount; (i < localarray.length) && (i - iterationcount < ITERATIONLIMIT); i++)
  {
    apilink += '' + localarray[i]
    apilink += ','

    iterations++;
  }
  apilink += '&cc=sg&filters=price_overview'
  var apipulled = IMPORTJSONAPI(apilink, "$.*", "~, success, data.price_overview.initial")
  
  for (var i = 0; i < localarray.length; i++)
  {
    for (var j = 0; j < apipulled.length; j++)
    {
      if (localarray[i] + '' == apipulled[j][0])
      {
        if(apipulled[j][1] == true) // in storefront
        {
          if(apipulled[j][2] != null)
            localsheet.getRange(i+2 , 6).setValue(apipulled[j][2]/100).setNumberFormat("$0.00");
          else
            localsheet.getRange(i+2 , 6).setValue("ERROR_NOPRICE");
        }
        else
          localsheet.getRange(i+2 , 6).setValue("UNK_VAL");
        
        break;
      }
    }
  }

  currentcounter = SHEETS[4].getRange("E2").setValue(iterationcount + iterations).getValue();
  if (currentcounter >= (SHEETS[4].getRange("C2").getValue()))
  {
    SHEETS[4].getRange("E2").setValue('0');
  }
}
