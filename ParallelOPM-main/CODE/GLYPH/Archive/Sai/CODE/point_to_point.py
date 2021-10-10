import json
import numpy as np
from numpy import dot
from numpy.linalg import norm
import math
from scipy import spatial
import sklearn

def cosine(a,b):
    return round(dot(a, b)/(norm(a)*norm(b)),2)

fileName = "trace.json"
data = json.load(open(fileName))




output = {}
for player in data:
    output[player]={}
    previous_add_elements = 0
    previous_move_elements = 0
    previous_remove_elements = 0
    previous_link_elements = 0

    current_add_elements = 0
    current_move_elements=0
    current_link_elements=0
    current_remove_elements=0

    for event in data[player]:
        if data[player][event]["type"]=="ADD_ELEMENT":
            current_add_elements+=1
        if data[player][event]["type"]=="MOVE_ELEMENT":
            current_move_elements+=1
        if data[player][event]["type"]=="BEGIN_LINK":
            current_link_elements+=1
        if data[player][event]["type"]=="REMOVE_ELEMENT":
            current_remove_elements+=1
        if data[player][event]["type"]=="BOARD_SNAPSHOT":
            vector = [
                current_add_elements-previous_add_elements,
                current_move_elements-previous_move_elements,
                current_link_elements-previous_link_elements,
                current_remove_elements-previous_remove_elements,
            ]
            previous_add_elements=current_add_elements
            previous_move_elements=current_move_elements
            previous_remove_elements=current_remove_elements
            previous_link_elements=current_link_elements
            output[player][data[player][event]["id"]]=vector

output_two = {}
for player in output:
    output_two[player]={}
    for other_player in output:
        output_two[player][other_player]={}
        for player_1_snapshot in output[player]:
            output_two[player][other_player][player_1_snapshot]={}
            for player_2_snapshot in output[other_player]:
                vector_1 = output[player][player_1_snapshot]
                vector_2 = output[other_player][player_2_snapshot]                
                cosine_value = cosine(vector_1,vector_2)
                output_two[player][other_player][player_1_snapshot][player_2_snapshot]=cosine_value

print(output_two)   

print(cosine(np.array([0,0,1,0]),np.array([0,1,0,0])))
          
out_file = open("point_to_point.json", "w") 
json.dump(output_two, out_file, indent = 6) 
out_file.close()