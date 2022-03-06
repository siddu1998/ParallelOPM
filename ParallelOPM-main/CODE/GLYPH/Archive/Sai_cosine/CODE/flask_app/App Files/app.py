from flask import Flask, request
import json
from snapshot_status import getStatus
from getBoardID import get_board_ids
from BuildNewGlyph import *
from copy import copy, deepcopy
import math
from itertools import chain
import Constants

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

CRITICAL_EVENTS=Constants.CRITICAL_EVENTS
knowledge = Constants.knowledge
level_13_index_map = Constants.level_13_index_map
level_15_index_map = Constants.level_15_index_map
level_5_index_map = Constants.level_5_index_map
level_zone_mapper=Constants.level_zone_mapper
default_elements = Constants.default_elements


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
      




#HEPLER FUNCTIONS --> move to chalice
def getPlayerTrace_internal(data):
    player_id = data['metadata']['playerId']
    user = data['id']
    level = data['events'][0]['order']
    player_traces = {}
    order_change_events_behaviour = False
    same_zone_linking = False
    moving_connected_elements = False
    store_in_trace = True
    SCREENSHOT_FLAG=False
    
    knowledge_statement = "No Knowledge Statement"

    board_snapshot_ticks = "No Ticks Available"
    abstraction_object = Abstraction(level,{})
    #

    board_state={}
    for index,event in enumerate(data['events']):
        print(f"=========={event['type']}=======================")    
        print(event['id'])
        
        if event['type']=="BEGIN_LEVEL_LOAD":
            print("[INFO] Starting New Level")
            board_state = {}
            if SCREENSHOT_FLAG:
                stateShot = StateShot(board_state,f"{index}_{event['id']}","LEVEL RESTARTED",level,user) 
                stateShot.buildScreenShot()
            

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
                
            print('[INFO] Element Added',element_id,'at',element_x,element_y)
            
            if SCREENSHOT_FLAG:            
                #CALL SCREEENSHOT on board_state
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
          

        if event['type'] == 'MOVE_ELEMENT':
            element_id   = event['element']['id']  #element id
            

            old_x = board_state[element_id]['element_x'] 
            old_y = board_state[element_id]['element_y']
            old_zone = abstraction_object.getZone(old_x,old_y)
            
            new_x = event['element']['cell'][0] #x
            new_y = event['element']['cell'][1] #y
            new_zone = abstraction_object.getZone(new_x,new_y)
        
            
            print('[INFO] Element Moved',element_id)
            print(f"Element moved form {old_zone},{(old_x,old_y)},'to' ,{new_zone},{(new_x,new_y)}")

            board_state[element_id]['element_x']=new_x
            board_state[element_id]['element_y']=new_y
            
            if (new_x,new_y) != (old_x,old_y):
                print(f"Element moved form {old_zone},{(old_x,old_y)},'to' ,{new_zone},{(new_x,new_y)}")
                #update to new coordinates
                board_state[element_id]['element_x']=new_x
                board_state[element_id]['element_y']=new_y
                
                
                
                if new_zone == old_zone:
                    order_change_events_behaviour=True
                #if the element is connected and being moved it is an interesting move and we want to flag!
                if board_state[element_id]["type"]=="signal":
                    if board_state[element_id]['link']!=None:
                        moving_connected_elements=True
                        print('[FLAG] The User is moving a connected element!!')
                        
                elif board_state[element_id]["type"]=="semaphore":
                    for item in board_state:
                        if board_state[item]['type']=='signal':
                            try:
                                if board_state[item]['link']==element_id:
                                    moving_connected_elements=True
                                    print('[FLAG] The User is moving a connected element!!!!!')
                            except:
                                pass
                            
                #CALL SCREENSHOT on board_state
                if SCREENSHOT_FLAG:
                    stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                    stateShot.buildScreenShot()

            else:
                print('[WARNING] ahaa did not actually move hence not adding to trace')
                store_in_trace = False
            
        if event['type'] == 'TOGGLE_ELEMENT':
            element_id   = event['element']['id']  #element id
            board_state[element_id]['status']=event['element']['spec']

            print('[INFO] Element Toggled',element_id)
            
            if SCREENSHOT_FLAG:
                #CALL SCREENSHOT on board_state
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()

        if event['type'] == 'REMOVE_ELEMENT':
            element_id = event['element']['id']         
            board_state.pop(element_id)
            #print('[INFO] Element Removed',element_id,file)            

            #if you are deleting a semaphore 
            # you want to delete the signal link
            for item in board_state:
                if board_state[item]['type']=='signal':
                    try:
                        if board_state[item]['link']==element_id:
                            board_state[item]['link']=None
                            print(f'[INFO] Element Link Removed {element_id} and {item}',)            

                    except:
                        pass

                    
                            
                
            if SCREENSHOT_FLAG:
                #CALL SCREENSHOT
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
               
        if event['type'] == 'BEGIN_LINK':
            print('[INFO] Adding a Link')
            element_1_id = event['element']['id']
            print('[INFO] Adding a Link',element_1_id)
            if data['events'][index+1]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+1]['element']['id']
                print(f"ADDING LINK : {element_1_id},{element_2_id}")    
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
                    print("####[INFO] Connection Appears to be from the Same Zone! Flagging!###")
                    same_zone_linking = True
                    
                print(f"########################ADDING LINK : {element_1_id},{element_2_id},{element_2_zone},{element_1_zone}")
                                                       

            elif data['events'][index+2]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+2]['element']['id']
                print(f"ADDING LINK : {element_1_id},{element_2_id}")    
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
                    print("####[INFO] Connection Appears to be from the Same Zone! Flagging!###")
                    same_zone_linking = True
                    
                print(f"ADDING LINK : {element_1_id},{element_2_id},{element_2_zone},{element_1_zone}")
            else:
                print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!![ERROR] Could Not find Finish Link!')
                print('[INFO] Either CODE needs fix or the log file is corrupted')
                #print(file)
            
            knowledge_statement=f"Adding Link:{element_1_zone}:{element_2_zone}"
            print(knowledge_statement)

            #CALL SCREENSHOT            
            if SCREENSHOT_FLAG:
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
        
        if event['type'] == 'FINISH_SIMULATION':
            board_snapshot_ticks = event['total']
        
        if event['type']=='BOARD_SNAPSHOT':
            #No element manipulation 
            # so just Build the screenshot
            if SCREENSHOT_FLAG:
                text  = getStatus(data,event['id'])                    
                stateShot = StateShot(board_state,f"{index}_{event['id']}",text,level,user,event['type']) 
                stateShot.buildScreenShot()
          
        #Calling Abstraction
        if store_in_trace:
            if event['type'] in CRITICAL_EVENTS:                   
                abstraction,adjacency_matrix,state_matrix =  buildAbstraction(level,board_state)
                trace_absolute_board_state = deepcopy(board_state)
                trace_entry = {
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":trace_absolute_board_state,
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix,
                        "state_matrix":state_matrix,
                        "discussion":[],
                        "upvotes":0,
                        "knowledge_statement":knowledge_statement,
                        "created": event['created']
                    }
                player_traces[user]=player_traces.get(user,{})                    
                player_traces[user][event['id']]=trace_entry
 
            if event['type']=='BOARD_SNAPSHOT':                   
                abstraction,adjacency_matrix,state_matrix =  buildAbstraction(level,board_state)
                trace_absolute_board_state = deepcopy(board_state)
                trace_entry = {
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":trace_absolute_board_state,
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix,
                        "state_matrix":state_matrix,                    
                        "discussion":[],
                        "upvotes":0,
                        "created": event['created'],
                        "submission_result" : getStatus(data,event['id']),
                        "ticks":board_snapshot_ticks,
                        "no_order_change_behaviour_issue":order_change_events_behaviour,
                        "same_zone_linking":same_zone_linking,
                        "knowledge_statement":knowledge_statement,
                        "moving_connected_elements":moving_connected_elements
                    }
    
                

                player_traces[user]=player_traces.get(user,{})                    
                player_traces[user][event['id']]=trace_entry

                board_snapshot_ticks = "No Ticks Available"
                order_change_events_behaviour = False
                same_zone_linking=False
                moving_connected_elements = False
                knowledge_statement="No Knowledge Statement",
        
            
        store_in_trace = True
        print(board_state)
        
    print("SUGGESTIONS PART")    
    for player in player_traces:
        #go through player actions
        for action in player_traces[player]:
            #get player submissions
            if player_traces[player][action]["type"]=="BOARD_SNAPSHOT":
                #print("Player ID: ", player)
                #print("Event ID: ",action)
                suggestions = []
                #get adjacency matrix of submission
                adjacency_matrix=player_traces[player][action]["adjacency_matrix"]
                #get links in that submissions
                for row in range(0,len(adjacency_matrix)):
                    for col in range(0,len(adjacency_matrix[0])):
                        k_flag = False
                        if adjacency_matrix[row][col]>0:
                            link = f"{level_zone_mapper[level][row]}{level_zone_mapper[level][col]}"
                            
                            #print(f"[INFO] Link in between {link}")
                            for concept in knowledge[str(level)]["concepts"]:
                                if link == knowledge[str(level)]["concepts"][concept]["link"]:
                                    #print("--- Concept Found",concept,link)
                                    #print("--- [OPM]", knowledge[level]["concepts"][concept]["OPM"])
                                    suggestions.append(knowledge[level]["concepts"][concept]["OPM"])
                                    k_flag = True
                            if k_flag==False:
                                print('[WARNING] NEW LINK FOUND! No Reasoning Found for this link')
                                suggestions.append(f"{link}:This link is not a popular link in the community! Not sure what the idea behind the link is!")
                                #alert(there is a new link can you give a reason)
                player_traces[player][action]["suggestions"]=suggestions
                #print('========================')
            
            else:
                player_traces[player][action]["suggestions"]=[]

    response = {}
    response['level']=level
    response['player_id']= player_id
    response['events']=[player_traces[user][x] for x in player_traces[user]]
    
    return response


