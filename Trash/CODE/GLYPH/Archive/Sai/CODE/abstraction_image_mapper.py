import networkx as nx
import matplotlib.pyplot as plt
import json 
from abstraction_withouth_screenshot import GameState
import os
from BuildNewGlyph import *



def GetAbstraction(fileName,game_level,user):
    print(fileName)    
    abstractions = []   
    level = game_level
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
            
            #TODO pass BOARD_SNAPSHOT id to the gameState
            board_snapshot_id = event['id']
            gameState = GameState(level,f'../DATA/maps_with_zones/MapInfo_{level}.json',user,board_snapshot_id)    
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

            abstractions.append(abstraction)

    return abstractions







#TODO : CHANGE LOG FILES DIRECTORY ACCORDINGLY
#Change Level accordingly!
log_files = "../DATA/DDRI_STUDY_LOGS"
level = 5

#Level 7
# log_files = "../DATA/Logfiles"
# level = 7
output_dict ={}
for file in os.listdir(log_files):
    fileName = log_files+'/'+file
    user = file.split('.')[0]
    abstractions = GetAbstraction(fileName,level,user)
    for (abstraction,screenshot) in zip(abstractions,sorted(os.listdir(f'../DATA/Screenshots/{user}'))):
        abstraction['nextAction']='Recieved Next State'
        temp_dict = {'board_state':abstraction}
        output_dict[user+'/'+str(temp_dict)]=f'Screenshots/{user}/{screenshot}'

print(output_dict)



    
    
    
    