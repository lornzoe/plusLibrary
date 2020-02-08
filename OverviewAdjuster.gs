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
  
  var gamecount = removalarray.length;
  
  var overviewrow = SHEETS[0].getMaxRows();
  
  var discriminant = overviewrow - gamecount;
  
  if (discriminant > 0) //overview has more 
  {
    for (var i = discriminant; i > 0; i--)
    {
      SHEETS[0].deleteRow(SHEETS[0].getMaxRows());
    }
  }
  else if (discriminant < 0) // overview has less
  {
    for (var i = 0; i < discriminant; i++)
    {
      SHEETS[0].appendRow();
    }
  }
}