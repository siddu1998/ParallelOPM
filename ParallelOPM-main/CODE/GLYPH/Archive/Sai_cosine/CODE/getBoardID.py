# called in GlyphBoardState_2.py
import json
import os
from sys import exit
# from abstraction_glyph import *

CRITICAL_EVENTS=[
    "BEGIN_LEVEL_LOAD",
    'ADD_ELEMENT',
    'MOVE_ELEMENT',
    'TOGGLE_ELEMENT',
    'REMOVE_ELEMENT',
    'BEGIN_LINK',
]

def get_board_ids(LOGS):
    # bi= Board Ids
    bi={}
    for filename in os.listdir(LOGS):
        fileName = LOGS+'/'+filename
        log=[]

        try:
            data = json.load(open(fileName))
        except:
            print(fileName)
            print('[ERROR] A game play with the eneterd data does not exist!')
            print('[INFO] Please run the program again!')
            print("snap")
            exit()
        for event in data['events']:
            if event["type"]=="BEGIN_LINK":
                log.append(event["id"])
                
        bi[filename]=log

    return bi

