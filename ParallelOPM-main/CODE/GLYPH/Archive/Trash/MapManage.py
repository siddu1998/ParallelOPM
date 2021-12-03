import os
import json
import copy
from sys import exit

DATADIR = "./OriginData"
MAPINFOFILE = "./MapInfo.json"
AREAS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

def checkOrderFiles():
    '''
    Check if the folder arrangement is correct. 
    We expect no files in the DATADIR folder and no folders inside each order folder
    '''
    folders = os.listdir(DATADIR)
    for folder in folders:
        if folder == ".DS_Store":
            continue
        curPath = os.path.join(DATADIR, folder)
        if os.path.isfile(curPath):
            print(f"{folder} is a file. Please guaratee no files in the {DATADIR} folder, or run FileManage.py first!")
            exit(0)
        files = os.listdir(curPath)
        for file in files:
            if file == ".DS_Store":
                continue
            curfile = os.path.join(curPath, file)
            if os.path.isdir(curfile):
                print(f"{curfile} is a folder. Please guaratee no folder in the {curPath} folder, or run FileManage.py first!")
                exit(0)
    print("Files correct!")
    
def getOrders():
    '''
    Get all orders(levels) in the DATADIR folder.
    We use order instead of level because the level are fixed but the order might be different
    For different activities, the orders change.
    '''
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

def getMapInfo():
    '''
    get map information from the MAPINFOFILE.
    mapInfo returned should follow the format as follows:
    {'order number':{'mapArea':{'area':[area coordinates], 
                                'intersection': [intersection coordinates], 
                                'default': [default element coordinate]
                                }
                     'mapImageDetails': {"every coordinate1": { "image": "image file", 
                                                                "layout": "image layout", 
                                                                "orientation": "image orientation"
                                                                }
                                        }
                    }
    } 
    '''
    MapInfoFile = MAPINFOFILE
    mapInfo = {}
    with open(MapInfoFile) as mapFile:
        line = mapFile.read()
        if line != '':
            mapInfo = json.loads(line)
    # print(mapInfo)
    return mapInfo

def filterAvailableCoords(coords, elementCoords, intersectionsCoords):
    '''
    Remove the default element coordinates and intersections coordinates from the coords
    Used for area separation
    '''
    res = copy.copy(coords)
    for elementCoord in elementCoords:
        if elementCoord in res:
            res.remove(elementCoord)
    for intersectionsCoord in intersectionsCoords:
        if intersectionsCoord in res:
            res.remove(intersectionsCoord)
    return res
    
def getRawMapInfo(order):
    '''
    Get Raw Map information from one file from each order(level) folder
    Use the BOARD_SNAPSHOT event in the log file to generate raw map information
    only return routeDatas like {"id": "L_cantaloupe_001005", "layout": "E", "orientation": "n", "directions": [4], "coords": [1, 5], "color": [2], "components": []}), 
                elementDatas like  {"cell": [7, 7], "color": 0, "delivered": 0, "id": "L_cantaloupe_3001", "locked": true, "passed": 0, "spec": "unlimCondition", "type": "delivery", "userPlaced": false, "acceptedTypes": ["unlimCondition"], "acceptedColors": []}
                intersectionDatas same as routeDatas but have a layout G(T like) or O(Cross) 
    
    POTENTIAL PROBELM:
    (1) Only handle order(level) 1 to order(level) 99. Change condition if need more.
    '''
    ordername = ''
    if order < 10:
        ordername = f'order0{str(order)}'
    else:
        ordername = f'order{str(order)}'
    path = os.path.join(DATADIR, ordername)
    files = os.listdir(path)
    tarfile = ''
    for file in files:
        if file != ".DS_Store":
            tarfile = file
            break
    # print('tarfile:', tarfile)
    events = []
    with open(os.path.join(path, tarfile)) as f:
        line = f.read()
        events = json.loads(line)['events']
    
    rawData = {}
    for event in events:
        if event['type'] == "BOARD_SNAPSHOT":
            rawData = event['board']
        if event['type'] == "FINISH_LEVEL_LOAD":
            break
    rawRouteDatas = rawData['map']
    rawElementDatas = rawData['components']
    
    routeDatas = []
    elementDatas = []
    intersectionDatas = []
    for rawRouteDataByLine in rawRouteDatas:
        for rawRouteData in rawRouteDataByLine:
            if rawRouteData['layout'] != None:
                routeDatas.append(rawRouteData)
            if rawRouteData['layout'] == 'G' or rawRouteData['layout'] == 'O':
                intersectionDatas.append(rawRouteData)

    for rawElementData in rawElementDatas:
        elementDatas.append(rawElementDatas[rawElementData])
    return routeDatas, elementDatas, intersectionDatas


def getCoordsFromData(routeDatas, elementDatas, intersectionDatas):
    '''
    from the dictionary data get the coords.
    return mapCoords contains empty coords which is not an intersection, 
            elementCoords contains default element coordinates
            intersectionCoords contains intersection coordinates
    '''
    mapCoords = []
    for routeData in routeDatas:
        mapCoords.append(routeData['coords'])
    elementCoords = []
    for elementData in elementDatas:
        elementCoords.append(elementData['cell'])
    intersectionCoords = []
    for intersectionData in intersectionDatas:
        intersectionCoords.append(intersectionData['coords'])
    return mapCoords, elementCoords, intersectionCoords

