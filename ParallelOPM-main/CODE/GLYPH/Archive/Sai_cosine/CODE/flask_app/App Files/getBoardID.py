# called in GlyphBoardState_2.py
import json
import os
# from abstraction_glyph import *



def get_board_ids(LOGS):
    # bi= Board Ids
    bi={}
    for player in LOGS:
        log=[]
        try:
            data = LOGS[player]
        except:
            print('[ERROR] A game play with the eneterd data does not exist!')
            print('[INFO] Please run the program again!')
            print("snap")
            exit()
        for event in data['events']:
            if event["type"]=="BOARD_SNAPSHOT":
                log.append(event["id"])
                
        bi[player+'.json']=log

    return bi

# get_board_ids()