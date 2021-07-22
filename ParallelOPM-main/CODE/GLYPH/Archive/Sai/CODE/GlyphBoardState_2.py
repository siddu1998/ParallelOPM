import networkx as nx
import matplotlib.pyplot as plt
import json 
from abstraction_glyph import GameState
import os
from BuildNewGlyph import *
from getBoardID import get_board_ids

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
    counter=0
    for event in data['events']:
        if event["type"]=="BOARD_SNAPSHOT":
            #Create a gameState
            #TODO pass BOARD_SNAPSHOT id to the gameState
            board_snapshot_id = event['id']
            gameState = GameState(level,f'../DATA/maps_with_zones/MapInfo_{level}.json',user,board_snapshot_id,counter)    
            counter=counter+1
            components = event['board']['components']
            #TODO : need to handle this 2 time iterations (since sometimes the data comes such that links are added before even the board state registers the semaphore :/)
            for component in components:
                if components[component]['type'] in required_elements:
                    # edited to get the status of the semaphore, that is if it is active or inactive @@@
                    if components[component]['type'] == 'semaphore':
                        cell = components[component]['cell']
                        id   = components[component]['id']
                        # edited @@@
                        status = components[component]['spec']
                        # edited @@@
                        gameState.putSemaphore(cell[0],cell[1],id,status)
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
    # print('-----------------------------------')
    # print(f'[INFO] DONE! the number of Board States Abstraced are {len(gameStates)}')
    return abstractions
userStates = {}
userActions = {}
#TODO : CHANGE LOG FILES DIRECTORY ACCORDINGLY
#Change Level accordingly!
log_files = "../DATA/DDRI_STUDY_LOGS"
level = 5
#Level 7
# log_files = "../DATA/Logfiles"
# level = 7
for file in os.listdir(log_files):
    #CREATE FOLDER TO STORE THE STATE SCREENSHOTS
    user = file.split('.')[0]

    #call abstraction
    fileName = log_files+'/'+file
    abstractions = GetAbstraction(fileName,level,user)
    user_id = file
    userStates[user_id] = abstractions
    userActions[user_id]=["Recieved Next State"]*(len(userStates[user_id])-1 )     
    user = user_id.split('.')[0]

#edited by moulika
userboardids=get_board_ids() 
print(userStates)
print('=====USER ACTIONS=====')
print(userActions)
# edited by moulika
print('====User board ids=====')
print(userboardids)
# edited added userboardids
glyphBuilder = GlyphBuilder(userStates, userActions, userboardids, f'level_{level}_sai.json')
glyphBuilder.run()