def cosine(v1,v2):
    "compute cosine similarity of v1 to v2: (v1 dot v2)/{||v1||*||v2||)"
    try:
        sumxx, sumxy, sumyy = 0, 0, 0
        for i in range(len(v1)):
            x = v1[i]; y = v2[i]
            sumxx += x*x
            sumyy += y*y
            sumxy += x*y
        return sumxy/math.sqrt(sumxx*sumyy)
    except:
        return "Similarity Not Found"
#HELPER FUNCTIONS




"""
Parameters Required  : Raw log file of user
Response : Abstracted Board State at all points and ticks and gosh a whole bunch of stuff!  
"""
@app.route('/getPlayerTrace')
def getPlayerTrace():
    data = json.loads(str(request.data, encoding='utf-8'))
    player_id = data['metadata']['playerId']
    user = data['id']
    level = data['events'][0]['order']
    player_traces = {}
    order_change_events_behaviour = False
    same_zone_linking = False
    moving_connected_elements = False
    store_in_trace = True
    SCREENSHOT_FLAG=False
    
    knowledge_statement = "No Knowledge Statement"

    board_snapshot_ticks = "No Ticks Available"
    abstraction_object = Abstraction(level,{})

    #Abstraction
    board_state={}
    for index,event in enumerate(data['events']):
        print(f"=========={event['type']}=======================")    
        print(event['id'])
        
        if event['type']=="BEGIN_LEVEL_LOAD":
            print("[INFO] Starting New Level")
            board_state = {}
            if SCREENSHOT_FLAG:
                stateShot = StateShot(board_state,f"{index}_{event['id']}","LEVEL RESTARTED",level,user) 
                stateShot.buildScreenShot()
            

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
                
            print('[INFO] Element Added',element_id,'at',element_x,element_y)
            
            if SCREENSHOT_FLAG:            
                #CALL SCREEENSHOT on board_state
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
          

        if event['type'] == 'MOVE_ELEMENT':
            element_id   = event['element']['id']  #element id
            

            old_x = board_state[element_id]['element_x'] 
            old_y = board_state[element_id]['element_y']
            old_zone = abstraction_object.getZone(old_x,old_y)
            
            new_x = event['element']['cell'][0] #x
            new_y = event['element']['cell'][1] #y
            new_zone = abstraction_object.getZone(new_x,new_y)
        
            
            print('[INFO] Element Moved',element_id)
            print(f"Element moved form {old_zone},{(old_x,old_y)},'to' ,{new_zone},{(new_x,new_y)}")

            board_state[element_id]['element_x']=new_x
            board_state[element_id]['element_y']=new_y
            
            if (new_x,new_y) != (old_x,old_y):
                print(f"Element moved form {old_zone},{(old_x,old_y)},'to' ,{new_zone},{(new_x,new_y)}")
                #update to new coordinates
                board_state[element_id]['element_x']=new_x
                board_state[element_id]['element_y']=new_y
                
                
                
                if new_zone == old_zone:
                    order_change_events_behaviour=True
                #if the element is connected and being moved it is an interesting move and we want to flag!
                if board_state[element_id]["type"]=="signal":
                    if board_state[element_id]['link']!=None:
                        moving_connected_elements=True
                        print('[FLAG] The User is moving a connected element!!')
                        
                elif board_state[element_id]["type"]=="semaphore":
                    for item in board_state:
                        if board_state[item]['type']=='signal':
                            try:
                                if board_state[item]['link']==element_id:
                                    moving_connected_elements=True
                                    print('[FLAG] The User is moving a connected element!!!!!')
                            except:
                                pass
                            
                #CALL SCREENSHOT on board_state
                if SCREENSHOT_FLAG:
                    stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                    stateShot.buildScreenShot()

            else:
                print('[WARNING] ahaa did not actually move hence not adding to trace')
                store_in_trace = False
            
        if event['type'] == 'TOGGLE_ELEMENT':
            element_id   = event['element']['id']  #element id
            board_state[element_id]['status']=event['element']['spec']

            print('[INFO] Element Toggled',element_id)
            
            if SCREENSHOT_FLAG:
                #CALL SCREENSHOT on board_state
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()

        if event['type'] == 'REMOVE_ELEMENT':
            element_id = event['element']['id']         
            board_state.pop(element_id)
            #print('[INFO] Element Removed',element_id,file)            

            #if you are deleting a semaphore 
            # you want to delete the signal link
            for item in board_state:
                if board_state[item]['type']=='signal':
                    try:
                        if board_state[item]['link']==element_id:
                            board_state[item]['link']=None
                            print(f'[INFO] Element Link Removed {element_id} and {item}',)            

                    except:
                        pass

                    
                            
                
            if SCREENSHOT_FLAG:
                #CALL SCREENSHOT
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
               
        if event['type'] == 'BEGIN_LINK':
            print('[INFO] Adding a Link')
            element_1_id = event['element']['id']
            print('[INFO] Adding a Link',element_1_id)
            if data['events'][index+1]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+1]['element']['id']
                print(f"ADDING LINK : {element_1_id},{element_2_id}")    
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
                    print("####[INFO] Connection Appears to be from the Same Zone! Flagging!###")
                    same_zone_linking = True
                    
                print(f"########################ADDING LINK : {element_1_id},{element_2_id},{element_2_zone},{element_1_zone}")
                                                       

            elif data['events'][index+2]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+2]['element']['id']
                print(f"ADDING LINK : {element_1_id},{element_2_id}")    
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
                    print("####[INFO] Connection Appears to be from the Same Zone! Flagging!###")
                    same_zone_linking = True
                    
                print(f"ADDING LINK : {element_1_id},{element_2_id},{element_2_zone},{element_1_zone}")
            else:
                print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!![ERROR] Could Not find Finish Link!')
                print('[INFO] Either CODE needs fix or the log file is corrupted')
                #print(file)
            
            knowledge_statement=f"Adding Link:{element_1_zone}:{element_2_zone}"
            print(knowledge_statement)

            #CALL SCREENSHOT            
            if SCREENSHOT_FLAG:
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
        
        if event['type'] == 'FINISH_SIMULATION':
            board_snapshot_ticks = event['total']
        
        if event['type']=='BOARD_SNAPSHOT':
            #No element manipulation 
            # so just Build the screenshot
            if SCREENSHOT_FLAG:
                text  = getStatus(data,event['id'])                    
                stateShot = StateShot(board_state,f"{index}_{event['id']}",text,level,user,event['type']) 
                stateShot.buildScreenShot()
          
        #Calling Abstraction
        if store_in_trace:
            if event['type'] in CRITICAL_EVENTS:                   
                abstraction,adjacency_matrix,state_matrix =  buildAbstraction(level,board_state)
                trace_absolute_board_state = deepcopy(board_state)
                trace_entry = {
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":trace_absolute_board_state,
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix,
                        "state_matrix":state_matrix,
                        "discussion":[],
                        "upvotes":0,
                        "knowledge_statement":knowledge_statement,
                        "created": event['created']
                    }
                player_traces[user]=player_traces.get(user,{})                    
                player_traces[user][event['id']]=trace_entry
 
            if event['type']=='BOARD_SNAPSHOT':                   
                abstraction,adjacency_matrix,state_matrix =  buildAbstraction(level,board_state)
                trace_absolute_board_state = deepcopy(board_state)
                trace_entry = {
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":trace_absolute_board_state,
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix,
                        "state_matrix":state_matrix,                    
                        "discussion":[],
                        "upvotes":0,
                        "created": event['created'],
                        "submission_result" : getStatus(data,event['id']),
                        "ticks":board_snapshot_ticks,
                        "no_order_change_behaviour_issue":order_change_events_behaviour,
                        "same_zone_linking":same_zone_linking,
                        "knowledge_statement":knowledge_statement,
                        "moving_connected_elements":moving_connected_elements
                    }
    
                

                player_traces[user]=player_traces.get(user,{})                    
                player_traces[user][event['id']]=trace_entry

                board_snapshot_ticks = "No Ticks Available"
                order_change_events_behaviour = False
                same_zone_linking=False
                moving_connected_elements = False
                knowledge_statement="No Knowledge Statement",
        
            
        store_in_trace = True
        print(board_state)

    #suggestions    
    print("SUGGESTIONS PART")    
    for player in player_traces:
        #go through player actions
        for action in player_traces[player]:
            #get player submissions
            if player_traces[player][action]["type"]=="BOARD_SNAPSHOT":
                #print("Player ID: ", player)
                #print("Event ID: ",action)
                suggestions = []
                #get adjacency matrix of submission
                adjacency_matrix=player_traces[player][action]["adjacency_matrix"]
                #get links in that submissions
                for row in range(0,len(adjacency_matrix)):
                    for col in range(0,len(adjacency_matrix[0])):
                        k_flag = False
                        if adjacency_matrix[row][col]>0:
                            link = f"{level_zone_mapper[level][row]}{level_zone_mapper[level][col]}"
                            
                            #print(f"[INFO] Link in between {link}")
                            for concept in knowledge[str(level)]["concepts"]:
                                if link == knowledge[str(level)]["concepts"][concept]["link"]:
                                    #print("--- Concept Found",concept,link)
                                    #print("--- [OPM]", knowledge[level]["concepts"][concept]["OPM"])
                                    suggestions.append(knowledge[level]["concepts"][concept]["OPM"])
                                    k_flag = True
                            if k_flag==False:
                                print('[WARNING] NEW LINK FOUND! No Reasoning Found for this link')
                                suggestions.append(f"{link}:This link is not a popular link in the community! Not sure what the idea behind the link is!")
                                #alert(there is a new link can you give a reason)
                player_traces[player][action]["suggestions"]=suggestions
                #print('========================')
            
            else:
                player_traces[player][action]["suggestions"]=[]

    #removing matrics, things not required in response 
    for player in player_traces:
        for action in player_traces[player]:
            player_traces[player][action].pop("adjacency_matrix")
            player_traces[player][action].pop("discussion")
            player_traces[player][action].pop("upvotes")
            player_traces[player][action].pop("state_matrix")

    
    #SIMILARITY
    ranking_table = {}
    other_logs = ['../DATA/LEVEL_13_LOGS/a96c510e-687c-4889-8d21-a4444cd08de0.json']
    #TODO : BERT has to pull the log file of the mentioned ids
    current_player_full_trace = getPlayerTrace_internal(data)
    current_player_last_state = current_player_full_trace['events'][-1]
    for player2 in other_logs:
        player2_data = json.load(open(player2))
        player2_full_trace = getPlayerTrace_internal(player2_data)
        player2_id   = player2_full_trace['player_id']
        player2_last_state = player2_full_trace['events'][-1]
        player2_n_signals = player2_last_state['abstracted_board_state']['nSignals']
        player2_n_semaphores = player2_last_state['abstracted_board_state']['nSemaphores']
        player2_total_elements = player2_n_semaphores+player2_n_signals
        player2_submission_efficiency = player2_last_state['ticks']
        matrix_1 =  current_player_last_state['state_matrix']
        matrix_2 =  player2_last_state['state_matrix']
        matrix_1 = list(chain.from_iterable(matrix_1))
        matrix_2 = list(chain.from_iterable(matrix_2))
        consine_similarity =  cosine(matrix_1,matrix_2)

        #Common Links
        player2_links = player2_last_state['abstracted_board_state']['link_dict'].keys()
        current_player_links = current_player_last_state['abstracted_board_state']['link_dict'].keys()
        uncommon_links =list(set(player2_links) - set(current_player_links))

        if player2_last_state['type']=='BOARD_SNAPSHOT':
            player2_board_status = player2_last_state['submission_result']
        else:
            player2_board_status = "Player Did Not Submit"
        
        ranking_table[player2_id]={
            'log_id':player2,
            'efficiency':player2_submission_efficiency,
            'nSignals':player2_n_signals,
            'nSemaphores':player2_n_semaphores,
            'similarity':consine_similarity,
            'board_status':player2_board_status,
            'uncommon_links':uncommon_links,
            'solving_time_milliseconds':abs(player2_full_trace['events'][0]['created']-player2_full_trace['events'][-1]['created'])
            
        }


    response = {}
    response['level']     = level
    response['player_id'] = player_id
    response['log_id']    = user
    response['events']    = [player_traces[user][x] for x in player_traces[user]]
    response['solving_time_milliseconds']=abs(response['events'][0]['created']-response['events'][-1]['created'])
    response['ranking']   = ranking_table



    return response



