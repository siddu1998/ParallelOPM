from PIL import Image, ImageDraw, ImageFont
from sys import exit
import json
import os
# from itertools import cycle

SCREENSHOT_BLOCKS = '../DATA/ScreenshotData'

def getStatus(id,filename):
    text=""
    fileName = f'../DATA/DDRI_STUDY_LOGS/{filename}.json'
    try:
        data = json.load(open(fileName))
        print("File loaded successfully")
    except:
        print('error')
        exit()
    found=0
    for index in range(len(data['events'])):
        if(data['events'][index]['type']=="BOARD_SNAPSHOT" and data['events'][index]["id"]==id):
            for i in range(index,len(data['events'])):
                if data['events'][i]["type"]=="SET_REFLECTION_CONTENT":
                    text=text+str(data['events'][i]['content']['status'])+"/"+str(data['events'][i]['content']['simType'])
                    found=1
                    break
                if found==1:
                    break
        if found==1:
            break 
    
    # for event in data['events']:
    #     if event["type"]=="BOARD_SNAPSHOT" and event['id']==id:
    #         event1=event
    #         print(event[0])
    #         eventcycle = cycle(event)
    #         while(event1["type"]!="SHOW_MESSAGE"):
    #             if event1["type"]=="SET_REFLECTION_CONTENT":
    #                 text=text+str(event1['content']['status'])+"/"+str(event1['content']['simType'])
    #                 found=1
    #                 break
    #             if found==1:
    #                 break
    #             event1=data[event1.index(event1)+1]
    #     if found==1:
    #         break
    if found==0:
        text="Does not exist"
    return text

class ScreenShot:
    def __init__(self,level,destination):
        self.preImage = Image.open(f'{SCREENSHOT_BLOCKS}/order{level}.png')
        self.destination = destination
    def drawSemaphore(self,x,y):
        location = [x,y]
        semaphore = Image.open('../DATA/ScreenshotData/semaphoreInactive.png','r')
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

    # edited
    # here consider id as board state id

    def drawStatus(self,id,filename):
        text = getStatus(id,filename)
        font = ImageFont.truetype("Roboto-Bold.ttf",size=45)
        (x, y) = (500, 850)
        color = 'rgb(255, 255, 255)' 
        draw = ImageDraw.Draw(self.preImage)
        draw.text((x, y), text, fill=color,font=font)


    def saveImage(self):
        #self.preImage.resize((200,200), Image.ANTIALIAS)
        self.preImage.save(self.destination, quality=95)


# uncommented for testing
screenshot = ScreenShot(5,'test.png')
screenshot.drawSemaphore(100,100)
screenshot.drawSemaphore(0,1)
screenshot.drawSignal(3,3)
screenshot.drawStatus("86638d5a-050a-404b-82db-1db04836b4a2","2e07ba3c-51be-498f-815a-768f3b7cb7e1")
screenshot.saveImage()

