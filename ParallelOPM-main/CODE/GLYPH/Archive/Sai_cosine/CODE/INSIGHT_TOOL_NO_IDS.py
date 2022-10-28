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
from datetime import datetime


SCREENSHOT_BLOCKS = '../DATA/ScreenshotData'

#TODO : CHANGE FILE PATH in snapshot_status.py

# log_files = "../DATA/LEVEL_5_LOGS"
# level = 5

# log_files = "../DATA/LEVEL_10_LOGS"
# level = 10


log_files = "../DATA/LEVEL_13_LOGS"
level = 13

# log_files = "../DATA/LEVEL_15_LOGS"
# level = 15

# log_files = "../DATA/Logfiles"
# level = 7

SCREENSHOT_FLAG = False
GIF_FLAG        = False




default_elements_names= {
    "13":{
        "L_dragonfruit_5001":"default_switch"
    }
}

default_elements = {
    
                    "10":{
                        "L_coconut_5002":(6,10),
                        "L_coconut_5001":(8,4)
                    },
                    "13":{"L_dragonfruit_5001":(4,12)},
                    
                    "15":{
                        "L_fig_5002":(6,2),
                        "L_fig_5003":(6,10),
                        "L_fig_5001":(3,6),
                        "L_fig_4006":(8,12),
                        "L_fig_4005":(12,8),
                        "L_fig_4004":(8,8),
                        "L_fig_4003":(12,4),
                        "L_fig_4002":(8,4),
                        "L_fig_4001":(12,0),
                        "L_fig_3001":(12,12),
                        "L_fig_2001":(7,0)
                        
                    }
                    }

class StateShot:
    def __init__(self,board_state,fileName,text,level,user,eventType=None):
        self.board_state = board_state
        self.fileName    = fileName
        self.text        = text
        self.level       = level
        self.user       = user  

        self.preImage = Image.open(f'{SCREENSHOT_BLOCKS}/order{self.level}.png')
        self.destination = f'../DATA/IntermediateScreenShots/{self.user}/{fileName}.png'
        self.destination_2 = f'../DATA/Screenshots/{self.user}/{fileName}.png'
        self.font = ImageFont.truetype("Roboto-Bold.ttf",size=45)
        self.text_color =  'rgb(255, 255, 255)'
        self.event_type = eventType
        self.stateMatrix = None
        
    def drawSemaphore(self,x,y,status):
        location = [x,y]
        # edited for the active and inactive semaphore @@@
        if status=="inactive":
            semaphore = Image.open('../DATA/ScreenshotData/semaphoreInactive.png','r')
        else:
            semaphore = Image.open('../DATA/ScreenshotData/semaphoreActive.png','r')
        self.preImage.paste(semaphore, (location[1]*100, location[0]*100), mask=semaphore)
    def drawSignal(self, x,y):
        location = [x,y]
        semaphore = Image.open('../DATA/ScreenshotData/signalInactive.png','r')
        self.preImage.paste(semaphore, (location[1]*100, location[0]*100), mask=semaphore)
    def drawLink(self,x,y,x1,y1):
        location0 = [x,y]
        location1 = [x1,y1]
        draw = ImageDraw.Draw(self.preImage)
        draw.line((location0[1]*100+50, location0[0]*100+50, location1[1]*100+50, location1[0]*100+50), width = 5, fill='yellow')
    def drawText(self,text):
        (x, y) = (500, 850)
        draw = ImageDraw.Draw(self.preImage)
        draw.text((x, y), text, fill=self.text_color,font=self.font)
    def saveImage(self):
        self.preImage.save(self.destination, quality=95)
        if self.event_type=='BOARD_SNAPSHOT':
            self.preImage.save(self.destination_2, quality=95)
            

    def buildScreenShot(self):
        for item in self.board_state:
            if self.board_state[item]['type']=="semaphore":
                self.drawSemaphore(self.board_state[item]["element_x"],self.board_state[item]["element_y"],self.board_state[item]['status'])
            if self.board_state[item]['type']=="signal":
                self.drawSignal(self.board_state[item]["element_x"],self.board_state[item]["element_y"])
                if self.board_state[item]['link']!=None:
                    link_id=self.board_state[item]['link']
                    try:
                        self.drawLink(
                            self.board_state[item]["element_x"],
                            self.board_state[item]["element_y"], 
                            self.board_state[link_id]["element_x"],
                            self.board_state[link_id]["element_y"],

                        )
                    except:
                        print('[INFO] This is a default element!')
                        self.drawLink(
                            self.board_state[item]["element_x"],
                            self.board_state[item]["element_y"], 
                            default_elements[str(self.level)][link_id][0],
                            default_elements[str(self.level)][link_id][1],
                        )
                            
        self.drawText(self.text)
        self.saveImage()


