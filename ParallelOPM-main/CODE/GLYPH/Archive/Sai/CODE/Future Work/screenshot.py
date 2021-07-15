import json
from ScreenShotBuilder import *;
import datetime
from snapshot_status import getStatus

class GameStateForSS:
    def __init__(self,level,zoneSheet,user,board_snapshot_id,isSolution=False):
        
        self.user = user
        self.board_snapshot_id = board_snapshot_id

        self.screenshot_destination = f'../DATA/Screenshots/{self.user}/{self.board_snapshot_id}.png'.replace(' ','_')
        self.screenshot = ScreenShot(level,self.screenshot_destination)

        
        self.text              = getStatus(self.board_snapshot_id,f"{self.user}"+".json")        
        
        #Load Game Properties
        self.level = str(level)
        self.zoneSheet = zoneSheet
        self.level_info      = json.load(open(self.zoneSheet))
                
        self.zones         = self.level_info[self.level]['mapAreas']        

        self.index         = 0
        self.indexMap      = {}
        
        #is this state the soltion (False by default)
        # self.isSolution = isSolution
        
        #cordinates
        self.semaphorePositions = [] #(id,x,y,zone)  
        
             
        #abstraction2
        
        for zone in self.zones:
            self.indexMap[zone]=self.index
            self.index+=1
        
        # self.adjaceny_matrix = [[0 for j in range(len(self.zones))] for i in range(len(self.zones)) ]  
        
        
    def getSemaphoreXY(self,id):
        print(self.semaphorePositions)
        for semaphore in self.semaphorePositions:
            if semaphore[0]==id:
                return (semaphore[1],semaphore[2]) 
        return None
    
    #place a signal or semaphore
    def putSemaphore(self,x,y,id):
        zone  = self.getZone(x,y)
        self.screenshot.drawSemaphore(x,y)
        self.semaphorePositions.append((id,x,y,zone))


    def putSignal(self,x,y,id_1,id_2):
        print(f'[INFO] Trying to put Signal at {x},{y} for {id_1}')
        print(f'[INFO] Putting a Link Between {id_1},{id_2}')
        #populate link dict
        (connection_x,connection_y) = self.getSemaphoreXY(id_2)
        if connection_x!=None:
            self.screenshot.drawSignal(x,y)
            self.screenshot.drawLink(x,y,connection_x,connection_y)
        else:
            print(id_1,id_2)
            print('[INFO] HAVE A SIGNAL BUT NO CONNECTIONNNNNN!!!!!##################')


    #returns which zone a point belongs to 
    def getZone(self,x,y):
        query = [x,y]
        
        for zone in self.zones:
            if query in self.zones[zone]:
                return zone 

        
        print('[WARNING] This Point does not belong to any Marked Zone')
        return None
      
    
    def getScreenshots(self):
        self.screenshot.drawText(self.text)
        self.screenshot.saveImage()
   
    