import os
import json
import sys

def buildEfficiency(LOGS):
    efficiency_metrics={}
    for user in os.listdir(LOGS):
        file_path=LOGS+"/"+str(user)
        efficiency_metrics[user] = {
            'solved':False,
            'ticks':sys.maxsize
        }
        valid_solution = False
        try:
            data = json.load(open(file_path))
        except:
            print('[ERROR] A game play with the eneterd data does not exist!')
            print('[INFO] Please run the program again!')
            exit()
            
        for event in data['events']:
            if event['type']=="SET_REFLECTION_CONTENT":
                if event['content']['status']=='success' and event['content']['simType']=='SUBMIT':
                    #Sucessful solutions!
                    efficiency_metrics[user]['solved']=True
                    valid_solution = True
                    print('FOUND VALID SOLUTION setting flag true')
                else:
                    pass #other event
                
            if valid_solution == True:
                if event['type']=='FINISH_SIMULATION':
                    print(f'[INFO] Found Best Solution for {user}')
                    efficiency_metrics[user]['ticks']= min(event['total'],efficiency_metrics[user]['ticks'])
                    valid_solution = False
        
    return efficiency_metrics



print(buildEfficiency('../DATA/LEVEL_13_LOGS'))
                        
                        