class Abstraction:
    def __init__(self,level,board_state):
        self.level = str(level)
        self.zoneSheet = f'../DATA/maps_with_zones/MapInfo_{self.level}.json'
        self.level_info      = json.load(open(self.zoneSheet))
        self.zones         =   self.level_info[self.level]['mapAreas']      
        self.index         = 0
        self.indexMap      = {}
        self.nSemaphores   = 0
        self.nSignals      = 0
        
        #cordinates
        self.semaphorePositions = [] #(id,x,y,zone) 
        self.signalPositions    = [] #(id,x,y,zone)
        self.linkPositions      = [] #(position1,postion2)        
        #abstraction 1
        self.semaphore_zone_dict = {}
        self.signal_zone_dict    = {}
        self.link_dict           = {} #{"zone1zone2" : count}
        
        for zone in self.zones:
            self.indexMap[zone]=self.index
            self.index+=1
        
        #print(self.indexMap)
        #print('=========$$$$$$$$========$$$$$$======')
        self.indexMap["semaphore_row"]=self.index
        self.index+=1
        self.indexMap["signal_row"]=self.index
        
        self.adjaceny_matrix = [[0 for j in range(len(self.zones))] for i in range(len(self.zones)) ]  

        
    def getSemaphoreXY(self,id):
        if id==None:
            return (None,None)
        
        for semaphore in self.semaphorePositions:
            if semaphore[0]==id:
                return (semaphore[1],semaphore[2]) 
        return (None,None)
    def getSignalXY(self,id):
        for signal in self.signalPositions:
            if signal[0]==id:
                return signal[1],signal[2]
        return None
    def putSemaphore(self,x,y,id,status):
        zone  = self.getZone(x,y)
        if zone in self.semaphore_zone_dict:
            self.semaphore_zone_dict[zone]+=1
        else:
            self.semaphore_zone_dict[zone]=1
        #add the element to the board
        self.semaphorePositions.append((id,x,y,zone))
        #update the counts
        self.nSemaphores+=1

    def zoneIndex(self,zone):
        return self.indexMap[zone]
    def putSignal(self,x,y,id_1,id_2):
        #print(x,y)
        zone  = self.getZone(x,y)
        if zone in self.signal_zone_dict:
            self.signal_zone_dict[zone]+=1
        else:
            self.signal_zone_dict[zone]=1
        #print(f'[INFO] adding {id_1} to signal positions')
        self.signalPositions.append((id_1,x,y,zone))
        self.nSignals+=1
        #populate link dict
        (connection_x,connection_y) = self.getSemaphoreXY(id_2)
        if connection_x!=None:
            #print(connection_x,connection_y)
            #print(self.getZone(connection_x,connection_y),zone)
            key  = zone + self.getZone(connection_x,connection_y)
            if key in self.link_dict:
                self.link_dict[key]+=1
            else:
                self.link_dict[key]=1

            self.adjaceny_matrix[self.zoneIndex(zone)][self.zoneIndex(self.getZone(connection_x,connection_y))]+=1
            self.linkPositions.append([x,y,connection_x,connection_y])
        else:
            print('[INFO] This signal could not find a semaphore!')
            print('[INFO] This could be a link between a signal and a Default element!')
            print('[INFO] Attempting to search in default elements')
            if id_2!=None:
                (connection_x,connection_y) = default_elements[str(self.level)][id_2]
                if connection_x!=None:
                    print('[INFO] Yes! Default element found!')
                    key  = zone + self.getZone(connection_x,connection_y)
                    if key in self.link_dict:
                        self.link_dict[key]+=1
                    else:
                        self.link_dict[key]=1
                    
                    self.adjaceny_matrix[self.zoneIndex(zone)][self.zoneIndex(self.getZone(connection_x,connection_y))]+=1
                    self.linkPositions.append([x,y,connection_x,connection_y])
                else:
                    print("===================CONNECTION NOT FOUND IN DEFAULT ELEMENTS TOO!") 
                    
    #returns which zone a point belongs to 
    def getZone(self,x,y):
        query = [x,y]
        for zone in self.zones:
            if query in self.zones[zone]:
                return zone 
        return None
    
    def getAdjacencyMatrix(self):
        return self.adjaceny_matrix 
    
    def getAbstraction(self):
        abstraction = {
            'nSemaphores'     : self.nSemaphores,
            'nSignals'        : self.nSignals,
            'semaphore_zone_dict':self.semaphore_zone_dict,
            'signal_zone_dict':self.signal_zone_dict,
            'link_dict':self.link_dict,
        }
        return abstraction

    def getStateMatrix(self):
        semaphore_row = []
        signal_row    = []
        for zone in self.zones:
            if zone in self.semaphore_zone_dict:
                print(zone,"+1")
                semaphore_row.append(self.semaphore_zone_dict[zone])
            else:
                semaphore_row.append(0)
            if zone in self.signal_zone_dict:
                signal_row.append(self.signal_zone_dict[zone])
            else:
                signal_row.append(0)
        
        
        self.stateMatrix = deepcopy(self.adjaceny_matrix)

        self.stateMatrix.append(semaphore_row)
        self.stateMatrix.append(signal_row)

        return self.stateMatrix               
     
