// Insert this at A17

/*
=sort(
        if(
        C13 ="Achievement %",filter('1 - MyLibrary'!C6:W,'1 - MyLibrary'!R6:R <> "-", not(isna('1 - MyLibrary'!E6:E)) ,'1 - MyLibrary'!B6:B = FALSE), 
        if(C13 = "2weeks", filter('1 - MyLibrary'!C6:W,not(isna('1 - MyLibrary'!E6:E)),not('1 - MyLibrary'!G6:G = "-"),'1 - MyLibrary'!B6:B = FALSE  ),
        if(C13 = "Rating",filter('1 - MyLibrary'!C6:W,not(isna('1 - MyLibrary'!E6:E)),not(isblank('1 - MyLibrary'!J6:J)),'1 - MyLibrary'!B6:B = FALSE),
           filter('1 - MyLibrary'!C6:W, not(iserror('1 - MyLibrary'!E6:E)),'1 - MyLibrary'!B6:B = FALSE)
        ))),

        ifs(C13 ="SteamID",2,
        C13 ="Name",3,
        C13="Hours Played",4,
        C13 = "2weeks", 5,
        C13 ="$/hr",6,
        C13 ="Cost", 7, 
        C13 = "Rating",8,
        C13 = "Completed", 10,
        C13 ="Achievement %",12,
        C13 = "Date", 14,
        C13 ="Orig. $/hr",16,
        C13 ="Orig. Price", 17, 
        C13 ="Savings", 18, 
        C13 ="%Savings",19
        
        ), 
       
          if(C14 = "Ascending", TRUE, FALSE)
            )
*/ 