import json

level           = "level_13"
play_trace_path = "trace.json"
play_trace = json.load(open(play_trace_path))

knowledge = {
    "level_13":{
            "optimal_semaphores":2,
            "optimal_signals":4,
            "concepts":{
                "concept_1":{
                    "statement":"Handling the switch using Critical Section",
                    "link": "ZY",
                    "OPM":"ZY: Great job with using the critical section to handle the default switch. Can you think of another position to place the signal!"
                    },
                "concept_2":{
                    "statement":"Handling the switch using Critical Section",
                    "link": "WY",
                    "OPM":"WY: Great job with using the critical section to handle the default switch. Can you think of another position to place the signal!"
                    },
                "concept_3":{
                    "statement":"Handling the switch two signals",
                    "link": "JY",
                    "OPM":"JY: You are trying to handle the switch. You have a connection between a signal in J and the switch. This aligns the switch in the direction of the pink thread. What needs to be done to align it again with the red thread. Can you also think of a way to handle the switch with only one signal"
                },
                "concept_4":{
                    "statement":"Handling the switch two signals",
                    "link": "FY",
                    "OPM":"FY: You are trying to handle the switch.You have a connection between a signal in F and the switch. This turns the switch to align with the direction of the pink thread. What needs to be done to align it again with the red thread. Can you also think of a way to handle the switch with only one signal"
                },    
                "concept_5":{
                    "statement":"Handling the switch two signals",
                    "link": "DY",
                    "OPM":"DY: You are trying to handle the switch. You have a connection between a signal in D and the switch. This turns the switch to align with the direction of the pink thread. What needs to be done to align it again with the red thread. Can you also think of a way to handle the switch with only one signal"
                },
                "concept_6":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "AI",
                    "OPM":"AI: You have choosen a nice way to prevent race condition by locking the pink thread before the red thread delivers. Can you think of ways how the pink thread can block the red thread inorder to prevent a race condition."
                },
                "concept_7":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "AJ",
                    "OPM":"AJ: You have choosen a nice way to prevent race condition by locking the pink thread before the red thread delivers. Can you think of ways how the pink thread can block the red thread inorder to prevent a race condition."
                },
                "concept_8":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "DJ",
                    "OPM":"DJ: Your Choice for a link between D and J, could be to prevent the pink thread from moving before the red thread passes the switch. Is this is a good way go ahead? What happens if the red thread waits after passing through the switch. Would this lead to a race condition? Could you think of a way to move your signal from Zone D to a Zone after the red thread has delivered its package (or) Can you guard the critical section such that only one thread passes at a time."
                },
                "concept_9":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "DI",
                    "OPM":"DI: Your Choice for a link between D and I, could be to prevent the pink thread from moving before the red thread passes the switch. Is this is a good way go ahead? What happens if the red thread waits after passing through the switch. Would this lead to a race condition? Could you think of a way to move your signal from Zone D to a Zone after the red thread has delivered its package (or) Can you guard the critical section such that only one thread passes at a time."
                },
                "concept_10":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "EA",
                    "OPM":"EA: You have choosen a nice way to prevent race condition by locking the red thread before the Pink thread delivers. Can you think of ways how the red thread can block the pink thread inorder to prevent a race condition."
                },
                "concept_11":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "EG",
                    "OPM":"EG: You have choosen a nice way to prevent race condition by locking the red thread before the Pink thread delivers. Can you think of ways how the red thread can block the pink thread inorder to prevent a race condition."                    
                },
                "concept_12":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "EH",
                    "OPM":"EH: You have choosen a nice way to prevent race condition by locking the red thread before the Pink thread delivers. Can you think of ways how the red thread can block the pink thread inorder to prevent a race condition."                    
                },
                "concept_13":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "IA",
                    "OPM":"IA: You have choosen a nice way to prevent race condition by locking the red thread before the Pink thread delivers. Can you think of ways how the red thread can block the pink thread inorder to prevent a race condition."                     
                },
                "concept_14":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "IG",
                    "OPM":"IG: You have choosen a nice way to prevent race condition by locking the red thread before the Pink thread delivers. Can you think of ways how the red thread can block the pink thread inorder to prevent a race condition."                    
                },
                "concept_15":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "IH",
                    "OPM":"IH: You have choosen a nice way to prevent race condition by locking the red thread before the Pink thread delivers. Can you think of ways how the red thread can block the pink thread inorder to prevent a race condition."                    
                },
                "concept_16":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "HJ",
                    "OPM":"HJ: With a Signal in Zone H unlocking a Semaphore in Zone J. You seem to be trying to handle the race condition. But is unlocking the pink thread before the red thread delivered its package the right approach? Think of ways you can unlock the pink thread after the red thread delivers its package."                    
                },
                "concept_17":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "BJ",
                    "OPM":"BJ: With a Signal in Zone B unlocking a Semaphore in Zone H. You seem to be trying to handle the race condition. But is unlocking peer threads from the critical section a right idea (the thread you are trying to unlock can also lock itself if signals are placed in the critical section)? It is always recommended you unlock peer threads from sections which belong exclusively to a thread."                    
                },
                "concept_18":{
                    "statement":"Handling the switch two signals",
                    "link": "EY",
                    "OPM":"EY: You are trying to handle the switch.You have a connection between a signal in A and the switch. This turns the switch to align with the direction of the red thread. What needs to be done to align it again with the pink thread. Can you also think of a way to handle the switch with only one signal"
                },
                "concept_19":{
                    "statement":"Handling the switch two signals",
                    "link": "AY",
                    "OPM":"AY: You are trying to handle the switch.You have a connection between a signal in A and the switch. This turns the switch to align with the direction of the pink thread. What needs to be done to align it again with the red thread. Can you also think of a way to handle the switch with only one signal"
                },
                "concept_20":{
                    "statement":"Handling the switch two signals",
                    "link": "IY",
                    "OPM":"IY: You are trying to handle the switch.You have a connection between a signal in A and the switch. This turns the switch to align with the direction of the red thread. What needs to be done to align it again with the pink thread. Can you also think of a way to handle the switch with only one signal"
                },  
                "concept_21":{
                    "statement":"Handling the switch using critical section",
                    "link": "BY",
                    "OPM":"BY: Great job with using the critical section to handle the default switch. Can you think of another position to place the signal!"
                },  
                "concept_22":{
                    "statement":"Handling the switch using critical section",
                    "link": "CY",
                    "OPM":"CY: Great job with using the critical section to handle the default switch. Can you think of another position to place the signal!"
                },  
                "concept_23":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "HI",
                    "OPM":"HI: With a signal in H and and Semaphore in I, you seem to be trying to control the pink thread with the red thread. But is unlocking the pink thread before the red thread delivers its package the right approach. Where do you think the Signal in H has to be placed to make this right?"
                },  
                "concept_24":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "FA",
                    "OPM":"FA: With a signal in F and and Semaphore in A, you seem to be trying to control the red thread with the red thread. But is unlocking the red thread before the pink thread delivers its package the right approach. Where do you think the Signal in F has to be placed to make this right?"
                },  
                "concept_25":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "CJ",
                    "OPM":"CJ: With a Signal in Zone C unlocking a Semaphore in Zone H. You seem to be trying to handle the race condition. But is unlocking peer threads from the critical section a right idea (the thread you are trying to unlock can also lock itself if signals are placed in the critical section)? It is always recommended you unlock peer threads from sections which belong exclusively to a thread."                    
                },
                "concept_26":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "BI",
                    "OPM":"BI: With a Signal in Zone B unlocking a Semaphore in Zone I. You seem to be trying to handle the race condition. But is unlocking peer threads from the critical section a right idea (the thread you are trying to unlock can also lock itself if signals are placed in the critical section)? It is always recommended you unlock peer threads from sections which belong exclusively to a thread."                    
                },
                "concept_27":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "BA",
                    "OPM":"BA: With a Signal in Zone B unlocking a Semaphore in Zone H. You seem to be trying to handle the race condition. But is unlocking peer threads from the critical section a right idea (the thread you are trying to unlock can also lock itself if signals are placed in the critical section)? It is always recommended you unlock peer threads from sections which belong exclusively to a thread."                    
                },
                "concept_28":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "CI",
                    "OPM":"CI: With a Signal in Zone C unlocking a Semaphore in Zone I. You seem to be trying to handle the race condition. But is unlocking peer threads from the critical section a right idea (the thread you are trying to unlock can also lock itself if signals are placed in the critical section)? It is always recommended you unlock peer threads from sections which belong exclusively to a thread."                    
                },
                "concept_29":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "CA",
                    "OPM":"CA: With a Signal in Zone C unlocking a Semaphore in Zone H. You seem to be trying to handle the race condition. But is unlocking peer threads from the critical section a right idea (the thread you are trying to unlock can also lock itself if signals are placed in the critical section)? It is always recommended you unlock peer threads from sections which belong exclusively to a thread."                    
                },
                "concept_30":{
                    "statement":"Trying to Manually Gaurd the Delivery Point",
                    "link": "BC",
                    "OPM":"BC: You are Forcefully trying to block the critical section! This is not a good practice. Instead you should make sure only process reaches the critical section, this is more optimal. Consider rearranging your semaphores and signals to make sure only one thread reaches the delivery point at once."                    
                },
                "concept_31":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "FH",
                    "OPM":"FH: With a signal in F and and Semaphore in H, you seem to be trying to control the red thread with the red thread. But is unlocking the red thread before the pink thread delivers its package the right approach. Where do you think the Signal in F has to be placed to make this right?"
                },  
              
                "concept_32":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "FG",
                    "OPM":"FG: With a signal in F and and Semaphore in G, you seem to be trying to control the red thread with the red thread. But is unlocking the red thread before the pink thread delivers its package the right approach. Where do you think the Signal in F has to be placed to make this right?"
                },  

            }
}
}

