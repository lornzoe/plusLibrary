function CheckStorePrice(appid) {
  Utilities.sleep(Math.random() * 5000);

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