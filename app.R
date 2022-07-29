library(shiny) 
library(tidyverse)
library(jsonlite) 
setwd("/Users/lukeh/DATA/CompassRed/shiny/shiny_shot_chart")    
 
shot_data <- read_csv("./data/shot_chart_cleaned.csv")
players <- shot_data %>% select(PLAYER_NAME) %>% distinct()


server <- function(input, output, session) { 
  
  observe({ 
    shot_range <- shot_data %>% filter(PLAYER_NAME==input$search) %>% count(SHOT_ZONE_RANGE)
    jsonData <- toJSON(shot_range, pretty=TRUE) 
    session$sendCustomMessage(type="shot_zone_range", jsonData)
  }) 
  observe({
    shot_type <- shot_data %>% filter(PLAYER_NAME==input$search) %>% count(SHOT_TYPE)
    jsonData <- toJSON(shot_type, pretty=TRUE)
    session$sendCustomMessage(type="shot_type", jsonData)
  })
  
  # Send shot location data
  
  observe({
    shot_loc <- shot_data %>% filter(PLAYER_NAME==input$search) %>% select(SHOT_ZONE_RANGE, LOC_X, LOC_Y)
    jsonData <- toJSON(shot_loc, pretty=TRUE)    
    session$sendCustomMessage(type="shotlocation", jsonData)
  })
  
  observe({
    shot_dist <- shot_data %>%
      filter(PLAYER_NAME==input$search & SHOT_DISTANCE < 40) %>% 
      select(SHOT_DISTANCE)
    
    jsonData <- toJSON(shot_dist, pretty=TRUE) 
    session$sendCustomMessage(type="shot_distance", jsonData) 
  }) 
}


# No UI function necessary. I'll create the UI manual through an HTML file that I control.
shinyApp(ui = htmlTemplate("www/index.html"), server = server)
