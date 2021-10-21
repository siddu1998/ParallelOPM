from flask import Flask, request
import json
from snapshot_status import getStatus
from getBoardID import get_board_ids
from BuildNewGlyph import *

app = Flask(__name__)

CRITICAL_EVENTS=[
    "BEGIN_LEVEL_LOAD",
    'ADD_ELEMENT',
    'MOVE_ELEMENT',
    'TOGGLE_ELEMENT',
    'REMOVE_ELEMENT',
    'BEGIN_LINK',
]


default_elements = {"13":{"L_dragonfruit_5001":(4,12)}}



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
        
        zone  = self.getZone(x,y)
        if zone in self.signal_zone_dict:
            self.signal_zone_dict[zone]+=1
        else:
            self.signal_zone_dict[zone]=1
        print(f'[INFO] adding {id_1} to signal positions')
        self.signalPositions.append((id_1,x,y,zone))
        self.nSignals+=1
        #populate link dict
        (connection_x,connection_y) = self.getSemaphoreXY(id_2)
        if connection_x!=None:
            key  = zone + self.getZone(connection_x,connection_y)
            if key in self.link_dict:
                self.link_dict[key]+=1
            else:
                self.link_dict[key]=1
            self.linkPositions.append([x,y,connection_x,connection_y])
        else:
            print('[INFO] This signal could not find a semaphore!')
            print('[INFO] This could be a link between a signal and a Default element!')
            print('[INFO] Attempting to search in default elements')
            if id_2!=None:
                (connection_x,connection_y) = default_elements[str(self.level)][id_2]
                if connection_x!=None:
                    key  = zone + self.getZone(connection_x,connection_y)
                    if key in self.link_dict:
                        self.link_dict[key]+=1
                    else:
                        self.link_dict[key]=1
                    self.linkPositions.append([x,y,connection_x,connection_y])
                else:
                    pass 
                    
    #returns which zone a point belongs to 
    def getZone(self,x,y):
        query = [x,y]
        for zone in self.zones:
            if query in self.zones[zone]:
                return zone 
        return None
    def getAbstraction(self):
        abstraction = {
            'nSemaphores'     : self.nSemaphores,
            'nSignals'        : self.nSignals,
            'semaphore_zone_dict':self.semaphore_zone_dict,
            'signal_zone_dict':self.signal_zone_dict,
            'link_dict':self.link_dict,
        }
        return abstraction


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

    return abstraction.getAbstraction()       

"""
Parameters Required  : Raw log file of user
Response : Abstracted Board State at all points and ticks    
"""
@app.route('/getPlayerTrace')
def getPlayerTrace():
    data = json.loads(str(request.data, encoding='utf-8'))
    user = data['id']
    level = data['events'][0]['order']
    player_traces = {}
    board_snapshot_ticks = "No Ticks Available"
    for index,event in enumerate(data['events']):    
        print(event['type'])
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
            #CALL SCREENSHOT on board_state

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
        
       
        #Calling Abstraction
        if event['type'] in CRITICAL_EVENTS:                   
            if user in player_traces:
                player_traces[user][event['id']]={
                    "id":event['id'],
                    "type":event['type'],
                    "screenshot":f"{index}_{event['id']}.png",
                    "absolute_board_state":board_state.copy(),
                    "abstracted_board_state":buildAbstraction(level,board_state),
                    "discussion":[],
                    "upvotes":0,
                    "created": event['created']
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
                    "created":event['created']
                }
        
        if event['type']=='BOARD_SNAPSHOT':                   
            if user in player_traces:
                player_traces[user][event['id']]={
                    "id":event['id'],
                    "type":event['type'],
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
                    "absolute_board_state":board_state.copy(),
                    "abstracted_board_state":buildAbstraction(level,board_state),
                    "discussion":[],
                    "upvotes":0,
                    "created":event['created'],
                    "submission_result" : getStatus(data,event['id']),
                    "ticks":board_snapshot_ticks

                }
        
            board_snapshot_ticks = "No Ticks Available"

    return player_traces



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
            
            #Calling Abstraction
            if event['type'] in CRITICAL_EVENTS:                   
                if user in player_traces:
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":buildAbstraction(level,board_state),
                        "discussion":[],
                        "upvotes":0,
                        "created": event['created']
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
                        "created":event['created']
                    }
            
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
                        "submission_result" : getStatus(raw_logs[user],event['id']),
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
                        "submission_result" : getStatus(raw_logs[user],event['id']),
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

    
    
    
    


@app.route('/')
def hello_world():
    return 'Hello World'
  
if __name__ == '__main__':  
    app.run(debug=True)
    app.config['JSON_SORT_KEYS'] = False