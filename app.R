library(shiny) 
library(tidyverse) 
library(jsonlite) 
library(easyr)
library(lubridate)
     
# ~~~~~~~~~~ LOAD DATA ~~~~~~~~~~ #    
shot_data <- read_csv("./data/active_players_fga.csv") %>% mutate(GAME_DATE = mdy(GAME_DATE))
per_game <- read_csv("./data/player_per_game_2022.csv")
players <- shot_data %>% select(PLAYER_NAME) %>% distinct()  


str_clean <- function(str){
  str %>% str_to_lower() %>% str_replace("'", "" %>% str_replace(" ", ""))
}   

# ~~~~~~~~~~ SERVER FUNCTION ~~~~~~~~~~ #
server <- function(input, output, session) { 
    
  # ~~~~ Generate data for the selected player ~~~~ # 
  player_data <- reactive({   
                    
    d <- shot_data %>% filter(str_clean(PLAYER_NAME) == str_clean(input$search)) 
            
    if(length(input$teamFilter) > 0){  
      d <- d %>% filter(TEAM_ID %in% input$teamFilter)    
    }  
    
    if(length(input$yearFilter) > 0){  
      d <- d %>% filter(year(GAME_DATE) %in% input$yearFilter)
   
    }
    
    d
     
  })
  
  shooting_splits <- reactive({
     
    d <- per_game %>% filter(player == input$search) %>% select(fg2_pct, fg3_pct, fg_pct)
    
    d 
    
  })
   
  
  
  # ~~~~ Send new data to frontend whenever an input changes ~~~~ # 
  observe({
    
    # Shot Range Data (For Pie Chart)
    shot_range <- player_data() %>% count(SHOT_ZONE_RANGE)  
    jsonData <- toJSON(shot_range, pretty=TRUE)
    session$sendCustomMessage(type="shot_zone_range", jsonData) 
    
    # Shot Location Data (For Shot Chart) 
    shot_loc <- player_data() %>% select(SHOT_ZONE_RANGE, LOC_X, LOC_Y, SHOT_MADE_FLAG) 
    jsonData <- toJSON(shot_loc, pretty=TRUE)
    session$sendCustomMessage(type="shotlocation", jsonData)  
    
    # Shot Distance Data (For Violin Plot)  
    shot_dist <- player_data() %>% 
      filter(SHOT_DISTANCE < 40) %>% 
      select(SHOT_DISTANCE) 
    
     
    # ~~~~  Filter data for a given player: teams, seasons, teamsAgainst, game dates (?) and date range (?) ~~~~ #
    teams <- player_data() %>%
      select(TEAM_ID) %>% 
      distinct() 
 
     seasons <- player_data() %>%  
       select(GAME_DATE)%>%
       distinct() %>%    
       mutate(year = year(GAME_DATE)) %>%
       select(year) %>% 
       distinct()
       
       
      
    # teams_against <- player_data() %>%   
    #   select(AGAINST) %>%
    #   distinct() 
      
       
     player_id <- player_data() %>%
       select(PLAYER_ID) %>%  
       distinct()
      
     
     
    # ~~~~ Send data to session ~~~~ # 
    
    jsonData <- toJSON(shot_dist, pretty=TRUE)  
    session$sendCustomMessage(type="shot_distance", jsonData)  
     
    jsonData <- toJSON(teams, pretty=TRUE) 
    session$sendCustomMessage(type="team_filter", jsonData)
     
    jsonData <- toJSON(seasons, pretty=TRUE)  
    session$sendCustomMessage("season_filter", jsonData) 
      
    jsonData <- toJSON(player_id, pretty=TRUE)  
    session$sendCustomMessage("player_id", jsonData)
  })
  
  
  observe({
    
    splits <- shooting_splits()
    
    jsonData <- toJSON(splits, pretty=TRUE)
    session$sendCustomMessage(type="shooting_splits", jsonData)
    
    
  })
  
  
}




# No UI function necessary. I'll create the UI manual through an HTML file that I control.
shinyApp(ui = htmlTemplate("www/index.html"), server = server)
