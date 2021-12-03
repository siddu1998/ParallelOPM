import os

USERMAP = {}

for user in os.listdir('../DATA/LEVEL_13_LOGS'):
    USERMAP[user]=user
    
print(USERMAP)