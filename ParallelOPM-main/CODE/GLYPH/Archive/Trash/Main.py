import os
import json
import copy 
from BuildGlyph import *
from BuildScreenshots import *


DATADIR = './OriginData'
MAPINFOFILE = 'MapInfo.json'
SCREENSHOTDIR = './Screenshots'
ACTIONS = [
    # 'Check Goal',
    'Stop Test',
    'Stop Submission',
    'Test Passed', 
    'Test Failed',
    'Submission Failed',
    'Submission Passed',
    # 'View Arrow Path',
    # 'Pause Simulation',
    'Link Signal and Semaphore',
    'View Help',
    # 'Check Relationship signal',
    # 'Check Relationship semaphore',
    'Place signal', 
    'Place semaphore',
    'Move signal',
    'Move semaphore',
    'Destroyed signal',
    'Destroyed semaphore',
    'Toggle Semaphore'
]

def getOrders():
    folders = os.listdir(DATADIR)
    orders = []
    for folder in folders:
        if folder == '.DS_Store':
            continue
        # print(folder)
        order = int(folder[-2:])
        orders.append(order)
    # print(orders)
    return orders

def getUsers(order):
    foldername = ''
    if order < 10:
        foldername = f'order0{order}'
    else:
        foldername = f'order{order}'
    users = os.listdir(os.path.join(DATADIR, foldername))
    if '.DS_Store' in users:
        users.remove('.DS_Store')
    return users

def getPath(order, user):
    foldername = ''
    if order < 10:
        foldername = f'order0{order}'
    else:
        foldername = f'order{order}'
    folder = os.path.join(DATADIR, foldername)
    path = os.path.join(folder, user)
    return path

def filterHighlighting(events):
    res = []
    index = -1
    num = 0
    for event in events:
        if event['type'] == 'HIGHLIGHT_TRACK':
            num += 1
            if index != event['index']:
                res.append(event)
                index = event['index']
        else:
            index = -1
            res.append(event)
    # print(num)
    return res

def filterSimulation(events):
    res = []
    omitFlag = False
    for event in events:
        if event['type'] == 'SET_REFLECTION_CONTENT':
            res.append(event)
            omitFlag = True
        if event['type'] == 'STOP_SIMULATION':
            omitFlag = False
        if event['type'] == 'SKIP_SIMULATION':
            res.append(event)
        if event['type'] == 'BOARD_SNAPSHOT':
            omitFlag = False
        if omitFlag:
            continue
        else:
            res.append(event)
    # print(num)
    return res

def getPlayData(path):
    data = []
    with open(path) as f:
        rawData = f.read()
        data = json.loads(rawData)
    events = data['events']
    playerActions = []
    finishMapGenerated = False
    for event in events:
        if finishMapGenerated:
            playerActions.append(event)
        if event['type'] == 'FINISH_LEVEL_LOAD':
            finishMapGenerated = True
    
    #filter the data 
    playerActionsWithoutDupHighlight = filterHighlighting(playerActions)
    playerActionsfilteredSimulation = filterSimulation(playerActionsWithoutDupHighlight)
    # for action in playerActionsfilteredSimulation:
    #     print(action['type'])
    # print(len(playerActions))
    # print(playerActionsWithoutDupHighlight)
    return playerActionsfilteredSimulation

def getMapInfoFromFile(order):
    data = {}
    with open(MAPINFOFILE) as f:
        line = f.read()
        data = json.loads(line)
    mapInfo = data[str(order)]
    return mapInfo
    # print(mapInfo)

def generateInitState(order, mapInfo):
    # print(mapInfo)
    areas = mapInfo['mapAreas']
    state = {}
    for area in areas:
        state[area] = []
    initState = {}
    initState['states'] = state
    initState['elements'] = {}
    initState['links'] = []
    return initState

