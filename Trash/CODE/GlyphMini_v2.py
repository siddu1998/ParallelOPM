import networkx as nx
import matplotlib.pyplot as plt
import json 
from abstraction import GameState

import os
from bokeh.io import output_notebook, show, save
from bokeh.models import Range1d, Circle, ColumnDataSource, MultiLine
from bokeh.plotting import figure
from bokeh.plotting import from_networkx

import uuid



def GetAbstraction(fileName):
    print(fileName)
    
    board_id     = 0
    abstractions = []
        
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
            abstractions.append(abstraction)

    # print('-----------------------------------')
    # print(f'[INFO] DONE! the number of Board States Abstraced are {len(gameStates)}')
    return abstractions
    

def main():
    G = nx.Graph()
    all_abstractions = []    
    abstraction_uuid_map = {}
    log_files = "../DATA/Logfiles"
    
    #getting all unique nodes
    for fileName in os.listdir(log_files):   
        abstractions = GetAbstraction(f'{log_files}/{fileName}')
        nAbstraction = len(abstractions) #number of nodes on the graph
        print(fileName, nAbstraction)
        
        for abstraction in abstractions:
            if abstraction not in all_abstractions:
                all_abstractions.append(abstraction)

    print(len(all_abstractions))
    #creating all unique nodes and giving id's
    for abstraction in all_abstractions:
        id = str(uuid.uuid4())
        abstraction_uuid_map[id] = abstraction
        G.add_node(
            id,
            nSemaphores = abstraction['nSemaphores'],
            nSignals = abstraction['nSignals'],
            sempahore_zone_dict=str(abstraction['semaphore_zone_dict']),
            signal_zone_dict=str(abstraction['signal_zone_dict']),
            link_dict = str(abstraction['link_dict'])                   
            )
    
    for fileName in os.listdir(log_files):   
        abstractions = GetAbstraction(f'{log_files}/{fileName}')
        for index,abstraction in enumerate(abstractions):
            key1 = None
            key2 = None
            for key in abstraction_uuid_map:
                if abstraction_uuid_map[key]==abstraction:
                    key1 = key
            
            if index+1 < len(abstractions):
                next_node = abstractions[index+1]
                for key in abstraction_uuid_map:
                    if abstraction_uuid_map[key]==next_node:
                        key2 = key 
                        
            if key1 and key2:
                print(f'[INFO] Adding Edge Between {key1} and {key2}')
                G.add_edge(key1,key2)
        print('--------')
     
    
    
    
        #Choose a title!




    title = 'Board State Abstraction'
    HOVER_TOOLTIPS = [

    ("Number of Semaphores", "@nSemaphores"),
    ("Number of Signals","@nSignals"),
    ("Sempahores in Each Zone",'@sempahore_zone_dict'),
    ("Signals in Each Zone",'@signal_zone_dict'),
    ("Links Between Zones",'@link_dict'),
                 
    ]

    #Create a plot — set dimensions, toolbar, and title
    plot = figure(tooltips = HOVER_TOOLTIPS,
                tools="pan,wheel_zoom,save,reset", active_scroll='wheel_zoom',
                x_range=Range1d(-10.1, 10.1), y_range=Range1d(-10.1, 10.1), title=title)



    #rendering Graph 1
    network_graph = from_networkx(G, nx.spring_layout, scale=10, center=(0, 0))
    network_graph.node_renderer.glyph = Circle(size=15, fill_color='skyblue')
    network_graph.edge_renderer.glyph = MultiLine(line_alpha=0.5, line_width=1)


    #Add network graph to the plot
    plot.renderers.append(network_graph)

    show(plot)
   
        
        
    

        
         
if __name__ == '__main__':
    main()