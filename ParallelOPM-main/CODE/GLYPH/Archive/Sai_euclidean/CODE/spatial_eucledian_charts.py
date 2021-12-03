import json
import numpy as np
from numpy import dot
from numpy.linalg import norm
import math
from scipy import spatial

def cosine(a,b):
    if (np.isnan(round(dot(a, b)/(norm(a)*norm(b)),2))):
        print("NAN FOUND", a,b)
        return "x" 
    return round(dot(a, b)/(norm(a)*norm(b)),2)

def euclidean(a,b):
    return round(np.linalg.norm(a-b),2)

fileName = "trace.json"
data = json.load(open(fileName))


output = {}
for player_1 in data: #choose first player
    output[player_1]={}
    for player_2 in data: #choose all other player
        output[player_1][player_2]={}
        for player_1_event in data[player_1]: #choose one event of first player
            if data[player_1][player_1_event]["type"]=="BOARD_SNAPSHOT":
                output[player_1][player_2][player_1_event]={}
                for player_2_event in data[player_2]:  #choose all other player events
                    if data[player_2][player_2_event]["type"]=="BOARD_SNAPSHOT":
                        matrix_1 = data[player_1][player_1_event]['state_matrix']
                        matrix_2 = data[player_2][player_2_event]['state_matrix']
                        matrix_1 = np.array(matrix_1).flatten()
                        matrix_2 = np.array(matrix_2).flatten()
                        e_similarity =  euclidean(matrix_1,matrix_2)
                        output[player_1][player_2][player_1_event][player_2_event]=e_similarity

out_file = open("euclidean.json", "w") 
json.dump(output, out_file, indent = 6) 
out_file.close() 

