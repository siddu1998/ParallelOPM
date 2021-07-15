import json 

from abstraction import GameState

trace_id=input('[USER] Please enter the game trace id (you can find them in data/logiles)')

fileName = f'../DATA/Logfiles/{trace_id}.json'
    
level = 7
try:
    data = json.load(open(fileName))
except:
    print('[ERROR] A game play with the eneterd data does not exist!')
    print('[INFO] Please run the program again!')
    exit()

required_elements = ['semaphore','signal']

gameStates = []
print(f"[INFO] You are working with a snapshopt from the game of {fileName}")

for event in data['events']:
    if event["type"]=="BOARD_SNAPSHOT":
        #Create a gameState
        gameState = GameState(level,f'../DATA/maps_with_zones/MapInfo_{level}.json')
        components = event['board']['components']
        #TODO : need to handle this 2 time iterations (since sometimes the data comes such that links are added before even the board state registers the semaphore :/)
        for component in components:
            if components[component]['type'] in required_elements:
                if components[component]['type'] == 'semaphore':
                    cell = components[component]['cell']
                    id   = components[component]['id']
                    gameState.putSemaphore(cell[0],cell[1],id)
        
        for component in components:
            if components[component]['type'] in required_elements:                
                if components[component]['type']=='signal':
                    cell = components[component]['cell']
                    id_1   = components[component]['id']
                    id_2   = components[component]['link']
                    gameState.putSignal(cell[0],cell[1],id_1,id_2)
        
        gameStates.append(gameState)
        gameState.getAbstraction()

print('-----------------------------------')
print(f'[INFO] DONE! the number of Board States Abstraced are {len(gameStates)}')