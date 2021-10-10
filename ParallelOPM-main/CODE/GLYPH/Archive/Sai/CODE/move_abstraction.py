import os 
import json
from PIL import Image, ImageDraw, ImageFont
from sys import exit
from snapshot_status import getStatus
from getBoardID import get_board_ids
import gif_builder
import player_statistics
from BuildNewGlyph import *
import glob
from copy import copy, deepcopy

log_files = "../DATA/LEVEL_13_LOGS"
level = 13



default_elements = {"13":{"L_dragonfruit_5001":(4,12)}}


class MoveAbstraction:
    def __init__(self,level):
        self.level              = str(level)
        self.zoneSheet          = f'../DATA/maps_with_zones/MapInfo_{self.level}.json'
        self.level_info         = json.load(open(self.zoneSheet))
        self.zones              =   self.level_info[self.level]['mapAreas']
        self.rows               = ["add_signal","add_semaphore","remove_signal","remove_semaphore","add_link","remove_link"]      
        self.cummulative_move_vector = [[0 for j in range(len(self.zones))] for i in range(len(self.rows)) ]  
        self.intermediate_move_vector = [[0 for j in range(len(self.zones))] for i in range(len(self.rows)) ]
        self.indexMap = {}
        self.index=0

        for zone in self.zones:
            self.indexMap[zone]=self.index
            self.index+=1

    def add_signal(self,zone):
        col  = self.indexMap[zone]
        row = self.rows.index("add_signal")
        self.cummulative_move_vector[row][col]+=1
        self.intermediate_move_vector[row][col]+=1
    
    def add_semaphore(self,zone):
        col  = self.indexMap[zone]
        row = self.rows.index("add_semaphore")
        self.cummulative_move_vector[row][col]+=1
        self.intermediate_move_vector[row][col]+=1
    
    def add_link(self,zone):
        col  = self.indexMap[zone]
        row = self.rows.index("add_link")
        self.cummulative_move_vector[row][col]+=1
        self.intermediate_move_vector[row][col]+=1
            
    def remove_signal(self,zone):
        col  = self.indexMap[zone]
        row = self.rows.index("remove_signal")
        self.cummulative_move_vector[row][col]+=1
        self.intermediate_move_vector[row][col]+=1
    
    def remove_semaphore(self,zone):
        col  = self.indexMap[zone]
        row = self.rows.index("remove_semaphore")
        self.cummulative_move_vector[row][col]+=1
        self.intermediate_move_vector[row][col]+=1
        
    def remove_link(self,zone):
        col  = self.indexMap[zone]
        row = self.rows.index("remove_link")
        self.cummulative_move_vector[row][col]+=1        
        self.intermediate_move_vector[row][col]+=1
    
    def getCummulative(self):
        return self.cummulative_move_vector
    
    def getIntermediate(self):
        return self.intermediate_move_vector

    def getZone(self,x,y):
        query = [x,y]
        for zone in self.zones:
            if query in self.zones[zone]:
                return zone 
        return None

    def resetIntermediate(self):
        self.intermediate_move_vector = [[0 for j in range(len(self.zones))] for i in range(len(self.rows)) ]        

