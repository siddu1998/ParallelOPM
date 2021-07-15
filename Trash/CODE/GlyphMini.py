import networkx as nx
import matplotlib.pyplot as plt
import json 
from abstraction import GameState

import os
from bokeh.io import output_notebook, show, save
from bokeh.models import Range1d, Circle, ColumnDataSource, MultiLine
from bokeh.plotting import figure
from bokeh.plotting import from_networkx




def GetAbstraction():
    board_id     = 0
    abstractions = []
    # trace_id=input('[USER] Please enter the game trace id (you can find them in data/logiles)')
    traces = os.listdir("../DATA/Logfiles")
    traces.sort()
    print("[INFO] Avilable Game Traces:     ")
    
    for index,value in enumerate(traces):
        print(index,' : ',value)
        
    trace_id=int(input('[USER] Please enter the  index of the trace id :  '))
    fileName = f'../DATA/Logfiles/{traces[trace_id]}'
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

    print('-----------------------------------')
    print(f'[INFO] DONE! the number of Board States Abstraced are {len(gameStates)}')
    return abstractions
    
    
def main():
    adj_matrix_user_choice = str(input("[INFO] Do you want to view the Adjaceny Matrix y/n (Default n) : "))
    if not adj_matrix_user_choice:
        adj_matrix_user_choice = 'n'
    
    abstractions = GetAbstraction()
    nAbstraction = len(abstractions) #number of nodes on the graph
    G = nx.Graph()
    
    #create the nodes
    for abstraction in abstractions:
        multi_line_string = ''' '''
        for row in abstraction['adjaceny_matrix']:
            multi_line_string+= str(row) + '\n' + '\n'
    
            
        G.add_node(abstraction['board_id'],
                   board_id = abstraction['board_id'],
                   adj_matrix=multi_line_string,
                   nSemaphores = abstraction['nSemaphores'],
                   nSignals = abstraction['nSignals'],
                   sempahore_zone_dict=str(abstraction['semaphore_zone_dict']),
                   signal_zone_dict=str(abstraction['signal_zone_dict']),
                   link_dict = str(abstraction['link_dict'])                   
                   )
    
    #add the edges
    for node in G.nodes:
        if node+1 in G.nodes:
            G.add_edge(node,node+1)
    
    
    #Choose a title!
    title = 'Board State Abstraction'

    #Establish which categories will appear when hovering over each node
    if adj_matrix_user_choice=='n':
        HOVER_TOOLTIPS = [
            ("Board Id","@board_id"),
            ("Number of Semaphores", "@nSemaphores"),
            ("Number of Signals","@nSignals"),
            ("Sempahores in Each Zone",'@sempahore_zone_dict'),
            ("Signals in Each Zone",'@signal_zone_dict'),
            ("Links Between Zones",'@link_dict'),
            #("adj_matrix","@adj_matrix")              
            ]
    else:
        HOVER_TOOLTIPS = [
            ("Board Id","@board_id"),
            ("Number of Semaphores", "@nSemaphores"),
            ("Number of Signals","@nSignals"),
            ("Sempahores in Each Zone",'@sempahore_zone_dict'),
            ("Signals in Each Zone",'@signal_zone_dict'),
            ("Links Between Zones",'@link_dict'),
            ("adj_matrix","@adj_matrix")              
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
    #save(plot, filename=f"{title}.html")



if __name__ == '__main__':
    main()