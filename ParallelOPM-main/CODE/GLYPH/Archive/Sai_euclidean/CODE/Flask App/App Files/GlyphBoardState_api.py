import networkx as nx
import matplotlib.pyplot as plt
import json 
from abstraction_api import GameState
import os

def GetAbstraction(data,game_level):
    required_elements = ['semaphore','signal']
    gameStates = []
    abstractions = []  
    level = game_level
    
    for event in data['events']:
        if event["type"]=="BOARD_SNAPSHOT":
            board_snapshot_id = event['id']
            gameState = GameState(level,f'../DATA/maps_with_zones/MapInfo_{level}.json',board_snapshot_id)    
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

    return abstractions