"""
Parameters Required : Level and Raw log files of all users in the study
Response : Glyph Visualization File
"""
@app.route('/getGlyph')
def getGlyphFile():
    data = json.loads(str(request.data, encoding='utf-8'))
    level = data['level']
    raw_logs = data['raw_logs']
    #some api to pull all those log files which takes in study and level
    player_traces = {}
    board_snapshot_ticks = "No Ticks Available"
    for player in raw_logs:
        print(player)
        user = player
        board_state = {}
        
        board_snapshot_ticks = "No Ticks Available"
        data = raw_logs[user]
        print(data['events'])
        for index,event in enumerate(data['events']):                
            if event['type']=="BEGIN_LEVEL_LOAD":
                board_state = {}
        
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
                    
                print('[INFO] Element Added',element_id)
                
                                    
            if event['type'] == 'MOVE_ELEMENT':
                element_id   = event['element']['id']  #element id
                new_x = event['element']['cell'][0] #x
                new_y = event['element']['cell'][1] #y
                
                #update to new coordinates
                board_state[element_id]['element_x']=new_x
                board_state[element_id]['element_y']=new_y
                
                print('[INFO] Element Moved',element_id)

            if event['type'] == 'TOGGLE_ELEMENT':
                element_id   = event['element']['id']  #element id
                board_state[element_id]['status']=event['element']['spec']
                print('[INFO] Element Toggled',element_id)

            if event['type'] == 'REMOVE_ELEMENT':
                element_id = event['element']['id']         
                board_state.pop(element_id)
                print('[INFO] Element Removed',element_id)            

                for item in board_state:
                    if board_state[item]['type']=='signal':
                        try:
                            if board_state[item]['link']==element_id:
                                board_state[item]['link']=None
                                print(f'[INFO] Element Link Removed {element_id} and {item}',)            

                        except:
                            pass
                            
                
                #CALL SCREENSHOT
                
            if event['type'] == 'BEGIN_LINK':
                print('[INFO] Adding a Link')
                element_1_id = event['element']['id']
                print('[INFO] Adding a Link',element_1_id)
                if data['events'][index+1]['type']=='FINISH_LINK':
                    element_2_id = data['events'][index+1]['element']['id']
                    print(element_2_id)
                else:
                    print('[ERROR] Could Not find Finish Link!')
                    print('[INFO] Either CODE needs fix or the log file is corrupted')
                    
                board_state[element_1_id]['link']=element_2_id

            
            if event['type'] == 'FINISH_SIMULATION':
                board_snapshot_ticks = event['total']
            
            if event['type']=='BOARD_SNAPSHOT':
                pass
            

            
            if event['type']=='BOARD_SNAPSHOT':                   
                if user in player_traces:
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":buildAbstraction(level,board_state),
                        "discussion":[],
                        "upvotes":0,
                        "created": event['created'],
                        "submission_result" : getStatus(data,event['id']),
                        "ticks":board_snapshot_ticks
                    }
                else:
                    player_traces[user]={}
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":buildAbstraction(level,board_state),
                        "discussion":[],
                        "upvotes":0,
                        "created":event['created'],
                        "submission_result" : getStatus(data,event['id']),
                        "ticks":board_snapshot_ticks

                    }
            
                board_snapshot_ticks = "No Ticks Available"


    # #BUILD GLYPH Visualization
    print('[INFO] Building Glyph Visualization')
    userStates = {}
    userActions = {}
    usermap = {}
     
    for player in player_traces:
        board_snapshot_abstractions = []
        for event in player_traces[player]:
            if player_traces[player][event]['type']=='BOARD_SNAPSHOT':
                board_snapshot_abstractions.append(player_traces[player][event]["abstracted_board_state"])
        
        userStates[f"{player}.json"]=board_snapshot_abstractions
        userActions[f"{player}.json"]=["Recieved Next State"]*(len(userStates[f"{player}.json"])-1 )     
        userboardids=get_board_ids(raw_logs) 

    
    for user in raw_logs:
        usermap[user+'.json']=user+'.json'
    print(userStates,userActions,usermap,userboardids)
    glyphBuilder = GlyphBuilder(userStates, userActions, userboardids,usermap)
    glyph_vis = glyphBuilder.run()
    
    print(player_traces)
    print('[INFO] GLYPH Visualizatoin Built and saved')
    return {"glyph_vis":glyph_vis, "player_traces":player_traces}








