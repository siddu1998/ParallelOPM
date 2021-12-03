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
                    "OPM":"Great job with using the critical section to handle the default switch. Can you think of another position to place the signal!"
                    },
                "concept_2":{
                    "statement":"Handling the switch using Critical Section",
                    "link": "WY",
                    "OPM":"Great job with using the critical section to handle the default switch. Can you think of another position to place the signal!"
                    },
                "concept_3":{
                    "statement":"Handling the switch two signals",
                    "link": "JY",
                    "OPM":"You are trying to handle the switch. You have a connection between a signal in J and the switch. This aligns the switch in the direction of the pink thread. What needs to be done to align it again with the red thread."
                },
                "concept_4":{
                    "statement":"Handling the switch two signals",
                    "link": "FY",
                    "OPM":"You are trying to handle the switch.You have a connection between a signal in F and the switch. This turns the switch to align with the direction of the pink thread. What needs to be done to align it again with the red thread."
                },    
                "concept_5":{
                    "statement":"Handling the switch two signals",
                    "link": "DY",
                    "OPM":"You are trying to handle the switch. You have a connection between a signal in D and the switch. This turns the switch to align with the direction of the pink thread. What needs to be done to align it again with the red thread."
                },
                "concept_6":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "AI",
                    "OPM":"You have choosen a nice way to prevent race condition by locking the pink thread before the red thread delivers. Can you think of ways how the pink thread can block the red thread inorder to prevent a race condition."
                },
                "concept_7":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "AJ",
                    "OPM":"You have choosen a nice way to prevent race condition by locking the pink thread before the red thread delivers. Can you think of ways how the pink thread can block the red thread inorder to prevent a race condition."
                },
                "concept_8":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "DJ",
                    "OPM":"Your Choice for a link between D and J, could be to prevent the pink thread from moving before the red thread passes the switch. Is this is a good way go ahead? What happens if the red thread waits after passing through the switch. Would this lead to a race condition? Could you think of a way to move your signal from Zone D to a Zone after the red thread has delivered its package (or) Can you guard the critical section such that only one thread passes at a time."
                },
                "concept_9":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "DI",
                    "OPM":"Your Choice for a link between D and J, could be to prevent the pink thread from moving before the red thread passes the switch. Is this is a good way go ahead? What happens if the red thread waits after passing through the switch. Would this lead to a race condition? Could you think of a way to move your signal from Zone D to a Zone after the red thread has delivered its package (or) Can you guard the critical section such that only one thread passes at a time."
                },
                "concept_10":{},
                "concept_11":{},
                "concept_12":{},
                "concept_13":{},
                "concept_14":{},
                "concept_15":{},
                "concept_16":{},
                "concept_17":{}
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
            #get adjacency matrix of submission
            adjacency_matrix=play_trace[player][action]["adjacency_matrix"]
            #get links in that submissions
            for row in range(0,len(adjacency_matrix)):
                for col in range(0,len(adjacency_matrix[0])):
                    if adjacency_matrix[row][col]>0:
                        link = f"{level_13_index_map[row]}{level_13_index_map[col]}"
                        all_links.append(link)
                        print(f"[INFO] Link in between {link}")
                        for concept in knowledge[level]["concepts"]:
                            if link == knowledge[level]["concepts"][concept]["link"]:
                                print("--- Concept Found",concept,link)
                                print("--- [OPM]", knowledge[level]["concepts"][concept]["OPM"])
            print('========================')


print(set(all_links))