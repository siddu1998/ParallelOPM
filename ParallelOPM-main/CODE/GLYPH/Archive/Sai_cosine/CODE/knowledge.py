import json

# level           = "level_13"
# play_trace_path = "trace.json"
level = "level_5"
play_trace_path = "trace_5.json"
play_trace = json.load(open(play_trace_path))

knowledge = {
    "level_5":{
        "concepts":{}
    },
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
                    "OPM":"DJ: Your Choice for a link between D and J, could be to prevent the pink thread from moving before the red thread passes the switch. Is this is a good way go ahead? What happens if the red thread waits after passing through the switch. Would this lead to a race condition? Could you think of a way to move your signal from Zone D to a Zone after the red thread has delivered its package (or) Can you guard the critical section such that only one thread passes at a time.",
                    "suggested": "AJ"
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
},
    "level_15":{
            "optimal_semaphores":1,
            "optimal_signals":7,
            "concepts":{
                 "concept_1":{
                    "statement":"Trying to handle the first Top Switch",
                    "link": "ER",
                    "OPM":"ER:You seem to be handling the Top Switch. This connection is not an ideal link. Note that attempting to connect the signal from E to the switch might allow two threads in the same branch. Which is not what you might desire. Can you think of ways to use the critical section better to handle the first switch. Think about AR"
                    },
                "concept_2":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "BA",
                    "OPM":"BA: With this connection you seem to be handling the race condition and allow only one thread in each branch. Unlocking the semaphore in A from B would allow two threads to enter the left part of the board. This would require you to place another semaphore before the left and right most switches to make sure only one thread enters them at a time. Can you think of a better way to handle this. Hint! You can handle all the race conditions using one semaphore alone! Be smart where you want to unlock!"
                    },
                "concept_3":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "CA",
                    "OPM":"CA: With this connection you seem to be handling the race condition and allow only one thread in each branch. Unlocking the semaphore in A from C would allow two threads to enter the left part of the board. This would require you to place another semaphore before the left and right most switches to make sure only one thread enters them at a time. Can you think of a better way to handle this. Hint! You can handle all the race conditions using one semaphore alone! Be smart where you want to unlock!"
                    },
                "concept_4":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "DB",
                    "OPM":"DB: With this connection you seem to be handling the race condition and allow only one thread in each branch. You need a symmetrical conection on the right side of the board. Can you think of ways to do it with one semaphore on the entire board?"
                    },
                "concept_5":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "EB",
                    "OPM":"EB: With this connection you seem to be handling the race condition and allow only one thread in each branch. You need a symmetrical conection on the right side of the board. Can you think of ways to do it with one semaphore on the entire board?"
                    },
                "concept_6":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "FC",
                    "OPM":"FC: With this connection you seem to be handling the race condition and allow only one thread in each branch. You need a symmetrical conection on the left side of the board. Can you think of ways to do it with one semaphore on the entire board?"
                    },
                "concept_7":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "GC",
                    "OPM":"GC: With this connection you seem to be handling the race condition and allow only one thread in each branch. You need a symmetrical conection on the left side of the board. Can you think of ways to do it with one semaphore on the entire board?"
                    },
                "concept_8":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "HA",
                    "OPM":"HA: You are connecting a signal with the semaphore in zone A. This is being done to prevent all threads entering the critical section. What other connections should you place to prevent race conditions."
                    },
                "concept_9":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "DA",
                    "OPM":"DA: You are connecting a signal with the semaphore in zone A. This is being done to prevent all threads entering the critical section. What other connections should you place to prevent race conditions."
                    },
                "concept_10":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "IA",
                    "OPM":"IA: You are connecting a signal with the semaphore in zone A. This is being done to prevent a race condition. But do you think the signal is supposed to be placed after the exchange point or before the exchange point."
                    },
                "concept_11":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "MS",
                    "OPM":"MS: You are connecting the signal with the left most switch. To turn the switch back you would need another symmetrically opposite signal. Can you think of a better way to do it using one signal!"
                    }, 
                "concept_12":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "ES",
                    "OPM":"ES: You are connecting the signal with the left most switch. To turn the switch back you would need another symmetrically opposite signal. Can you think of a better way to do it using one signal!"
                    },   
                "concept_13":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "DS",
                    "OPM":"DS: You are connecting the signal with the left most switch. To turn the switch back you would need another symmetrically opposite signal. Can you think of a better way to do it using one signal!"
                    }, 
                "concept_14":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "HS",
                    "OPM":"HS: You are connecting the signal with the left most switch. To turn the switch back you would need another symmetrically opposite signal. Can you think of a better way to do it using one signal!"
                    },
                "concept_15":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "HB",
                    "OPM":"HB: You are connecting the signal with a semaphore. You would need another semaphore near the right most switch. Can you think with of a way to build a solution with only one semaphore on the whole board."
                    }, 
                "concept_16":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "OR",
                    "OPM":"OR: You are trying to connect a signal in Zone O to the central switch. Do you think it is ideal to connect a signal from a branch to central switch? Think about where you can place the switch to have only two signals connected to the central switch."
                    }, 
                "concept_17":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "JA",
                    "OPM":"JA: You are connecting a signal with the semaphore in zone A. This is being done to prevent a race condition. But do you think the signal is supposed to be placed after the exchange point or before the exchange point."
                    },    
                "concept_18":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "JC",
                    "OPM":"JC: You are connecting the signal with a semaphore. You would need another semaphore near the left most switch. Can you think with of a way to build a solution with only one semaphore on the whole board."
                    },
                "concept_19":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "IS",
                    "OPM":"IS: You are connecting the signal with the left most switch. To turn the switch back you would need another symmetrically opposite signal. Can you think of a better way to do it using one signal!"
                    },
             
                "concept_20":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "KT",
                    "OPM":"KT: You are connecting the signal with the Right most switch. To turn the switch back you would need another symmetrically opposite signal. Can you think of a better way to do it using one signal!"
                    },

                "concept_21":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "KR",
                    "OPM":"KR: You are trying to connect a signal in Zone K to the central switch. Do you think it is ideal to connect a signal from a branch to central switch? Think about where you can place the switch to have only two signals connected to the central switch."
                    },    
                "concept_22":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "OA",
                    "OPM":"OA: You are trying to connect a signal in Zone O to a semaphore in A. Do you think this should be done after the exchange points? Try moving the the signal to Zone G."
                    }, 
                "concept_23":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "HR",
                    "OPM":"HR: You are trying to connect a signal in Zone H to the central switch. Do you think it is ideal to connect a signal from a branch to central switch? Think about where you can place the switch to have only two signals connected to the central switch."
                    },
                "concept_24":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "FT",
                    "OPM":"FT: You are connecting the signal with the right most switch. To turn the switch back you would need another symmetrically opposite signal. Can you think of a better way to do it using one signal!"
                    },
                "concept_25":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "GT",
                    "OPM":"GT: You are connecting the signal with the right most switch. To turn the switch back you would need another symmetrically opposite signal. Can you think of a better way to do it using one signal!"
                    },    
                "concept_26":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "EA",
                    "OPM":"EA: You are connecting a signal with the semaphore in zone A. This is being done to prevent all threads entering the critical section. What other connections should you place to prevent race conditions."
                    },
                "concept_27":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "FA",
                    "OPM":"FA: You are connecting a signal with the semaphore in zone A. This is being done to prevent all threads entering the critical section. What other connections should you place to prevent race conditions."
                    },
                "concept_28":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "GA",
                    "OPM":"GA: You are connecting a signal with the semaphore in zone A. This is being done to prevent all threads entering the critical section. What other connections should you place to prevent race conditions."
                    },
                "concept_29":{
                    "statement":"Trying to handle the switch",
                    "link": "BR",
                    "OPM":"BR: With this conection you are trying to change the direction of the switch. You would need a symmetric connection to turn it back again. Can you do it in one signal."
                    },
                "concept_30":{
                    "statement":"Trying to handle the switch",
                    "link": "CR",
                    "OPM":"CR: With this conection you are trying to change the direction of the switch. You would need a symmetric connection to turn it back again. Can you do it in one signal."
                    },
                "concept_31":{
                    "statement":"Trying to handle the switch",
                    "link": "CT",
                    "OPM":"CT: This is a great connection to handle the switch!"
                    },
                "concept_32":{
                    "statement":"Trying to handle the switch",
                    "link": "BS",
                    "OPM":"BS: This is a great connection to handle the switch!"
                    },
                "concept_33":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "IR",
                    "OPM":"IR: You are trying to connect a signal in Zone I to the central switch. Do you think it is ideal to connect a signal from a branch to central switch? Think about where you can place the switch to have only two signals connected to the central switch."
                    },
                "concept_33":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "AR",
                    "OPM":"AR: Great Connection to handle the central switch!"
                }, 
                "concept_34":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "IB",
                    "OPM":"IB: You are connecting the signal with a semaphore. You would need another semaphore near the right most switch. Can you think with of a way to build a solution with only one semaphore on the whole board."
                    },
                "concept_35":{
                    "statement":"Trying to prevent race condition and trying to send one thread into each branch.",
                    "link": "KC",
                    "OPM":"KC: You are connecting the signal with a semaphore. You would need another semaphore near the right most switch. Can you think with of a way to build a solution with only one semaphore on the whole board."
                    },

            }

    }
}
level_13_index_map = {0: "A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7: "H", 8:"I", 9:"J", 10:"W", 11:"X", 12:"Y", 13:"Z"}
level_15_index_map = {0: "A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7: "H", 8:"I", 9:"J",10:"K",11:"L",12:"M",13:"N",14:"O",15:"P",16:"Q",17:"R",18:"S",19:"T",20:"U",21:"V",22:"W"}
level_5_index_map = {0: "A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7: "H", 8:"I", 9:"J",10:"K",11:"L",12:"M",13:"N",14:"O",15:"P",16:"Q",17:"R",18:"S",19:"T",20:"U",21:"V",22:"W"}
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
                        link = f"{level_15_index_map[row]}{level_15_index_map[col]}"
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
                            suggestions.append(f"{link}:This link is not a popular link in the community! Not sure what the idea behind the link is!")
                            #alert(there is a new link can you give a reason)
            play_trace[player][action]["suggestions"]=suggestions
            print('========================')
        
        else:
            play_trace[player][action]["suggestions"]=[]


import collections
counter=collections.Counter(all_links)
print(counter)

print(set(all_links))
print('=================')

# out_file = open("trace_15_knowledge.json", "w") 
# json.dump(play_trace, out_file, indent = 6) 
# out_file.close() 
# print("Knowledge added in Play Trace Updated and saved")

