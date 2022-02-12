from flask import Flask, request
import json
from snapshot_status import getStatus
from getBoardID import get_board_ids
from BuildNewGlyph import *
from copy import copy, deepcopy
import numpy as np
from numpy import dot
from numpy.linalg import norm
import math
from scipy import spatial

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

CRITICAL_EVENTS=[
    "BEGIN_LEVEL_LOAD",
    'ADD_ELEMENT',
    'MOVE_ELEMENT',
    'TOGGLE_ELEMENT',
    'REMOVE_ELEMENT',
    'BEGIN_LINK',
]

knowledge = {
    "5":{
        "concepts":{}
    },
    "13":{
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
    "15":{
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
level_zone_mapper={
    "13":level_13_index_map,
    "15":level_15_index_map,
    "5":level_5_index_map
}



default_elements = {"13":{"L_dragonfruit_5001":(4,12)}}



class Abstraction:
    def __init__(self,level,board_state):
        self.level = str(level)
        self.zoneSheet = f'../DATA/maps_with_zones/MapInfo_{self.level}.json'
        self.level_info      = json.load(open(self.zoneSheet))
        self.zones         =   self.level_info[self.level]['mapAreas']      
        self.index         = 0
        self.indexMap      = {}
        self.nSemaphores   = 0
        self.nSignals      = 0
        
        #cordinates
        self.semaphorePositions = [] #(id,x,y,zone) 
        self.signalPositions    = [] #(id,x,y,zone)
        self.linkPositions      = [] #(position1,postion2)        
        #abstraction 1
        self.semaphore_zone_dict = {}
        self.signal_zone_dict    = {}
        self.link_dict           = {} #{"zone1zone2" : count}
        
        for zone in self.zones:
            self.indexMap[zone]=self.index
            self.index+=1
        
        print(self.indexMap)
        print('=========$$$$$$$$========$$$$$$======')
        self.indexMap["semaphore_row"]=self.index
        self.index+=1
        self.indexMap["signal_row"]=self.index
        
        self.adjaceny_matrix = [[0 for j in range(len(self.zones))] for i in range(len(self.zones)) ]  

        
    def getSemaphoreXY(self,id):
        if id==None:
            return (None,None)
        
        for semaphore in self.semaphorePositions:
            if semaphore[0]==id:
                return (semaphore[1],semaphore[2]) 
        return (None,None)
    def getSignalXY(self,id):
        for signal in self.signalPositions:
            if signal[0]==id:
                return signal[1],signal[2]
        return None
    def putSemaphore(self,x,y,id,status):
        zone  = self.getZone(x,y)
        if zone in self.semaphore_zone_dict:
            self.semaphore_zone_dict[zone]+=1
        else:
            self.semaphore_zone_dict[zone]=1
        #add the element to the board
        self.semaphorePositions.append((id,x,y,zone))
        #update the counts
        self.nSemaphores+=1

    def zoneIndex(self,zone):
        return self.indexMap[zone]
    def putSignal(self,x,y,id_1,id_2):
        #print(x,y)
        zone  = self.getZone(x,y)
        if zone in self.signal_zone_dict:
            self.signal_zone_dict[zone]+=1
        else:
            self.signal_zone_dict[zone]=1
        #print(f'[INFO] adding {id_1} to signal positions')
        self.signalPositions.append((id_1,x,y,zone))
        self.nSignals+=1
        #populate link dict
        (connection_x,connection_y) = self.getSemaphoreXY(id_2)
        if connection_x!=None:
            #print(connection_x,connection_y)
            #print(self.getZone(connection_x,connection_y),zone)
            key  = zone + self.getZone(connection_x,connection_y)
            if key in self.link_dict:
                self.link_dict[key]+=1
            else:
                self.link_dict[key]=1

            self.adjaceny_matrix[self.zoneIndex(zone)][self.zoneIndex(self.getZone(connection_x,connection_y))]+=1
            self.linkPositions.append([x,y,connection_x,connection_y])
        else:
            print('[INFO] This signal could not find a semaphore!')
            print('[INFO] This could be a link between a signal and a Default element!')
            print('[INFO] Attempting to search in default elements')
            if id_2!=None:
                (connection_x,connection_y) = default_elements[str(self.level)][id_2]
                if connection_x!=None:
                    print('[INFO] Yes! Default element found!')
                    key  = zone + self.getZone(connection_x,connection_y)
                    if key in self.link_dict:
                        self.link_dict[key]+=1
                    else:
                        self.link_dict[key]=1
                    
                    self.adjaceny_matrix[self.zoneIndex(zone)][self.zoneIndex(self.getZone(connection_x,connection_y))]+=1
                    self.linkPositions.append([x,y,connection_x,connection_y])
                else:
                    print("===================CONNECTION NOT FOUND IN DEFAULT ELEMENTS TOO!") 
                    
    #returns which zone a point belongs to 
    def getZone(self,x,y):
        query = [x,y]
        for zone in self.zones:
            if query in self.zones[zone]:
                return zone 
        return None
    
    def getAdjacencyMatrix(self):
        return self.adjaceny_matrix 
    
    def getAbstraction(self):
        abstraction = {
            'nSemaphores'     : self.nSemaphores,
            'nSignals'        : self.nSignals,
            'semaphore_zone_dict':self.semaphore_zone_dict,
            'signal_zone_dict':self.signal_zone_dict,
            'link_dict':self.link_dict,
        }
        return abstraction

    def getStateMatrix(self):
        semaphore_row = []
        signal_row    = []
        for zone in self.zones:
            if zone in self.semaphore_zone_dict:
                print(zone,"+1")
                semaphore_row.append(self.semaphore_zone_dict[zone])
            else:
                semaphore_row.append(0)
            if zone in self.signal_zone_dict:
                signal_row.append(self.signal_zone_dict[zone])
            else:
                signal_row.append(0)
        
        
        self.stateMatrix = deepcopy(self.adjaceny_matrix)

        self.stateMatrix.append(semaphore_row)
        self.stateMatrix.append(signal_row)

        return self.stateMatrix               
     
def buildAbstraction(level,board_state):
    abstraction = Abstraction(level,board_state)
    for item in board_state:
        if board_state[item]['type']=="semaphore":
            abstraction.putSemaphore(board_state[item]['element_x'],
                                     board_state[item]['element_y'],
                                     item,
                                     board_state[item]['status'])
    
    for item in board_state:        
        if board_state[item]['type']=='signal':
            abstraction.putSignal(board_state[item]['element_x'],
                                  board_state[item]['element_y'],
                                  item,
                                  board_state[item]['link'])

    return abstraction.getAbstraction(),abstraction.getAdjacencyMatrix(),abstraction.getStateMatrix()       
      
"""
Parameters Required  : Raw log file of user
Response : Abstracted Board State at all points and ticks and gosh a whole bunch of stuff!  
"""
@app.route('/getPlayerTrace')
def getPlayerTrace():
    data = json.loads(str(request.data, encoding='utf-8'))
    user = data['id']
    level = data['events'][0]['order']
    player_traces = {}
    order_change_events_behaviour = False
    same_zone_linking = False
    moving_connected_elements = False
    store_in_trace = True
    SCREENSHOT_FLAG=False
    
    knowledge_statement = "No Knowledge Statement"

    board_snapshot_ticks = "No Ticks Available"
    abstraction_object = Abstraction(level,{})
    #


    for index,event in enumerate(data['events']):    
        
        if event['type']=="BEGIN_LEVEL_LOAD":
            board_state = {}
            if SCREENSHOT_FLAG:
                stateShot = StateShot(board_state,f"{index}_{event['id']}","LEVEL RESTARTED",level,user) 
                stateShot.buildScreenShot()
    
        if event['type'] == 'ADD_ELEMENT':
            element_id   = event['element']['id']     #element id
            element_type = event['element']['type'] #semaphore, signal
            element_x = event['element']['cell'][0] #x
            element_y = event['element']['cell'][1] #y
            if element_type == 'signal':
                board_state[element_id] = {
                    "type":element_type,
                    "element_x":element_x,
                    "element_y":element_y,
                    "link":None
                }
            if element_type == 'semaphore':
                board_state[element_id] = {
                    "type":element_type,
                    "element_x":element_x,
                    "element_y":element_y,
                    "status":'inactive'
                }
                
            print('[INFO] Element Added',element_id)
            
            if SCREENSHOT_FLAG:            
                #CALL SCREEENSHOT on board_state
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
                                    
        if event['type'] == 'MOVE_ELEMENT':
            element_id   = event['element']['id']  #element id
            
            old_x = board_state[element_id]['element_x'] 
            old_y = board_state[element_id]['element_y']
            old_zone = abstraction_object.getZone(old_x,old_y)
            
            new_x = event['element']['cell'][0] #x
            new_y = event['element']['cell'][1] #y
            new_zone = abstraction_object.getZone(new_x,new_y)
            print(f"Element moved form {new_zone}, {old_zone},{(new_x,new_y)},{(old_x,old_y)}")
            
            if (new_x,new_y) != (old_x,old_y):
                print(f"#################### Element moved form {new_zone}, {old_zone},{(new_x,new_y)},{(old_x,old_y)}")                
                #update to new coordinates
                board_state[element_id]['element_x']=new_x
                board_state[element_id]['element_y']=new_y
                
                print('[INFO] Element Moved',element_id)
                
                if new_zone == old_zone:
                    order_change_events_behaviour=True
                #if the element is connected and being moved it is an interesting move and we want to flag!
                if board_state[element_id]["type"]=="signal":
                    if board_state[element_id]['link']!=None:
                        moving_connected_elements=True
                        print('[FLAGGGGG] The User is moving a connected element!!!!!')
                        
                elif board_state[element_id]["type"]=="semaphore":
                    for item in board_state:
                        if board_state[item]['type']=='signal':
                            try:
                                if board_state[item]['link']==element_id:
                                    moving_connected_elements=True
                                    print('[FLAGGGGG] The User is moving a connected element!!!!!')
                            except:
                                pass
                            
                #CALL SCREENSHOT on board_state
                if SCREENSHOT_FLAG:
                    stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                    stateShot.buildScreenShot()

            else:
                print('[INFOOOOOO] ############ ahaa did not actually move hence not adding to trace')
                store_in_trace = False
            
        if event['type'] == 'TOGGLE_ELEMENT':
            element_id   = event['element']['id']  #element id
            board_state[element_id]['status']=event['element']['spec']

            print('[INFO] Element Toggled',element_id)
            
            if SCREENSHOT_FLAG:
                #CALL SCREENSHOT on board_state
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()

        if event['type'] == 'REMOVE_ELEMENT':
            element_id = event['element']['id']         
            board_state.pop(element_id)
            #print('[INFO] Element Removed',element_id,file)            

            #if you are deleting a semaphore 
            # you want to delete the signal link
            for item in board_state:
                if board_state[item]['type']=='signal':
                    try:
                        if board_state[item]['link']==element_id:
                            board_state[item]['link']=None
                            print(f'[INFO] Element Link Removed {element_id} and {item}',)            

                    except:
                        pass

                    
                            
                
            if SCREENSHOT_FLAG:
                #CALL SCREENSHOT
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
               
        if event['type'] == 'BEGIN_LINK':
            print('[INFO] Adding a Link')
            element_1_id = event['element']['id']
            print('[INFO] Adding a Link',element_1_id)
            if data['events'][index+1]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+1]['element']['id']
                print(f"ADDING LINK : {element_1_id},{element_2_id}")    
                board_state[element_1_id]['link']=element_2_id
                try:
                    element_2_x =  board_state[element_2_id]['element_x']               
                    element_2_y =  board_state[element_2_id]['element_y']
                    #if element_2 not in board state and is possibly a default element
                except:
                    element_2_x = default_elements[str(level)][element_2_id][0]
                    element_2_y = default_elements[str(level)][element_2_id][1]
                element_1_x = board_state[element_1_id]['element_x']
                element_1_y = board_state[element_1_id]['element_y']
                
                element_2_zone = abstraction_object.getZone(element_2_x,element_2_y)
                element_1_zone = abstraction_object.getZone(element_1_x,element_1_y) 
                
                if element_2_zone == element_1_zone:
                    print("####[INFO] Connection Appears to be from the Same Zone! Flagging!###")
                    same_zone_linking = True
                    
                print(f"########################ADDING LINK : {element_1_id},{element_2_id},{element_2_zone},{element_1_zone}")
                                                       

            elif data['events'][index+2]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+2]['element']['id']
                print(f"ADDING LINK : {element_1_id},{element_2_id}")    
                board_state[element_1_id]['link']=element_2_id
                try:
                    element_2_x =  board_state[element_2_id]['element_x']               
                    element_2_y =  board_state[element_2_id]['element_y']
                    #if element_2 not in board state and is possibly a default element
                except:
                    element_2_x = default_elements[str(level)][element_2_id][0]
                    element_2_y = default_elements[str(level)][element_2_id][1]

                element_1_x = board_state[element_1_id]['element_x']
                element_1_y = board_state[element_1_id]['element_y']
                
                element_2_zone = abstraction_object.getZone(element_2_x,element_2_y)
                element_1_zone = abstraction_object.getZone(element_1_x,element_1_y) 
                if element_2_zone == element_1_zone:
                    print("####[INFO] Connection Appears to be from the Same Zone! Flagging!###")
                    same_zone_linking = True
                    
                print(f"ADDING LINK : {element_1_id},{element_2_id},{element_2_zone},{element_1_zone}")
            else:
                print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!![ERROR] Could Not find Finish Link!')
                print('[INFO] Either CODE needs fix or the log file is corrupted')
                #print(file)
            
            knowledge_statement=f"Adding Link:{element_1_zone}:{element_2_zone}"
            print(knowledge_statement)

            #CALL SCREENSHOT            
            if SCREENSHOT_FLAG:
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
        
        if event['type'] == 'FINISH_SIMULATION':
            board_snapshot_ticks = event['total']
        
        if event['type']=='BOARD_SNAPSHOT':
            #No element manipulation 
            # so just Build the screenshot
            if SCREENSHOT_FLAG:
                text  = getStatus(data,event['id'])                    
                stateShot = StateShot(board_state,f"{index}_{event['id']}",text,level,user,event['type']) 
                stateShot.buildScreenShot()
           
        #Calling Abstraction
        if store_in_trace:
            if event['type'] in CRITICAL_EVENTS:                   
                abstraction,adjacency_matrix,state_matrix =  buildAbstraction(level,board_state)
                if user in player_traces:
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix,
                        "state_matrix":state_matrix,
                        "discussion":[],
                        "upvotes":0,
                        "knowledge_statement":knowledge_statement,
                        "created": event['created']
                    }
                else:
                    player_traces[user]={}
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix, 
                        "state_matrix":state_matrix,                   
                        "discussion":[],
                        "upvotes":0,
                        "knowledge_statement":knowledge_statement,
                        "created":event['created']

                    }
            
            if event['type']=='BOARD_SNAPSHOT':                   
                abstraction,adjacency_matrix,state_matrix =  buildAbstraction(level,board_state)
                if user in player_traces:
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix,
                        "state_matrix":state_matrix,                    
                        "discussion":[],
                        "upvotes":0,
                        "created": event['created'],
                        "submission_result" : getStatus(data,event['id']),
                        "ticks":board_snapshot_ticks,
                        "no_order_change_behaviour_issue":order_change_events_behaviour,
                        "same_zone_linking":same_zone_linking,
                        "knowledge_statement":knowledge_statement,
                        "moving_connected_elements":moving_connected_elements
                    }
                else:
                    player_traces[user]={}
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix,
                        "state_matrix":state_matrix,
                        "discussion":[],
                        "upvotes":0,
                        "created":event['created'],
                        "submission_result" : getStatus(data,event['id']),
                        "ticks":board_snapshot_ticks,
                        "no_order_change_behaviour_issue":order_change_events_behaviour,
                        "same_zone_linking":same_zone_linking,
                        "knowledge_statement":knowledge_statement,
                        "moving_connected_elements":moving_connected_elements
                    }
            
                board_snapshot_ticks = "No Ticks Available"
                order_change_events_behaviour = False
                same_zone_linking=False
                moving_connected_elements = False
                knowledge_statement="No Knowledge Statement",
        
        store_in_trace = True

    for player in player_traces:
        #go through player actions
        for action in player_traces[player]:
            #get player submissions
            if player_traces[player][action]["type"]=="BOARD_SNAPSHOT":
                print("Player ID: ", player)
                print("Event ID: ",action)
                suggestions = []
                #get adjacency matrix of submission
                adjacency_matrix=player_traces[player][action]["adjacency_matrix"]
                #get links in that submissions
                for row in range(0,len(adjacency_matrix)):
                    for col in range(0,len(adjacency_matrix[0])):
                        k_flag = False
                        if adjacency_matrix[row][col]>0:
                            link = f"{level_zone_mapper[level][row]}{level_zone_mapper[level][col]}"
                            
                            print(f"[INFO] Link in between {link}")
                            for concept in knowledge[str(level)]["concepts"]:
                                if link == knowledge[str(level)]["concepts"][concept]["link"]:
                                    print("--- Concept Found",concept,link)
                                    print("--- [OPM]", knowledge[level]["concepts"][concept]["OPM"])
                                    suggestions.append(knowledge[level]["concepts"][concept]["OPM"])
                                    k_flag = True
                            if k_flag==False:
                                print('[WARNING] NEW LINK FOUND! No Reasoning Found for this link')
                                suggestions.append(f"{link}:This link is not a popular link in the community! Not sure what the idea behind the link is!")
                                #alert(there is a new link can you give a reason)
                player_traces[player][action]["suggestions"]=suggestions
                print('========================')
            
            else:
                player_traces[player][action]["suggestions"]=[]

            player_traces[player][action].pop("adjacency_matrix")
            player_traces[player][action].pop("discussion")
            player_traces[player][action].pop("upvotes")
            player_traces[player][action].pop("state_matrix")

    return player_traces



