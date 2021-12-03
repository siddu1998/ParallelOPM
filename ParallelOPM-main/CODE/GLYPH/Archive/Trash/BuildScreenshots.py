from PIL import Image, ImageDraw, ImageFont
from sys import exit
import json
import os

SCREENSHOTDATADIR = './ScreenshotData'
MAPINFOFILE = 'MapInfo.json'
RESULTDIR = './Screenshots'
USERMAP = {'6c48747a-8c8c-43c5-8c7e-ff80f281b508.json': '8', 
            "c057d16f-023e-491d-baee-371e5081939a.json": '2',
            "03021ea9-78a2-434d-adc0-b9fd063d4291.json": '9', 
            "f5d99f4b-d52e-412b-8111-54cbbafffcfb.json": '4',
            "81dc330b-4077-494b-91b3-fc8cc4fe2604.json": '6',
            '8bbeff9b-9e06-4993-b919-c9cd59a77f16.json':'101',
            'ae26b920-1410-437f-bcba-c481ec3098f0.json':'102'}

class ScreenshotBuilder:

    def __init__(self, order, user, states, actions):
        self.counter = 0

        self.buildFolder(USERMAP[user])
        self.getMapInfo(order)
        self.getInitialScreenshot(order)
        self.buildScreenshot(states, actions)
        
    def buildFolder(self, user):
        folders = os.listdir(RESULTDIR)
        if user in folders:
            print(f'user {user} exist in {RESULTDIR}! Please delete the {user} folder!')
            exit(0)
        self.savePath = os.path.join(RESULTDIR, user)
        os.mkdir(self.savePath)
        
    def getMapInfo(self, order):
        data = {}
        with open(MAPINFOFILE) as f:
            line = f.read()
            data = json.loads(line)
        self.mapInfo = data[str(order)]
    
    def getInitialScreenshot(self, order):
        self.initialPath = os.path.join(SCREENSHOTDATADIR, f'order{order}.png')
        image = Image.open(self.initialPath)
        savePath = os.path.join(self.savePath, f'{self.counter}.jpg')
        image.save(savePath, quality=95)
        self.counter += 1
    
    def getLocation(self, locationString):
        location1 = int(locationString[1:-1].split(',')[0])
        location2 = int(locationString[1:-1].split(',')[1])
        return location1, location2

    def drawSemaphore(self, preImage, element):
        # print(element)
        location = element['location']
        # print(location)
        status = element['status']
        if status == 'active':
            semaphore = Image.open('./ScreenshotData/semaphoreActive.png','r')
            preImage.paste(semaphore, (location[1]*100, location[0]*100), mask=semaphore)
        else: 
            semaphore = Image.open('./ScreenshotData/semaphoreInactive.png','r')
            preImage.paste(semaphore, (location[1]*100, location[0]*100), mask=semaphore)
        
    
    def drawSignal(self, preImage, element):
        location = element['location']
        # print(location)
        status = element['status']
        if status == 'active':
            semaphore = Image.open('./ScreenshotData/signalActive.png','r')
            preImage.paste(semaphore, (location[1]*100, location[0]*100), mask=semaphore)
        else: 
            semaphore = Image.open('./ScreenshotData/signalInactive.png','r')
            preImage.paste(semaphore, (location[1]*100, location[0]*100), mask=semaphore)
    
    def drawLink(self, preImage,link):
        location0 = link[0]
        location1 = link[1]
        draw = ImageDraw.Draw(preImage)
        draw.line((location0[1]*100+50, location0[0]*100+50, location1[1]*100+50, location1[0]*100+50), width = 5, fill='yellow')

    def drawActionText(self, preImage, text):
        width, height = preImage.size
        draw = ImageDraw.Draw(preImage)
        font = ImageFont.truetype("~/Library/Fonts/Arial Black.ttf", size=30)
        draw.text((0,height-100), text, fill=(0,0,0), font=font)

    def buildScreenshot(self, states, actions):
        # print(states)
        actionCounter = 0
        for state in states:
            # print(state)
            preImage = Image.open(self.initialPath)
            elements = state['elements']
            links = state['links']
            for element in elements:
                if element.startswith('sem'):
                    self.drawSemaphore(preImage, elements[element])
                if element.startswith('sig'):
                    self.drawSignal(preImage, elements[element])
            for link in links:
                self.drawLink(preImage, link)
            if actionCounter < len(actions):
                self.drawActionText(preImage, actions[actionCounter])
            if actionCounter == len(actions):
                self.drawActionText(preImage, 'End Game')
            savePath = os.path.join(self.savePath, f'{self.counter}.jpg')
            preImage.save(savePath, quality=95)
            self.counter += 1
            actionCounter += 1

if __name__ == "__main__":
    # preScreenshotPath = os.path.join(self.savePath, f'{self.counter - 1}.jpg')
    preImage = Image.open('./Screenshots/fc05b4cf-5514-4849-bb85-c3920fe48c36.json/0.jpg')
    # semephorePath = os.path.join(SCREENSHOTDATADIR, 'semaphoreInactive.png')
    semaphore = Image.open('./ScreenshotData/semaphoreInactive.png','r')
    preImage.paste(semaphore, (100, 100), mask=semaphore)
    preImage.save('test.jpg',quality=95)

# im1 = Image.open('pillow_imagedraw.jpg')
# im2 = Image.open('conditionalEmpty.png')

# back_im = im1.copy()
# back_im.paste(im2)
# back_im.save('paste.jpg', quality=95)

# im = Image.new('RGB', (100, 100), (98, 129, 132))
# draw = ImageDraw.Draw(im)
# draw.line((35,50,100,50), fill=(0, 0, 0), width=30)
# draw.line((50,0,50,65), fill=(0, 0, 0), width=30)

# im.save('empty.jpg', quality=95)



