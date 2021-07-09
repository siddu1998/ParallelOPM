# to get a dictionary with the key as player id and value as list of location of coresponding board_ids
# import os
# ans={}

# DIR="Screenshots"

# for folder in os.listdir(DIR):
#         Folder = DIR+'/'+folder
#         log=[]
#         print(Folder)
#         # repeated twice not only to handle exception but also to prevent it from not taking the last element into account
#         for filename in os.listdir(Folder):
#             ans[folder]=[]
#         for filename in os.listdir(Folder):
#             fileName = Folder+'/'+filename
#             # print(fileName)
#             ans[folder].append(fileName)
# print(ans)

import glob
import os
ans={}
search_dir = "Screenshots"
for folder in os.listdir(search_dir):
    Folder = search_dir+'/'+folder
    for filename in os.listdir(Folder):
        ans[folder]=[] 
    files = list(filter(os.path.isfile, glob.glob(Folder+"/" + "*")))
    files.sort(key=lambda x: os.path.getmtime(x))
    # print(files)
    for list1 in files:
        # print("to be modified")
        # print(list1)
        list1=list1.replace("\\", "/")
        # print("After modification")
        # print(list1)
        ans[folder].append(list1)
    # print(files)

print(ans)