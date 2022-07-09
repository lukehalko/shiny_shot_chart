import numpy
import pandas as pd
import json

from nba_api.stats.endpoints import shotchartdetail
from nba_api.stats.static import players as p

def getShotData(id):
    resp = shotchartdetail.ShotChartDetail(
    team_id=0,
    player_id= id
    )   
    json_data = json.loads(resp.get_json())
    data = json_data["resultSets"][0]
    return data

players = p.get_players()
player_ids = []
df = pd.DataFrame()

data = getShotData(players[100]["id"])
cols = data["headers"]

for player in players: 
    player_ids.append(player["id"])

for id in player_ids:
    data = getShotData(id)

    columns = data["headers"]
    rows = data["rowSet"]

    if (df.empty & len(rows) > 0):
        df = pd.DataFrame(rows)
        df.columns = columns
    else:
        df = df.append(rows)
    
    print("collected player")

df.to_csv("shot_chart_details.csv")







