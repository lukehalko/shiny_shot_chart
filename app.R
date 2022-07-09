#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#


library(shiny)
library(tidyverse)
library(jsonlite)


setwd("/Users/lukeh/DATA/CompassRed/shiny/shiny_shot_chart")

# players <- read_csv("./data/player_per_game_2022.csv")

shot_data <- read_csv("./data/shot_chart_cleaned.csv")
players <- shot_data %>% select(PLAYER_NAME) %>% distinct()

# Define server logic required to draw a histogram
server <- function(input, output, session) {
  
  observe({
    pie_data <- shot_data %>% filter(PLAYER_NAME==input$search) %>% count(SHOT_ZONE_RANGE) %>% slice(1:50)
    jsonData <- toJSON(pie_data, pretty=TRUE)
    session$sendCustomMessage(type="shot_zone_range", jsonData)
  })
  observe({
    pie_data <- shot_data %>% filter(PLAYER_NAME==input$search) %>% count(SHOT_ZONE_RANGE) %>% slice(1:50)
    jsonData <- toJSON(pie_data, pretty=TRUE)
    session$sendCustomMessage(type="pie2", jsonData)
  })
  observe({
    pie_data <- shot_data %>% filter(PLAYER_NAME==input$search) %>% count(SHOT_ZONE_RANGE) %>% slice(1:50)
    jsonData <- toJSON(pie_data, pretty=TRUE)
    session$sendCustomMessage(type="pie3", jsonData)
  })
}


shinyApp(ui = htmlTemplate("www/index.html"), server = server)



