function onEdit(e)
{
  //Logger.log("maintentence period")
  //return;
  
  let name = e.range.getSheet().getSheetName();
  Logger.log(e.value)

  if (name == "1 - MyLibrary")
    onMyLibEdit(e);
  
}

function ShowHideType(type, show)
{
  let range = SHEETS[1].getRange("B6:B").getValues();
  for (let i = 0; i < range.length; i++)
  {
    if (range[i][0] != type)
      continue
    
    if (show) 
      SHEETS[1].showRows(i+6);
    else
      SHEETS[1].hideRows(i+6);
  }
}
function ShowHideType2 (exception, show)
{
    let range = SHEETS[1].getRange("B6:B").getValues();
  for (let i = 0; i < range.length; i++)
  {
    if (range[i][0] == exception)
      {
        if (show) 
          SHEETS[1].showRows(i+6);
        else
          SHEETS[1].hideRows(i+6);

        continue;
      }
    
    if (!show) 
      SHEETS[1].showRows(i+6);
    else
      SHEETS[1].hideRows(i+6);
  }
}

function ShowHideType3(game)
{
  
}

function onMyLibEdit(e)
{
  Logger.log("taking route: onMyLibEdit(e)")
  let row = e.range.getRow();
  let col = e.range.getColumn();
  Logger.log(row);
  Logger.log(col);

  if (row == 3)
  {
    Logger.log("if (row == 3)")
    if (col == 2) // show blacklist
    {
      let range = SHEETS[1].getRange("B6:B").getValues();
      if (e.value == "Include All")
      {
        for (let i = 0; i < range.length; i++)
        {
          SHEETS[1].showRows(i+6);
        }
      }
      else if (e.value == "Include BL")
      {
/*         ShowHideType("Game", true);
        ShowHideType("Blacklist", true);
        ShowHideType("Bundle Trash", false); */

                ShowHideType2("Bundle Trash", false);
      }
      else if (e.value == "Include BT")
      {
        /* ShowHideType("Game", true);
        ShowHideType("Blacklist", false);
        ShowHideType("Bundle Trash", true); */
        ShowHideType2("Blacklist", false);
      }
      else if (e.value == "BT Only")
      {
/*         ShowHideType("Game", false);
        ShowHideType("Blacklist", false);
        ShowHideType("Bundle Trash", true); */

        ShowHideType2("Bundle Trash", true);
      }
      else if (e.value == "Games Only")
      {
        ShowHideType("Game", true);
        ShowHideType("Blacklist", false);
        ShowHideType("Bundle Trash", false);
      }
    }
    
    else if (col == 3) // hide unnecessary rows
    {
      if (e.value == "TRUE")
      {
        SHEETS[1].showColumns(1,24)
      }
      else
      {
        SHEETS[1].hideColumns(6,3) // hours played group
        SHEETS[1].hideColumns(13,2) // achievement group
        SHEETS[1].hideColumns(18,6) //original price group
      }
    }
    
    return;
  }
  
  if(row>=6)
  {
    Logger.log("if (row >= 6)")
    
    let rtf = -1;
    switch(col)
    {
      case 2:
        OverviewAdjust()
        if (SHEETS[1].getRange("B3").getValue() == false)
        {
          if(e.value == "TRUE")
          {
            SHEETS[1].hideRows(row)
          }
        }
        rtf = 10;
        break;
      case 9:
        rtf = 8
        break;
      case 10:
        rtf = 5
        break;
      case 11:
        rtf =6
        break;
      case 12:
        rtf = 7;
        break;
      case 24:
        rtf = 9;
        break;
      case 16:
        rtf = 12;
        break;
      default:
        break;
    }

    let refid = SHEETS[1].getRange(row, 4).getValue()
    Logger.log(refid)

    let backupsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup")
    backupsheet.getRange(BackupSearchWrapper(refid), rtf).setValue(e.value)

    
    return;
  }
}