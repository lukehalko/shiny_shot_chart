import numpy
import pandas as pd
import requests
import time

start_time = time.time()
count = 0

active_players = pd.read_csv("./data/active_players.csv")

url = "https://cdn.nba.com/headshots/nba/latest/1040x760/"

for id in active_players["id"]:
    requests.get(url + str(id))

    file = open(f"./www/img/players/img_{id}.png", "wb")

    r = requests.get(url + str(id) + ".png")

    file.write(r.content)
    print("got image for player id: " + str(id))
    count +=1

print("Done!")
print(f"collected {count} images in {time.time() - start_time}")





