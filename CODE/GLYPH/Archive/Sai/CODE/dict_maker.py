import os

USERMAP = {}

for user in os.listdir('../DATA/DDRI_STUDY_LOGS'):
    USERMAP[user]=user
    
print(USERMAP)