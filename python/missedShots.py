#   Luke Halko
#   08/11/2022
#   
#   Collecting nba shot chart history for all active players from nba.api.stats --- includes both made and missed shots
#   
#   587 players in 970.525438785553 seconds
# 

import numpy
import pandas as pd
import json
import time


from nba_api.stats.endpoints import shotchartdetail

start_time = time.time()

def getShotData(id):
    resp = shotchartdetail.ShotChartDetail(
    team_id=0,
    player_id= id,
    context_measure_simple = 'FGA'
    )   
    json_data = json.loads(resp.get_json())
    data = json_data["resultSets"][0]
    return data

count = 0

active_players = pd.read_csv("./data/active_players.csv")

data = getShotData(active_players["id"][1])

cols = data["headers"]

df = pd.DataFrame(columns = cols)

for id in active_players["id"]:
    sleep_count = 0
    while(True):
        try:
            shot_data = getShotData(id)

            df = df.append(shot_data["rowSet"])

            break
    
        except:
            print("query failed... trying again")
            if(sleep_count < 6):
                time.sleep(3)

            else: time.sleep(10)
            
            sleep_count+=1

    count += 1
    print(f"got shots for player {count} : {id}")

print(f"Done! Retrieved career shooting data for {count} players in {time.time() - start_time} seconds")

df.to_csv("./data/new_shot_data.csv")
    

    