action_abstraction = {}
for file in os.listdir(log_files):
    user = file.split('.')[0]
    action_abstraction[user]={}

    fileName = log_files+'/'+file       
    data = json.load(open(fileName))
    move_abstraction = MoveAbstraction(level)
    board_state = {}
    for index,event in enumerate(data['events']):


        if event['type']=="BEGIN_LEVEL_LOAD":
            board_state = {}
        if event['type'] == 'ADD_ELEMENT':
            element_type = event['element']['type'] #semaphore, signal
            element_id=event['element']['id'] 
            element_x = event['element']['cell'][0] #x
            element_y = event['element']['cell'][1] #y
            if element_type == 'signal':
                board_state[element_id] = {
                    "type":element_type,
                    "element_x":element_x,
                    "element_y":element_y,
                    "link":None
                }
                signal_zone = move_abstraction.getZone(element_x,element_y)
                move_abstraction.add_signal(signal_zone)

            if element_type == 'semaphore':
                board_state[element_id] = {
                    "type":element_type,
                    "element_x":element_x,
                    "element_y":element_y,
                    "status":'inactive'
                }
                semaphore_zone = move_abstraction.getZone(element_x,element_y)
                move_abstraction.add_semaphore(semaphore_zone)              
        if event['type'] == 'REMOVE_ELEMENT':
            element_id = event['element']['id']         
            element_type = event['element']['type']
            x,y = board_state[element_id]['element_x'],board_state[element_id]['element_y']
                
            if element_type == "semaphore":
                semaphore_zone = move_abstraction.getZone(x,y)
                move_abstraction.remove_semaphore(semaphore_zone)
                for item in board_state:
                    if board_state[item]['type']=="signal":
                        signal_id = item
                        signal_x,signal_y=board_state[signal_id]['element_x'],board_state[signal_id]['element_y']
                        signal_zone = move_abstraction.getZone(signal_x,signal_y)
                        if board_state[item]['link']==element_id:
                            board_state[item]['link']=None
                            move_abstraction.remove_link(signal_zone) 
                            move_abstraction.remove_link(semaphore_zone)   
                               
            if element_type == "signal":
                signal_zone = move_abstraction.getZone(x,y)
                move_abstraction.remove_signal(signal_zone)
                if board_state[element_id]['link']!=None:
                    semaphore_id = board_state[element_id]["link"]
                    semaphore_x, semaphore_y = board_state[semaphore_id]['element_x'],board_state[semaphore_id]['element_y']
                    semaphore_zone = move_abstraction.getZone(semaphore_x,semaphore_y)
                    move_abstraction.remove_link(semaphore_zone)
                    move_abstraction.remove_link(signal_zone)
            
            board_state.pop(element_id)

        if event['type'] == 'MOVE_ELEMENT':
            element_id   = event['element']['id']  #element id
            new_x = event['element']['cell'][0] #x
            new_y = event['element']['cell'][1] #y
            
            #update to new coordinates
            old_x = board_state[element_id]['element_x']
            old_y = board_state[element_id]['element_y']
            board_state[element_id]['element_x']=new_x
            board_state[element_id]['element_y']=new_y
            element_type = board_state[element_id]["type"]
            new_zone = move_abstraction.getZone(new_x,new_y)
            old_zone = move_abstraction.getZone(old_x,old_y)    
            #adjust links 
            if element_type == "signal":
                if new_zone!=old_zone:
                    move_abstraction.add_signal(new_zone)
                    if board_state[element_id]['link']!=None:
                        move_abstraction.add_link(new_zone)

            if element_type =="semaphore":
                if new_zone!=old_zone:
                    move_abstraction.add_semaphore(new_zone)
                    for item in board_state:
                        if board_state[item]['type']=='signal':
                            if board_state[item]['link']==element_id:
                                move_abstraction.add_link(new_zone)                
                    
        if event['type'] == 'BEGIN_LINK':
            print('[INFO] Adding a Link')
            element_1_id = event['element']['id']
            print('[INFO] Adding a Link',element_1_id)
            if data['events'][index+1]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+1]['element']['id']
                if element_2_id in board_state:
                    board_state[element_1_id]['link']=element_2_id
                    element_1_x = board_state[element_1_id]['element_x']
                    element_1_y = board_state[element_1_id]['element_y']
                    element_2_x = board_state[element_2_id]['element_x']
                    element_2_y = board_state[element_2_id]['element_y']
                    move_abstraction.add_link(move_abstraction.getZone(element_1_x,element_1_y))
                    move_abstraction.add_link(move_abstraction.getZone(element_2_x,element_2_y))
                if element_2_id in default_elements:
                    board_state[element_1_id]['link']=element_2_id
                    element_1_x = board_state[element_1_id]['element_x']
                    element_1_y = board_state[element_1_id]['element_y']
                    element_2_x = default_elements[str(level)][element_2_id][0]
                    element_2_y = default_elements[str(level)][element_2_id][1]
                    move_abstraction.add_link(move_abstraction.getZone(element_1_x,element_1_y))
                    move_abstraction.add_link(move_abstraction.getZone(element_2_x,element_2_y))
            if data['events'][index+2]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+2]['element']['id']
                if element_2_id in board_state:
                    board_state[element_1_id]['link']=element_2_id
                    element_1_x = board_state[element_1_id]['element_x']
                    element_1_y = board_state[element_1_id]['element_y']
                    element_2_x = board_state[element_2_id]['element_x']
                    element_2_y = board_state[element_2_id]['element_y']
                    move_abstraction.add_link(move_abstraction.getZone(element_1_x,element_1_y))
                    move_abstraction.add_link(move_abstraction.getZone(element_2_x,element_2_y))
                if element_2_id in default_elements:
                    board_state[element_1_id]['link']=element_2_id
                    element_1_x = board_state[element_1_id]['element_x']
                    element_1_y = board_state[element_1_id]['element_y']
                    element_2_x = default_elements[str(level)][element_2_id][0]
                    element_2_y = default_elements[str(level)][element_2_id][1]
                    move_abstraction.add_link(move_abstraction.getZone(element_1_x,element_1_y))
                    move_abstraction.add_link(move_abstraction.getZone(element_2_x,element_2_y))
                    
            else:
                print('[ERROR] Could Not find Finish Link!')
                print('[INFO] Either CODE needs fix or the log file is corrupted')
                
         
        if event['type']=='BOARD_SNAPSHOT':
            event_id = event['id']        
            action_abstraction[user][event_id]={}
            action_abstraction[user][event_id]["type"]="BOARD_SNAPSHOT"
            action_abstraction[user][event_id]["cummulative_vector"]=deepcopy(move_abstraction.getCummulative())
            action_abstraction[user][event_id]["intermediate_vector"]=deepcopy(move_abstraction.getIntermediate())
            move_abstraction.resetIntermediate()
            
    

print(action_abstraction)
out_file = open("action_abstraction.json", "w") 
json.dump(action_abstraction, out_file, indent = 6) 
out_file.close() 