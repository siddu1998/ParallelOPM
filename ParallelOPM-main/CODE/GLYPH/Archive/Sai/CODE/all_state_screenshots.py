import os 
import json
from PIL import Image, ImageDraw, ImageFont
from sys import exit
from snapshot_status import getStatus
from getBoardID import get_board_ids
import gif_builder
import player_statistics
from BuildNewGlyph import *



SCREENSHOT_BLOCKS = '../DATA/ScreenshotData'
log_files = "../DATA/DDRI_STUDY_LOGS"
level = 5


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
                    self.drawLink(
                        self.board_state[item]["element_x"],
                        self.board_state[item]["element_y"], 
                        self.board_state[link_id]["element_x"],
                        self.board_state[link_id]["element_y"],

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
    def getSemaphoreXY(self,id):
        if id==None:
            return (None,None)
        
        for semaphore in self.semaphorePositions:
            if semaphore[0]==id:
                return (semaphore[1],semaphore[2]) 
        return None
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
        
        
CRITICAL_EVENTS=[
    "BEGIN_LEVEL_LOAD",
    'ADD_ELEMENT',
    'MOVE_ELEMENT',
    'TOGGLE_ELEMENT',
    'REMOVE_ELEMENT',
    'BEGIN_LINK',
    'BOARD_SNAPSHOT'
]
player_traces = {}

for file in os.listdir(log_files):
    user = file.split('.')[0]
    fileName = log_files+'/'+file
    board_state = {}
    os.mkdir(f'../DATA/IntermediateScreenShots/{user}')
    os.mkdir(f'../DATA/Screenshots/{user}')
    
    data = json.load(open(fileName))
    for index,event in enumerate(data['events']):    
        
        if event['type']=="BEGIN_LEVEL_LOAD":
            board_state = {}
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
                
            print('[INFO] Element Added',element_id)
            
            #CALL SCREEENSHOT on board_state
            stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
            stateShot.buildScreenShot()
                                
        if event['type'] == 'MOVE_ELEMENT':
            element_id   = event['element']['id']  #element id
            new_x = event['element']['cell'][0] #x
            new_y = event['element']['cell'][1] #y
            
            #update to new coordinates
            board_state[element_id]['element_x']=new_x
            board_state[element_id]['element_y']=new_y
            
            print('[INFO] Element Moved',element_id)
            #CALL SCREENSHOT on board_state
            stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
            stateShot.buildScreenShot()

        if event['type'] == 'TOGGLE_ELEMENT':
            element_id   = event['element']['id']  #element id
            board_state[element_id]['status']=event['element']['spec']

            print('[INFO] Element Toggled',element_id)
            #CALL SCREENSHOT on board_state
            stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
            stateShot.buildScreenShot()

        if event['type'] == 'REMOVE_ELEMENT':
            element_id = event['element']['id']         
            board_state.pop(element_id)
            print('[INFO] Element Removed',element_id)            

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
                        
            
            #CALL SCREENSHOT
            stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
            stateShot.buildScreenShot()
               
        if event['type'] == 'BEGIN_LINK':
            # print('[INFO] Adding a Link')
            element_1_id = event['element']['id']
            if data['events'][index+1]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+1]['element']['id']
            else:
                print('[ERROR] Could Not find Finish Link!')
                print('[INFO] Either CODE needs fix or the log file is corrupted')
                
            board_state[element_1_id]['link']=element_2_id
            # print(board_state) 
            #CALL SCREENSHOT
            stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
            stateShot.buildScreenShot()
            
        if event['type']=='BOARD_SNAPSHOT':
            #No element manipulation 
            # so just Build the screenshot
            text  = getStatus(event['id'],f"{user}"+".json")        
            stateShot = StateShot(board_state,f"{index}_{event['id']}",text,level,user,event['type']) 
            stateShot.buildScreenShot()
            
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
                

#BUILD GLYPH Visualization
print('[INFO] Building Glyph Visualization')

userStates = {}
userActions = {} 
for player in player_traces:
    board_snapshot_abstractions = []
    for event in player_traces[player]:
        if player_traces[player][event]['type']=='BOARD_SNAPSHOT':
            board_snapshot_abstractions.append(player_traces[player][event]["abstracted_board_state"])
    
    userStates[f"{player}.json"]=board_snapshot_abstractions
    userActions[f"{player}.json"]=["Recieved Next State"]*(len(userStates[f"{player}.json"])-1 )     
    userboardids=get_board_ids(log_files) 
 
glyphBuilder = GlyphBuilder(userStates, userActions, userboardids, f'level_{level}_sai.json')
glyphBuilder.run()

print('[INFO] GLYPH Visualizatoin Built and saved')


#BUILD GIFs Comment out to ignore
print('[INFO] Building GIFs')
gif_builder.main(level,log_files)
print('[INFO] Finished Building GIFs')

    
#Player Statistics
stats = player_statistics.get_statistics(log_files)

#node image mapper for app.js
# node_image_mapper = screenshot_dict.log('Screenshots')


#SAVING LOG FILES
#1. Trace Data
out_file = open("trace.json", "w") 
json.dump(player_traces, out_file, indent = 6) 
out_file.close() 

#2. Player Statistics
out_file = open("stats.json", "w") 
json.dump(stats, out_file, indent = 6) 
out_file.close() 

# #2. Screenshots 
# out_file = open("node_image_mapper.json", "w") 
# json.dump(node_image_mapper, out_file, indent = 6) 
# out_file.close() 
