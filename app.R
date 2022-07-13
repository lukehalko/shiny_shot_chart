library(shiny)
library(tidyverse)
library(jsonlite)

setwd("/Users/lukeh/DATA/CompassRed/shiny/shiny_shot_chart")

shot_data <- read_csv("./data/shot_chart_cleaned.csv")
players <- shot_data %>% select(PLAYER_NAME) %>% distinct()

server <- function(input, output, session) {
  
  observe({
    pie_data <- shot_data %>% filter(PLAYER_NAME==input$search) %>% count(SHOT_ZONE_RANGE)
    jsonData <- toJSON(pie_data, pretty=TRUE)
    session$sendCustomMessage(type="shot_zone_range", jsonData)
  })
  observe({
    pie_data <- shot_data %>% filter(PLAYER_NAME==input$search) %>% count(SHOT_ZONE_RANGE)
    jsonData <- toJSON(pie_data, pretty=TRUE)
    session$sendCustomMessage(type="pie2", jsonData)
  })
  observe({
    pie_data <- shot_data %>% filter(PLAYER_NAME==input$search) %>% count(SHOT_ZONE_RANGE)
    jsonData <- toJSON(pie_data, pretty=TRUE)
    session$sendCustomMessage(type="pie3", jsonData)
  })
  
  observe({
    shot_loc <- shot_data %>% filter(PLAYER_NAME==input$search) %>% select(LOC_X, LOC_Y)
    jsonData <- toJSON(shot_loc, pretty=TRUE)
    session$sendCustomMessage(type="shotlocation", jsonData)
  })
}

# No UI function necessary. I'll create the UI manual through an HTML file that I control.
shinyApp(ui = htmlTemplate("www/index.html"), server = server)




