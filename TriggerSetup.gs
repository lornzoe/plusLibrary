function OneTimeTriggerSetup() {
  ScriptApp.newTrigger("DataImporter")
  .timeBased()
  .everyHours(1)
  .nearMinute(1)
  .create()
    
  ScriptApp.newTrigger("MyLibUpdater")
  .timeBased()
  .everyMinutes(15)
  .create()
    
  SHEETS[4].getRange("D2:E2").setValue(0)
  
  ScriptApp.newTrigger("AchievementUpdater")
  .timeBased()
  .everyHours(4)
  .nearMinute(21)
  .create()
    
  ScriptApp.newTrigger("StorePriceUpdater")
  .timeBased()
  .everyHours(4)
  .nearMinute(31)
  .create()
  
  ScriptApp.newTrigger("PlayerStatsPuller")
  .timeBased()
  .everyDays(1)
  .nearMinute(41)
  .create()
  
  ScriptApp.newTrigger("CombinedTimePuller")
  .timeBased()
  .everyMinutes(15)
  .create()
}