level_13_index_map = {0: "A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7: "H", 8:"I", 9:"J", 10:"W", 11:"X", 12:"Y", 13:"Z"}

all_links = []

#go through each player
for player in play_trace:
    #go through player actions
    for action in play_trace[player]:
        #get player submissions
        if play_trace[player][action]["type"]=="BOARD_SNAPSHOT":
            print("Player ID: ", player)
            print("Event ID: ",action)
            suggestions = []
            #get adjacency matrix of submission
            adjacency_matrix=play_trace[player][action]["adjacency_matrix"]
            #get links in that submissions
            for row in range(0,len(adjacency_matrix)):
                for col in range(0,len(adjacency_matrix[0])):
                    k_flag = False
                    if adjacency_matrix[row][col]>0:
                        link = f"{level_13_index_map[row]}{level_13_index_map[col]}"
                        all_links.append(link)
                        print(f"[INFO] Link in between {link}")
                        for concept in knowledge[level]["concepts"]:
                            if link == knowledge[level]["concepts"][concept]["link"]:
                                print("--- Concept Found",concept,link)
                                print("--- [OPM]", knowledge[level]["concepts"][concept]["OPM"])
                                suggestions.append(knowledge[level]["concepts"][concept]["OPM"])
                                k_flag = True
                        if k_flag==False:
                            print('[WARNING] NEW LINK FOUND! No Reasoning Found for this link')
                            exit()
            
            play_trace[player][action]["suggestions"]=suggestions
            print('========================')
        
        else:
            play_trace[player][action]["suggestions"]=[]



print(set(all_links))
print('=================')
for concept in knowledge['level_13']['concepts']:
        print(knowledge['level_13']['concepts'][concept]['link'],'|', knowledge['level_13']['concepts'][concept]['OPM'])
print('=================')

out_file = open("trace_2.json", "w") 
json.dump(play_trace, out_file, indent = 6) 
out_file.close() 
print("Knowledge added in Play Trace Updated and saved")