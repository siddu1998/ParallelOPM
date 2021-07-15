#IMPORTS
import json
import time

#READ FILE  
f = open('../DATA/ae26b920-1410-437f-bcba-c481ec3098f0.json',)  
data = json.load(f)

#PARSE
key_events = ['ADD_ELEMENT',
                  'MOVE_ELEMENT',
                  'BEGIN_LINK',
                  'FINISH_LINK',
                  'TOGGLE_ELEMENT',
                   #'BEGIN_SIMULATION'
                   #'HIGHLIGHT_TRACK',
                  ]

previous_step_timestamp       = None
previous_step_to_current_step = None

for data_point in data['events']:
    if data_point["type"] in key_events:
        if previous_step_to_current_step == None:
            previous_step_to_current_step  = 0
            previous_step_timestamp = data_point["created"]
            
        else:
            previous_step_to_current_step = data_point["created"] - previous_step_timestamp 
            previous_step_timestamp = data_point["created"]
        
        print(f"{data_point['type']} | {previous_step_to_current_step*0.001} | {data_point['element']['type']}")


#PLOT


#ANALYZE

