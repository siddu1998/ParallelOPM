#IMPORTS
import json
import matplotlib.pyplot as plt
import time
import os
import sys
import numpy as np

print('[INFO] Started!')


user_events = [   
                  'BEGIN_SIMULATION'
                  ]


def getMoveCount(fileName):
    count = 0
    f = open(f'../DATA/Logfiles/{fileName}')
    data = json.load(f)
    for data_point in data['events']:
        if data_point["type"] in user_events:
            count += 1
            
    print(fileName,' ', count)        
    return count

#timing plot
x_axis = []
y_axis = []


# create dataset
height = [getMoveCount(file) for file in os.listdir('../DATA/Logfiles')]
bars = (file for file in os.listdir('../DATA/Logfiles'))
print(bars)
x_pos = np.arange(len(height))
 
# Create bars and choose color
plt.bar(x_pos, height, color = (0.5,0.1,0.5,0.6))
 
# Add title and axis names
plt.title('Player Submissions')
plt.xlabel('Game IDs')
plt.ylabel('Number of Submissions')
 
# Create names on the x axis
plt.xticks(x_pos, bars)

# Show graph
plt.show()

print('[INFO] Done')