def generateActions(playDatas, mapInfo):
    actions = []
    linkEvent = []
    skip = 0
    for event in playDatas:
        if event['type'] == 'SET_REFLECTION_CONTENT':
            simType = event['content']['simType']
            status = event['content']['status']
        
        if event['type'] == 'STOP_SIMULATION':
            if simType == 'TEST':
                if status == 'failure':
                    actions.append('Stop Failed Test')
                elif status == 'success':
                    actions.append('Stop Passed Test')
            elif simType == 'SUBMIT':
                if status == 'failure':
                    actions.append('Stop Failed Submission')
                elif status == 'success':
                    actions.append('Stop Passed Submission')

        if event['type'] == 'SKIP_SIMULATION':
            skip = 2
            if simType == 'TEST':
                if status == 'failure':
                    actions.append('Skip Failed Test')
                elif status == 'success':
                    actions.append('Skip Passed Test')
            elif simType == 'SUBMIT':
                if status == 'failure':
                    actions.append('Skip Failed Submission')
                elif status == 'success':
                    actions.append('Skip Passed Submission')

        if event['type'] == 'BOARD_SNAPSHOT':
            if skip != 0:
                skip -= 1 
                continue
            if simType == 'TEST':
                if status == 'failure':
                    actions.append('Test Failed')
                elif status == 'success':
                    actions.append('Test Passed')
            elif simType == 'SUBMIT':
                if status == 'failure':
                    actions.append('Submission Failed')
                elif status == 'success':
                    actions.append('Submission Passed')
        
        if event['type'] == 'ADD_ELEMENT':
            if event['element']['type'] == 'semaphore':
                location = str(event['element']['cell']).replace(" ", "")
                area = findAreaFromLocation(event['element']['cell'], mapInfo)
                actions.append(f'Place semaphore on {area}:{location}')
            if event['element']['type'] == 'signal':
                location = str(event['element']['cell']).replace(" ", "")
                area = findAreaFromLocation(event['element']['cell'], mapInfo)
                actions.append(f'Place signal on {area}:{location}')

        # if event['type'] == 'HIGHLIGHT_TRACK':
        #     thread = event['index']
        #     actions.append(f'View Help on thread {thread}')

        if event['type'] == 'BEGIN_LINK':
            if len(linkEvent) != 0:
                linkEvent = []
            linkEvent.append(event)
        
        if event['type'] == 'FINISH_LINK':
            linkEvent.append(event)

        if len(linkEvent) == 2:
            location1 = str(linkEvent[0]['element']['cell']).replace(" ","")
            location2 = str(linkEvent[1]['element']['cell']).replace(" ","")
            area1 = findAreaFromLocation(linkEvent[0]['element']['cell'], mapInfo)
            area2 = findAreaFromLocation(linkEvent[1]['element']['cell'], mapInfo)
            actions.append(f'Link {area1}:{location1} and {area2}:{location2}')
            linkEvent = []

        if event['type'] == 'TOGGLE_ELEMENT':
            location = str(event['element']['cell']).replace(" ","")
            area = findAreaFromLocation(event['element']['cell'], mapInfo)
            status = event['element']['spec']
            element = event['element']['type']
            actions.append(f'Toggle {element} on {area}:{location} to {status}')
        

        #Need to do: remove element
        if event['type'] == 'REMOVE_ELEMENT':
            location = str(event['startCell']).replace(" ","")
            area = findAreaFromLocation(event['startCell'], mapInfo)
            element = event['element']['type']
            actions.append(f'Remove {element} on {area}:{location}')

        # Need to do: move element 
        if event['type'] == 'MOVE_ELEMENT':
            startLocation = str(event['startCell']).replace(" ","")
            endLocation = str(event['element']['cell']).replace(" ","")
            startArea = findAreaFromLocation(event['startCell'], mapInfo)
            endArea = findAreaFromLocation(event['element']['cell'], mapInfo)
            element = event['element']['type']
            actions.append(f'Move {element} from {startArea}:{startLocation} to {endArea}:{endLocation}')

    return actions

def getLocationFromStringList(stringList):
    location = stringList.split(':')[1]
    num1 = int(location[1:-1].split(',')[0])
    num2 = int(location[1:-1].split(',')[1])
    return [num1, num2]

def findAreaFromLocation(location, mapInfo):
    areas = mapInfo['mapAreas']
    for area in areas:
        if location in mapInfo['mapAreas'][area]:
            return area
    # print(location, mapInfo['mapAreas'])

    # need to do: recognize default element and intersection. 
    print(f'Something wrong, the location of {location} is not in the mapInfo!')
    exit(0)

def findNameByLocation(elements, location):
    for elementName in elements:
        if elements[elementName]['location'] == location:
            return elementName
    # print(elements)
    # print(location)
    print(f'Something wrong, there is nothing on {location}!')
    exit(0)

def linkReplacement(links, startLocation, endLocation):
    for link in links:
        if link[0] == startLocation:
            link[0] = endLocation
        if link[1] == startLocation:
            link[1] = endLocation

def linkDeleteExistLocation(links, location):  
    for link in links:
        if link[0] == location or link[1] == location:
            links.remove(link)

def stateAreaDeleteExistName(states, elementName):
    for area in states:
        if elementName in states[area]:
            states[area].remove(elementName)

def stateAreaMove(states, startArea, endArea, elementName):
    # print(states, startArea, endArea, elementName)
    states[startArea].remove(elementName)
    states[endArea].append(elementName)

