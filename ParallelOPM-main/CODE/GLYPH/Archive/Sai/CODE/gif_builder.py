import imageio
import glob
import json
import os
import re

def buildGIF(event_id_1,event_id_2,folder,destination):
    print(event_id_1,event_id_2)
    gif = []
    images = list(filter(os.path.isfile, glob.glob(folder+"/" + "*")))
    images.sort(key=lambda x: os.path.getmtime(x))
    
    images = images[images.index(event_id_1):images.index(event_id_2)]
    
    for image in images:
        gif.append(imageio.imread(image))
    
    imageio.mimsave(destination, gif)
    

#Iterate and build
def main(level,log_files):
    for file in os.listdir(log_files):
        user = file.split('.')[0]
        fileName = log_files+'/'+file
        
        GIF_STOREAGE = f'../DATA/GIFs/{user}'     
        os.mkdir(GIF_STOREAGE)
        IMAGES_FOLDER = f'../DATA/IntermediateScreenShots/{user}'
        
        data = json.load(open(fileName))
        
        previous_boardsnapshot_id = None
        
        #add 0_1.gif aesthetic purpose
        zero_event  = "0"  + '_' +data['events'][0]['id']+".png"
        first_event = "1" + "_" +data['events'][1]['id']+".png"
        print(zero_event,first_event)
        destination_path = GIF_STOREAGE + '/' + '0_1'+'.gif'
        buildGIF(f'{IMAGES_FOLDER}/{zero_event}',f'{IMAGES_FOLDER}/{first_event}',IMAGES_FOLDER,destination_path)
        
        
        for index,event in enumerate(data['events']):
            if event['type']=='BOARD_SNAPSHOT':
                if previous_boardsnapshot_id == None:
                    previous_boardsnapshot_id = f'{index}_{event["id"]}.png'    
                
                else:
                    current_boardsnapshot_id = f'{index}_{event["id"]}.png'
                    print(f'Storing between {previous_boardsnapshot_id},{current_boardsnapshot_id}')
                    destination_path = GIF_STOREAGE + '/' + previous_boardsnapshot_id.split("_")[0] + '_' + current_boardsnapshot_id.split("_")[0]+'.gif'
                    buildGIF(f'{IMAGES_FOLDER}/{previous_boardsnapshot_id}',f'{IMAGES_FOLDER}/{current_boardsnapshot_id}',IMAGES_FOLDER,destination_path)
                    previous_boardsnapshot_id = current_boardsnapshot_id
        
        
