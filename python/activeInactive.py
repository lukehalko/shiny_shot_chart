import numpy
import pandas as pd
import json

from nba_api.stats.endpoints import shotchartdetail
from nba_api.stats.static import players as p

active_players = p.get_active_players()

inactive_players = p.get_inactive_players()

active = pd.DataFrame.from_dict(active_players)

inactive = pd.DataFrame.from_dict(inactive_players)

active.to_csv("./data/active_players.csv")

inactive.to_csv("./data/inactive_players.csv")
