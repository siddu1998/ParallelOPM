import os 
import json
from PIL import Image, ImageDraw, ImageFont
from sys import exit

SCREENSHOT_BLOCKS = '../DATA/ScreenshotData'
log_files = "../DATA/DDRI_STUDY_LOGS"
level = 5


class StateShot:
    def __init__(self,board_state,fileName,text,level,user):
        self.board_state = board_state
        self.fileName    = fileName
        self.text        = text
        self.level       = level
        self.user       = user  

        self.preImage = Image.open(f'{SCREENSHOT_BLOCKS}/order{self.level}.png')
        self.destination = f'../DATA/IntermediateScreenShots/{self.user}/{fileName}.png'
        self.font = ImageFont.truetype("Roboto-Bold.ttf",size=45)
        self.text_color =  'rgb(255, 255, 255)'
         
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



for file in os.listdir(log_files):
    user = file.split('.')[0]
    fileName = log_files+'/'+file
    board_state = {}
    os.mkdir(f'../DATA/IntermediateScreenShots/{user}')
    
    data = json.load(open(fileName))
    for index,event in enumerate(data['events']):    
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
            stateShot = StateShot(board_state,event['id'],event['type'],level,user) 
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
            stateShot = StateShot(board_state,event['id'],event['type'],level,user) 
            stateShot.buildScreenShot()

        if event['type'] == 'TOGGLE_ELEMENT':
            element_id   = event['element']['id']  #element id
            board_state[element_id]['status']=event['element']['spec']

            print('[INFO] Element Toggled',element_id)
            #CALL SCREENSHOT on board_state
            stateShot = StateShot(board_state,event['id'],event['type'],level,user) 
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
            stateShot = StateShot(board_state,event['id'],event['type'],level,user) 
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
            stateShot = StateShot(board_state,event['id'],event['type'],level,user) 
            stateShot.buildScreenShot()
        
        
        if event['type']=='BOARD_SNAPSHOT':
            #No element manipulation 
            # so just Build the screenshot
            stateShot = StateShot(board_state,event['id'],event['type'],level,user) 
            stateShot.buildScreenShot()
            
        #IGNORING REMOVE_LINK : Since we can not mannually remove a link

        
    print(board_state)






    
