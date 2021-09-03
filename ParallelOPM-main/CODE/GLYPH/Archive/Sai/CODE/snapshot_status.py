# called in abstraction_glyph.py
import json




#LOGS = '../DATA/DDRI_STUDY_LOGS'
LOGS = '../DATA/LEVEL_13_LOGS'

def getStatus(board_snapshot_id,fileName):
    fileName = LOGS+'/'+fileName

    try:
        data = json.load(open(fileName))
    except:
        print('[ERROR] A game play with the eneterd data does not exist!')
        print('[INFO] Please run the program again!')
        print("snap")
        exit()
        
    log = []
    
    #create a mini-log
    for event in data['events']:
        if event["type"]=="BOARD_SNAPSHOT" or event["type"]=="BEGIN_SIMULATION" or event["type"]=="FINISH_SIMULATION" or event["type"]=="SET_REFLECTION_CONTENT": 
            log.append([event["type"],event["id"],event["created"]])
        
        if event['type']=='SET_REFLECTION_CONTENT':
            temp =log[-1]
            temp.append(str(event['content']['status'])+"/"+str(event['content']['simType']))    
            log[-1]=temp
    

        
    id_log = {}
    last_snapshot = None
    for index,event in enumerate(log):
        if event[0]=='BOARD_SNAPSHOT':
            if last_snapshot!=None:
                for prev_event in log[last_snapshot:index]:
                    if prev_event[0]=='SET_REFLECTION_CONTENT':
                        id_log[event[1]]=prev_event[-1]
                        last_snapshot = index
                        break
                    else:
                        id_log[event[1]]="Not a test/submit"
                        last_snapshot = index
            else:
                id_log[event[1]]="Not a test/submit"
                last_snapshot = index
        
    return id_log[board_snapshot_id]
    
# status=getStatus("842b987f-f501-4733-b9eb-cb95bf531308","787785b5-e800-45e2-82dd-9001eae092ef.json")
# print(status)

