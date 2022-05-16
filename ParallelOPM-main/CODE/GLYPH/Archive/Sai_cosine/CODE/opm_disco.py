import pandas as pd
import json
import requests
import os
from datetime import datetime

url = "http://127.0.0.1:5000/getPlayerTrace"
log_file_directory = '../DATA/LEVEL_13_LOGS'

rows = []


for filename in os.listdir(log_file_directory):
    print(filename)
    case_id = f'Case {filename}'
    path = log_file_directory +'/'+ filename
    payload = json.load(open(path))
    headers = {
    'Content-Type': 'application/json'
    }
    response = requests.request("GET", url, headers=headers, json=payload)
    data = json.loads(response.content)
    for event in data['events']:
        # if len(event['activity'])==2:
        event_type = event['type'].replace('_','-')
        activity = event['activity']
        user_id    = filename
        start_time = datetime.utcfromtimestamp((event['created']/1000)).strftime('%Y-%m-%d %H:%M:%S')
        end_time   =  datetime.utcfromtimestamp((event['created']+1)/1000).strftime('%Y-%m-%d %H:%M:%S')
        move_classification = event['move_classification']
        row=[case_id, event_type,activity,user_id,start_time,end_time,move_classification]
        rows.append(row)
        print('====================')

df = pd.DataFrame(rows) 
df.columns = ["Case ID", "Activity (event)","Activity (knowledge)" ,"User ID", "Start Time", "End Time","move_classification"]
print(df.head)
df.to_csv('OPM_DISCO_ACTIONS.csv',index=False)