import os
import json

data = {}
data['level']=13
data['raw_logs']={}

log_files = "../DATA/LEVEL_13_LOGS"

for file in os.listdir(log_files):
    user = file.split('.')[0]
    fileName = log_files+'/'+file
    user_log = json.load(open(fileName))
    data['raw_logs'][user]=user_log

out_file = open("test.json", "w") 
json.dump(data, out_file, indent = 6) 
out_file.close() 
