import glob
import os

def log(search_dir):
    ans={}
    for folder in os.listdir(search_dir):
        Folder = search_dir+'/'+folder

        for filename in os.listdir(Folder):
            ans[folder]=[] 
        files = list(filter(os.path.isfile, glob.glob(Folder+"/" + "*")))
        files.sort(key=lambda x: os.path.getmtime(x))
        # print(files)
        for list1 in files:
            list1=list1.replace("\\", "/")
            ans[folder].append(list1)
    return ans

print(log('Screenshots'))