def isAround(coord1, coord2):
    '''
    Return True if two coords are near each other
    '''
    if coord1[0] + 1 == coord2[0] and coord1[1] == coord2[1]:
        return True
    if coord1[0] - 1 == coord2[0] and coord1[1] == coord2[1]:
        return True
    if coord1[1] + 1 == coord2[1] and coord1[0] == coord2[0]:
        return True
    if coord1[1] - 1 == coord2[1] and coord1[0] == coord2[0]:
        return True
    return False

def DFS(coord, coords, visited, cluster):
    '''
    perform depth first search on the coords to separate areas
    '''
    cluster.append(coord)
    index = coords.index(coord)
    visited[index] = True
    for i in range(len(coords)):
        if isAround(coords[i], coord) and not visited[i]:
            # print(coords[i])
            DFS(coords[i], coords, visited, cluster)

def buildMapArea(coords):
    '''
    Build map area based on depth first search
    Map tile in same area if they are near each other
    Name areas based on AREAS

    POTENTIAL PROBLEMS:
    (1) Current areas only contain 26 elements from 'A' to 'Z'. Expand if more areas needed
    '''
    visited = [False] * len(coords)
    clusters = []
    # print(len(visited), len(coords))
    # print(coords)
    mapAreas = {}
    for i in range(len(coords)):
        if not visited[i]:
            # print(coords[i])
            cluster = []
            DFS(coords[i], coords, visited, cluster)
            clusters.append(cluster)
    for i in range(len(clusters)):
        mapAreas[AREAS[i]] = clusters[i]

    return mapAreas 

def buildMapImageDetails(routeDatas):
    '''
    Build map tile image information.
    We only care about routeDatas here because we assume that players are only able to put elements on emtpy tiles and are not able to remove default elements from the board.

    POTENTIAL PROBLEM:
    (1) take care about the assumption.
    '''
    imageDetails = {}
    for data in routeDatas:
        imageDetail = {}
        coord = data['coords']
        layout = data['layout']
        orientation = data['orientation']
        image = ''
        # print(coord, layout, orientation)
        if layout == 'C' and orientation == 'n':
            image = 'corner1.jpg'
        if layout == 'C' and orientation == 'e':
            image = 'corner2.jpg'
        if layout == 'C' and orientation == 's':
            image = 'corner3.jpg'
        if layout == 'C' and orientation == 'w':
            image = 'corner4.jpg'
        if layout == 'E' and orientation == 'e':
            image = 'horizontal.jpg'
        if layout == 'E' and orientation == 'n':
            image = 'vertical.jpg'
        if layout == 'G' and orientation == 's':
            image = 'T1.jpg'
        if layout == 'G' and orientation == 'n':
            image = 'T2.jpg'
        if layout == 'G' and orientation == 'w':
            image = 'T3.jpg'
        if layout == 'G' and orientation == 'w':
            image = 'T4.jpg'
        if layout == 'O':
            image = 'cross.jpg'      
        imageDetail['image'] = image
        imageDetail['layout'] = layout
        imageDetail['orientation'] = orientation
        imageDetails[str(coord)] = imageDetail
    return imageDetails
        

def generateMapInfo(order):
    '''
    Main process of generating map information
    '''
    mapInfo = {}
    routeDatas, elementDatas, intersectionDatas = getRawMapInfo(order)
    # print('routeDatas: ', routeDatas)
    # print('elementDatas: ', elementDatas)
    # print('intersectionDatas: ', intersectionDatas)
    mapCoords, elementCoords, intersectionCoords = getCoordsFromData(routeDatas, elementDatas, intersectionDatas)
    # print('mapCoords: ', mapCoords)
    # print('elementCoords: ', elementCoords) 
    # print('intersectionCoords: ', intersectionCoords)
    availableCoords = filterAvailableCoords(mapCoords, elementCoords, intersectionCoords)
    # print('availableCoords: ', availableCoords)
    mapAreas = buildMapArea(availableCoords)
    imageDetails = buildMapImageDetails(routeDatas)
    # print(mapAreas)
    mapAreas['intersection'] = intersectionCoords
    mapAreas['default'] = elementCoords
    mapInfo['mapAreas'] = mapAreas
    mapInfo['mapImageDetails'] = imageDetails

    
    return mapInfo
    # return 1

def saveMapInfo(order, curMapInfo, mapInfo):
    '''
    save map information into the file.
    '''
    mapInfo[order] = curMapInfo
    with open(MAPINFOFILE, 'a') as mapFile:
        json.dump(mapInfo, mapFile)

if __name__ == "__main__":
    checkOrderFiles()
    orders = getOrders()
    mapInfo = getMapInfo()
    for order in orders:
        if str(order) not in mapInfo:
            # print("order: ", order)
            curMapInfo = generateMapInfo(order)
            saveMapInfo(order, curMapInfo, mapInfo)
        else:
            print(f'level {order} already have information.')

    # curMapInfo = generateMapInfo(9)