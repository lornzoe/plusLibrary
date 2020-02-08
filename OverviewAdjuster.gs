function OverviewAdjust()
{
  var mainarray = SHEETS[2].getRange(2,1,SHEETS[2].getMaxRows() - 1).getValues();
  var blacklist = SHEETS[2].getRange(2,6,SHEETS[2].getMaxRows() - 1).getValues();
  var removalarray = new Array();
  
  for (var i = 0; i < blacklist.length; i++)
  {
    if (blacklist[i] == 'false')
      removalarray.push(mainarray[i]);
  }
  
  var gamecount = removalarray.length + 1; 
  
  var overviewrow = SHEETS[0].getMaxRows()-16;
  
  var discriminant = overviewrow - gamecount;
  
  Logger.log(discriminant)
  
    if (discriminant > 0) //overview has more 
  {
    for (var i = discriminant; i > 0; i--)
    {
      SHEETS[0].deleteRow(gamecount+16);
    }
  }
  else if (discriminant < 0) // overview has less
  {
    for (var i = 0; i < discriminant; i++)
    {
      SHEETS[0].appendRow();
      SHEETS[0].getRange(SHEETS[0].getMaxRows(), 14, 1, 2).setBorder(false, true, false, true, null, null);
      
    }
  }
  SHEETS[0].getRange(17, 14, SHEETS[0].getMaxRows() - 17, 2).setBorder(true, true, true, true, null, null);
  SHEETS[0].getRange(17, 5, SHEETS[0].getMaxRows() - 17, 2).setBorder(true, true, true, true, null, null);
  SHEETS[0].getRange(17, 8, SHEETS[0].getMaxRows() - 17, 2).setBorder(true, true, true, true, null, null);
  SHEETS[0].getRange(17, 17, SHEETS[0].getMaxRows() - 17, 1).setBorder(true, true, true, true, null, null);
  SHEETS[0].getRange(17, 18, SHEETS[0].getMaxRows() - 17, 3).setBorder(true, true, true, true, null, null);
  SHEETS[0].getRange(17, 2, SHEETS[0].getMaxRows() - 17, 3).setBorder(true, true, true, true, null, true);
  SHEETS[0].getRange(17, 6, SHEETS[0].getMaxRows() - 17, 1).setBorder(true, true, true, true, null, null);

}