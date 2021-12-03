import os
import json

SCREENSHOT_FOLDER = '../DATA/Screenshots'

image_json = {}
for folder in os.listdir(SCREENSHOT_FOLDER):
    for image in sorted(os.listdir(f'{SCREENSHOT_FOLDER}/{folder}')):
        path = f'Screenshots/{folder}/'+image
        path = path.replace(' ','_')
        try:
            image_json[folder].append(path)
        except:
            image_json[folder]=[path]


# Convert a dictionary with list data into json by sorting keys
json_data = json.dumps(image_json)
out_file = open("images_json.json", "w") 
json.dump(json_data, out_file) 
out_file.close() 