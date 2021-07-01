import json
import os
from abstraction import GameState
import json
import copy 
from BuildNewGlyph import *



def GetAbstraction(fileName):
    board_id     = 0
    abstractions = []
        
    fileName = f'../DATA/Logfiles/{fileName}'
    print(fileName)
        
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
            abstraction = gameState.getAbstraction()
            abstraction['board_id']=board_id
            board_id  += 1
            abstractions.append(abstraction)

    return abstractions





userStates = {}
userActions = {}
initStates= {"A": [],"B": [],"C": [],"D": [],"E": [],"F": [],"G": [],"H": [],"I": [],"J": [],"K": [],"intersection": [],"default": []}            
initElements = {}
initLinks = []

initial_entry = {
    "states":initStates,
    "elements":initElements,
    "links":initLinks
    }


for file in os.listdir("../DATA/Logfiles"):
  fileName = file
  abstractions = GetAbstraction(fileName)
  user_id = fileName
  userStates[user_id]=[]
  userActions[user_id]=[]

  #create init state
  #userStates[user_id].append(initial_entry)
  
  semaphore_count = 0
  signal_count    = 0
    

  for abstraction in abstractions:
        states= {"A": [],"B": [],"C": [],"D": [],"E": [],"F": [],"G": [],"H": [],"I": [],"J": [],"K": [],"intersection": [],"default": []}            
        elements = {}
        links = []
        semaphore_details = abstraction['semaphore_details']
        signal_details    = abstraction['signal_details']
        link_details      = abstraction['link_details']    
        
        for semaphore in semaphore_details:
                id   = semaphore[0]
                x    = semaphore[1]
                y    = semaphore[2]
                zone = semaphore[3]
                
                states[zone].append(id)
                elements[id]={
                "location":[x,y],
                "status":"inactive"
                }
                
        for signal in signal_details:
                id   = signal[0]
                x    = signal[1]
                y    = signal[2]
                zone = signal[3]
                
                states[zone].append(id)
                elements[id]={
                "location":[x,y],
                "status":"inactive"
                }
        
        for link_detail in link_details:
                x1 = link_detail[0]
                y1 = link_detail[1]
                x2 = link_detail[2]
                y2 = link_detail[3]
                links.append([[x1,y1],[x2,y2]])
                
        
        #states['matrix'] = abstraction['adjaceny_matrix']

        entry = {"states":states,
                "elements":elements,
                "links":links}
        
        userStates[user_id].append(entry)
  
  #userStates[user_id].append(copy.deepcopy(initial_entry))
    
  userActions[user_id]=["Recieved Next State"]*(len(userStates[user_id])-1 )         


            

print(userStates)
print("##### USER ACTIONS ######")
print(userActions)


#Call GlyphBuider to generate glyph file
glyphBuilder = GlyphBuilder(userStates, userActions, f'level7_sai.json')
glyphBuilder.run()

