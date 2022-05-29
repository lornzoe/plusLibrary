function hSum(gameRange, discrim = 0){
  let hSum = 0;
  for (let x = 0; x < gameRange.length - discrim; x++) {

    let adder = parseFloat(gameRange[x]);
    if (!adder)
      continue;
    hSum += adder;
  }
  return hSum;
}

function getSGDCost(gameRange){
  // if current row doesnt even have a cost, then dont bother
  if (!parseFloat(gameRange[gameRange.length-1]))
    //return ["-", "-", "-"];   
    return "-";

  let sh = SpreadsheetApp.getActiveSheet();
  
  // startrow section
  let startRow = 3;
    // get the lowest row where 
    // sum (hx-1:h1) < sum (ay:a1)'
  let remainder = 0;
  {
    let comparator = hSum(gameRange, 1);
    let comparator2 = 0;
    do{
      startRow += 1;
      comparator2 += sh.getRange("B" + startRow).getValue();
    }
    while (comparator > comparator2)
    remainder = comparator2 - comparator;

  }

  // endrow section
  let endRow = 3;
  let remainder2 = 0;
  {
    let comparator = hSum(gameRange);
    let comparator2 = 0;
    do{
      remainder2 = comparator - comparator2;
      
      endRow += 1;
      comparator2 += sh.getRange("B" + endRow).getValue();
    }
    while (comparator > comparator2)
  }

  // calculation galore
  let calculated = 0;
  let ownGameValue = gameRange[gameRange.length-1];
  for (let x = startRow; x <= endRow; x++)
  {
    if (startRow == endRow)
    {
      calculated += ownGameValue * sh.getRange("E" + x).getValue();
      continue;
    }

    if (x == startRow)
      calculated += remainder * sh.getRange("E" + x).getValue();
    else if (x == endRow)
      calculated += remainder2 * sh.getRange("E" + x).getValue();
    else 
      calculated += sh.getRange("C" + x).getValue();
  }

  // return [`${startRow} // ${endRow}`, `${remainder} // ${remainder2}`, calculated];
  return calculated;
}

