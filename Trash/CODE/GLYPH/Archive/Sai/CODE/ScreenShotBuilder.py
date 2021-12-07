from PIL import Image, ImageDraw, ImageFont
from sys import exit
import json
import os
# from itertools import cycle

SCREENSHOT_BLOCKS = '../DATA/ScreenshotData'


class ScreenShot:
    def __init__(self,level,destination):
        self.preImage = Image.open(f'{SCREENSHOT_BLOCKS}/order{level}.png')
        self.destination = destination
        self.font = ImageFont.truetype("Roboto-Bold.ttf",size=45)
        self.text_color =  'rgb(255, 255, 255)' 

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

    def drawText(self,text):
        (x, y) = (500, 850)
        draw = ImageDraw.Draw(self.preImage)
        draw.text((x, y), text, fill=self.text_color,font=self.font)


    def saveImage(self):
        #self.preImage.resize((200,200), Image.ANTIALIAS)
        self.preImage.save(self.destination, quality=95)