def buildAbstraction(level,board_state):
    abstraction = Abstraction(level,board_state)
    for item in board_state:
        if board_state[item]['type']=="semaphore":
            abstraction.putSemaphore(board_state[item]['element_x'],
                                     board_state[item]['element_y'],
                                     item,
                                     board_state[item]['status'])
    
    for item in board_state:        
        if board_state[item]['type']=='signal':
            abstraction.putSignal(board_state[item]['element_x'],
                                  board_state[item]['element_y'],
                                  item,
                                  board_state[item]['link'])

    return abstraction.getAbstraction(),abstraction.getAdjacencyMatrix(),abstraction.getStateMatrix()       
        
        
CRITICAL_EVENTS=[
    "BEGIN_LEVEL_LOAD",
    'ADD_ELEMENT',
    'MOVE_ELEMENT',
    'TOGGLE_ELEMENT',
    'REMOVE_ELEMENT',
    'BEGIN_LINK',
]
player_traces = {}
total_number_of_nodes = 0 
total_number_of_begin_links = 0
abstraction_object = Abstraction(level,{})


entry = {} 

for file in os.listdir(log_files):
    user = file.split('.')[0]
    fileName = log_files+'/'+file
    board_state = {} 
    entry[user] = {} 
    activity = ""

        
    data = json.load(open(fileName))
    for index,event in enumerate(data['events']):    
        if event['type'] in CRITICAL_EVENTS or event['type']=="BOARD_SNAPSHOT":
            pass

        if event['type']=="BEGIN_LEVEL_LOAD":
            pass
    
        if event['type'] == 'ADD_ELEMENT':
            element_id   = event['element']['id']     #element id
            element_type = event['element']['type'] #semaphore, signal
            element_x = event['element']['cell'][0] #x
            element_y = event['element']['cell'][1] #y
            
            if element_type == 'signal':
                board_state[element_id] = {
                    "type":element_type,
                    "element_x":element_x,
                    "element_y":element_y,
                    "link":None
                }
            if element_type == 'semaphore':
                board_state[element_id] = {
                    "type":element_type,
                    "element_x":element_x,
                    "element_y":element_y,
                    "status":'inactive'
                }
            
            zone_added = abstraction_object.getZone(element_x,element_y)
            #activity = f"Put {element_type} ({element_id}) in Zone {zone_added} "
            #activity = f"Put {element_type}  in Zone {zone_added} "
            print(f"case-{user},",f"Put {element_type}  in Zone {zone_added}"",",user,",",event['created'],",",event['created']+1)
                                    
        if event['type'] == 'MOVE_ELEMENT':
            element_id   = event['element']['id']  #element id
            element_type = event['element']['type'] 
            old_x = board_state[element_id]['element_x'] 
            old_y = board_state[element_id]['element_y']
            old_zone = abstraction_object.getZone(old_x,old_y)
            
            new_x = event['element']['cell'][0] #x
            new_y = event['element']['cell'][1] #y
            new_zone = abstraction_object.getZone(new_x,new_y)
            
            
            if (new_x,new_y) != (old_x,old_y):
                #print(f"#################### Element moved from {new_zone}, {old_zone},{(new_x,new_y)},{(old_x,old_y)}")                
                #update to new coordinates
                board_state[element_id]['element_x']=new_x
                board_state[element_id]['element_y']=new_y
                #activity =f"{element_type} ({element_id}) moved from {new_zone} -> {old_zone}"
                print(f"case-{user},",f"{element_type} removed from {old_zone}",",",user,",",event['created'],",",event['created']+1)
                print(f"case-{user},",f"{element_type} added in {new_zone}",",",user,",",event['created'],",",event['created']+1)

            else:
                #activity =f"{element_type} ({element_id}) moved from {new_zone} -> {old_zone}"
                #print(f"Put {element_type}  in Zone {zone_added}")
                print(f"case-{user},",f"{element_type} removed from {old_zone}",",",user,",",event['created'],",",event['created']+1)
                print(f"case-{user},",f"{element_type} added in {new_zone}",",",user,",",event['created'],",",event['created']+1)
            
        if event['type'] == 'TOGGLE_ELEMENT':
            element_id   = event['element']['id']  #element id
            board_state[element_id]['status']=event['element']['spec']
            #activity =f"{element_type} ({element_id}) Toggled"
            print(f"case-{user},",f"{element_type} Toggled",",",user,",",event['created'],",",event['created']+1)

        
        if event['type'] == 'REMOVE_ELEMENT':
            element_id = event['element']['id']
            removed_element_x = board_state[element_id]['element_x'] 
            removed_element_y = board_state[element_id]['element_y']
            removed_element_zone = abstraction_object.getZone(removed_element_x,removed_element_y)
         
            board_state.pop(element_id)
            #print('[INFO] Element Removed',element_id,file)            

            #if you are deleting a semaphore 
            # you want to delete the signal link
            for item in board_state:
                if board_state[item]['type']=='signal':
                    try:
                        if board_state[item]['link']==element_id:
                            board_state[item]['link']=None
                            #print(f'[INFO] Element Link Removed {element_id} and {item}',)            

                    except:
                        pass

            #activity =f"{element_type} ({element_id}) Removed"
            print(f"case-{user},",f"{element_type} removed from {removed_element_zone}",",",user,",",event['created'],",",event['created']+1)

               
        if event['type'] == 'BEGIN_LINK':
            total_number_of_begin_links+=1
            #print('[INFO] Adding a Link')
            element_1_id = event['element']['id']
            #print('[INFO] Adding a Link',element_1_id)
            if data['events'][index+1]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+1]['element']['id']
                #print(f"ADDING LINK : {element_1_id},{element_2_id}")    
                board_state[element_1_id]['link']=element_2_id
                try:
                    element_2_x =  board_state[element_2_id]['element_x']               
                    element_2_y =  board_state[element_2_id]['element_y']
                    #if element_2 not in board state and is possibly a default element
                except:
                    element_2_x = default_elements[str(level)][element_2_id][0]
                    element_2_y = default_elements[str(level)][element_2_id][1]
                element_1_x = board_state[element_1_id]['element_x']
                element_1_y = board_state[element_1_id]['element_y']
                
                element_2_zone = abstraction_object.getZone(element_2_x,element_2_y)
                element_1_zone = abstraction_object.getZone(element_1_x,element_1_y) 
                
           
                    
                #print(f"########################ADDING LINK : {element_1_id},{element_2_id},{element_2_zone},{element_1_zone}")
                                                       

            elif data['events'][index+2]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+2]['element']['id']
                #print(f"ADDING LINK : {element_1_id},{element_2_id}")    
                board_state[element_1_id]['link']=element_2_id
                try:
                    element_2_x =  board_state[element_2_id]['element_x']               
                    element_2_y =  board_state[element_2_id]['element_y']
                    #if element_2 not in board state and is possibly a default element
                except:
                    element_2_x = default_elements[str(level)][element_2_id][0]
                    element_2_y = default_elements[str(level)][element_2_id][1]

                element_1_x = board_state[element_1_id]['element_x']
                element_1_y = board_state[element_1_id]['element_y']
                
                element_2_zone = abstraction_object.getZone(element_2_x,element_2_y)
                element_1_zone = abstraction_object.getZone(element_1_x,element_1_y) 
                if element_2_zone == element_1_zone:
                    #print("####[INFO] Connection Appears to be from the Same Zone! Flagging!###")
                    same_zone_linking = True
                    
                #print(f"ADDING LINK : {element_1_id},{element_2_id},{element_2_zone},{element_1_zone}")
            else:
                pass
                # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!![ERROR] Could Not find Finish Link!')
                # print('[INFO] Either CODE needs fix or the log file is corrupted')
                # print(file)
            
            #activity =f"{element_1_zone}{element_2_zone}"
            print(f"case-{user},",f"{element_1_zone}{element_2_zone}"",",user,",",event['created'],",",event['created']+1)
        
        if event['type'] == 'FINISH_SIMULATION':
            #board_snapshot_ticks = event['total']
            pass
        
        if event['type']=='BOARD_SNAPSHOT':
            #No element manipulation 
            # so just Build the screenshot
            #activity =  getStatus(event['id'],f"{user}"+".json")
            print(f"case-{user},",getStatus(event['id'],f"{user}"+".json"),",",user,",",event['created'],",",event['created']+1)

        if event['type'] in CRITICAL_EVENTS and event['type'] != "BEGIN_LEVEL_LOAD":
            #print(f"case-{user},",event['type'],activity,",",user,",",event['created'],",",event['created']+1)
            #print(f"case-{user},",activity,",",user,",",event['created'],",",event['created']+1)
            #activity = ''
            pass
