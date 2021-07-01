from PIL import Image, ImageDraw, ImageFont
from sys import exit
import json
import os

SCREENSHOT_BLOCKS = '../DATA/ScreenshotData'

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
    def drawStatus(self,id,filename):
        text=""
        fileName = f'../DATA/DDRI_STUDY_LOGS/{filename}.json'

        try:
            data = json.load(open(fileName))
            print("File loaded successfully")
        except:
            print('error')
            exit()

        for event in data['events']:
            if event["type"]=="SET_REFLECTION_CONTENT":
                if event['id']==id:
                    text=text+str(event['content']['status'])+"/"+str(event['content']['simType'])
            #     print("The status is "+str(event['content']['status']))
            #     print("Type of simulation is "+str(event['content']['simType']))
            # print("----------------------------")
        font = ImageFont.truetype("Roboto-Bold.ttf",size=45)
        # font = ImageFont.load("arial.pil")
        (x, y) = (500, 850)
        color = 'rgb(255, 255, 255)' 
        draw = ImageDraw.Draw(self.preImage)
        draw.text((x, y), text, fill=color,font=font)


    def saveImage(self):
        #self.preImage.resize((200,200), Image.ANTIALIAS)
        self.preImage.save(self.destination, quality=95)


# uncommented for testing
# screenshot = ScreenShot(5,'test.png')
# screenshot.drawSemaphore(100,100)
# screenshot.drawSemaphore(0,1)
# screenshot.drawSignal(3,3)
# screenshot.drawStatus("6da6cd8c-c573-4c62-97b3-2214f5adfbae","2e07ba3c-51be-498f-815a-768f3b7cb7e1")
# screenshot.saveImage()

