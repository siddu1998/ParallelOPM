import json
import os
# called in abstraction_glyph.py
from PIL import Image, ImageDraw, ImageFont
import json
import os
import hdbscan




def getPositions(crDataPosition):
    x_list = crDataPosition[::2] 
    y_list = crDataPosition[1::2]
    positions = []
    for index,value in enumerate(x_list):
        positions.append((x_list[index],y_list[index]))
    return positions



with open('../DATA/Logs/log.json', "r") as data:
    print("Converting JSON encoded data into Python dictionary")
    data = json.load(data)
    all_points = []
    playerCount = 0
    for actor in data['crData']['actors']:
        if actor['type'] == 'Player':
            playerCount+=1
            print('Found actor Positions: ', len(getPositions(actor['positions'])))
            all_points += getPositions(actor['positions'])

print('Total Players: ',playerCount)
print('Total Points for players: ', len(all_points))

clusterer = hdbscan.RobustSingleLinkage(cut=0.125, k=7)
cluster_labels = clusterer.fit_predict(all_points)
hierarchy = clusterer.cluster_hierarchy_
alt_labels = hierarchy.get_clusters(0.100, 5)
hierarchy.plot()