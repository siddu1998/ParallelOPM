# this file is intended to find the accuracy of the player for one level
# AIM: To create a pie chart, which displays number of successful events and number of failure events
# 1. create 3 pie charts, one for total test and submission together, another for only tests and another for only submissions

# loop through each of the log file
import os
import json
from matplotlib import pyplot as plt

LOG="../DATA/DDRI_STUDY_LOGS"
data_for_accuracy={}
for file1 in os.listdir(LOG):
    # now for each player our target is to display 3 empty plots
    print("[INFO] initiating for")
    print(file1)
    data_for_accuracy[file1]={}
    data_for_accuracy[file1]['test_success']=0
    data_for_accuracy[file1]['test_fail']=0
    data_for_accuracy[file1]['submit_success']=0
    data_for_accuracy[file1]['submit_fail']=0
    
    # print(data_for_accuracy)
for file in os.listdir(LOG):
    file_path=LOG+"/"+str(file)
    print(file)
    try:
        data = json.load(open(file_path))
    except:
        print('[ERROR] A game play with the eneterd data does not exist!')
        print('[INFO] Please run the program again!')
        print("snap")
        exit()
    for event in data['events']:
        if event['type']=="SET_REFLECTION_CONTENT":
            if event['content']['status']=='success' and event['content']['simType']=='TEST':
                data_for_accuracy[file]['test_success']+=1
                
            if event['content']['status']=='success' and event['content']['simType']=='SUBMIT':
                data_for_accuracy[file]['submit_success']+=1
                
            if event['content']['status']=='failure' and event['content']['simType']=='TEST':
                data_for_accuracy[file]['test_fail']+=1
                
            if event['content']['status']=='failure' and event['content']['simType']=='SUBMIT':
                data_for_accuracy[file]['submit_fail']+=1
    print(data_for_accuracy[file])
    print("data getting saved in /plots folder")
    # 'test_success':0, 'test_fail':0, 'submit_success':0, 'submit_fail':0
    # for event in file['events']:
        # if event['type']=="SET_REFLECTION_CONTENT":

    fig1 = plt.figure()
    ax = fig1.add_axes([0,0,1,1])
    ax.axis('equal')
    label = ['overall success', 'overall failure']
    data1 = [data_for_accuracy[file]['test_success']+data_for_accuracy[file]['submit_success'],data_for_accuracy[file]['test_fail']+data_for_accuracy[file]['submit_fail']]
    ax.pie(data1, labels = label,autopct='%1.2f%%')
    # plt.show()
    # make a directory and append the plot files over there
    file_name="plots/"+file[:-5]+"_overall.png"
    plt.savefig(file_name)

    fig2 = plt.figure()
    ax = fig2.add_axes([0,0,1,1])
    ax.axis('equal')
    label = ['test success', 'test failure']
    data1 = [data_for_accuracy[file]['test_success'],data_for_accuracy[file]['test_fail']]
    ax.pie(data1, labels = label,autopct='%1.2f%%')
    # plt.show()
    file_name="plots/"+file[:-5]+"_test.png"
    plt.savefig(file_name)

    fig3 = plt.figure()
    ax = fig3.add_axes([0,0,1,1])
    ax.axis('equal')
    label = ['submit success', 'submit failure']
    data1 = [data_for_accuracy[file]['submit_success'],data_for_accuracy[file]['submit_fail']]
    ax.pie(data1, labels = label,autopct='%1.2f%%')
    # plt.show()
    file_name="plots/"+file[:-5]+"_submit.png"
    plt.savefig(file_name)