def generateStateInfo(initialState,actions, mapInfo):
    states = []
    states.append(initialState)
    lastState = copy.deepcopy(initialState)

    signalCounter = 0   #for naming, always increasing
    semaphoreCounter = 0    #for naming, always increasing

    for action in actions:
        # print(action)
        # Actions that does not change state
        if action == 'Test Failed':
            states.append(copy.deepcopy(lastState))
        if action == 'Submission Failed':
            states.append(copy.deepcopy(lastState))
        if action == 'Test Passed':
            states.append(copy.deepcopy(lastState))
        if action == 'Submission Passed':
            states.append(copy.deepcopy(lastState))
        if action.startswith('Stop'):
            states.append(copy.deepcopy(lastState))
        if action.startswith('Skip'):
            states.append(copy.deepcopy(lastState))
        # if action.startswith('View Help'):
        #     states.append(copy.deepcopy(lastState))

        # Place new element
        if action.startswith('Place'):
            element = action.split(' ')[1]
            location = getLocationFromStringList(action.split(' ')[3])
            nameOfElement = ''
            if element == 'semaphore':
                semaphoreCounter += 1
                nameOfElement = f'sem{semaphoreCounter}'
            elif element == 'signal':
                signalCounter += 1
                nameOfElement = f'sig{signalCounter}'
            area = findAreaFromLocation(location, mapInfo)
            elementDetail = {}
            elementDetail['location'] = location
            elementDetail['status'] = 'inactive'
            lastState['elements'][nameOfElement] = elementDetail
            lastState['states'][area].append(nameOfElement)
            states.append(copy.deepcopy(lastState))

        # link action
        if action.startswith('Link'):
            location1 = getLocationFromStringList(action.split(' ')[1])
            location2 = getLocationFromStringList(action.split(' ')[3])
            lastState['links'].append([location1,location2])
            states.append(copy.deepcopy(lastState))

        # toggle action
        if action.startswith('Toggle'):
            location = getLocationFromStringList(action.split(' ')[3])
            status = action.split(' ')[5]
            elementName = findNameByLocation(lastState['elements'], location)
            lastState['elements'][elementName]['status'] = status
            states.append(copy.deepcopy(lastState))

        # move action
        if action.startswith('Move'):
            startLocation = getLocationFromStringList(action.split(' ')[3])
            endLocation = getLocationFromStringList(action.split(' ')[5])
            startArea = findAreaFromLocation(startLocation, mapInfo)
            endArea = findAreaFromLocation(endLocation, mapInfo)
            elementName = findNameByLocation(lastState['elements'], startLocation)
            lastState['elements'][elementName]['location'] = endLocation
            linkReplacement(lastState['links'], startLocation, endLocation)
            stateAreaMove(lastState['states'], startArea, endArea, elementName)
            states.append(copy.deepcopy(lastState))

        # remove action
        if action.startswith('Remove'):
            location = getLocationFromStringList(action.split(' ')[3])
            elementName = findNameByLocation(lastState['elements'], location)
            lastState['elements'].pop(elementName, None)
            linkDeleteExistLocation(lastState['links'], location)
            stateAreaDeleteExistName(lastState['states'], elementName)
            states.append(copy.deepcopy(lastState))
        

    return states


def generateStates(order, playData, mapInfo):
    initialState = generateInitState(order, mapInfo)
    # print(initialState)
    actions = generateActions(playData, mapInfo)
    # for event in playData:
        # print(event['type'])
    # print(actions)
    states = generateStateInfo(initialState,actions, mapInfo)
    # print(states[11])
    return actions, states
    # return 1

def main():
    orders = getOrders()
    userStates = {}
    userActions = {}
    for order in orders:
        # print(order)
        mapInfo = getMapInfoFromFile(order)
        users = getUsers(order)
        userStates = {}
        # print(users)
        for user in users:
            if user == 'order04':
                continue
            # if user != "c057d16f-023e-491d-baee-371e5081939a.json" and user != "81dc330b-4077-494b-91b3-fc8cc4fe2604.json":
            #     continue
            # print(user)
            path = getPath(order, user)
            # print(path)
            playData = getPlayData(path)
            actions, states = generateStates(order, playData, mapInfo)
            userStates[user] = states
            userActions[user] = actions
            
            
            print(userStates)
            print("----------{*******************}--------")
            print(userActions)
            # screenshotBuilder = ScreenshotBuilder(order, user, states, actions)

            
        glyphBuilder = GlyphBuilder(userStates, userActions, f'level{order}.json')
        glyphBuilder.run()


if __name__ == "__main__":
    main()
    # a = '[1,2]'
    # a = a[1:-1]
    # x = a.split(',')[0]
    # y = a.split(',')[1]
    # print(a)
    # print(x,y)