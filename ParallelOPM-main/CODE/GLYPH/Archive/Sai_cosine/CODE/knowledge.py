top_text_list_13=[
    "The system found a move that can be further optimized.",
    "The system found a move that is causing a race condition.",
    "The system found an accurate move! You have prevented a race condition.",
    "The system found an accurate move! You have used the critical section efficiently.",
    "breathing space 1"," breating space 2","breathing space 3","breathing space 4"
    ]
knowledge = {
    "5":{
        "concepts":{}
    },
    "10":{
        "concepts":{
        }
    },
    "13":{
            "concepts":{
                "concept_1":{
                    "statement":"Handling the switch using Critical Section",
                    "link": "ZY",
                    "OPM":"Great job using the critical section to handle the switch! Click the (+) button to see other accurate moves associated with the switch.",
                    "for_me_to_examine":"Examine your link in Zone Z and Y. This is an efficient way to prevent a race condition using the critical section. There are other ways to handle this link.",
                    "for_others_to_examine":"Examine how this player handles the switch with a connection between Zone Z and Zone Y.",
                    "classification" : "good",
                    "recommendation_links":["WY","BY","CY"],
                    "top_text":top_text_list_13[3]
                    },
                "concept_2":{
                    "statement":"Handling the switch using Critical Section",
                    "link": "WY",
                    "OPM":"WY: Great job with using the critical section to handle the default switch. Can you think of another position to place the signal!",
                    "for_me_to_examine":"Great job using the critical section to handle the switch! Click the (+) button to see other accurate moves associated with the switch.",
                    "for_others_to_examine":"Examine how this player handles the switch using the critical section with a connection between Zone W and Zone Y.",
                    "classification":"good",
                    "recommendation_links":["ZY","BY","CY"],
                    "top_text":top_text_list_13[3]
                    },
                "concept_3":{
                    "statement":"Handling the switch two signals",
                    "link": "JY",
                    "OPM":"You have a signal in Zone J connected to the switch. This could be handled more efficiently by engaging with the critical section. Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone J and Y. Is this the best way to handle the switch?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["ZY","WY","BY","CY"],
                    "top_text":top_text_list_13[0]
                },
                "concept_4":{
                    "statement":"Handling the switch two signals",
                    "link": "FY",
                    "OPM":"You have a signal in Zone F connected to the switch. This could be handled more efficiently by engaging with the critical section. Click the (+) button to add another player to your play trace to see how others have dealt with this problem. There are two ways the community has rectified this inaccuracy.",
                    "for_me_to_examine":"Examine your link in Zone F and Y. Is this the best way to handle the switch?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["ZY","WY","BY","CY"],
                    "top_text":top_text_list_13[0]
                },    
                "concept_5":{
                    "statement":"Handling the switch two signals",
                    "link": "DY",
                    "OPM":"You have a signal in Zone D connected to the switch. This could be handled more efficiently by engaging with the critical section. Click the (+) button to add another player to your play trace to see how others have dealt with this problem. There are two ways the community has rectified this inaccuracy.",
                    "for_me_to_examine":"Examine your link in Zone D and Y. Is this the best way to handle the switch?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["ZY","WY","BY","CY"],
                    "top_text":top_text_list_13[0]

                },
                "concept_6":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "AI",
                    "OPM":"AI: You have choosen a nice way to prevent race condition by locking the pink thread before the red thread delivers. Can you think of ways how the pink thread can block the red thread inorder to prevent a race condition.",
                    "for_me_to_examine":"This is a brilliant move! You prevented a race condition by locking the red thread before the pink thread delivers. Click the (+) button to add another player to your play trace to see other accurate moves associated with this move.",
                    "for_others_to_examine":"Examine an alternate approach by this player to prevent a race condition by placing a link between Zone A and Zone I.",
                    "classification":"good",
                    "recommendation_links":["AJ"],
                    "top_text":top_text_list_13[2]
                },
                "concept_7":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "AJ",
                    "OPM":"This is a brilliant move! You prevented a race condition by locking the pink thread before the red thread delivers. Click the (+) button to add another player to your play trace to see other accurate moves associated with this move.",
                    "for_me_to_examine":"Examine your link in Zone A and J. This is an efficient way to prevent a race condition. There are other ways to handle this link.",
                    "for_others_to_examine":"Examine an alternate approach by this player to prevent a race condition by placing a link between Zone A and Zone J.",
                    "classification":"good",
                    "recommendation_links":["AI"],
                    "top_text":top_text_list_13[2]
                },
                "concept_8":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "DJ",
                    "OPM":"You have a signal in Zone D connected to a semaphore in Zone J. You seem to be preventing a race condition by blocking the pink thread before the red thread passes through the switch. This is an inaccurate move, since the red thread can wait after passing the switch leading to a race condition. Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone D and J. Is this the best way to handle the race condition?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["AI","AJ"],
                    "top_text":top_text_list_13[1]
                },
                "concept_9":{
                    "statement":"Handling Race Condition (Red thread Blocking Pink thread)",
                    "link": "DI",
                    "OPM":"You have a signal in Zone D connected to a semaphore in Zone I. You seem to be preventing a race condition by blocking the pink thread before the red thread passes through the switch. This is an inaccurate move, since the red thread can wait after passing the switch leading to a race condition .Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone D and I. Is this the best way to handle the race condition?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["AI","AJ"],
                    "top_text":top_text_list_13[1]
                },
                "concept_10":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "EA",
                    "OPM":"This is a brilliant move! You prevented a race condition by locking the red thread before the pink thread delivers. Click the (+) button to add another player to your play trace to see other accurate moves associated with this move.",
                    "for_me_to_examine":"Examine your link in Zone E and A. This is an efficient way to prevent a race condition. There are other ways to handle this link.",
                    "for_others_to_examine":"Examine an alternate approach by this player to prevent a race condition by placing a link between Zone E and Zone A.",
                    "classification":"good",
                    "recommendation_links":["EG","EH","IA","IG","IH"],
                    "top_text":top_text_list_13[2]
                },
                "concept_11":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "EG",
                    "OPM":"This is a brilliant move! You prevented a race condition by locking the red thread before the pink thread delivers. Click the (+) button to add another player to your play trace to see other accurate moves associated with this move.",                  
                    "for_me_to_examine":"Examine your link in Zone E and G. This is an efficient way to prevent a race condition. There are other ways to handle this link.",
                    "for_others_to_examine":"Examine an alternate approach by this player to prevent a race condition by placing a link between Zone E and Zone G.",
                    "classification":"good",
                    "recommendation_links":["EA","EH","IA","IG","IH"],
                    "top_text":top_text_list_13[2]
                },
                "concept_12":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "EH",
                    "OPM":"This is a brilliant move! You prevented a race condition by locking the red thread before the pink thread delivers. Click the (+) button to add another player to your play trace to see other accurate moves associated with this move.",                 
                    "for_me_to_examine":"Examine your link in Zone E and H. This is an efficient way to prevent a race condition. There are other ways to handle this link.",
                    "for_others_to_examine":"Examine an alternate approach by this player to prevent a race condition by placing a link between Zone E and Zone H.",
                    "classification":"good",
                    "recommendation_links":["EA","EG","IA","IG","IH"],
                    "top_text":top_text_list_13[2]
                },
                "concept_13":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "IA",
                    "OPM":"This is a brilliant move! You prevented a race condition by locking the red thread before the pink thread delivers. Click the (+) button to add another player to your play trace to see other accurate moves associated with this move.",                    
                    "for_me_to_examine":"Examine your link in Zone I and A. This is an efficient way to prevent a race condition. There are other ways to handle this link.",
                    "for_others_to_examine":"Examine an alternate approach by this player to prevent a race condition by placing a link between Zone I and Zone A.",
                    "classification":"good",
                    "recommendation_links":["EA","EG","EH","IG","IH"],
                    "top_text":top_text_list_13[2]
                },
                "concept_14":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "IG",
                    "OPM":"This is a brilliant move! You prevented a race condition by locking the red thread before the pink thread delivers. Click the (+) button to add another player to your play trace to see other accurate moves associated with this move.",                    
                    "for_me_to_examine":"Examine your link in Zone I and G. This is an efficient way to prevent a race condition. There are other ways to handle this link.",
                    "for_others_to_examine":"Examine an alternate approach by this player to prevent a race condition by placing a link between Zone I and Zone G.",
                    "classification":"good",
                    "recommendation_links":["EA","EG","EH","IA","IH"],
                    "top_text":top_text_list_13[2]
                },
                "concept_15":{
                    "statement":"Handling Race Condition (Pink thread Blocking Red thread)",
                    "link": "IH",
                    "OPM":"This is a brilliant move! You prevented a race condition by locking the red thread before the pink thread delivers. Click the (+) button to add another player to your play trace to see other accurate moves associated with this move.",                    
                    "for_me_to_examine":"Examine your link in Zone I and H. This is an efficient way to prevent a race condition. There are other ways to handle this link.",
                    "for_others_to_examine":"Examine an alternate approach by this player to prevent a race condition by placing a link between Zone I and Zone H.",
                    "classification":"good",
                    "recommendation_links":["EA","EG","EH","IA","IG"],
                    "top_text":top_text_list_13[2]               
                },
                "concept_16":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "HJ",
                    "OPM":"You have a signal in Zone H connected to a semaphore in Zone J. You seem to be preventing a race condition by unlocking the pink thread before the red thread delivers its package. Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",                    
                    "for_me_to_examine":"Examine your link in Zone H and J. Is this the best way to block the pink thread from moving before the red thread?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["EA","EG","EH","IA","IG","IH"],
                    "top_text":top_text_list_13[1]
                },
                "concept_17":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "BJ",
                    "OPM":"You have a signal in Zone B connected to a semaphore in Zone J. You seem to be preventing a race condition by unlocking the pink thread before the red thread delivers its package. Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",                    
                    "for_me_to_examine":"Examine your link in Zone B and J. Is this the best way to block the pink thread from moving before the red thread?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["EA","EG","EH","IA","IG","IH"],
                    "top_text":top_text_list_13[1]
                },
                "concept_18":{
                    "statement":"Handling the switch two signals",
                    "link": "EY",
                    "OPM":"You have a signal in Zone E connected to the switch. This could be handled more efficiently by engaging with the critical section. Click the (+) button to add another player to your play trace to see how others have dealt with this problem. There are other ways the community has rectified this inaccuracy.",
                    "for_me_to_examine":"Examine your link in Zone E and Y. Is this the best way to handle the switch?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["ZY","WY","BY","CY"],
                    "top_text":top_text_list_13[0]
                },
                "concept_19":{
                    "statement":"Handling the switch two signals",
                    "link": "AY",
                    "OPM":"You have a signal in Zone A connected to the switch. This could be handled more efficiently by engaging with the critical section. Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link between Zone A and Zone Y. Is this the best way to handle the switch?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["ZY","WY","BY","CY"],
                    "top_text":top_text_list_13[0]
                },
                "concept_20":{
                    "statement":"Handling the switch two signals",
                    "link": "IY",
                    "OPM":"You have a signal in Zone I connected to the switch. This could be handled more efficiently by engaging with the critical section. Click the (+) button to add another player to your play trace to see how others have dealt with this problem. There are other ways the community has rectified this inaccuracy.",
                    "for_me_to_examine":"Examine your link between Zone I and Zone Y. Is this the best way to handle the switch?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["ZY","WY","BY","CY"],
                    "top_text":top_text_list_13[0]
                },  
                "concept_21":{
                    "statement":"Handling the switch using critical section",
                    "link": "BY",
                    "OPM":"Great job using the critical section to handle the switch! Click the (+) button to see other accurate moves associated with the switch.",
                    "for_me_to_examine":"Examine your link in Zone B and Y. This is an efficient way to prevent a race condition using the critical section. There are other ways to handle this link.",
                    "for_others_to_examine":"Examine how this player handles the switch using the critical section with a connection between Zone B and Zone Y.",
                    "classification":"good",
                    "recommendation_links":["ZY","WY","CY"],
                    "top_text":top_text_list_13[3]
                },  
                "concept_22":{
                    "statement":"Handling the switch using critical section",
                    "link": "CY",
                    "OPM":"Great job using the critical section to handle the switch! Click the (+) button to see other accurate moves associated with the switch.",
                    "for_me_to_examine":"Examine your link in Zone C and Y. This is an efficient way to prevent a race condition using the critical section. There are other ways to handle this link.",
                    "for_others_to_examine":"Examine how this player handles the switch using the critical section with a connection between Zone C and Zone Y.",
                    "classification":"good",
                    "recommendation_links":["ZY","WY","BY"],
                    "top_text":top_text_list_13[3]
                },  
                "concept_23":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "HI",
                    "OPM":"You have a signal in Zone H connected to a semaphore in Zone I. You seem to be preventing a race condition by blocking the pink thread before the red thread delivers its package. This is an inaccurate move, since the red thread can wait after passing the switch leading to a race condition .Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone H and I. Is this the best way to block the pink thread from moving before the red thread?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["AI","AJ"],
                    "top_text":top_text_list_13[1]
                },  
                "concept_24":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "FA",
                    "OPM":"You have a signal in Zone F connected to a semaphore in Zone A. You seem to be preventing a race condition by blocking the red thread before the pink thread delivers its package. This is an inaccurate move, since the red thread can wait after passing the switch leading to a race condition .Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone F and A.  You seem to be trying to control the red thread with the pink thread. Is this the best way to block the red thread from moving before the pink thread delivers?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["EA","EG","EH","IA","IH","IG"],
                    "top_text":top_text_list_13[1]
                    },  
                "concept_25":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "CJ",
                    "OPM":"You have a signal in Zone C connected to a semaphore in Zone J. You seem to be preventing a race condition by unlocking threads in the critical section This is an inaccurate move, it is recommended you unlock threads from sections which are exclusive to other threads. Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",                    
                    "for_me_to_examine":"Examine your link in Zone C and J.  You seem to be unlocking threads from critical sections. Are there other ways you can prevent race conditions?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["AI","AJ"],
                    "top_text":top_text_list_13[1]
                },
                "concept_26":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "BI",
                    "OPM":"You have a signal in Zone B connected to a semaphore in Zone I. You seem to be preventing a race condition by unlocking threads in the critical section This is an inaccurate move, it is recommended you unlock threads from sections which are exclusive to other threads. Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",                    
                    "for_me_to_examine":"Examine your link in Zone B and I.  You seem to be unlocking threads from critical sections. Are there other ways you can prevent race conditions?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["AI","AJ"],
                    "top_text":top_text_list_13[1]
                },
                "concept_27":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "BA",
                    "OPM":"You have a signal in Zone B connected to a semaphore in Zone A. You seem to be preventing a race condition by unlocking threads in the critical section This is an inaccurate move, it is recommended you unlock threads from sections which are exclusive to other threads. Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone B and A.  You seem to be unlocking threads from critical sections. Are there other ways you can prevent race conditions?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["EA","EG","EH","IA","IH","IG"],
                    "top_text":top_text_list_13[1]        
                },
                "concept_28":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "CI",
                    "OPM":"You have a signal in Zone C connected to a semaphore in Zone I. You seem to be preventing a race condition by unlocking threads in the critical section This is an inaccurate move, it is recommended you unlock threads from sections which are exclusive to other threads. Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone C and I. You seem to be unlocking threads from critical sections. Are there other ways you can prevent race conditions?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["AI","AJ"],
                    "top_text":top_text_list_13[1]
                },
                "concept_29":{
                    "statement":"Trying to prevent race condition. But does not understand the concept of 'Allowing Peer Process to deliver only after current process has delivered.'",
                    "link": "CA",
                    "OPM":"You have a signal in Zone C connected to a semaphore in Zone A. You seem to be preventing a race condition by unlocking threads in the critical section This is an inaccurate move, it is recommended you unlock threads from sections which are exclusive to other threads. Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone C and A. You seem to be unlocking threads from critical sections. Are there other ways you can prevent race conditions?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["EA","EG","EH","IA","IH","IG"],
                    "top_text":top_text_list_13[1]        
                },
                "concept_30":{
                    "statement":"Trying to Manually Gaurd the Delivery Point",
                    "link": "BC",
                    "OPM":"You have a signal in B connected to a semaphore in C. You seem to be forcefully blocking the delivery zone. This is not a good practice and an inaccurate move. It is recommended you make only one process reach the delivery zone. Click the (+) button to add another player to your play trace to see how others have delt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone B and C. You seem to be unlocking threads from critical sections. Are there other ways you can prevent race conditions?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["AI","AJ","EA","EG","EH","IA","IG","IH"],
                    "top_text":top_text_list_13[0]
                },
                "concept_31":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "FH",
                    "OPM":"You have a signal in Zone F connected to a semaphore in Zone H. You seem to be preventing a race condition by blocking the red thread before the pink thread delivers its package. This is an inaccurate move, since the red thread can wait after passing the switch leading to a race condition .Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone F and H.  You seem to be trying to control the red thread with the pink thread. Is this the best way to block the red thread from moving before the pink thread delivers?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["EA","EG","EH","IA","IG","IH"],
                    "top_text":top_text_list_13[1]
                },                
                "concept_32":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "FG",
                    "OPM":"You have a signal in Zone F connected to a semaphore in Zone G. You seem to be preventing a race condition by blocking the red thread before the pink thread delivers its package. This is an inaccurate move, since the red thread can wait after passing the switch leading to a race condition .Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone F and G.  You seem to be trying to control the red thread with the pink thread. Is this the best way to block the red thread from moving before the pink thread delivers?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["EA","EG","EH","IA","IG","IH"],
                    "top_text":top_text_list_13[1]
                },
                  "concept_34":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "JA",
                    "OPM":"You have a signal in Zone J connected to a semaphore in Zone A. You seem to be preventing a race condition by blocking the red thread before the pink thread delivers its package. This is an inaccurate move, since the red thread can wait after passing the switch leading to a race condition .Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone J and A.  You seem to be trying to control the red thread with the pink thread. Is this the best way to block the red thread from moving before the pink thread delivers?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["EA","EG","EH","IA","IG","IH"],
                    "top_text":top_text_list_13[1]                
                    },
                "concept_35":{
                    "statement":"Trying to Manually Gaurd the Delivery Point",
                    "link": "WZ",
                    "OPM":"You have a signal in W connected to a semaphore in Z. You seem to be forcefully blocking the delivery zone. This is not a good practice and an inaccurate move. It is recommended you make only one process reach the delivery zone. Click the (+) button to add another player to your play trace to see how others have delt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone B and C. You seem to be unlocking threads from critical sections. Are there other ways you can prevent race conditions?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["AI","AJ","EA","EG","EH","IA","IG","IH"],
                    "top_text":top_text_list_13[0]
                },
                "concept_36":{
                    "statement":"Trying to prevent race condition. But fails to understand that needs to unlock peer thread only after completing threads own task ",
                    "link": "GE",
                    "OPM":"You have a signal in Zone G connected to a semaphore in Zone E. You seem to be preventing a race condition by blocking the red thread before the pink thread delivers its package. This is an inaccurate move, since the red thread can wait after passing the switch leading to a race condition .Click the (+) button to add another player to your play trace to see how others have dealt with this problem.",
                    "for_me_to_examine":"Examine your link in Zone G and E.  You seem to be trying to control the red thread with the pink thread. Is this the best way to block the red thread from moving before the pink thread delivers?",
                    "for_others_to_examine":"",
                    "classification":"bad",
                    "recommendation_links":["EA","EG","EH","IA","IG","IH"],
                    "top_text":top_text_list_13[1]                
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


