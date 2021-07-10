#IMPORTS
import json
import matplotlib.pyplot as plt
import time
import os
import sys
import numpy as np

print('[INFO] Started!')


def getPlayTime(fileName):
    f = open(fileName)  
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
        
        

