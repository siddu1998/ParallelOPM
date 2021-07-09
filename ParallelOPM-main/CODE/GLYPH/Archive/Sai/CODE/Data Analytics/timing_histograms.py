#IMPORTS
import json
import matplotlib.pyplot as plt
import time
import os
import sys
import numpy as np

print('[INFO] Started!')


def getPlayTime(fileName):
    f = open(f'DDRI_STUDY_LOGS/{fileName}')  
    data = json.load(f)
    minTime = sys.maxsize
    maxTime = -sys.maxsize
    for data_point in data['events']:
        maxTime = max(maxTime,data_point["created"])
        minTime = min(minTime,data_point["created"])
    
    print(fileName)    
    print('Maximum Time ',maxTime)
    print('Minimum Time ',minTime)
    print('----------------')
    print(((maxTime - minTime)*0.001)//60," minute")    
    return ((maxTime - minTime)*0.001)//60 #milli to second to minute
        
        

#timing plot
x_axis = []
y_axis = []


 
# create dataset
height = [getPlayTime(file) for file in os.listdir('DDRI_STUDY_LOGS')]
bars = (file for file in os.listdir('DDRI_STUDY_LOGS'))
print(bars)
x_pos = np.arange(len(height))
 
# Create bars and choose color
plt.bar(x_pos, height, color = (0.5,0.1,0.5,0.6))
 
# Add title and axis names
plt.title('Game Play')
plt.xlabel('Game IDs')
plt.xticks(rotation=90)
plt.ylabel('Game Time (Minutes)')

# plt.xticks(rotation = 45)
# plt.gcf().set_size_inches(1.5, 1.5)
# plt.tight_layout()
# plt.gcf().subplots_adjust(bottom=0.15)
plt.autoscale()
# Create names on the x axis
plt.xticks(x_pos, bars)
 
# Show graph
plt.show()
plt.savefig("timing_plot_level_5.png", bbox_inches="tight")

print('[INFO] Done')