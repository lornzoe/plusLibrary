// Insert this at A17

/*
=sort(
        if(
        C13 ="Achievement %",filter('1 - MyLibrary'!A6:T,and(not('1 - MyLibrary'!O6:O = "-"), not(iserror('1 - MyLibrary'!B6:B)))), 
        if(C13 = "2weeks", filter('1 - MyLibrary'!A6:T,not(isna('1 - MyLibrary'!B6:B)),not('1 - MyLibrary'!F6:F = "-") ),
        if(C13 = "Rating",filter('1 - MyLibrary'!A6:T,and(not(isblank('1 - MyLibrary'!I6:I)),not(iserror('1 - MyLibrary'!B6:B)))),
           filter('1 - MyLibrary'!A6:T, not(iserror('1 - MyLibrary'!B6:B)) )
          ))),

        ifs(C13 ="SteamID",3,
        C13 ="Name",4,
        C13="Hours Played",5,
        C13 = "2weeks", 6,
        C13 ="$/hr",7,
        C13 ="Cost", 8, 
        C13 = "Rating",9,
        C13 = "Completed", 13,
        C13 ="Achievement %",15,
        C13 ="Orig. $/hr",17,
        C13 ="Orig. Price", 18, 
        C13 ="Savings", 19, 
        C13 ="%Savings",20
        
        ), 
       
          if(C14 = "Ascending", TRUE, FALSE)
            )
*/ 