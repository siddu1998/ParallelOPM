# called in GlyphBoardState_2.py
import json
import os
# from abstraction_glyph import *



def get_board_ids(LOGS):
    # bi= Board Ids
    bi={}
    for filename in os.listdir(LOGS):
        fileName = LOGS+'/'+filename
        log=[]

        try:
            data = json.load(open(fileName))
        except:
            print('[ERROR] A game play with the eneterd data does not exist!')
            print('[INFO] Please run the program again!')
            print("snap")
            exit()
        for event in data['events']:
            if event["type"]=="BOARD_SNAPSHOT":
                log.append(event["id"])
                
        bi[filename]=log

    return bi

# get_board_ids()