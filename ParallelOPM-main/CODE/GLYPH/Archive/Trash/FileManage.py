from tqdm import tqdm
from collections import Counter
from datetime import datetime
from os.path import isdir, join
from sys import exit
from os import mkdir, listdir
import os
import json
import shutil

DATADIR = './OriginData/'

def organizeFiles():
    newCreated = []
    MapInfo = []
    filenames = os.listdir(DATADIR)
    for filename in filenames:
        if filename == ".DS_Store":
            continue
        # print(filename)
        if os.path.isdir(os.path.join(DATADIR, filename)):
            print(f"{filename} is a folder, please guarantee no folder inside {DATADIR}")
            exit(0)
    for filename in filenames:
        if filename == ".DS_Store":
            continue
        # print(filename)
        with open(os.path.join(DATADIR, filename)) as f:
            data = json.loads(f.read())
            events = data['events']
            for event in events:
                if event['type'] == 'BEGIN_LEVEL_LOAD':
                    orderNum = event['order']
                    if int(orderNum) < 10:
                        orderNum = f'0{str(orderNum)}'
                    folderName = f'order{orderNum}'
                    path = os.path.join(DATADIR, folderName)
                    # print(path)
                    if os.path.isdir(path) and path not in newCreated:
                        print('Folder Exist, please guarantee there is no folder inside Data directory!')
                        exit(0)
                    elif os.path.isdir(path) and path in newCreated:
                        shutil.move(os.path.join(DATADIR, filename), os.path.join(path, filename))
                    else:
                        os.mkdir(path)
                        newCreated.append(path)
                        shutil.move(os.path.join(DATADIR, filename), os.path.join(path, filename))          


def buildState():
    pass


if __name__=="__main__":
    organizeFiles()
    


    # os.makedirs('Data',exist_ok=True)
    # MapInfo = 
    # ms = 1618974787
    # test = datetime.fromtimestamp(1618875678)
    # print(test)