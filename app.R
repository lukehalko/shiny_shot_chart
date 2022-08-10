library(shiny) 
library(tidyverse) 
library(jsonlite)
library(easyr) 

setwd("/Users/lukeh/DATA/CompassRed/shiny/shiny_shot_chart")
   
shot_data <- read_csv("./data/shot_chart_cleaned.csv") 

players <- shot_data %>% select(PLAYER_NAME) %>% distinct() 

server <- function(input, output, session) {   
    
  # Shot Zone (Text Description)  
  player_data <- reactive({
    d <- shot_data %>% filter(PLAYER_NAME == input$search)     
     
    # if(input$team != "" && !input$allTeam){    
    #   d <- d %>% filter(TEAM_ID == input$team) 
    # }
    d
  }) 
    
  observeEvent(input$teamFilter, {  
    print("checkbox: ") 
    print(input$teamFilter)
  }) 
  
   # 
  observeEvent(input$search, {
    
  })

   
  observe({   
    # print("team input:")
    # print(input$team)
      
    # player_data <- shot_data %>% filter(PLAYER_NAME == input$search) 
    
    shot_range <- player_data() %>% count(SHOT_ZONE_RANGE) 
    jsonData <- toJSON(shot_range, pretty=TRUE)  
    session$sendCustomMessage(type="shot_zone_range", jsonData) 
    
    # Shot Location (For Shot Chart)
    shot_loc <- player_data() %>% select(SHOT_ZONE_RANGE, LOC_X, LOC_Y) 
    jsonData <- toJSON(shot_loc, pretty=TRUE)
    session$sendCustomMessage(type="shotlocation", jsonData)  
    
    # Shot Distance (For Violin Plot)  
    shot_dist <- player_data() %>%
      filter(SHOT_DISTANCE < 40) %>%
      select(SHOT_DISTANCE)
    
    jsonData <- toJSON(shot_dist, pretty=TRUE)
    session$sendCustomMessage(type="shot_distance", jsonData)
    
    # Filter data for a given player: teams, seasons, teamsAgainst, game dates (?) and date range (?)
    teams <- player_data() %>%
      select(TEAM_ID) %>%
      distinct()

    # seasons <- player_data() %>%
    #   select(GAME_DATE)%>%
    #   distinct()

    # teams_against <- player_data() %>% 
    #   select(AGAINST) %>%
    #   distinct()

    jsonData <- toJSON(teams, pretty=TRUE)
    session$sendCustomMessage(type="team_filter", jsonData)
    
  }) 
}

# No UI function necessary. I'll create the UI manual through an HTML file that I control.
shinyApp(ui = htmlTemplate("www/index.html"), server = server)
