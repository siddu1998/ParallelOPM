import cv2
import json
from itertools import islice

screenshot_folder = '../DATA/ScreenshotData'
level = "10"
map_info= '../DATA/maps_with_zones/MapInfo_10.json'

map_data = json.load(open(map_info))
map_data = map_data[level]
map_image_data = map_data['mapImageDetails']




width_in_cells = 15
height_in_cells = 15

images = []
for i in range(0,width_in_cells):
    for j in range(0,height_in_cells):
        string_index = f"[{i}, {j}]"
        if string_index in map_image_data:
            if map_image_data[string_index]['image']!="":
                path = f"{screenshot_folder}/{map_image_data[string_index]['image']}"
                im = cv2.imread(path)
                print(string_index,path,"DATA FOUND",type(im))
                images.append(im)
            else:
                path = f"{screenshot_folder}/empty.jpg"
                im = cv2.imread(path)
                print(string_index,path,"NO DATA FOUND",type(im))
                images.append(im)


        else:
            path = f"{screenshot_folder}/empty.jpg"
            im = cv2.imread(path)
            print(string_index,path,"NO DATA FOUND",type(im))
            images.append(im)



  


n = 15
images = [images[i:i+n] for i in range(0, len(images), n)]
print(len(images),len(images[0]))
row_images = []
for row in images:
    row_images.append(cv2.hconcat(row))

x = [x for x in row_images]
for image in x:
    cv2.imshow("x",image)
    cv2.waitKey(0)

im_v = cv2.vconcat(x)

cv2.imshow("im_v",im_v)
cv2.waitKey(0)
cv2.imwrite('empty_10.jpg',im_v)