"""
Parameters Required : Level and Raw log files of all users in the study
Response : Glyph Visualization File
"""
@app.route('/getGlyph')
def getGlyphFile():
    data = json.loads(str(request.data, encoding='utf-8'))
    level = data['level']
    raw_logs = data['raw_logs']
    #some api to pull all those log files which takes in study and level
    player_traces = {}
    board_snapshot_ticks = "No Ticks Available"
    for player in raw_logs:
        print(player)
        user = player
        board_state = {}
        
        board_snapshot_ticks = "No Ticks Available"
        data = raw_logs[user]
        print(data['events'])
        for index,event in enumerate(data['events']):                
            if event['type']=="BEGIN_LEVEL_LOAD":
                board_state = {}
        
            if event['type'] == 'ADD_ELEMENT':
                element_id   = event['element']['id']     #element id
                element_type = event['element']['type'] #semaphore, signal
                element_x = event['element']['cell'][0] #x
                element_y = event['element']['cell'][1] #y
                if element_type == 'signal':
                    board_state[element_id] = {
                        "type":element_type,
                        "element_x":element_x,
                        "element_y":element_y,
                        "link":None
                    }
                if element_type == 'semaphore':
                    board_state[element_id] = {
                        "type":element_type,
                        "element_x":element_x,
                        "element_y":element_y,
                        "status":'inactive'
                    }
                    
                print('[INFO] Element Added',element_id)
                
                                    
            if event['type'] == 'MOVE_ELEMENT':
                element_id   = event['element']['id']  #element id
                new_x = event['element']['cell'][0] #x
                new_y = event['element']['cell'][1] #y
                
                #update to new coordinates
                board_state[element_id]['element_x']=new_x
                board_state[element_id]['element_y']=new_y
                
                print('[INFO] Element Moved',element_id)

            if event['type'] == 'TOGGLE_ELEMENT':
                element_id   = event['element']['id']  #element id
                board_state[element_id]['status']=event['element']['spec']
                print('[INFO] Element Toggled',element_id)

            if event['type'] == 'REMOVE_ELEMENT':
                element_id = event['element']['id']         
                board_state.pop(element_id)
                print('[INFO] Element Removed',element_id)            

                for item in board_state:
                    if board_state[item]['type']=='signal':
                        try:
                            if board_state[item]['link']==element_id:
                                board_state[item]['link']=None
                                print(f'[INFO] Element Link Removed {element_id} and {item}',)            

                        except:
                            pass
                            
                
                #CALL SCREENSHOT
                
            if event['type'] == 'BEGIN_LINK':
                print('[INFO] Adding a Link')
                element_1_id = event['element']['id']
                print('[INFO] Adding a Link',element_1_id)
                if data['events'][index+1]['type']=='FINISH_LINK':
                    element_2_id = data['events'][index+1]['element']['id']
                    print(element_2_id)
                else:
                    print('[ERROR] Could Not find Finish Link!')
                    print('[INFO] Either CODE needs fix or the log file is corrupted')
                    
                board_state[element_1_id]['link']=element_2_id

            
            if event['type'] == 'FINISH_SIMULATION':
                board_snapshot_ticks = event['total']
            
            if event['type']=='BOARD_SNAPSHOT':
                pass
            
            #Calling Abstraction
            if event['type'] in CRITICAL_EVENTS:                   
                if user in player_traces:
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":buildAbstraction(level,board_state),
                        "discussion":[],
                        "upvotes":0,
                        "created": event['created']
                    }
                else:
                    player_traces[user]={}
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":buildAbstraction(level,board_state),
                        "discussion":[],
                        "upvotes":0,
                        "created":event['created']
                    }
            
            if event['type']=='BOARD_SNAPSHOT':                   
                if user in player_traces:
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":buildAbstraction(level,board_state),
                        "discussion":[],
                        "upvotes":0,
                        "created": event['created'],
                        "submission_result" : getStatus(data,event['id']),
                        "ticks":board_snapshot_ticks
                    }
                else:
                    player_traces[user]={}
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":buildAbstraction(level,board_state),
                        "discussion":[],
                        "upvotes":0,
                        "created":event['created'],
                        "submission_result" : getStatus(data,event['id']),
                        "ticks":board_snapshot_ticks

                    }
            
                board_snapshot_ticks = "No Ticks Available"


    # #BUILD GLYPH Visualization
    print('[INFO] Building Glyph Visualization')
    userStates = {}
    userActions = {}
    usermap = {}
     
    for player in player_traces:
        board_snapshot_abstractions = []
        for event in player_traces[player]:
            if player_traces[player][event]['type']=='BOARD_SNAPSHOT':
                board_snapshot_abstractions.append(player_traces[player][event]["abstracted_board_state"])
        
        userStates[f"{player}.json"]=board_snapshot_abstractions
        userActions[f"{player}.json"]=["Recieved Next State"]*(len(userStates[f"{player}.json"])-1 )     
        userboardids=get_board_ids(raw_logs) 

    
    for user in raw_logs:
        usermap[user+'.json']=user+'.json'
    print(userStates,userActions,usermap,userboardids)
    glyphBuilder = GlyphBuilder(userStates, userActions, userboardids,usermap)
    glyph_vis = glyphBuilder.run()
    
    print(player_traces)
    print('[INFO] GLYPH Visualizatoin Built and saved')
    return {"glyph_vis":glyph_vis, "player_traces":player_traces}


