import os
import json
from timing_histograms import getPlayTime



def get_statistics(LOG):
    player_statistics={}
    for file1 in os.listdir(LOG):
        # print("[INFO] initiating for")
        # print(file1)
        player_statistics[file1]={}
        player_statistics[file1]['test_success']=0
        player_statistics[file1]['test_fail']=0
        player_statistics[file1]['submit_success']=0
        player_statistics[file1]['submit_fail']=0
        
        # print(player_statistics)
    for file in os.listdir(LOG):
        file_path=LOG+"/"+str(file)
        print(file)
        try:
            data = json.load(open(file_path))
        except:
            print('[ERROR] A game play with the eneterd data does not exist!')
            print('[INFO] Please run the program again!')
            exit()
        
        player_statistics[file]['gameplay_duration']=getPlayTime(file_path)
        for event in data['events']:
            if event['type']=="SET_REFLECTION_CONTENT":
                if event['content']['status']=='success' and event['content']['simType']=='TEST':
                    player_statistics[file]['test_success']+=1
                                    
                if event['content']['status']=='success' and event['content']['simType']=='SUBMIT':
                    player_statistics[file]['submit_success']+=1
                    
                if event['content']['status']=='failure' and event['content']['simType']=='TEST':
                    player_statistics[file]['test_fail']+=1
                    
                if event['content']['status']=='failure' and event['content']['simType']=='SUBMIT':
                    player_statistics[file]['submit_fail']+=1
    
    return player_statistics            