@app.route('/getSimillar')
def getSimillar():
    data = json.loads(str(request.data, encoding='utf-8'))
    player_1 = data['id']
    data     = getPlayerTrace_internal(data)
    data     = data['events']
    #REPLACE with API from Dev Team-->
    #let us start with give me the last 10 players this week
    fileName = "../../trace_13_knowledge.json"
    other_players = json.load(open(fileName))

    output = {}

    output[player_1]={}
    for player_2 in other_players: #choose all other player
        output[player_1][player_2]={}
        for player_1_event in data[player_1]: #choose one event of first player
            if data[player_1][player_1_event]["type"]=="BOARD_SNAPSHOT":
                output[player_1][player_2][player_1_event]={}
                for player_2_event in other_players[player_2]:  #choose all other player events
                    if other_players[player_2][player_2_event]["type"]=="BOARD_SNAPSHOT":
                        matrix_1 = data[player_1][player_1_event]['state_matrix']
                        matrix_2 = other_players[player_2][player_2_event]['state_matrix']
                        matrix_1 = np.array(matrix_1).flatten()
                        matrix_2 = np.array(matrix_2).flatten()
                        consine_similarity =  cosine(matrix_1,matrix_2)
                        print(consine_similarity,type(consine_similarity))
                        if consine_similarity=="x":
                            pass
                        elif consine_similarity>0.3:
                            output[player_1][player_2][player_1_event][player_2_event]=consine_similarity

    return {"simillarity":output}

    
    


@app.route('/')
def hello_world():
    return 'Hello World'
  
if __name__ == '__main__':  
    app.run(debug=True)