def getPlayerTrace_internal(data):
    user = data['id']
    level = data['events'][0]['order']
    player_traces = {}
    order_change_events_behaviour = False
    same_zone_linking = False
    moving_connected_elements = False
    store_in_trace = True
    SCREENSHOT_FLAG=False
    
    knowledge_statement = "No Knowledge Statement"

    board_snapshot_ticks = "No Ticks Available"
    abstraction_object = Abstraction(level,{})
    #


    for index,event in enumerate(data['events']):    
        
        if event['type']=="BEGIN_LEVEL_LOAD":
            board_state = {}
            if SCREENSHOT_FLAG:
                stateShot = StateShot(board_state,f"{index}_{event['id']}","LEVEL RESTARTED",level,user) 
                stateShot.buildScreenShot()
    
        if event['type'] == 'ADD_ELEMENT':
            element_id   = event['element']['id']     #element id
            element_type = event['element']['type'] #semaphore, signal
            element_x = event['element']['cell'][0] #x
            element_y = event['element']['cell'][1] #y
            if element_type == 'signal':
                board_state[element_id] = {
                    "type":element_type,
                    "element_x":element_x,
                    "element_y":element_y,
                    "link":None
                }
            if element_type == 'semaphore':
                board_state[element_id] = {
                    "type":element_type,
                    "element_x":element_x,
                    "element_y":element_y,
                    "status":'inactive'
                }
                
            print('[INFO] Element Added',element_id)
            
            if SCREENSHOT_FLAG:            
                #CALL SCREEENSHOT on board_state
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
                                    
        if event['type'] == 'MOVE_ELEMENT':
            element_id   = event['element']['id']  #element id
            
            old_x = board_state[element_id]['element_x'] 
            old_y = board_state[element_id]['element_y']
            old_zone = abstraction_object.getZone(old_x,old_y)
            
            new_x = event['element']['cell'][0] #x
            new_y = event['element']['cell'][1] #y
            new_zone = abstraction_object.getZone(new_x,new_y)
            print(f"Element moved form {new_zone}, {old_zone},{(new_x,new_y)},{(old_x,old_y)}")
            
            if (new_x,new_y) != (old_x,old_y):
                print(f"#################### Element moved form {new_zone}, {old_zone},{(new_x,new_y)},{(old_x,old_y)}")                
                #update to new coordinates
                board_state[element_id]['element_x']=new_x
                board_state[element_id]['element_y']=new_y
                
                print('[INFO] Element Moved',element_id)
                
                if new_zone == old_zone:
                    order_change_events_behaviour=True
                #if the element is connected and being moved it is an interesting move and we want to flag!
                if board_state[element_id]["type"]=="signal":
                    if board_state[element_id]['link']!=None:
                        moving_connected_elements=True
                        print('[FLAGGGGG] The User is moving a connected element!!!!!')
                        
                elif board_state[element_id]["type"]=="semaphore":
                    for item in board_state:
                        if board_state[item]['type']=='signal':
                            try:
                                if board_state[item]['link']==element_id:
                                    moving_connected_elements=True
                                    print('[FLAGGGGG] The User is moving a connected element!!!!!')
                            except:
                                pass
                            
                #CALL SCREENSHOT on board_state
                if SCREENSHOT_FLAG:
                    stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                    stateShot.buildScreenShot()

            else:
                print('[INFOOOOOO] ############ ahaa did not actually move hence not adding to trace')
                store_in_trace = False
            
        if event['type'] == 'TOGGLE_ELEMENT':
            element_id   = event['element']['id']  #element id
            board_state[element_id]['status']=event['element']['spec']

            print('[INFO] Element Toggled',element_id)
            
            if SCREENSHOT_FLAG:
                #CALL SCREENSHOT on board_state
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()

        if event['type'] == 'REMOVE_ELEMENT':
            element_id = event['element']['id']         
            board_state.pop(element_id)
            #print('[INFO] Element Removed',element_id,file)            

            #if you are deleting a semaphore 
            # you want to delete the signal link
            for item in board_state:
                if board_state[item]['type']=='signal':
                    try:
                        if board_state[item]['link']==element_id:
                            board_state[item]['link']=None
                            print(f'[INFO] Element Link Removed {element_id} and {item}',)            

                    except:
                        pass

                    
                            
                
            if SCREENSHOT_FLAG:
                #CALL SCREENSHOT
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
               
        if event['type'] == 'BEGIN_LINK':
            print('[INFO] Adding a Link')
            element_1_id = event['element']['id']
            print('[INFO] Adding a Link',element_1_id)
            if data['events'][index+1]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+1]['element']['id']
                print(f"ADDING LINK : {element_1_id},{element_2_id}")    
                board_state[element_1_id]['link']=element_2_id
                try:
                    element_2_x =  board_state[element_2_id]['element_x']               
                    element_2_y =  board_state[element_2_id]['element_y']
                    #if element_2 not in board state and is possibly a default element
                except:
                    element_2_x = default_elements[str(level)][element_2_id][0]
                    element_2_y = default_elements[str(level)][element_2_id][1]
                element_1_x = board_state[element_1_id]['element_x']
                element_1_y = board_state[element_1_id]['element_y']
                
                element_2_zone = abstraction_object.getZone(element_2_x,element_2_y)
                element_1_zone = abstraction_object.getZone(element_1_x,element_1_y) 
                
                if element_2_zone == element_1_zone:
                    print("####[INFO] Connection Appears to be from the Same Zone! Flagging!###")
                    same_zone_linking = True
                    
                print(f"########################ADDING LINK : {element_1_id},{element_2_id},{element_2_zone},{element_1_zone}")
                                                       

            elif data['events'][index+2]['type']=='FINISH_LINK':
                element_2_id = data['events'][index+2]['element']['id']
                print(f"ADDING LINK : {element_1_id},{element_2_id}")    
                board_state[element_1_id]['link']=element_2_id
                try:
                    element_2_x =  board_state[element_2_id]['element_x']               
                    element_2_y =  board_state[element_2_id]['element_y']
                    #if element_2 not in board state and is possibly a default element
                except:
                    element_2_x = default_elements[str(level)][element_2_id][0]
                    element_2_y = default_elements[str(level)][element_2_id][1]

                element_1_x = board_state[element_1_id]['element_x']
                element_1_y = board_state[element_1_id]['element_y']
                
                element_2_zone = abstraction_object.getZone(element_2_x,element_2_y)
                element_1_zone = abstraction_object.getZone(element_1_x,element_1_y) 
                if element_2_zone == element_1_zone:
                    print("####[INFO] Connection Appears to be from the Same Zone! Flagging!###")
                    same_zone_linking = True
                    
                print(f"ADDING LINK : {element_1_id},{element_2_id},{element_2_zone},{element_1_zone}")
            else:
                print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!![ERROR] Could Not find Finish Link!')
                print('[INFO] Either CODE needs fix or the log file is corrupted')
                #print(file)
            
            knowledge_statement=f"Adding Link:{element_1_zone}:{element_2_zone}"
            print(knowledge_statement)

            #CALL SCREENSHOT            
            if SCREENSHOT_FLAG:
                stateShot = StateShot(board_state,f"{index}_{event['id']}",event['type'],level,user) 
                stateShot.buildScreenShot()
        
        if event['type'] == 'FINISH_SIMULATION':
            board_snapshot_ticks = event['total']
        
        if event['type']=='BOARD_SNAPSHOT':
            #No element manipulation 
            # so just Build the screenshot
            if SCREENSHOT_FLAG:
                text  = getStatus(data,event['id'])                    
                stateShot = StateShot(board_state,f"{index}_{event['id']}",text,level,user,event['type']) 
                stateShot.buildScreenShot()
           
        #Calling Abstraction
        if store_in_trace:
            if event['type'] in CRITICAL_EVENTS:                   
                abstraction,adjacency_matrix,state_matrix =  buildAbstraction(level,board_state)
                if user in player_traces:
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix,
                        "state_matrix":state_matrix,
                        "discussion":[],
                        "upvotes":0,
                        "knowledge_statement":knowledge_statement,
                        "created": event['created']
                    }
                else:
                    player_traces[user]={}
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix, 
                        "state_matrix":state_matrix,                   
                        "discussion":[],
                        "upvotes":0,
                        "knowledge_statement":knowledge_statement,
                        "created":event['created']

                    }
            
            if event['type']=='BOARD_SNAPSHOT':                   
                abstraction,adjacency_matrix,state_matrix =  buildAbstraction(level,board_state)
                if user in player_traces:
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix,
                        "state_matrix":state_matrix,                    
                        "discussion":[],
                        "upvotes":0,
                        "created": event['created'],
                        "submission_result" : getStatus(data,event['id']),
                        "ticks":board_snapshot_ticks,
                        "no_order_change_behaviour_issue":order_change_events_behaviour,
                        "same_zone_linking":same_zone_linking,
                        "knowledge_statement":knowledge_statement,
                        "moving_connected_elements":moving_connected_elements
                    }
                else:
                    player_traces[user]={}
                    player_traces[user][event['id']]={
                        "id":event['id'],
                        "type":event['type'],
                        "screenshot":f"{index}_{event['id']}.png",
                        "absolute_board_state":board_state.copy(),
                        "abstracted_board_state":abstraction,
                        "adjacency_matrix":adjacency_matrix,
                        "state_matrix":state_matrix,
                        "discussion":[],
                        "upvotes":0,
                        "created":event['created'],
                        "submission_result" : getStatus(data,event['id']),
                        "ticks":board_snapshot_ticks,
                        "no_order_change_behaviour_issue":order_change_events_behaviour,
                        "same_zone_linking":same_zone_linking,
                        "knowledge_statement":knowledge_statement,
                        "moving_connected_elements":moving_connected_elements
                    }
            
                board_snapshot_ticks = "No Ticks Available"
                order_change_events_behaviour = False
                same_zone_linking=False
                moving_connected_elements = False
                knowledge_statement="No Knowledge Statement",
        
        store_in_trace = True

    for player in player_traces:
        #go through player actions
        for action in player_traces[player]:
            #get player submissions
            if player_traces[player][action]["type"]=="BOARD_SNAPSHOT":
                print("Player ID: ", player)
                print("Event ID: ",action)
                suggestions = []
                #get adjacency matrix of submission
                adjacency_matrix=player_traces[player][action]["adjacency_matrix"]
                #get links in that submissions
                for row in range(0,len(adjacency_matrix)):
                    for col in range(0,len(adjacency_matrix[0])):
                        k_flag = False
                        if adjacency_matrix[row][col]>0:
                            link = f"{level_zone_mapper[level][row]}{level_zone_mapper[level][col]}"
                            
                            print(f"[INFO] Link in between {link}")
                            for concept in knowledge[str(level)]["concepts"]:
                                if link == knowledge[str(level)]["concepts"][concept]["link"]:
                                    print("--- Concept Found",concept,link)
                                    print("--- [OPM]", knowledge[level]["concepts"][concept]["OPM"])
                                    suggestions.append(knowledge[level]["concepts"][concept]["OPM"])
                                    k_flag = True
                            if k_flag==False:
                                print('[WARNING] NEW LINK FOUND! No Reasoning Found for this link')
                                suggestions.append(f"{link}:This link is not a popular link in the community! Not sure what the idea behind the link is!")
                                #alert(there is a new link can you give a reason)
                player_traces[player][action]["suggestions"]=suggestions
                print('========================')
            
            else:
                player_traces[player][action]["suggestions"]=[]



    return player_traces


def cosine(a,b):
    if (np.isnan(round(dot(a, b)/(norm(a)*norm(b)),2))):
        print("NAN FOUND", a,b)
        return "x" 
    return round(dot(a, b)/(norm(a)*norm(b)),2)



@app.route('/getSimillar')
def getSimillar():
    data = json.loads(str(request.data, encoding='utf-8'))
    player_1 = data['id']
    data     = getPlayerTrace_internal(data)

    #REPLACE with API from Dev Team
    fileName = "../../trace_13_knowledge.json"
    other_players = json.load(open(fileName))


    output = {}

    output[player_1]={}
    for player_2 in other_players: #choose all other player
        output[player_1][player_2]={}
        for player_1_event in data[player_1]: #choose one event of first player
            if data[player_1][player_1_event]["type"]=="BOARD_SNAPSHOT":
                output[player_1][player_2][player_1_event]={}
                for player_2_event in other_players[player_2]:  #choose all other player events
                    if other_players[player_2][player_2_event]["type"]=="BOARD_SNAPSHOT":
                        matrix_1 = data[player_1][player_1_event]['state_matrix']
                        matrix_2 = other_players[player_2][player_2_event]['state_matrix']
                        matrix_1 = np.array(matrix_1).flatten()
                        matrix_2 = np.array(matrix_2).flatten()
                        consine_similarity =  cosine(matrix_1,matrix_2)
                        print(consine_similarity,type(consine_similarity))
                        if consine_similarity=="x":
                            pass
                        elif consine_similarity>0.3:
                            output[player_1][player_2][player_1_event][player_2_event]=consine_similarity


    return {"simillarity":output}

    
    


@app.route('/')
def hello_world():
    return 'Hello World'
  
if __name__ == '__main__':  
    app.run(debug=True)
