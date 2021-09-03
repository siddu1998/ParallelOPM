var fill = d3.scale.category20()
var data;
// edited for checking if the screenshots
// are displayed or not, initially false
var t=false;
var imagedisplay_id=0;
var upvote_value=""
var index1=0

//screenshot_dict.py in data
var node_image_mapper={'62af7ea0-3a97-4324-a157-91b48f4bd787': ['Screenshots/62af7ea0-3a97-4324-a157-91b48f4bd787/1_f35188f9-b6d3-4dfe-9e89-118aa4c64612.png', 'Screenshots/62af7ea0-3a97-4324-a157-91b48f4bd787/11_9996acb3-f937-40fd-a2b7-cde3e7f3eaa9.png', 'Screenshots/62af7ea0-3a97-4324-a157-91b48f4bd787/25_9784a316-6baa-40f4-b48c-2b2d33c827aa.png', 'Screenshots/62af7ea0-3a97-4324-a157-91b48f4bd787/31_1c755772-dc50-48c3-b97d-44e310ef689a.png', 'Screenshots/62af7ea0-3a97-4324-a157-91b48f4bd787/36_0fb4e570-1a61-4b0b-906a-e71ef190dcc5.png', 'Screenshots/62af7ea0-3a97-4324-a157-91b48f4bd787/48_34ee53aa-ddb7-4612-9905-6ff902f745b8.png', 'Screenshots/62af7ea0-3a97-4324-a157-91b48f4bd787/61_7019cbeb-32c0-45a1-b36f-cc1b116be406.png', 'Screenshots/62af7ea0-3a97-4324-a157-91b48f4bd787/66_0e1603b0-8d22-4005-ab59-8927bb98c013.png'], 'e1789fd0-1ec8-45ed-abd2-0789de029f46': ['Screenshots/e1789fd0-1ec8-45ed-abd2-0789de029f46/1_a23acbd2-9d4f-4135-b97a-f726e261fe93.png', 'Screenshots/e1789fd0-1ec8-45ed-abd2-0789de029f46/41_a80a013e-9461-4801-95d8-b9ea97e90525.png', 'Screenshots/e1789fd0-1ec8-45ed-abd2-0789de029f46/45_220ac693-76bd-46dd-a60f-414ff25b49a4.png'], 'f37b8cd6-dfd3-455f-8256-60b4718715cd': ['Screenshots/f37b8cd6-dfd3-455f-8256-60b4718715cd/1_be283c49-a82c-4565-943d-535a1bd1b588.png', 'Screenshots/f37b8cd6-dfd3-455f-8256-60b4718715cd/28_43c09d3d-18f2-4e4a-9d6f-eb34bddc19a2.png', 'Screenshots/f37b8cd6-dfd3-455f-8256-60b4718715cd/33_60e4ff2c-4e91-4abd-bfad-0a7e668b93e3.png'], '975572d2-1e6f-4d20-aac8-01c45b7abf3b': ['Screenshots/975572d2-1e6f-4d20-aac8-01c45b7abf3b/1_1613d6bb-8ad3-4103-805f-e24eb76f2ca3.png', 'Screenshots/975572d2-1e6f-4d20-aac8-01c45b7abf3b/36_42cb4bc8-b10e-4b41-973a-8f0ad49077d6.png', 'Screenshots/975572d2-1e6f-4d20-aac8-01c45b7abf3b/49_7d9f49db-e40d-4aa8-8f9f-fe5345fc92b8.png', 'Screenshots/975572d2-1e6f-4d20-aac8-01c45b7abf3b/53_db7d1505-8281-4061-9b60-b78467ccb7f2.png'], '8f25e0c0-5708-43f2-a927-e4e342b6b5f0': ['Screenshots/8f25e0c0-5708-43f2-a927-e4e342b6b5f0/1_0b350142-1b3a-40b1-b8a5-b77f4ca41c74.png', 'Screenshots/8f25e0c0-5708-43f2-a927-e4e342b6b5f0/65_9b87db00-bf58-42d4-8c87-048eaced33e7.png', 'Screenshots/8f25e0c0-5708-43f2-a927-e4e342b6b5f0/70_1820446b-91d5-4173-9036-38fb70515ec0.png']}

//gif_dict.py in data
var gif_mapper={'62af7ea0-3a97-4324-a157-91b48f4bd787': ['GIFs/62af7ea0-3a97-4324-a157-91b48f4bd787/0_1.gif', 'GIFs/62af7ea0-3a97-4324-a157-91b48f4bd787/1_11.gif', 'GIFs/62af7ea0-3a97-4324-a157-91b48f4bd787/11_25.gif', 'GIFs/62af7ea0-3a97-4324-a157-91b48f4bd787/25_31.gif', 'GIFs/62af7ea0-3a97-4324-a157-91b48f4bd787/31_36.gif', 'GIFs/62af7ea0-3a97-4324-a157-91b48f4bd787/36_48.gif', 'GIFs/62af7ea0-3a97-4324-a157-91b48f4bd787/48_61.gif', 'GIFs/62af7ea0-3a97-4324-a157-91b48f4bd787/61_66.gif'], 'e1789fd0-1ec8-45ed-abd2-0789de029f46': ['GIFs/e1789fd0-1ec8-45ed-abd2-0789de029f46/0_1.gif', 'GIFs/e1789fd0-1ec8-45ed-abd2-0789de029f46/1_41.gif', 'GIFs/e1789fd0-1ec8-45ed-abd2-0789de029f46/41_45.gif'], 'f37b8cd6-dfd3-455f-8256-60b4718715cd': ['GIFs/f37b8cd6-dfd3-455f-8256-60b4718715cd/0_1.gif', 'GIFs/f37b8cd6-dfd3-455f-8256-60b4718715cd/1_28.gif', 'GIFs/f37b8cd6-dfd3-455f-8256-60b4718715cd/28_33.gif'], '975572d2-1e6f-4d20-aac8-01c45b7abf3b': ['GIFs/975572d2-1e6f-4d20-aac8-01c45b7abf3b/0_1.gif', 'GIFs/975572d2-1e6f-4d20-aac8-01c45b7abf3b/1_36.gif', 'GIFs/975572d2-1e6f-4d20-aac8-01c45b7abf3b/36_49.gif', 'GIFs/975572d2-1e6f-4d20-aac8-01c45b7abf3b/49_53.gif'], '8f25e0c0-5708-43f2-a927-e4e342b6b5f0': ['GIFs/8f25e0c0-5708-43f2-a927-e4e342b6b5f0/0_1.gif', 'GIFs/8f25e0c0-5708-43f2-a927-e4e342b6b5f0/1_65.gif', 'GIFs/8f25e0c0-5708-43f2-a927-e4e342b6b5f0/65_70.gif']}

//stats.json
var playerStatisticsData = {
      "f37b8cd6-dfd3-455f-8256-60b4718715cd.json": {
            "test_success": 1,
            "test_fail": 0,
            "submit_success": 1,
            "submit_fail": 0,
            "gameplay_duration": 1.0
      },
      "8f25e0c0-5708-43f2-a927-e4e342b6b5f0.json": {
            "test_success": 1,
            "test_fail": 0,
            "submit_success": 1,
            "submit_fail": 0,
            "gameplay_duration": 2.0
      },
      "975572d2-1e6f-4d20-aac8-01c45b7abf3b.json": {
            "test_success": 1,
            "test_fail": 1,
            "submit_success": 1,
            "submit_fail": 0,
            "gameplay_duration": 5.0
      },
      "62af7ea0-3a97-4324-a157-91b48f4bd787.json": {
            "test_success": 1,
            "test_fail": 5,
            "submit_success": 1,
            "submit_fail": 0,
            "gameplay_duration": 4.0
      },
      "e1789fd0-1ec8-45ed-abd2-0789de029f46.json": {
            "test_success": 1,
            "test_fail": 0,
            "submit_success": 1,
            "submit_fail": 0,
            "gameplay_duration": 7.0
      }
}
//stats_2.json
var playerEventStatisticsData={
      "f37b8cd6-dfd3-455f-8256-60b4718715cd.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 5,
            "MOVE_ELEMENT": 1,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 3
      },
      "8f25e0c0-5708-43f2-a927-e4e342b6b5f0.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 8,
            "TOGGLE_ELEMENT": 2,
            "MOVE_ELEMENT": 6,
            "REMOVE_ELEMENT": 3,
            "BEGIN_LINK": 3
      },
      "975572d2-1e6f-4d20-aac8-01c45b7abf3b.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 5,
            "BEGIN_LINK": 3,
            "TOGGLE_ELEMENT": 1,
            "MOVE_ELEMENT": 5
      },
      "62af7ea0-3a97-4324-a157-91b48f4bd787.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 6,
            "MOVE_ELEMENT": 8,
            "BEGIN_LINK": 4,
            "TOGGLE_ELEMENT": 1
      },
      "e1789fd0-1ec8-45ed-abd2-0789de029f46.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 7,
            "MOVE_ELEMENT": 5,
            "BEGIN_LINK": 4,
            "REMOVE_ELEMENT": 1,
            "TOGGLE_ELEMENT": 5
      }
}
//trace.json
var player_traces={
      "f37b8cd6-dfd3-455f-8256-60b4718715cd": {
            "e90c6f0e-b3ea-400d-950c-054bdbd6ed0a": {
                  "id": "e90c6f0e-b3ea-400d-950c-054bdbd6ed0a",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_e90c6f0e-b3ea-400d-950c-054bdbd6ed0a.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196778417
            },
            "be283c49-a82c-4565-943d-535a1bd1b588": {
                  "id": "be283c49-a82c-4565-943d-535a1bd1b588",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_be283c49-a82c-4565-943d-535a1bd1b588.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "be283c49-a82c-4565-943d-535a1bd1b588"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196778434,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "69334cfa-eee4-4e23-b3e0-5e72b90b6e45": {
                  "id": "69334cfa-eee4-4e23-b3e0-5e72b90b6e45",
                  "type": "ADD_ELEMENT",
                  "screenshot": "3_69334cfa-eee4-4e23-b3e0-5e72b90b6e45.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196786182
            },
            "86a47b7d-5c0c-41b0-81ac-d1580de7fe8b": {
                  "id": "86a47b7d-5c0c-41b0-81ac-d1580de7fe8b",
                  "type": "ADD_ELEMENT",
                  "screenshot": "8_86a47b7d-5c0c-41b0-81ac-d1580de7fe8b.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196787477
            },
            "357edee7-24a7-40ad-ab8c-0d0c10fae97c": {
                  "id": "357edee7-24a7-40ad-ab8c-0d0c10fae97c",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "9_357edee7-24a7-40ad-ab8c-0d0c10fae97c.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196787989
            },
            "f6972b83-59d8-471a-8112-2d9629d1cc98": {
                  "id": "f6972b83-59d8-471a-8112-2d9629d1cc98",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "10_f6972b83-59d8-471a-8112-2d9629d1cc98.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196787993
            },
            "b59f959a-a436-4666-bdf3-a127bee3ffc6": {
                  "id": "b59f959a-a436-4666-bdf3-a127bee3ffc6",
                  "type": "ADD_ELEMENT",
                  "screenshot": "13_b59f959a-a436-4666-bdf3-a127bee3ffc6.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaabp": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196799134
            },
            "5ccb481e-3ac2-4a6c-8e73-e8a2142db480": {
                  "id": "5ccb481e-3ac2-4a6c-8e73-e8a2142db480",
                  "type": "ADD_ELEMENT",
                  "screenshot": "14_5ccb481e-3ac2-4a6c-8e73-e8a2142db480.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaabp": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabq": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaabn"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196802374
            },
            "3530e605-6b86-43df-96ac-f4c140479399": {
                  "id": "3530e605-6b86-43df-96ac-f4c140479399",
                  "type": "ADD_ELEMENT",
                  "screenshot": "15_3530e605-6b86-43df-96ac-f4c140479399.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaabp": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabq": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaabn"
                        },
                        "aaaabr": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": "aaaabo"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196807767
            },
            "1bb1508b-bbf2-4f81-8cbb-aff8dbe69844": {
                  "id": "1bb1508b-bbf2-4f81-8cbb-aff8dbe69844",
                  "type": "BEGIN_LINK",
                  "screenshot": "18_1bb1508b-bbf2-4f81-8cbb-aff8dbe69844.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaabp": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabq": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaabn"
                        },
                        "aaaabr": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": "aaaabo"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196814257
            },
            "fde945ea-6616-440c-9184-5576effcde63": {
                  "id": "fde945ea-6616-440c-9184-5576effcde63",
                  "type": "BEGIN_LINK",
                  "screenshot": "20_fde945ea-6616-440c-9184-5576effcde63.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaabp": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabq": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaabn"
                        },
                        "aaaabr": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": "aaaabo"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "intersectionintersection": 1,
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196818760
            },
            "47813c2e-67d3-408b-99f9-a6aa7fcc9900": {
                  "id": "47813c2e-67d3-408b-99f9-a6aa7fcc9900",
                  "type": "BEGIN_LINK",
                  "screenshot": "22_47813c2e-67d3-408b-99f9-a6aa7fcc9900.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaabp": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabq": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaabn"
                        },
                        "aaaabr": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": "aaaabo"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "intersectionintersection": 1,
                              "AK": 1,
                              "JI": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196820227
            },
            "43c09d3d-18f2-4e4a-9d6f-eb34bddc19a2": {
                  "id": "43c09d3d-18f2-4e4a-9d6f-eb34bddc19a2",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "28_43c09d3d-18f2-4e4a-9d6f-eb34bddc19a2.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaabp": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabq": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaabn"
                        },
                        "aaaabr": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": "aaaabo"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "intersectionintersection": 1,
                              "AK": 1,
                              "JI": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "43c09d3d-18f2-4e4a-9d6f-eb34bddc19a2"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196824437,
                  "submission_result": "success/TEST",
                  "ticks": 269
            },
            "60e4ff2c-4e91-4abd-bfad-0a7e668b93e3": {
                  "id": "60e4ff2c-4e91-4abd-bfad-0a7e668b93e3",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "33_60e4ff2c-4e91-4abd-bfad-0a7e668b93e3.png",
                  "absolute_board_state": {
                        "aaaabn": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 10,
                              "status": "inactive"
                        },
                        "aaaabo": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaabp": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabq": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaabn"
                        },
                        "aaaabr": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": "aaaabo"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "intersectionintersection": 1,
                              "AK": 1,
                              "JI": 1
                        },
                        "board_ids": [
                              "60e4ff2c-4e91-4abd-bfad-0a7e668b93e3"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196834058,
                  "submission_result": "success/SUBMIT",
                  "ticks": 269
            }
      },
      "8f25e0c0-5708-43f2-a927-e4e342b6b5f0": {
            "1afc95f9-a149-4e50-bffd-846f7741ce45": {
                  "id": "1afc95f9-a149-4e50-bffd-846f7741ce45",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_1afc95f9-a149-4e50-bffd-846f7741ce45.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196573529
            },
            "0b350142-1b3a-40b1-b8a5-b77f4ca41c74": {
                  "id": "0b350142-1b3a-40b1-b8a5-b77f4ca41c74",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_0b350142-1b3a-40b1-b8a5-b77f4ca41c74.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "0b350142-1b3a-40b1-b8a5-b77f4ca41c74"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196573556,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "b77152d3-bd5d-4675-9029-e933f2795a12": {
                  "id": "b77152d3-bd5d-4675-9029-e933f2795a12",
                  "type": "ADD_ELEMENT",
                  "screenshot": "3_b77152d3-bd5d-4675-9029-e933f2795a12.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196578159
            },
            "b70da1b7-6fc7-4342-9e7a-0b0e1feaa210": {
                  "id": "b70da1b7-6fc7-4342-9e7a-0b0e1feaa210",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "5_b70da1b7-6fc7-4342-9e7a-0b0e1feaa210.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196579660
            },
            "b6266035-df4f-42b9-aa79-ea0fe810b445": {
                  "id": "b6266035-df4f-42b9-aa79-ea0fe810b445",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "6_b6266035-df4f-42b9-aa79-ea0fe810b445.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196582440
            },
            "2b249c15-c919-4246-a5f7-8cdcec9fbc30": {
                  "id": "2b249c15-c919-4246-a5f7-8cdcec9fbc30",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "7_2b249c15-c919-4246-a5f7-8cdcec9fbc30.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196582444
            },
            "77d7051f-1bdb-4a6a-bf03-3410826c89e7": {
                  "id": "77d7051f-1bdb-4a6a-bf03-3410826c89e7",
                  "type": "ADD_ELEMENT",
                  "screenshot": "8_77d7051f-1bdb-4a6a-bf03-3410826c89e7.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "K": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196586487
            },
            "99afd170-6ce4-4114-9b8d-337888872523": {
                  "id": "99afd170-6ce4-4114-9b8d-337888872523",
                  "type": "ADD_ELEMENT",
                  "screenshot": "10_99afd170-6ce4-4114-9b8d-337888872523.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabb": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "J": 1
                        },
                        "signal_zone_dict": {
                              "K": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196594401
            },
            "a1e9c925-6ccb-4fae-8671-04c6ba0ec75b": {
                  "id": "a1e9c925-6ccb-4fae-8671-04c6ba0ec75b",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "11_a1e9c925-6ccb-4fae-8671-04c6ba0ec75b.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabb": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "J": 1
                        },
                        "signal_zone_dict": {
                              "K": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196599544
            },
            "53a5dc91-b0de-4c66-a3fe-9c39975c234f": {
                  "id": "53a5dc91-b0de-4c66-a3fe-9c39975c234f",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "14_53a5dc91-b0de-4c66-a3fe-9c39975c234f.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabb": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "K": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196607791
            },
            "b7fe87ba-db0a-4f6d-81f3-40739030e53e": {
                  "id": "b7fe87ba-db0a-4f6d-81f3-40739030e53e",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "16_b7fe87ba-db0a-4f6d-81f3-40739030e53e.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabb": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "intersection": 1
                        },
                        "signal_zone_dict": {
                              "K": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196614933
            },
            "3391bda6-fc27-4413-ba7a-b53263f30915": {
                  "id": "3391bda6-fc27-4413-ba7a-b53263f30915",
                  "type": "ADD_ELEMENT",
                  "screenshot": "17_3391bda6-fc27-4413-ba7a-b53263f30915.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabb": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "inactive"
                        },
                        "aaaabc": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 4,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "intersection": 2
                        },
                        "signal_zone_dict": {
                              "K": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196616649
            },
            "491708ee-fcb7-48a3-9a99-233bcd8b6b98": {
                  "id": "491708ee-fcb7-48a3-9a99-233bcd8b6b98",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "19_491708ee-fcb7-48a3-9a99-233bcd8b6b98.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabb": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "intersection": 1
                        },
                        "signal_zone_dict": {
                              "K": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196624894
            },
            "1ac62fb8-8e1c-47d8-bfd8-8f329c5b302f": {
                  "id": "1ac62fb8-8e1c-47d8-bfd8-8f329c5b302f",
                  "type": "ADD_ELEMENT",
                  "screenshot": "23_1ac62fb8-8e1c-47d8-bfd8-8f329c5b302f.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabb": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "inactive"
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "intersection": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "J": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196627422
            },
            "2d16a82b-cebf-425e-9a8e-68c0417c37ff": {
                  "id": "2d16a82b-cebf-425e-9a8e-68c0417c37ff",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "26_2d16a82b-cebf-425e-9a8e-68c0417c37ff.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "J": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196630934
            },
            "4c09e7c0-09de-44fc-8832-e516246d0ce9": {
                  "id": "4c09e7c0-09de-44fc-8832-e516246d0ce9",
                  "type": "ADD_ELEMENT",
                  "screenshot": "28_4c09e7c0-09de-44fc-8832-e516246d0ce9.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "J": 1,
                              "intersection": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196632126
            },
            "3dd1e3fa-bfc6-429b-8e2b-a5a7fac49707": {
                  "id": "3dd1e3fa-bfc6-429b-8e2b-a5a7fac49707",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "29_3dd1e3fa-bfc6-429b-8e2b-a5a7fac49707.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "J": 1,
                              "A": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196637671
            },
            "2057f882-63d8-444e-a448-cf1290f35695": {
                  "id": "2057f882-63d8-444e-a448-cf1290f35695",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "30_2057f882-63d8-444e-a448-cf1290f35695.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaba": {
                              "type": "signal",
                              "element_x": 8,
                              "element_y": 12,
                              "link": null
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "B": 1,
                              "A": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196640333
            },
            "ba086813-9cc6-4436-81e0-73d570235194": {
                  "id": "ba086813-9cc6-4436-81e0-73d570235194",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "31_ba086813-9cc6-4436-81e0-73d570235194.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "A": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196646878
            },
            "ce982495-ec1c-42ce-a58e-e33e455cc5f0": {
                  "id": "ce982495-ec1c-42ce-a58e-e33e455cc5f0",
                  "type": "ADD_ELEMENT",
                  "screenshot": "33_ce982495-ec1c-42ce-a58e-e33e455cc5f0.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        },
                        "aaaabf": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "A": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196648071
            },
            "de703a3e-2c97-4da9-90a8-ca10e3906f81": {
                  "id": "de703a3e-2c97-4da9-90a8-ca10e3906f81",
                  "type": "ADD_ELEMENT",
                  "screenshot": "48_de703a3e-2c97-4da9-90a8-ca10e3906f81.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        },
                        "aaaabf": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaabg": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 4,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196655601
            },
            "2d9c143c-2d06-40d0-be24-eb5b5f1771e4": {
                  "id": "2d9c143c-2d06-40d0-be24-eb5b5f1771e4",
                  "type": "BEGIN_LINK",
                  "screenshot": "53_2d9c143c-2d06-40d0-be24-eb5b5f1771e4.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        },
                        "aaaabf": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaabg": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 4,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "JA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196661603
            },
            "e31f36a3-896e-4661-96e9-606452efeb4e": {
                  "id": "e31f36a3-896e-4661-96e9-606452efeb4e",
                  "type": "BEGIN_LINK",
                  "screenshot": "56_e31f36a3-896e-4661-96e9-606452efeb4e.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        },
                        "aaaabf": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaabg": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 4,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "JA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196663715
            },
            "6733763f-8c95-4961-b505-b0d000a35334": {
                  "id": "6733763f-8c95-4961-b505-b0d000a35334",
                  "type": "BEGIN_LINK",
                  "screenshot": "58_6733763f-8c95-4961-b505-b0d000a35334.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        },
                        "aaaabf": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaabg": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 4,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "Bintersection": 1,
                              "AK": 1,
                              "JA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196664960
            },
            "9b87db00-bf58-42d4-8c87-048eaced33e7": {
                  "id": "9b87db00-bf58-42d4-8c87-048eaced33e7",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "65_9b87db00-bf58-42d4-8c87-048eaced33e7.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        },
                        "aaaabf": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaabg": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 4,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "Bintersection": 1,
                              "AK": 1,
                              "JA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "9b87db00-bf58-42d4-8c87-048eaced33e7"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196682982,
                  "submission_result": "success/TEST",
                  "ticks": 248
            },
            "1820446b-91d5-4173-9036-38fb70515ec0": {
                  "id": "1820446b-91d5-4173-9036-38fb70515ec0",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "70_1820446b-91d5-4173-9036-38fb70515ec0.png",
                  "absolute_board_state": {
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaabd": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaabe": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 3,
                              "link": "aaaabf"
                        },
                        "aaaabf": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaabg": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 4,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "Bintersection": 1,
                              "AK": 1,
                              "JA": 1
                        },
                        "board_ids": [
                              "1820446b-91d5-4173-9036-38fb70515ec0"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196697374,
                  "submission_result": "success/SUBMIT",
                  "ticks": 248
            }
      },
      "975572d2-1e6f-4d20-aac8-01c45b7abf3b": {
            "ea78ce57-b71a-4c82-826c-009f5875d8da": {
                  "id": "ea78ce57-b71a-4c82-826c-009f5875d8da",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_ea78ce57-b71a-4c82-826c-009f5875d8da.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196241855
            },
            "1613d6bb-8ad3-4103-805f-e24eb76f2ca3": {
                  "id": "1613d6bb-8ad3-4103-805f-e24eb76f2ca3",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_1613d6bb-8ad3-4103-805f-e24eb76f2ca3.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "1613d6bb-8ad3-4103-805f-e24eb76f2ca3"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196241871,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "1eabf870-a287-4167-9295-5733ba49f2cc": {
                  "id": "1eabf870-a287-4167-9295-5733ba49f2cc",
                  "type": "ADD_ELEMENT",
                  "screenshot": "13_1eabf870-a287-4167-9295-5733ba49f2cc.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 1,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "A": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196262518
            },
            "529215e2-4280-4f97-97c4-e8acf5f87e84": {
                  "id": "529215e2-4280-4f97-97c4-e8acf5f87e84",
                  "type": "BEGIN_LINK",
                  "screenshot": "14_529215e2-4280-4f97-97c4-e8acf5f87e84.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 1,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "A": 1
                        },
                        "link_dict": {
                              "Aintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196263964
            },
            "ebe54881-298a-48c5-84c4-a89a3200f0f4": {
                  "id": "ebe54881-298a-48c5-84c4-a89a3200f0f4",
                  "type": "ADD_ELEMENT",
                  "screenshot": "18_ebe54881-298a-48c5-84c4-a89a3200f0f4.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "A": 1
                        },
                        "link_dict": {
                              "Aintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196268217
            },
            "14bfbe60-26a7-4a31-bbc8-4f4b06e3e4b0": {
                  "id": "14bfbe60-26a7-4a31-bbc8-4f4b06e3e4b0",
                  "type": "ADD_ELEMENT",
                  "screenshot": "21_14bfbe60-26a7-4a31-bbc8-4f4b06e3e4b0.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 1
                        },
                        "link_dict": {
                              "Aintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196270366
            },
            "39ec66c4-e912-4625-a70c-21acb175186e": {
                  "id": "39ec66c4-e912-4625-a70c-21acb175186e",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "24_39ec66c4-e912-4625-a70c-21acb175186e.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 1
                        },
                        "link_dict": {
                              "Aintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196272068
            },
            "3dd565ad-31d0-4a20-b43e-02105585f06c": {
                  "id": "3dd565ad-31d0-4a20-b43e-02105585f06c",
                  "type": "ADD_ELEMENT",
                  "screenshot": "27_3dd565ad-31d0-4a20-b43e-02105585f06c.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 2
                        },
                        "link_dict": {
                              "Aintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196281879
            },
            "b7171dce-f5e7-4050-8163-00099b83b171": {
                  "id": "b7171dce-f5e7-4050-8163-00099b83b171",
                  "type": "BEGIN_LINK",
                  "screenshot": "28_b7171dce-f5e7-4050-8163-00099b83b171.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 2
                        },
                        "link_dict": {
                              "Aintersection": 1,
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196282904
            },
            "80120488-7b5d-401a-8e95-55313d42e0a5": {
                  "id": "80120488-7b5d-401a-8e95-55313d42e0a5",
                  "type": "ADD_ELEMENT",
                  "screenshot": "30_80120488-7b5d-401a-8e95-55313d42e0a5.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        },
                        "aaaaaw": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 2,
                              "J": 1
                        },
                        "link_dict": {
                              "Aintersection": 1,
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196292975
            },
            "afcd68f3-d759-4c85-bd63-ba764f5e6aec": {
                  "id": "afcd68f3-d759-4c85-bd63-ba764f5e6aec",
                  "type": "BEGIN_LINK",
                  "screenshot": "31_afcd68f3-d759-4c85-bd63-ba764f5e6aec.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        },
                        "aaaaaw": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 2,
                              "J": 1
                        },
                        "link_dict": {
                              "Aintersection": 1,
                              "AK": 1,
                              "JI": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196293858
            },
            "42cb4bc8-b10e-4b41-973a-8f0ad49077d6": {
                  "id": "42cb4bc8-b10e-4b41-973a-8f0ad49077d6",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "36_42cb4bc8-b10e-4b41-973a-8f0ad49077d6.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        },
                        "aaaaaw": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 2,
                              "J": 1
                        },
                        "link_dict": {
                              "Aintersection": 1,
                              "AK": 1,
                              "JI": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "42cb4bc8-b10e-4b41-973a-8f0ad49077d6"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196313259,
                  "submission_result": "failure/TEST",
                  "ticks": 168
            },
            "04efbbff-542f-495f-ab07-61e226180022": {
                  "id": "04efbbff-542f-495f-ab07-61e226180022",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "38_04efbbff-542f-495f-ab07-61e226180022.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        },
                        "aaaaaw": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 2,
                              "K": 1
                        },
                        "link_dict": {
                              "Aintersection": 1,
                              "AK": 1,
                              "KI": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196330398
            },
            "17d7ed8f-7dcb-46ae-a115-2af8f670e1dd": {
                  "id": "17d7ed8f-7dcb-46ae-a115-2af8f670e1dd",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "39_17d7ed8f-7dcb-46ae-a115-2af8f670e1dd.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        },
                        "aaaaaw": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 2,
                              "K": 1
                        },
                        "link_dict": {
                              "Aintersection": 1,
                              "AK": 1,
                              "KI": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196361744
            },
            "b079046b-f982-4ef8-b964-e5d7410dfc23": {
                  "id": "b079046b-f982-4ef8-b964-e5d7410dfc23",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "40_b079046b-f982-4ef8-b964-e5d7410dfc23.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        },
                        "aaaaaw": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 2,
                              "J": 1
                        },
                        "link_dict": {
                              "Aintersection": 1,
                              "AK": 1,
                              "JI": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196366494
            },
            "b4124346-a022-41cd-be86-622377a41363": {
                  "id": "b4124346-a022-41cd-be86-622377a41363",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "41_b4124346-a022-41cd-be86-622377a41363.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        },
                        "aaaaaw": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "intersectionintersection": 1,
                              "AK": 1,
                              "JI": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196400510
            },
            "fa59d74d-9bce-49ec-9e49-19851ac49194": {
                  "id": "fa59d74d-9bce-49ec-9e49-19851ac49194",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "42_fa59d74d-9bce-49ec-9e49-19851ac49194.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        },
                        "aaaaaw": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "intersectionintersection": 1,
                              "AK": 1,
                              "JI": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196407967
            },
            "7d9f49db-e40d-4aa8-8f9f-fe5345fc92b8": {
                  "id": "7d9f49db-e40d-4aa8-8f9f-fe5345fc92b8",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "49_7d9f49db-e40d-4aa8-8f9f-fe5345fc92b8.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        },
                        "aaaaaw": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "intersectionintersection": 1,
                              "AK": 1,
                              "JI": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "7d9f49db-e40d-4aa8-8f9f-fe5345fc92b8"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196440397,
                  "submission_result": "success/TEST",
                  "ticks": 267
            },
            "db7d1505-8281-4061-9b60-b78467ccb7f2": {
                  "id": "db7d1505-8281-4061-9b60-b78467ccb7f2",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "53_db7d1505-8281-4061-9b60-b78467ccb7f2.png",
                  "absolute_board_state": {
                        "aaaaao": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 4,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 2,
                              "link": "aaaaar"
                        },
                        "aaaaaw": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1,
                              "A": 1,
                              "J": 1
                        },
                        "link_dict": {
                              "intersectionintersection": 1,
                              "AK": 1,
                              "JI": 1
                        },
                        "board_ids": [
                              "db7d1505-8281-4061-9b60-b78467ccb7f2"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196475521,
                  "submission_result": "success/SUBMIT",
                  "ticks": 267
            }
      },
      "62af7ea0-3a97-4324-a157-91b48f4bd787": {
            "ffae2fa4-32b4-40aa-bad0-be5d3e25c873": {
                  "id": "ffae2fa4-32b4-40aa-bad0-be5d3e25c873",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_ffae2fa4-32b4-40aa-bad0-be5d3e25c873.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628195957327
            },
            "f35188f9-b6d3-4dfe-9e89-118aa4c64612": {
                  "id": "f35188f9-b6d3-4dfe-9e89-118aa4c64612",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_f35188f9-b6d3-4dfe-9e89-118aa4c64612.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "f35188f9-b6d3-4dfe-9e89-118aa4c64612"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628195957346,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "9996acb3-f937-40fd-a2b7-cde3e7f3eaa9": {
                  "id": "9996acb3-f937-40fd-a2b7-cde3e7f3eaa9",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "11_9996acb3-f937-40fd-a2b7-cde3e7f3eaa9.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "9996acb3-f937-40fd-a2b7-cde3e7f3eaa9"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628195980918,
                  "submission_result": "failure/TEST",
                  "ticks": 46
            },
            "7a0d09ae-38c9-4888-bbe0-055ed8324c57": {
                  "id": "7a0d09ae-38c9-4888-bbe0-055ed8324c57",
                  "type": "ADD_ELEMENT",
                  "screenshot": "12_7a0d09ae-38c9-4888-bbe0-055ed8324c57.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628195993695
            },
            "1890c4a4-5893-4d24-b086-8ab07d29404d": {
                  "id": "1890c4a4-5893-4d24-b086-8ab07d29404d",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "15_1890c4a4-5893-4d24-b086-8ab07d29404d.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628195997653
            },
            "f54d5757-fd24-4652-8919-2c03a17f7136": {
                  "id": "f54d5757-fd24-4652-8919-2c03a17f7136",
                  "type": "ADD_ELEMENT",
                  "screenshot": "16_f54d5757-fd24-4652-8919-2c03a17f7136.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "I": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196006896
            },
            "f3a8a481-cbce-4bc9-9758-5ecf5a8b6846": {
                  "id": "f3a8a481-cbce-4bc9-9758-5ecf5a8b6846",
                  "type": "BEGIN_LINK",
                  "screenshot": "17_f3a8a481-cbce-4bc9-9758-5ecf5a8b6846.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "I": 1
                        },
                        "link_dict": {
                              "IK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196009728
            },
            "9784a316-6baa-40f4-b48c-2b2d33c827aa": {
                  "id": "9784a316-6baa-40f4-b48c-2b2d33c827aa",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "25_9784a316-6baa-40f4-b48c-2b2d33c827aa.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "I": 1
                        },
                        "link_dict": {
                              "IK": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "9784a316-6baa-40f4-b48c-2b2d33c827aa"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196021373,
                  "submission_result": "failure/TEST",
                  "ticks": 96
            },
            "c9cfa74b-4228-41bb-a7bf-dad971b958fc": {
                  "id": "c9cfa74b-4228-41bb-a7bf-dad971b958fc",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "26_c9cfa74b-4228-41bb-a7bf-dad971b958fc.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "intersection": 1
                        },
                        "link_dict": {
                              "intersectionK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196024893
            },
            "11f14eaf-581b-4559-b687-0cd9c39e1686": {
                  "id": "11f14eaf-581b-4559-b687-0cd9c39e1686",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "27_11f14eaf-581b-4559-b687-0cd9c39e1686.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "G": 1
                        },
                        "link_dict": {
                              "GK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196026717
            },
            "1c755772-dc50-48c3-b97d-44e310ef689a": {
                  "id": "1c755772-dc50-48c3-b97d-44e310ef689a",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "31_1c755772-dc50-48c3-b97d-44e310ef689a.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "G": 1
                        },
                        "link_dict": {
                              "GK": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "1c755772-dc50-48c3-b97d-44e310ef689a"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196031988,
                  "submission_result": "failure/TEST",
                  "ticks": 31
            },
            "275ee12b-3906-406b-8e16-090b784de51f": {
                  "id": "275ee12b-3906-406b-8e16-090b784de51f",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "32_275ee12b-3906-406b-8e16-090b784de51f.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "A": 1
                        },
                        "link_dict": {
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196034942
            },
            "0fb4e570-1a61-4b0b-906a-e71ef190dcc5": {
                  "id": "0fb4e570-1a61-4b0b-906a-e71ef190dcc5",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "36_0fb4e570-1a61-4b0b-906a-e71ef190dcc5.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "A": 1
                        },
                        "link_dict": {
                              "AK": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "0fb4e570-1a61-4b0b-906a-e71ef190dcc5"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196046232,
                  "submission_result": "failure/TEST",
                  "ticks": 101
            },
            "2998b0a7-56aa-4ba9-8264-ee0cc2ba5973": {
                  "id": "2998b0a7-56aa-4ba9-8264-ee0cc2ba5973",
                  "type": "ADD_ELEMENT",
                  "screenshot": "37_2998b0a7-56aa-4ba9-8264-ee0cc2ba5973.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "A": 2
                        },
                        "link_dict": {
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196053776
            },
            "a188aba0-6da7-42ea-bb42-59787a994fb4": {
                  "id": "a188aba0-6da7-42ea-bb42-59787a994fb4",
                  "type": "BEGIN_LINK",
                  "screenshot": "38_a188aba0-6da7-42ea-bb42-59787a994fb4.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "A": 2
                        },
                        "link_dict": {
                              "AK": 1,
                              "Aintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196054500
            },
            "ae631535-c514-46ee-b859-ad5879870ba0": {
                  "id": "ae631535-c514-46ee-b859-ad5879870ba0",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "40_ae631535-c514-46ee-b859-ad5879870ba0.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196062625
            },
            "cbced17d-7f57-46bb-b33e-1164b98c0e3d": {
                  "id": "cbced17d-7f57-46bb-b33e-1164b98c0e3d",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "41_cbced17d-7f57-46bb-b33e-1164b98c0e3d.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196064198
            },
            "9f9884c4-10ad-4b08-b893-81d9e8bcc3dc": {
                  "id": "9f9884c4-10ad-4b08-b893-81d9e8bcc3dc",
                  "type": "ADD_ELEMENT",
                  "screenshot": "42_9f9884c4-10ad-4b08-b893-81d9e8bcc3dc.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196070297
            },
            "8d6ef7a0-40dc-4ba5-89d3-ad3aa68fcfb8": {
                  "id": "8d6ef7a0-40dc-4ba5-89d3-ad3aa68fcfb8",
                  "type": "BEGIN_LINK",
                  "screenshot": "43_8d6ef7a0-40dc-4ba5-89d3-ad3aa68fcfb8.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1,
                              "Dintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196071149
            },
            "34ee53aa-ddb7-4612-9905-6ff902f745b8": {
                  "id": "34ee53aa-ddb7-4612-9905-6ff902f745b8",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "48_34ee53aa-ddb7-4612-9905-6ff902f745b8.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1,
                              "Dintersection": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "34ee53aa-ddb7-4612-9905-6ff902f745b8"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196084831,
                  "submission_result": "failure/TEST",
                  "ticks": 116
            },
            "c53371d9-366a-4687-b350-6a4b4616c8a5": {
                  "id": "c53371d9-366a-4687-b350-6a4b4616c8a5",
                  "type": "ADD_ELEMENT",
                  "screenshot": "51_c53371d9-366a-4687-b350-6a4b4616c8a5.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaak": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1,
                              "Dintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196089964
            },
            "add85fd3-04fe-4b48-97d1-ba653d6f1a53": {
                  "id": "add85fd3-04fe-4b48-97d1-ba653d6f1a53",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "52_add85fd3-04fe-4b48-97d1-ba653d6f1a53.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaak": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1,
                              "Dintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196090831
            },
            "a396ed83-d72b-4ced-8197-a27afa3ea5a0": {
                  "id": "a396ed83-d72b-4ced-8197-a27afa3ea5a0",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "53_a396ed83-d72b-4ced-8197-a27afa3ea5a0.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaak": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1,
                              "Dintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196091278
            },
            "7e82116e-a4fd-413d-ac17-c2977621e159": {
                  "id": "7e82116e-a4fd-413d-ac17-c2977621e159",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "54_7e82116e-a4fd-413d-ac17-c2977621e159.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaak": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1,
                              "Dintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196091285
            },
            "b17536a9-6b28-448a-8bd8-c6677f06f5f8": {
                  "id": "b17536a9-6b28-448a-8bd8-c6677f06f5f8",
                  "type": "ADD_ELEMENT",
                  "screenshot": "55_b17536a9-6b28-448a-8bd8-c6677f06f5f8.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaak": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaal": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaak"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1,
                              "Dintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196095955
            },
            "9cd64af8-29f1-41c1-bd6c-7ef139501216": {
                  "id": "9cd64af8-29f1-41c1-bd6c-7ef139501216",
                  "type": "BEGIN_LINK",
                  "screenshot": "56_9cd64af8-29f1-41c1-bd6c-7ef139501216.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaak": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaal": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaak"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1,
                              "Dintersection": 1,
                              "EI": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196097723
            },
            "7019cbeb-32c0-45a1-b36f-cc1b116be406": {
                  "id": "7019cbeb-32c0-45a1-b36f-cc1b116be406",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "61_7019cbeb-32c0-45a1-b36f-cc1b116be406.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaak": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaal": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaak"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1,
                              "Dintersection": 1,
                              "EI": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "7019cbeb-32c0-45a1-b36f-cc1b116be406"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196126710,
                  "submission_result": "success/TEST",
                  "ticks": 261
            },
            "0e1603b0-8d22-4005-ab59-8927bb98c013": {
                  "id": "0e1603b0-8d22-4005-ab59-8927bb98c013",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "66_0e1603b0-8d22-4005-ab59-8927bb98c013.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 12,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 0,
                              "link": "aaaaaa"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 16,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaak": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 10,
                              "status": "active"
                        },
                        "aaaaal": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaak"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "I": 1
                        },
                        "signal_zone_dict": {
                              "A": 1,
                              "F": 1,
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "AK": 1,
                              "Fintersection": 1,
                              "Dintersection": 1,
                              "EI": 1
                        },
                        "board_ids": [
                              "0e1603b0-8d22-4005-ab59-8927bb98c013"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628196136912,
                  "submission_result": "success/SUBMIT",
                  "ticks": 263
            }
      },
      "e1789fd0-1ec8-45ed-abd2-0789de029f46": {
            "6a620334-95ba-4906-839e-8b2bdf3a4dd1": {
                  "id": "6a620334-95ba-4906-839e-8b2bdf3a4dd1",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_6a620334-95ba-4906-839e-8b2bdf3a4dd1.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191689620
            },
            "a23acbd2-9d4f-4135-b97a-f726e261fe93": {
                  "id": "a23acbd2-9d4f-4135-b97a-f726e261fe93",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_a23acbd2-9d4f-4135-b97a-f726e261fe93.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "a23acbd2-9d4f-4135-b97a-f726e261fe93"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191689650,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "83632c4b-843d-467b-b1e9-9d0c0c0c2d56": {
                  "id": "83632c4b-843d-467b-b1e9-9d0c0c0c2d56",
                  "type": "ADD_ELEMENT",
                  "screenshot": "5_83632c4b-843d-467b-b1e9-9d0c0c0c2d56.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 1,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "K": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191696132
            },
            "12d45230-0bc2-4a1d-bbbf-2c03ea70373a": {
                  "id": "12d45230-0bc2-4a1d-bbbf-2c03ea70373a",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "6_12d45230-0bc2-4a1d-bbbf-2c03ea70373a.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 1,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "K": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191696555
            },
            "321cf2bf-10c2-4adc-b823-a16175a380d0": {
                  "id": "321cf2bf-10c2-4adc-b823-a16175a380d0",
                  "type": "BEGIN_LINK",
                  "screenshot": "7_321cf2bf-10c2-4adc-b823-a16175a380d0.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 1,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "K": 1
                        },
                        "link_dict": {
                              "Kintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191702847
            },
            "4f841d1a-142d-4211-a4fc-5d57c4c98459": {
                  "id": "4f841d1a-142d-4211-a4fc-5d57c4c98459",
                  "type": "ADD_ELEMENT",
                  "screenshot": "9_4f841d1a-142d-4211-a4fc-5d57c4c98459.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 2,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "Kintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191705365
            },
            "3554aac0-8f62-4ab4-bc97-99a66b1f0aac": {
                  "id": "3554aac0-8f62-4ab4-bc97-99a66b1f0aac",
                  "type": "BEGIN_LINK",
                  "screenshot": "10_3554aac0-8f62-4ab4-bc97-99a66b1f0aac.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 2,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191706205
            },
            "0edbfa99-4294-4d9b-a2b1-8d335294ecf7": {
                  "id": "0edbfa99-4294-4d9b-a2b1-8d335294ecf7",
                  "type": "ADD_ELEMENT",
                  "screenshot": "14_0edbfa99-4294-4d9b-a2b1-8d335294ecf7.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaag": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 3,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191710203
            },
            "787211df-e17e-4bcc-a826-dd2e694076cf": {
                  "id": "787211df-e17e-4bcc-a826-dd2e694076cf",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "15_787211df-e17e-4bcc-a826-dd2e694076cf.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 2,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191714339
            },
            "88ae10a0-7734-4b08-b26a-84bff471918b": {
                  "id": "88ae10a0-7734-4b08-b26a-84bff471918b",
                  "type": "ADD_ELEMENT",
                  "screenshot": "17_88ae10a0-7734-4b08-b26a-84bff471918b.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191718459
            },
            "0526b49a-9fb0-4f05-b38a-35214b2063a8": {
                  "id": "0526b49a-9fb0-4f05-b38a-35214b2063a8",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "18_0526b49a-9fb0-4f05-b38a-35214b2063a8.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191718955
            },
            "23d856ee-065e-4601-8224-a726166864c8": {
                  "id": "23d856ee-065e-4601-8224-a726166864c8",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "19_23d856ee-065e-4601-8224-a726166864c8.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191718957
            },
            "91643940-396d-4d80-b587-369e64e8ec9d": {
                  "id": "91643940-396d-4d80-b587-369e64e8ec9d",
                  "type": "ADD_ELEMENT",
                  "screenshot": "20_91643940-396d-4d80-b587-369e64e8ec9d.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191725627
            },
            "cdc1e92f-0089-4d2a-9122-0f0f70abd9f2": {
                  "id": "cdc1e92f-0089-4d2a-9122-0f0f70abd9f2",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "21_cdc1e92f-0089-4d2a-9122-0f0f70abd9f2.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191725899
            },
            "ae89d0c9-f945-4ca4-84aa-fa7e905f5ced": {
                  "id": "ae89d0c9-f945-4ca4-84aa-fa7e905f5ced",
                  "type": "BEGIN_LINK",
                  "screenshot": "24_ae89d0c9-f945-4ca4-84aa-fa7e905f5ced.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191726894
            },
            "9082a76c-a96f-405c-a22c-57219a458a6e": {
                  "id": "9082a76c-a96f-405c-a22c-57219a458a6e",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "26_9082a76c-a96f-405c-a22c-57219a458a6e.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191727875
            },
            "a60dfffb-cd9d-4664-8bbc-caef56cdbb9c": {
                  "id": "a60dfffb-cd9d-4664-8bbc-caef56cdbb9c",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "27_a60dfffb-cd9d-4664-8bbc-caef56cdbb9c.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191729218
            },
            "00a66eaf-1cf6-4b1a-9670-928e694697f0": {
                  "id": "00a66eaf-1cf6-4b1a-9670-928e694697f0",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "28_00a66eaf-1cf6-4b1a-9670-928e694697f0.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191729221
            },
            "e251c55d-56a2-4b27-9791-ea80047e77a2": {
                  "id": "e251c55d-56a2-4b27-9791-ea80047e77a2",
                  "type": "ADD_ELEMENT",
                  "screenshot": "29_e251c55d-56a2-4b27-9791-ea80047e77a2.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        },
                        "aaaaal": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "G": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191731476
            },
            "afbede09-60a7-4a7c-a79b-fb70bd41ff14": {
                  "id": "afbede09-60a7-4a7c-a79b-fb70bd41ff14",
                  "type": "ADD_ELEMENT",
                  "screenshot": "32_afbede09-60a7-4a7c-a79b-fb70bd41ff14.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        },
                        "aaaaal": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaam": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaal"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "G": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191733972
            },
            "18c21d47-7e63-4157-9781-123363c83a54": {
                  "id": "18c21d47-7e63-4157-9781-123363c83a54",
                  "type": "BEGIN_LINK",
                  "screenshot": "33_18c21d47-7e63-4157-9781-123363c83a54.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        },
                        "aaaaal": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaam": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaal"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "G": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1,
                              "EG": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191734358
            },
            "0c20bee9-364c-4954-8c6c-ce6d61f615fc": {
                  "id": "0c20bee9-364c-4954-8c6c-ce6d61f615fc",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "35_0c20bee9-364c-4954-8c6c-ce6d61f615fc.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        },
                        "aaaaal": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaam": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaal"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "G": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1,
                              "EG": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191735202
            },
            "10d0a078-aa3a-47d2-a208-021934bc9028": {
                  "id": "10d0a078-aa3a-47d2-a208-021934bc9028",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "36_10d0a078-aa3a-47d2-a208-021934bc9028.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        },
                        "aaaaal": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaam": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaal"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "G": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1,
                              "EG": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191735803
            },
            "1b54446d-df54-4409-9692-75617b2fa783": {
                  "id": "1b54446d-df54-4409-9692-75617b2fa783",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "37_1b54446d-df54-4409-9692-75617b2fa783.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        },
                        "aaaaal": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaam": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaal"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "G": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1,
                              "EG": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191735805
            },
            "a80a013e-9461-4801-95d8-b9ea97e90525": {
                  "id": "a80a013e-9461-4801-95d8-b9ea97e90525",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "41_a80a013e-9461-4801-95d8-b9ea97e90525.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        },
                        "aaaaal": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaam": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaal"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "G": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1,
                              "EG": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "a80a013e-9461-4801-95d8-b9ea97e90525"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628191766393,
                  "submission_result": "success/TEST",
                  "ticks": 269
            },
            "220ac693-76bd-46dd-a60f-414ff25b49a4": {
                  "id": "220ac693-76bd-46dd-a60f-414ff25b49a4",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "45_220ac693-76bd-46dd-a60f-414ff25b49a4.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 12,
                              "link": "L_dragonfruit_5001"
                        },
                        "aaaaah": {
                              "type": "semaphore",
                              "element_x": 8,
                              "element_y": 12,
                              "status": "active"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 0,
                              "link": "aaaaah"
                        },
                        "aaaaal": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaaam": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 4,
                              "link": "aaaaal"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "K": 1,
                              "G": 1
                        },
                        "signal_zone_dict": {
                              "K": 1,
                              "F": 1,
                              "A": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "Kintersection": 1,
                              "Fintersection": 1,
                              "AK": 1,
                              "EG": 1
                        },
                        "board_ids": [
                              "220ac693-76bd-46dd-a60f-414ff25b49a4"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1628192153047,
                  "submission_result": "success/SUBMIT",
                  "ticks": 269
            }
      }
}

var minNodeSize = 5,
    maxNodeSize = 30,
    stateNodeTextSize = 20,
    padding = 1.5,
    svgX = 0,
    svgY = 200;

var displayingFreq = false;

let stateWidth = window.innerWidth / 2;
let stateHeight = window.innerHeight;
let sequenceWidth = (window.innerWidth / 2) - 1;
let sequenceHeight = window.innerHeight;
let groupHeight = 250;
let groupWidth = 250;

var div, svg;
var groupSvg;

var userIDLengthLimit = 10;
file_suffix = '';

var clicked_circle=''

// The below loads data from server
d3.json('data/visualization_ids.json', function (error, sessionList) {
    if (error) {
        alert("The file containing the list of match IDs does not exist.");
        return console.warn(error);
    }
    dd = sessionList;

    var selectUI = d3.select("#level-select")
    var options = selectUI.selectAll('option').data(dd); // Data join

    options.enter()
        .append("option")
        .text(function (d) {
            return d;
        });
    selectUI.property("value", dd[0]);

    // graph stores the loaded data
    sID = d3.select("#level-select").node().value;
    console.log(sID);
    d3.json('data/' + sID + file_suffix + '.json', updateJSON);

});

var prevStroke, prevFill, prevFillOpa, prevStrokeOpa, prevTextFill;

/************************ Players comparison ************************/
player_ids=[] 
for (const [key, value] of Object.entries(player_traces)) {
    player_ids.push(key)}


let selector1 = d3.select("#player1");
       
    player_ids.forEach((sample) => {
        selector1
            .append("option")
            .text(sample)
            .property("value", sample);
    });

let selector2 = d3.select("#player2");
            
    player_ids.forEach((sample) => {
        selector2
            .append("option")
            .text(sample)
            .property("value", sample);
    });
$('#get_comparison').on('click', function () {
var player1_selected_id = $('#player1').find(":selected").text();
var player2_selected_id = $('#player2').find(":selected").text();
console.log(player1_selected_id)
console.log(player2_selected_id)

$('#player_comparison_info').empty();

if(player1_selected_id==player2_selected_id){
    d3.select("#player_comparison_info").append("p")
    .text("Oops you chose the same player!! Choose different players for proper comparison!")
}
else{
    // draw_comparison_chart(player1_selected_id,player2_selected_id)
    draw_comparison_chart1(player1_selected_id,player2_selected_id)
}
})
function emptyPlayerComparisonInfoDiv()
{
    $('#player_comparison_info').empty();
}
function draw_comparison_chart1(id1, id2)
{
    emptyPlayerComparisonInfoDiv()
    comparison_svg=d3.select("#player_comparison_info")
                .append("svg")
                .attr("width","250000px")
                .attr("height", "200px")
    var start_x_1=40
    var start_y_1=40
    var x_circle=40
    var y_circle=40
    var radius=15
    var line_length=9
    var distance_between_ids=radius*2+line_length*3

    // event ids 
    event_ids_player1=[]
    event_ids_player2=[]
    for (const [key, value] of Object.entries(player_traces[id1])) {
        event_ids_player1.push(key)
      }
    for (const [key, value] of Object.entries(player_traces[id2])) {
        event_ids_player2.push(key)
      }
    // get common [[(id,event_id),(id,event_id),(id,event_id)],[(id,event_id),(id,event_id)]]
    similar_ids_array=[]
    for(var i=0; i<event_ids_player1.length;i++)
    {
        similar=[]
        if(player_traces[id1][event_ids_player1[i]]['type']=='BOARD_SNAPSHOT')
        {
            
            nSemaphores=player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['nSemaphores']
            nSignals=player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['nSignals']
            sem_dict=(JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['semaphore_zone_dict']))
            sig_dict=(JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['signal_zone_dict']))
            link_dict=(JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['link_dict']))

            for(var j=0; j<event_ids_player2.length;j++)
            {
                if(player_traces[id2][event_ids_player2[j]]['type']=='BOARD_SNAPSHOT')
                {
                if((nSemaphores==player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['nSemaphores']) && (nSignals==player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['nSignals']))
                {
                    if((sem_dict === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['semaphore_zone_dict']))&&(sig_dict === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['signal_zone_dict']))&&(link_dict === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['link_dict'])))
                    {
                        similar.push((id2,player_traces[id2][event_ids_player2[j]]['id']))
                    }
                }
            }
            }
            for(var j=0; j<event_ids_player1.length;j++)
            {
                if(player_traces[id1][event_ids_player1[j]]['type']=='BOARD_SNAPSHOT')
                {
                if((nSemaphores==player_traces[id1][event_ids_player1[j]]['abstracted_board_state']['nSemaphores']) && (nSignals==player_traces[id1][event_ids_player1[j]]['abstracted_board_state']['nSignals']))
                {
                    if((sem_dict === JSON.stringify(player_traces[id1][event_ids_player1[j]]['abstracted_board_state']['semaphore_zone_dict']))&&(sig_dict === JSON.stringify(player_traces[id1][event_ids_player1[j]]['abstracted_board_state']['signal_zone_dict']))&&(link_dict === JSON.stringify(player_traces[id1][event_ids_player1[j]]['abstracted_board_state']['link_dict'])))
                    {
                        similar.push((id1,player_traces[id1][event_ids_player1[j]]['id']))
                    }
                }
            }
            }
        }
        if(similar.length!=0)
        {
            
            similar_ids_array.push(similar)    
        }
        
    }
    let unique_ids_Array = Array.from(new Set(similar_ids_array.map(JSON.stringify)), JSON.parse);
    console.log(unique_ids_Array);
    // draw for player 1
    array_of_events_displayed=[]
    k=0
    for(var i=0;i<event_ids_player1.length;i++)
    {
        if(similar_ids_array.indexOf(similar_ids_array.find(arr => arr.includes(event_ids_player1[i])))!=-1)
        {
            index=similar_ids_array.indexOf(similar_ids_array.find(arr => arr.includes(event_ids_player1[i])))
            drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"common_state","blue",id1,event_ids_player1[i],comparison_svg,similar_ids_array[index].join())
            
            array_of_events_displayed.push(event_ids_player1[i])
            array_of_events_displayed.push(k)
            for(var j=0;j<similar_ids_array[index].length;j++)
            {
                if(event_ids_player1.includes(similar_ids_array[index][j]))
                {
                    drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"loop_player1","blue",id1,event_ids_player1[i],comparison_svg,similar_ids_array[index].join())
                }
                if(event_ids_player2.includes(similar_ids_array[index][j]))
                {
                    drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"loop_player2","red",id1,event_ids_player2[i],comparison_svg,similar_ids_array[index].join())
                }
            }
            x_circle=x_circle+radius*2+line_length

        }
        else{
            drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"player_1","blue",id1,event_ids_player1[i],comparison_svg,event_ids_player1[i])
            x_circle=x_circle+radius*2+line_length
            array_of_events_displayed.push(event_ids_player1[i])
            array_of_events_displayed.push(k)
            k=k+1
        }
    }
    // draw for player 2
    array_of_events_displayed=[]
    k=0
    x_circle=start_x_1
    y_circle=start_y_1+distance_between_ids
    for(var i=0;i<event_ids_player2.length;i++)
    {
        if(similar_ids_array.indexOf(similar_ids_array.find(arr => arr.includes(event_ids_player2[i])))!=-1)
        {
            index=similar_ids_array.indexOf(similar_ids_array.find(arr => arr.includes(event_ids_player2[i])))
            drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"common_state","red",id1,event_ids_player1[i],comparison_svg,similar_ids_array[index])
            
            array_of_events_displayed.push(event_ids_player2[i])
            array_of_events_displayed.push(k)
            for(var j=0;j<similar_ids_array[index].length;j++)
            {
                if(event_ids_player1.includes(similar_ids_array[index][j]))
                {
                    drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"loop_player1","blue",id1,event_ids_player1[i],comparison_svg,similar_ids_array[index].join())
                }
                if(event_ids_player2.includes(similar_ids_array[index][j]))
                {
                    drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"loop_player2","red",id1,event_ids_player2[i],comparison_svg,similar_ids_array[index].join())
                }
            }
            x_circle=x_circle+radius*2+line_length

        }
        else{
            drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"player_2","red",id1,event_ids_player1[i],comparison_svg,event_ids_player1[i])
            x_circle=x_circle+radius*2+line_length
            array_of_events_displayed.push(event_ids_player1[i])
            array_of_events_displayed.push(k)
            k=k+1
        }
    }
}
function drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,event_type,line_color,id,event_id,svg,text)
{
    text=event_id
    var group=svg.append('g')
    if(event_type=="common_state")
    {
        
        group.append('circle')
             .attr('cx', x_circle)
             .attr('cy', y_circle)
             .attr('r', radius)
             .attr('stroke', 'black')
             .attr('fill', "#deed6d") 

       group.append('line')
            .attr('x1', x_circle+radius)
            .attr('y1', y_circle)
            .attr('x2', x_circle+radius+line_length)
            .attr('y2', y_circle)
            .attr('stroke', line_color);
        group.append("title").text(text);
    }
    else if(event_type=="player_1")
    {
        
        group.append('circle')
             .attr('cx', x_circle)
             .attr('cy', y_circle)
             .attr('r', radius)
             .attr('stroke', 'black')
             .attr('fill', "#93ede9") 

       group.append('line')
            .attr('x1', x_circle+radius)
            .attr('y1', y_circle)
            .attr('x2', x_circle+radius+line_length)
            .attr('y2', y_circle)
            .attr('stroke', line_color);

        group.append("title").text(text);
    }
    else if(event_type=="player_2")
    {
        
        group.append('circle')
             .attr('cx', x_circle)
             .attr('cy', y_circle)
             .attr('r', radius)
             .attr('stroke', 'black')
             .attr('fill', "#edaa93") 

       group.append('line')
            .attr('x1', x_circle+radius)
            .attr('y1', y_circle)
            .attr('x2', x_circle+radius+line_length)
            .attr('y2', y_circle)
            .attr('stroke', line_color);

        group.append("title").text(text);
    }
    else if(event_type=="loop_player1")
    {
        // var arc = d3.arc()
        //     .innerRadius(40)
        //     .outerRadius(45)
        //     .startAngle(10)
        //     .endAngle(8);
  
        // group.append("path")
        //     .attr("class", "arc")
        //     .attr("d", arc)
        //     .attr("fill","blue");
        // path_coordinates="m "+ x_circle +" "+ y_circle+radius+" a -7 -53 0 0 0 -7 -1"
        // group.append("path")
        //      .attr("d",path_coordinates)
        
        group.append('line')
            .attr('x1', x_circle)
            .attr('y1', y_circle-radius)
            .attr('x2', x_circle)
            .attr('y2', y_circle-radius-10)
            .attr('stroke', "blue");
        group.append('line')
            .attr('x1', x_circle)
            .attr('y1', y_circle-radius-10)
            .attr('x2', x_circle-5)
            .attr('y2', y_circle-radius-10)
            .attr('stroke', "blue");
        group.append('line')
            .attr('x1', x_circle-5)
            .attr('y1', y_circle-radius-10)
            .attr('x2', x_circle-5)
            .attr('y2', y_circle-radius)
            .attr('stroke', "blue");
    }
    
    else if(event_type=="loop_player2")
    {
        // var arc = d3.arc()
        //     .innerRadius(40)
        //     .outerRadius(45)
        //     .startAngle(10)
        //     .endAngle(8);
  
        // group.append("path")
        //     .attr("class", "arc")
        //     .attr("d", arc)
        //     .attr("fill","blue");
        // path_coordinates="m "+ x_circle +" "+ y_circle+radius+" a -7 -53 0 0 0 -7 -1"
        // group.append("path")
        //      .attr("d",path_coordinates)

        group.append('line')
            .attr('x1', x_circle+3)
            .attr('y1', y_circle-radius)
            .attr('x2', x_circle+3)
            .attr('y2', y_circle-radius-10)
            .attr('stroke', "red");
        group.append('line')
            .attr('x1', x_circle+3)
            .attr('y1', y_circle-radius-10)
            .attr('x2', x_circle-5+3)
            .attr('y2', y_circle-radius-10)
            .attr('stroke', "red");
        group.append('line')
            .attr('x1', x_circle-5+3)
            .attr('y1', y_circle-radius-10)
            .attr('x2', x_circle-5+3)
            .attr('y2', y_circle-radius)
            .attr('stroke', "red");
        // group.append('line')
        //     .attr('x1', x_circle+3)
        //     .attr('y1', y_circle-radius)
        //     .attr('x2', x_circle+3)
        //     .attr('y2', y_circle-radius-10)
        //     .attr('stroke', "red");
        // group.append('line')
        //     .attr('x1', x_circle+3)
        //     .attr('y1', y_circle-radius-10)
        //     .attr('x2', x_circle-5)
        //     .attr('y2', y_circle+radius-10)
        //     .attr('stroke', "red");
        // group.append('line')
        //     .attr('x1', x_circle-5)
        //     .attr('y1', y_circle+radius-10)
        //     .attr('x2', x_circle-5)
        //     .attr('y2', y_circle-radius)
        //     .attr('stroke', "red");
    }
}


function draw_comparison_chart(id1, id2)
{
    emptyPlayerComparisonInfoDiv()
    comparison_svg=d3.select("#player_comparison_info")
                .append("svg")
                .attr("width","250000px")
                .attr("height", "200px")
    var start_x_1=40
    var start_y_1=40
    var x_circle=40
    var y_circle=40
    var radius=15
    var line_length=9
    var distance_between_ids=radius*2+line_length*3



    
    // x_axis_circle+=2*radius_snapshot+line_length
    event_ids_player1=[]
    event_ids_player2=[]
    for (const [key, value] of Object.entries(player_traces[id1])) {
        event_ids_player1.push(key)
      }
    for (const [key, value] of Object.entries(player_traces[id2])) {
        event_ids_player2.push(key)
      }
    same_event_ids=[]  // the first id is player1 and second id is for player2
    // for getting the same event types in one array
    for(var i=0; i<event_ids_player1.length;i++)
    {
        if(player_traces[id1][event_ids_player1[i]]['type']=='BOARD_SNAPSHOT')
        {
            for(var j=0; j<event_ids_player2.length;j++)
            {
                if(player_traces[id1][event_ids_player1[i]]['type']=='BOARD_SNAPSHOT')
                {
                if((player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['nSemaphores']==player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['nSemaphores']) && (player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['nSignals']==player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['nSignals']))
                {
                    if((JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['semaphore_zone_dict']) === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['semaphore_zone_dict']))&&(JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['signal_zone_dict']) === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['signal_zone_dict']))&&(JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['link_dict']) === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['link_dict'])))
                    {
                        same_event_ids.push(player_traces[id1][event_ids_player1[i]]['id'])
                        same_event_ids.push(player_traces[id2][event_ids_player2[j]]['id'])
                    }
                }
            }
            }
        }
    }
    console.log(same_event_ids)
    for(var i=0; i<event_ids_player1.length;i++)
    {
        draw_board(x_circle,y_circle,radius,line_length*2,start_x_1,start_y_1,"horizontal",'#99ccff',"blue",id1,event_ids_player1[i],comparison_svg)
        x_circle=x_circle+radius*2+line_length*2
    }
    x_circle=start_x_1 
    for(var i=0; i<event_ids_player2.length;i++)
    {
        if (same_event_ids.includes(event_ids_player2[i]))
        {
            
            draw_board(x_circle,y_circle+distance_between_ids,radius,line_length,start_x_1,start_y_1,"vertical",'#ff6666',"red",id2,event_ids_player2[i],comparison_svg)
            x_circle=x_circle+radius*2+line_length
        }
        else
        {
            draw_board(x_circle,y_circle+distance_between_ids,radius,line_length,start_x_1,start_y_1,"horizontal",'#ff6666',"red",id2,event_ids_player2[i],comparison_svg)
            x_circle=x_circle+radius*2+line_length
        }
        
    }
}

function draw_board(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,line_type,fill,line_color,id,event_id,svg)
{
    text=event_id
    var group=svg.append('g')
         group.append('circle')
        .attr('cx', x_circle)
        .attr('cy', y_circle)
        .attr('r', radius)
        .attr('stroke', 'black')
        .attr('fill', fill)
        if(line_type=="horizontal")
        {
            group.append('line')
            .attr('x1', x_circle+radius)
            .attr('y1', y_circle)
            .attr('x2', x_circle+radius+line_length)
            .attr('y2', y_circle)
            .attr('stroke', line_color);
        }
        if(line_type=="vertical")
        {
            similar_array=same_event_ids.map((val, index) => ({ val, index }))
   .filter(({val, index}) => val === event_id)
   .map(({val, index}) => index)
            
            for(var k=0;k<similar_array.length;k++)
            {
                console.log(start_x_1 - radius + event_ids_player1.indexOf(same_event_ids[same_event_ids.indexOf(event_id)-1])*(2*radius+2*line_length))
                console.log(start_x_1)
                console.log(start_x_1-radius)
                // console.log(same_event_ids.indexOf(event_id)-1)
                console.log(same_event_ids[similar_array[k]-1])
                console.log(event_ids_player1.indexOf(same_event_ids[same_event_ids.indexOf(event_id)-1]))
                console.log("-----")
                group.append('line')
                .attr('x1', x_circle+radius)
                .attr('y1', y_circle)
                .attr('x2',start_x_1 - radius + event_ids_player1.indexOf(same_event_ids[similar_array[k]-1])*(2*radius+2*line_length))
                .attr('y2', start_y_1)
                .attr('stroke', line_color);

                group.append('line')
                .attr('x2',start_x_1 + radius  + event_ids_player1.indexOf(same_event_ids[similar_array[k]-1])*(2*radius+2*line_length))
                .attr('y2', start_y_1)
                .attr('x1',start_x_1 - radius + event_ids_player1.indexOf(same_event_ids[similar_array[k]-1])*(2*radius+2*line_length))
                .attr('y1', start_y_1)
                .attr('stroke', line_color);

                group.append('line')
                .attr('x1', x_circle+2*radius)
                .attr('y1', y_circle)
                .attr('x2',start_x_1 + radius + event_ids_player1.indexOf(same_event_ids[similar_array[k]-1])*(2*radius+2*line_length))
                .attr('y2', start_y_1)
                .attr('stroke', line_color);
            }
            
        }
         
        group.append("title").text(text);
}
/********************* Intermediate analysis ***********************/ 


function emptyIntemediateDiv()
{
    $('#intermediate_action_analysis_svg').empty();
    $('#intermediate_action_analysis_1_svg').empty();
}

function drawEvent(x_axis_circle,y_axis_circle,radius,line_length,index,fill,text,svg_name,id,event_id,svg1)
{
    intermediate_gif_path=""
    $('.node_commenting').hide();
    var group=svg1.append('g')
         group.append('circle')
        .attr('cx', x_axis_circle)
        .attr('cy', y_axis_circle)
        .attr('r', radius)
        .attr('stroke', 'black')
        .attr('fill', fill)
        group.append('line')
        .attr('x1', x_axis_circle+radius)
        .attr('y1', y_axis_circle)
        .attr('x2', x_axis_circle+radius+line_length)
        .attr('y2', y_axis_circle)
        .attr('stroke', 'red'); 
        group.append("title").text(text);
        if(player_traces[id][event_id]['type']=="BOARD_SNAPSHOT" && text!="intermediate gif")
        {
            if(player_traces[id][event_id]["ticks"]=="No Ticks Available")
            {
                group.append("text")
                    .attr({"x":x_axis_circle-3,"y": y_axis_circle+3})
                    .text("X")
                    .style("font-color","black")
            }
            else
            {
                group.append("text")
                    .attr({"x":x_axis_circle-3,"y": y_axis_circle+3})
                    .text(player_traces[id][event_id]["ticks"])
                    .style("font-color","black")
            }
            
        }
        
        if(svg_name!=="representation_2" && player_traces[id][event_id]['upvotes']>5)
        {
            group.append('circle')
        .attr('cx', x_axis_circle)
        .attr('cy', y_axis_circle+radius+radius/4+3)
        .attr('r', radius/4)
        .attr('stroke', 'black')
        .attr('fill', 'black')
        }
        group.on("click", function(){
            localStorage.setItem('event_id',event_id)
            localStorage.setItem('player_id',id)
            // edited
            if(svg_name=="representation_2")
            {
                if(text==="intermediate gif")
                {
                    console.log(index1)
                    $('#show_screenshot').empty();
                    for(var t=0;t<gif_mapper[id].length;t++)
                    {
                        console.log(((gif_mapper[id][t].split("/")[2]).split("_")[1]).split(".")[0])
                        console.log(player_traces[id][event_id]['screenshot'].split("_")[0])
                        if(((gif_mapper[id][t].split("/")[2]).split("_")[1]).split(".")[0]==player_traces[id][event_id]['screenshot'].split("_")[0])
                        {
                            console.log(gif_mapper[id][t])
                            intermediate_gif_path=gif_mapper[id][t];
                        }
                    }
                    d3.select('#show_screenshot')
                    .append("img")
                    .attr('src',intermediate_gif_path)
                    .style('height','300px')
                    .style('width','300px') 

                    


                    $('#event_type').text("Event type: "+text)
                    index1=player_traces[id][event_id]['screenshot'].split("_")[0]
                    console.log(index1)

                } 
                else if(player_traces[id][event_id]['type']=="BOARD_SNAPSHOT")
                {
                    $('#show_screenshot').empty();
                d3.select('#show_screenshot')
                .append("img")
                .attr('src',"IntermediateScreenShots/"+id+"/"+player_traces[id][event_id]['screenshot'])
                .style('height','300px')
                .style('width','300px') 

                $('#event_type').text("Event Type: "+player_traces[id][event_id]['type'])

                // edit here for displaying the better player amonf the given players
                player_ids=[] 
                $('#get_better_players').empty()
                ticks_count=player_traces[id][event_id]['ticks']
                flag1=0
                flag2=0
                for (const [key, value] of Object.entries(player_traces)) {
                    flag1=0
                    for(const[key1,value1] of Object.entries(player_traces[key]))
                    {
                        if(value1['type']=="BOARD_SNAPSHOT" && value1['submission_result']=='success/SUBMIT' && value1['ticks']!='No Ticks Available' && value1['ticks']<ticks_count){
                            // flag for displaying some text only once
                            if(flag2==0)
                            {
                                d3.select('#get_better_players')
                              .append('h2')
                              .text("Check out the following players who played better!!")
                              flag2=1
                            }
                            if(flag1==0)
                            {
                                d3.select('#get_better_players')
                              .append('p')
                              .text(key)
                              flag1=1
                            }
                            d3.select('#get_better_players')
                              .append("img")
                              .attr('src',"IntermediateScreenShots/"+key+"/"+value1['screenshot'])
                              .style('height','100px')
                              .style('width','100px')
                            d3.select('#get_better_players')
                              .append('p')
                              .text(value1['ticks']+" ticks")
                        }

                    }
                }
                }  
                
                // for(var i=0;i<player_ids.length;i++)
                // {
                //     for(var j=0;j<player_traces[player_ids[i]].length;j++)
                //     {
                //         console.log(player_traces[player_ids[i]][j])
                //     }
                // }
                $('#current_upvotes').text('Current Upvotes: '+player_traces[id][event_id]['upvotes'])
                  
            }
            else
            {
                $('#show_screenshot').empty();
                d3.select('#show_screenshot')
                .append("img")
                .attr('src',"IntermediateScreenShots/"+id+"/"+player_traces[id][event_id]['screenshot'])
                .style('height','300px')
                .style('width','300px')

                $('#event_type').text("Event Type: "+player_traces[id][event_id]['type'])
                $('#player_id').text("Player Id: "+id)
                $('#event_id').text("Event Id: "+event_id)
                
                $('#comment').val('');
                $('#previous_comments').empty();
                
                $('#current_upvotes').text('Current Upvotes: '+player_traces[id][event_id]['upvotes']) 
                for(var i=0;i<player_traces[id][event_id]['discussion'].length;i++)
                {   
                    $('#previous_comments').append('<p>'+ player_traces[id][event_id]['discussion'][i] +'</p>')
                }    
                 
            }
            $('.node_commenting').show();     
            $(".close_button").on("click",function(){
                $('.node_commenting').hide();
            }) 
            

              
        })
}

$('#submit_comment').click(function(){
    player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['discussion'].push($( "#comment" ).val())
    $('#comment').val('');  
    $('#previous_comments').empty();
    for(var i=0;i<player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['discussion'].length;i++)
    {   
        $('#previous_comments').append('<p>'+ player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['discussion'][i] +'</p>')
    }    
})


$('#submit_upvote').click(function(){
    player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['upvotes']+=1
    console.log(player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['upvotes'])
    $('#current_upvotes').empty()
    $('#current_upvotes').append('<p>'+'Current Upvotes: ' +player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['upvotes'] +'</p>')
})

// function prev_state_board_snapshot(index,x_axis_circle,radius_snapshot,radius_other,previous_event_type,present_event_type)
// {
//     if(present_event_type!='BOARD_SNAPSHOT')
//     {
//         if(index!=0 && previous_event_type=="BOARD_SNAPSHOT")
//                 {
//                     console.log(x_axis_circle)
//                     console.log(x_axis_circle-radius_snapshot+radius_other)
//                     return (x_axis_circle-radius_snapshot+radius_other)
//                 }
//     }
//     else
//     {
//         if(index!=0 && (previous_event_type=="ADD_ELEMENT"||previous_event_type=="MOVE_ELEMENT"||previous_event_type=="REMOVE_ELEMENT"||previous_event_type=="TOGGLE_ELEMENT"||previous_event_type=="BEGIN_LINK"))
//         {
//             return(x_axis_circle-radius_other+radius_snapshot)
//         }
//     }
// }

function intermediate_state_representation(id){
emptyIntemediateDiv()
intermediate_svg=d3.select("#intermediate_action_analysis_svg")
                .append("svg")
                .attr("width","25000px")
                .attr("height", "100px")
// edited
intermediate_1_svg=d3.select("#intermediate_action_analysis_1_svg")
                .append("svg")
                .attr("width","25000px")
                .attr("height", "100px")

// edited
x_axis_circle_1=40
y_axis_circle_1=40
radius_snapshot_1=20
radius_other_1=10
line_length_1=25


x_axis_circle=40
y_axis_circle=40
radius_snapshot=20
radius_other=10
line_length=6

x_axis_circle+=2*radius_snapshot+line_length
event_ids=[]
for (const [key, value] of Object.entries(player_traces[id[0].slice(0,-5)])) {
    event_ids.push(key)
  }

//TODO : This loop needs to be optimized. Lot of repeted code!
for(var j=0; j<event_ids.length;j++)
{
      present_event_type=player_traces[id[0].slice(0,-5)][event_ids[j]]['type']
      if(j==0)
      {
        previous_event_type='none'    
      }
      else{
        previous_event_type=player_traces[id[0].slice(0,-5)][event_ids[j-1]]['type']
      }
      
      if (present_event_type=="ADD_ELEMENT")
      {
        if(j!=0 && previous_event_type=="BOARD_SNAPSHOT")
        {
            x_axis_circle=(x_axis_circle-radius_snapshot+radius_other)
        }
            drawEvent(x_axis_circle,y_axis_circle,radius_other,line_length,index1,'#3366cc',"add element","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
            x_axis_circle+=2*radius_other+line_length
      }
      if (present_event_type=="MOVE_ELEMENT"){
        if(j!=0 && previous_event_type=="BOARD_SNAPSHOT")
        {
            x_axis_circle=(x_axis_circle-radius_snapshot+radius_other)
        }
      drawEvent(x_axis_circle,y_axis_circle,radius_other,line_length,index1,'#dc3912',"move element","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
      x_axis_circle+=2*radius_other+line_length
      }
      if (present_event_type=="TOGGLE_ELEMENT")
      {
        if(j!=0 && previous_event_type=="BOARD_SNAPSHOT")
        {
            x_axis_circle=(x_axis_circle-radius_snapshot+radius_other)
        }
    //   x_axis_circle=prev_state_board_snapshot(j,x_axis_circle,radius_snapshot,radius_other, previous_event_type,present_event_type)
      drawEvent(x_axis_circle,y_axis_circle,radius_other,line_length,index1,'#ff9900',"toggle element","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
      x_axis_circle+=2*radius_other+line_length
      }
      if (present_event_type=="REMOVE_ELEMENT")
      {
        if(j!=0 && previous_event_type=="BOARD_SNAPSHOT")
        {
            x_axis_circle=(x_axis_circle-radius_snapshot+radius_other)
        }
      drawEvent(x_axis_circle,y_axis_circle,radius_other,line_length,index1,'#109618', "remove element","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
      x_axis_circle+=2*radius_other+line_length
      }
      if (present_event_type=="BEGIN_LINK")
      {
        if(j!=0 && previous_event_type=="BOARD_SNAPSHOT")
        {
            x_axis_circle=(x_axis_circle-radius_snapshot+radius_other)
        }
      drawEvent(x_axis_circle,y_axis_circle,radius_other,line_length,index1,'#990099',"link added","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
      x_axis_circle+=2*radius_other+line_length
      }
      if (present_event_type=="BOARD_SNAPSHOT")
      {
        if(j!=0 && (previous_event_type=="ADD_ELEMENT"||previous_event_type=="MOVE_ELEMENT"||previous_event_type=="REMOVE_ELEMENT"||previous_event_type=="TOGGLE_ELEMENT"||previous_event_type=="BEGIN_LINK"))
        {
            x_axis_circle=(x_axis_circle-radius_other+radius_snapshot)
        }
      drawEvent(x_axis_circle,y_axis_circle,radius_snapshot,line_length,index1,'#f5ffa3',"board snapshot","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
      x_axis_circle+=2*radius_snapshot+line_length
    //   edited
    if(player_traces[id[0].slice(0,-5)][event_ids[j]]['submission_result']=="Not a test/submit")
    {
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#e6cc27',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
    }
    else if(player_traces[id[0].slice(0,-5)][event_ids[j]]['submission_result']=="success/TEST")
    {
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#a8fa87',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
        
    }
    else if(player_traces[id[0].slice(0,-5)][event_ids[j]]['submission_result']=="success/SUBMIT")
    {
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#08850a',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
    }
    else if(player_traces[id[0].slice(0,-5)][event_ids[j]]['submission_result']=="failure/TEST")
    {
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#e08080',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
    }
    else if(player_traces[id[0].slice(0,-5)][event_ids[j]]['submission_result']=="failure/SUBMIT")
    {
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#a30505',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
    }
    else{
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#f5ffa3',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
    }
    
      
      }

}
}

// function draw_mini_event(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,fill,id,event_ids,svg)
// {
    
// }
/******************** State graph **********************************/

var stateforce = d3.layout.force()
    .charge(-1500)
    .linkDistance(1000)
    .size([stateWidth, stateHeight])
    .on("tick", statetick);

svg = d3.select("#state-graph-svg")
    .attr("width", stateWidth)
    .attr("height", stateHeight)
    .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", stateZoomPan))
    .on("dblclick.zoom", null)
    .append("svg:g")
    .attr("transform", "translate(200,200)scale(.5,.5)");


// the graph components (nodes and links)
var stateSvgContainer = svg.append("g").attr("id", "stategraph_container");
let statelink = stateSvgContainer.append("g").attr("id", "statelink_container").selectAll(".statelink");
let statenode = stateSvgContainer.append("g").attr("id", "statenode_container").selectAll(".statenode");

// Define markers
// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["start", "mid", "end"])
    .enter().append("marker")
    .attr("id", function (d) {
        return d;
    })
    // the region viewable in this marker
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", 0)
    .attr("markerWidth", 30) //1.5)
    .attr("markerHeight", 30) //1.5)
    .attr("markerUnits", "userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5");

// for sticky drag
var statedrag = stateforce.drag().on("dragstart", dragstart);

/********************* Behavior graph ******************************/

const minDistance = 50;
const maxDistance = 500;

var behaviorforce = d3.layout.force()
    .charge(-100)
    .linkDistance(distanceMapping)
    .size([sequenceWidth, sequenceHeight])
    .on("tick", behaviortick);

svg = d3.select("#sequence-graph-svg")
    .attr("width", sequenceWidth)
    .attr("height", sequenceHeight)
    .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", behaviorZoomPan))
    .on("dblclick.zoom", null)


// the graph components (nodes and links)
var behaviorSvgContainer = svg.append("g").attr("id", "graph_container");
var behaviorlink = behaviorSvgContainer.append("g").attr("id", "link_container").selectAll(".behaviorlink");
var behaviornode = behaviorSvgContainer.append("g").attr("id", "node_container").selectAll(".behaviornode");


// for sticky drag
var behaviordrag = behaviorforce.drag()
    .on("dragstart", behaviorDragstart);

//--------------- Functions ------------
var stateMap = {};
var actionMap = {};

function updateJSON(error, json) {

    if (error) {
        alert("Level does not exist!");
        return console.warn(error);
    }
    data = json;

    // update info on num statenodes and players
    d3.select("#level-id").text(data.level_info);
    // d3.select("#num-statenodes").text(data.nodes.length);

    // set statemap for fast access
    stateMap = {};
    data.nodes.forEach(function (aNode) {
        stateMap[aNode.id] = aNode;
    });

    actionMap = {};
    data.links.forEach(function (aLink) {
        actionMap[aLink.id] = aLink;
    });

    visualizeStateData();
    if (data.team_trajectories) {
        let group = document.getElementById('group-graph-container')
        group.classList.remove('none')
        d3.select("#group-trajectories").text(data.team_trajectories.length);
        visualizeGroupData();
    }

    // update info on num nodes and players
    d3.select("#num-sequences").text(data.trajectories.length);
    d3.select("#num-players").text(data.num_users);
    // d3.select("#num-teams").text(data.team_trajectories.length);

    visualizeBehaviorData();

    showLinks = true;
    toggleShowLinks();
}

function updateLevel() {
    clearHighlight();
    clearTextField();
    clearGroupNodesActive();
    sID = d3.select("#level-select").node().value;
    d3.json('data/' + sID + file_suffix + '.json', updateJSON);
}

/******************** State graph **********************************/
var linearStateNodeScale, linearStateLinkScale;

var presetStateNodes = function (nodes) {

    margin = 100;
    maxX = 890;

    nodeSpacing = (maxX - 2 * margin) / 8;
    yNodeSpacing = 200;

    // Prefix positions of start and end nodes------
    nodes[0].fixed = true;
    nodes[0].x = margin;
    nodes[0].y = margin;

    nodes[1].fixed = true;
    nodes[1].x = stateWidth - margin;
    nodes[1].y = stateHeight - margin;
};

var state_node_label = function (d) {

    return extractDetails(d.details);

};

var state_link_label = function (d) {
    return d.details;
};


function visualizeStateData() {
    linearStateNodeScale = getStateNodeScale(data.nodes);
    linearStateLinkScale = getStateLinkScale(data.links);

    // Prefix positions of start and end nodes------
    presetStateNodes(data.nodes);
    //---------------------------------------------

    stateforce.nodes(data.nodes)
        .links(data.links);

    statelink = statelink.data(data.links);
    statenode = statenode.data(data.nodes);

    statelink.exit().remove();
    statenode.exit().remove();

    // UPDATE --------------------
    statelink.attr("id", function (d, i) {
        return 'statelink' + d.id;
    })
        .attr("class", updateLinkClass)
        .style("stroke-width", getStrokeWidth)
        .attr("marker-end", function (d) {
            return "url(#mid)";

        });
    statelink.select("title").text(function (d) {
        return state_link_label(d);
    });

    statenode.attr("id", function (d, i) {
        return 'statenode' + d.id;
    })
        .attr("class", function (d) {
            return "statenode " + d.type;
        })
        .select("circle")
        .attr("class", function (d) {
            return d.type;
        })
        .attr("r", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        });

    statenode.select("text")
        .attr("class", function (d) {
            return d.type;
        })
        .attr("dx", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        })
        .attr("font-size", function (d) {
            return maxNodeSize;
        })
        .text(function (d, i) {
            return state_node_label(d);
        });

    statenode.select("title").text(function (d) {
        return state_node_label(d);
    });

    // ENTER ----------------
    var statelinkGroup = statelink.enter().append("path") //.append("line")
        .attr("class", updateLinkClass)
        .attr("id", function (d, i) {
            return 'statelink' + d.id;
        })
        .style("stroke-width", getStrokeWidth)
        .attr("marker-end", function (d) {
            return "url(#mid)";
        })
        .on("click", function (d) {
        
            stateLinkClicked(d)
        })
        .on("dblclick", function (d) {
        
            setPlaytraceIndex(d)
            highlightNodeID()
        })
        .on("mouseover", function (d) {
            if (!d3.select("#playtrace-index").node().value) {
                highlightNodeStroke(d, true)
            }
        })
        .on("mouseout", function (d) {
            highlightNodeStroke(d, false)
        })

    statelinkGroup.append("title").text(function (d) {
        return state_link_label(d);
    });

    var statenodeGroup = statenode.enter().append("g")
        .attr("class", function (d) {
            return "statenode " + d.type;
        })
        .attr("id", function (d, i) {
            return 'statenode' + d.id;
        })
        //andy
        //disabled
        // .on("dblclick", dblclick)
        .call(statedrag);

    statenodeGroup.append("title").text(function (d) {
        return state_node_label(d);
    });

    statenodeGroup.append("circle")
        .attr("r", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        })
        .on('click',function(d){
            // edited
            // 't' variable is reponsible for checking if a particular player is clicked, called in behaviorDragStart() function, returned from displayStateImages() function
            // imagedisplay_id= list with a user_id, whose board_state images are being displayed
            // node_image_mapper is defined on top
            if(t)
            {
                // this means the images for a particular id are being displayed
                $('#player_state_image').empty()
                user_id=imagedisplay_id[0]
                console.log("user id")
                console.log(user_id.slice(0,-5))
                for(i=0;i<d.details.board_ids.length;i++)
                {
                    var file1="Screenshots/"+user_id.slice(0,-5)+"/"+d.details.board_ids[i]+".png"
                    for (j=0;j<node_image_mapper[user_id.slice(0,-5)].length;j++)
                    {
                        file_list=node_image_mapper[user_id.slice(0,-5)][j].split("/")
                        board_file_list=file_list[2].split("_")
                        board_file=board_file_list[1]
                        file2=file_list[0]+"/"+file_list[1]+"/"+board_file
                        console.log("file2")
                        console.log(file2)
                        if(file2==file1)
                        {
                            $('#player_state_image').append("<img class='image-style'" + "src= "+ node_image_mapper[user_id.slice(0,-5)][j] + ">")
    
                        }
                    }
                    // if(node_image_mapper[user_id.slice(0,-5)].includes(file1))
                    // {
                    //     console.log(file1)
                    //     $('#player_state_image').append("<img class='image-style'" + "src= "+ file1 + ">")
                    // }
                }

            }

        })
        .on("mouseover", stateDisplayInfo);

    statenodeGroup.append("text")
        .attr("dx", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        })
        .attr("dy", ".35em")
        .attr("class", function (d) {
            return d.type;
        })
        .attr("font-size", function (d) {
            return stateNodeTextSize;
        })
        .text(function (d, i) {
            return state_node_label(d);
        });

    // EXIT --------------------------------------


    stateforce.start();

}


// Group Graph

var groupForce = d3.layout.force()
    .charge(-100)
    // .linkDistance(distanceMapping)
    .linkDistance(100)
    .size([groupWidth, groupHeight])
    .on("tick", groupTick);

groupSvg = d3.select("#group-graph-svg")
    .attr("width", groupWidth)
    .attr("height", groupHeight)
    .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", behaviorZoomPan))
    .on("dblclick.zoom", null)


// the graph components (nodes and links)
var groupSvgContainer = groupSvg.append("g").attr("id", "group-graph-container");
var groupLink = groupSvgContainer.append("g").attr("id", "group-link-container").selectAll(".groupLink");
var groupNode = groupSvgContainer.append("g").attr("id", "group-node-container").selectAll(".groupNode");


// for sticky drag
var groupDrag = groupForce.drag()
    .on("dragstart", groupDragStart);

//--------------- Functions ------------


// flag: 1 - popularity, 2 - look significant
// can create function instead of copying codes
var changeStateNodeSizeType = function (flag) {
    switch (flag) {

        case 1:
            statenode
                .select("circle")
                .attr("r", function (d) {
                    return linearStateNodeScale(d.user_ids.length);
                });
            statenode.select("text")
                .attr("font-size", function (d) {
                    return linearStateNodeScale(d.user_ids.length);
                })
            break;

        case 2:
            statenode
                .select("circle")
                .attr("r", function (d) {
                    if (d.type == 'mid')
                        return linearStateNodeScale(getLookSignificance(d));
                    return maxNodeSize;
                });
            statenode.select("text")
                .attr("font-size", function (d) {
                    if (d.type == 'mid')
                        return linearStateNodeScale(getLookSignificance(d));
                    return maxNodeSize;
                })
            break;

    }
};

function statetick(e) {
    statelink.attr("d", function (d) {
        var x1 = d.source.x,
            y1 = d.source.y,
            x2 = d.target.x,
            y2 = d.target.y,
            dx = x2 - x1,
            dy = y2 - y1,
            dr = Math.sqrt(dx * dx + dy * dy),

            // Defaults for normal edge.
            drx = dr,
            dry = dr,
            xRotation = 0,
            largeArc = 0,
            sweep = 1;

        // Self edge.
        if (x1 === x2 && y1 === y2) {
            // Fiddle with this angle to get loop oriented.
            xRotation = -45;

            // Needs to be 1.
            largeArc = 1;

            // Change sweep to change orientation of loop.
            //sweep = 0;

            // Make drx and dry different to get an ellipse
            // instead of a circle.
            drx = 30;
            dry = 20;

            // For whatever reason the arc collapses to a point if the beginning
            // and ending points of the arc are the same, so kludge it.
            x2 = x2 + 1;
            y2 = y2 + 1;
        }

        return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
    });

    statenode
        .each(collide(.5))
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
}


// Move nodes toward cluster focus.
function gravity(alpha) {
    return function (d) {
        if (d.type == 'mid') {
            d.y += (foci[gravityFocus[d.details.affect]].y - d.y) * alpha;
            d.x += (foci[gravityFocus[d.details.affect]].x - d.x) * alpha;
        }
    };
}

function getStrokeWidth(d) {
    return linearStateLinkScale(d.user_ids.length);
}

function updateLinkClass(d) {
    return 'statelink mid';
}

function getLinkTypeFromMeaning(meaning) {
    return "mid";
}

function getStateNodeScale(dataset) {
    var minVisits = d3.min(dataset, function (d) {
        return d.user_ids.length;
    });
    var maxVisits = d3.max(dataset, function (d) {
        return d.user_ids.length;
    });

    return d3.scale.linear()
        .domain([minVisits, maxVisits])
        .range([minNodeSize, maxNodeSize]);
}

function getStateLinkScale(dataset) {
    var minVisits = d3.min(dataset, function (d) {
        return d.user_ids.length;
    });
    var maxVisits = d3.max(dataset, function (d) {
        return d.user_ids.length;
    });

    return d3.scale.linear()
        .domain([minVisits, maxVisits])
        .range([minNodeSize, maxNodeSize]);
}

// collision detection
// Resolves collisions between d and all other circles.
function collide(alpha) {
    var quadtree = d3.geom.quadtree(data.nodes);
    return function (d) {
        // the radius of the current node
        var d_radius = linearStateNodeScale(d.user_ids.length);
        var r = d_radius + maxNodeSize + padding,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;

        quadtree.visit(function (quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d_radius + linearStateNodeScale(quad.point.user_ids.length) + padding;
                if (l < r) {
                    l = (l - r) / l * alpha; // padding
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    };
}


function stateZoomPan() {
    stateSvgContainer.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function behaviorZoomPan() {
    behaviorSvgContainer.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// for sticky drag
// This callback can access this (the DOM object it is called upon)
function dblclick(d) {
    // somehow this works, but
    // d3.event.sourceEvent.stopPropagation(); does not

    d3.event.stopPropagation();
    d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("fixed", d.fixed = true);
    stateDisplayInfo(d);
}

// display info in textboxes
function stateDisplayInfo(d) {

    d3.select("#statenode-id").text(d.id);
    d3.select("#statenode-info").text(extractDetails(d.details));
    d3.select("#statenode-stats").text(extractStats(d.stats));
    d3.select("#num-players-state").text(d.user_ids.length);
    if (d.user_ids.length <= userIDLengthLimit)
        d3.select("#players-state").text(d.user_ids);
    else d3.select("#players-state").text(d.user_ids.slice(0, userIDLengthLimit) + ",....");
}

// display link info in textboxes
function stateLinkClicked(d) {

    d3.select("#num-players-statelink").text(d.user_ids.length);
    if (d.user_ids.length <= userIDLengthLimit)
        d3.select("#players-statelink").text(d.user_ids);
    else d3.select("#players-statelink").text(d.user_ids.slice(0, userIDLengthLimit) + ",....");
    d3.select("#statelink-info").text(state_link_label(d));


}

function getNumTrue(itemArray) {
    var result = 0;
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i][2]) result++;
    }
    return result;
}

// index 0: start, index 1: end
function setNodeForFreq(index) {
    var value = d3.select("#statenode-id").text();
    if (index == 0) {
        d3.select("#freq-start-node").node().value = value;
    } else d3.select("#freq-end-node").node().value = value;
}


/*************************** Behavior graph *******************/
function clearPlayerData()
{
    $('#state_images').empty()
    $('#player_state_image').empty()

}


var linearScaleBehaviorNode, distanceBehaviorScale;
function displayStateImages(id){
  
    clearPlayerData()
    var myImages=node_image_mapper
    var myGif=gif_mapper
    id = id[0].substring(0, id[0].length - 5);
    for (var i = 0; i < myImages[id].length; i++) 
    {
        image_path =  myImages[id][i].replace(/\/$/, '');
        gif_path =  myGif[id][i];
        $('#state_images').append("<img class='image-style'" + " src="+ gif_path +'>')
        $('#state_images').append("<img class='image-style'  style='border: 5px solid #0066ff;padding-left:0px; margin-left:51px;' " + " src="+ image_path +'>')
        
         
    }
    return true;
}



function emptyPieDiv(){
    $('#overall_pie-pie').empty();
    $('#test_pie').empty();
    $('#submit_pie').empty();

}

function displayPieCharts(id){
    id = id[0]
    emptyPieDiv();
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawEventPieChart(id));
    google.charts.setOnLoadCallback(drawOverallChart(id));
    google.charts.setOnLoadCallback(drawTestChart(id));
    google.charts.setOnLoadCallback(drawSubmitChart(id));
}
function drawOverallChart(id) {
    var overall_data = google.visualization.arrayToDataTable([
      ['Type', 'Percentage'],
      ['Test/Submit Pass',  playerStatisticsData[id]['test_success']+playerStatisticsData[id]['submit_success'] ],
      ['Test/Submit Fail', playerStatisticsData[id]['test_fail']+playerStatisticsData[id]['submit_fail']],
    ]);

    var options = {
      title: 'Overall'
    };

    var chart = new google.visualization.PieChart(document.getElementById('overall_pie'));

    chart.draw(overall_data, options);
  }
function drawTestChart(id) {
var test_data = google.visualization.arrayToDataTable([
    ['Type', 'Percentage'],
    ['Test/Submit Pass',  playerStatisticsData[id]['test_success']],
    ['Test/Submit Fail', playerStatisticsData[id]['test_fail']],
]);

var options = {
    title: 'Test Pass/Fail'
};

var chart = new google.visualization.PieChart(document.getElementById('test_pie'));

chart.draw(test_data, options);
}
function drawSubmitChart(id) {
var submit_data = google.visualization.arrayToDataTable([
    ['Type', 'Percentage'],
    ['Submit Pass',  playerStatisticsData[id]['submit_success'] ],
    ['Submit Fail', playerStatisticsData[id]['submit_fail']],
]);

var options = {
    title: 'Submit Pass/Fail'
};

var chart = new google.visualization.PieChart(document.getElementById('submit_pie'));

chart.draw(submit_data, options);
}

function drawEventPieChart(id) {
    var event_data = google.visualization.arrayToDataTable([
        ['Type', 'Percentage'],
        ['Add element',  playerEventStatisticsData[id]['ADD_ELEMENT']],
        ['Move element', playerEventStatisticsData[id]['MOVE_ELEMENT']],
        ['Toggle semaphore', playerEventStatisticsData[id]['TOGGLE_ELEMENT']],
        ['Remove element', playerEventStatisticsData[id]['REMOVE_ELEMENT']],
        ['Adding links', playerEventStatisticsData[id]['BEGIN_LINK']],
        ['Testing/Submiting', playerEventStatisticsData[id]['SET_REFLECTION_CONTENT']],
    ]);
    
    var options = {
        title: 'Event analysis'
    };
    
    var chart = new google.visualization.PieChart(document.getElementById('event_pie'));
    
    chart.draw(event_data, options);
    }
    

function returnHTML(d, i) {
    var nodeinfo = i + " (";
    if (d.completed) {
        nodeinfo = nodeinfo + "reach end state)";
    } else {
        nodeinfo = nodeinfo + "does not reach end state)"
    };

    return `<div class="tooltip-inner">
                <div><span class="tooltip-key">Sequence Node Info: </span>${nodeinfo}</div>
                <div><span class="tooltip-key">Player IDs with this Pattern:</span> (${d.user_ids.length}) ${d.user_ids.join('')}</div>
                <div><span class="tooltip-key">Action Sequence: </span>${compressArray(d.action_meaning)}</div>
            </div>`
}

function visualizeBehaviorData() {
    let tooltip = d3.select('#tooltip')
    linearScaleBehaviorNode = getBehaviorNodeScale(data.trajectories);
    distanceBehaviorScale = getBehaviorDistanceScale(data.traj_similarity);

    behaviorforce.nodes(data.trajectories)
        .links(data.traj_similarity);

    behaviorlink = behaviorlink.data(data.traj_similarity);
    behaviornode = behaviornode.data(data.trajectories);

    behaviorlink.enter().append("line")
        .attr("class", "behaviorlink")
        .attr("id", function (d, i) {
            return 'behaviorlink' + d.id;
        });

    behaviornode.enter().append("g")
        .attr("id", function (d, i) {

            return 'behaviornode' + i;
            // Jimmy changes i to d.user_ids to show the player id instead of default numbers
            // return 'behaviornode' + d.user_ids;
        })
        .attr("color", function (d) {
            if (d.id > 20) {
                let divisor = Math.floor(d.id / 20)
                let new_id = d.id - (20 * divisor)
                return fill(new_id)
            } else {
                return fill(d.id)
            }
        })

        //andy disabled
        // .on("dblclick", dblclick)
        // .on("mouseover", displayInfo)
        .call(behaviordrag);

    behaviornode.append("circle")
        .attr("r", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length);
        })
        .attr('pointer-events', 'fill')
        .attr('cursor', 'pointer')
        .on("mouseover", function (d, i) {
            activateCompleteSequence()
            displayInfo(d)
            
            shuffleNodeOrder(d.index)
            
            tooltip
                .style('opacity', 1)
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .html(returnHTML(d, i))
        })
        .on("mouseout", function (d) {
            tooltip
                .style('opacity', 0)
        })

    behaviornode.append("text")
        .attr("class", function (d) {
            if (d.completed)
                return "complete";
            return "incomplete";
        })
        .attr("dx", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length) + 3;
        })
        .attr("dy", ".35em")
        .attr("font-size", function (d) {
            return maxNodeSize;
        })
        .text(function (d, i) {
            // return i;
            // Jimmy changes i to d.user_ids to show the player id instead of default numbers
            return d.user_ids;
        });

    // UPDATE --------------------
    behaviorlink.attr("id", function (d, i) {
        return 'behaviorlink' + d.id;
    })
        .attr("class", "behaviorlink");

    behaviornode.attr("id", function (d, i) {
        return 'behaviornode' + i;
        // Jimmy changes i to d.user_ids to show the player id instead of default numbers
        // return 'behaviornode' + d.user_ids;
    })
        .attr("class", function (d) {
            if (d.completed)
                return `behaviornode complete ${d.user_ids[0]} ${d.id}`;
            return `behaviornode incomplete ${d.user_ids[0]} ${d.id}`;
        })
        .attr("node_index", function (d) {
            return d.id
        })
        .select("circle")
        .attr("class", function (d) {
            if (d.completed)
                return "complete";
            return "incomplete";
        })
        .attr("r", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length);
        });

    behaviornode.select("text")
        .attr("class", function (d) {
            if (d.completed)
                return "complete";
            return "incomplete";
        })
        .attr("dx", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length) + 3;
        })
        .attr("font-size", function (d) {
            return maxNodeSize;
        })
        .text(function (d, i) {
            // return i;
            // Jimmy changes i to d.user_ids to show the player id instead of default numbers
            return d.user_ids;
        });

    behaviorlink.exit().remove();
    behaviornode.exit().remove();
    behaviorforce.start();
}

// Group Graph

function returnGroupHTML(d, i) {
    // return `<div class="tooltip-inner">
    //             <div><span class="tooltip-key">Sequence Node Info: </span>${nodeinfo}</div>
    //             <div><span class="tooltip-key">Player IDs with this Pattern:</span> (${d.user_ids.length}) ${d.user_ids.join('')}</div>
    //             <div><span class="tooltip-key">Action Sequence: </span>${compressArray(d.action_meaning)}</div>
    //         </div>`
}

function visualizeGroupData() {
    let tooltip = d3.select('#tooltip')
    groupForce.nodes(data.team_trajectories)
        .links(data.team_traj_similarity);

    groupLink = groupLink.data(data.team_traj_similarity);
    groupNode = groupNode.data(data.team_trajectories);

    groupLink.enter().append("line")
        .attr("class", "groupLink")
        .attr("id", function (d, i) {
            return 'groupLink' + d.id;
        });

    groupNode.enter().append("g")
        .attr("class", function(d) {
            return `groupNode groupNode${d.id}`
        })
        .call(groupDrag);

    groupNode.append("circle")
        .attr("id", function (d, i) {
            return 'groupNode' + i;
        })
        .attr('r', 15)
        .attr('pointer-events', 'fill')
        .attr('cursor', 'pointer')

        .on("click", function(d) {
            clearGroupNodesActive()
            d3.select(this).classed('groupNode-active', true)
            highlightIndTrajectories(d)
            
        })

    groupNode.append("text")
        .attr("dx", ".9em")
        .attr("dy", ".4em")
        .text(function (d, i) {
            return i;
        });

    // UPDATE --------------------
    groupLink.attr("id", function (d, i) {
        return 'groupLink';
    })
        .attr("class", "groupLink");

    groupNode
        .select("circle")
        .attr('r', 15)


    groupNode.select("text")

        .attr("font-size", function (d) {
            return 20;
        })
        .text(function (d, i) {
            return i;
        });

    groupLink.exit().remove();
    groupNode.exit().remove();
    groupForce.start();
}

function clearGroupNodesActive() {
    d3.selectAll('.groupNode')
        .each(function(d) {
            let el = document.getElementById(`groupNode${d.index}`)
            if (el.classList.contains('groupNode-active')) {
                el.classList.remove('groupNode-active')
            }
        })
}

function toggleGroupNodeActive() {

}

function unique(value, index, self) {
    return self.indexOf(value) === index;
}

function highlightIndTrajectories(d) {
    let uniqueTraj = d.team_members_index.filter(unique)
    setPlaytraceIndex(uniqueTraj)
    highlightNodeID()

}



//Andy
function shuffleNodeOrder(node) {
    nArray = d3.select("#playtrace-index").node().value.replace(/\s/g, '').split(",");
    let hoverNode = node.toString()
    if (nArray.includes(hoverNode)) {
        highlightNodeID(false, hoverNode)
    }
}

function distanceMapping(d) {
    return distanceBehaviorScale(d.similarity);
}


function behaviortick() {
    behaviorlink.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });
    behaviornode
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
}

function groupTick() {
    groupLink.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });
    groupNode
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
}

// set minValue and maxValue
function getBehaviorNodeScale(dataset) {
    var minValue = d3.min(dataset, function (d) {
        return d.user_ids.length;
    });
    var maxValue = d3.max(dataset, function (d) {
        return d.user_ids.length;
    });
    // if minValue and maxValue are the same,
    // we'll make it such that the node takes the big size.
    if (minValue == maxValue)
        minValue -= 1;
    return d3.scale.linear()
        .domain([minValue, maxValue])
        .range([minNodeSize, maxNodeSize]);
}

function getBehaviorDistanceScale(dataset) {
    var minValue = d3.min(dataset, function (d) {
        return d.similarity;
    });
    var maxValue = d3.max(dataset, function (d) {
        return d.similarity;
    });

    return d3.scale.linear()
        .domain([minValue, maxValue])
        .range([minDistance, maxDistance]);
}

var showLinks = true;

function toggleShowLinks() {
    if (showLinks) {
        d3.selectAll(".behaviorlink").style("stroke", "transparent");
    } else {
        d3.selectAll(".behaviorlink").style("stroke", null);
    }

    showLinks = !showLinks;
}

// display info in textboxes
var displayInfo = function (d, i) {
    var nodeinfo = i + " (";
    if (d.completed) nodeinfo = nodeinfo + "reach end state)";
    else nodeinfo = nodeinfo + "does not reach end state)";

    // the start and end states are dummy
    d3.select("#num-states-in-trajectory").text(d.trajectory.length - 2);
    d3.select("#selected-node-index").text(nodeinfo);
    d3.select("#infobox").text(compressStates(d.trajectory));
    d3.select("#actionseq-info").text(compressArray(d.action_meaning));
    d3.select("#num-players-sequence").text(d.user_ids.length);
    if (d.user_ids.length <= userIDLengthLimit)
        d3.select("#players-sequence").text(d.user_ids);
    else d3.select("#players-sequence").text(d.user_ids.slice(0, userIDLengthLimit) + ",....");
};

var extractDetails = function (detail_obj) {
    // movement events: show the region
    if (detail_obj.event_type.indexOf('movement') !== -1)
        return detail_obj.metadata.encounter;
    return detail_obj.event_type;
};


var extractStats = function (stats_obj) {
    return JSON.stringify(stats_obj);
};

var compressStates = function (pArray) {
    items = _.map(pArray, function (a) { return extractDetails(data.nodes[a].details); });
    return compressArray(items);
};

var compressArray = function (pArray) {
    var actions = "";
    var prevAction = "";
    var prevActionCount = 0;
    var currItem;
    for (var i = 1; i < pArray.length - 1; i++) {

        currItem = pArray[i];

        if (prevAction != currItem) {
            if (prevAction != "") {
                actions += prevAction + "(" + prevActionCount.toString() + ")";
                actions += ", ";
            }
            prevAction = currItem;
            prevActionCount = 1;
        } else prevActionCount += 1;
    }
    actions += prevAction + "(" + prevActionCount.toString() + ")";

    return actions;
};

var lowestOpacity = 0.1;

function behaviorDragstart(d, i) {
    d3.event.sourceEvent.stopPropagation();

    // Highlight the behavior
    clearHighlight();
    clicked_circle = d.user_ids;
    // edited
    t=displayStateImages(d.user_ids)
    if(t)
    {
        imagedisplay_id=d.user_ids
    }
    
    displayPieCharts(d.user_ids)
    intermediate_state_representation(d.user_ids)
    // displayLineChart(d.user_ids)
    $('#time_spent_on_level').empty()
    $('#time_spent_on_level').append("Time Spent on Level " + playerStatisticsData[d.user_ids[0]]['gameplay_duration']+" minutes")

    applyOpacity(lowestOpacity);
    highlightBehaviorNodeIndex(i, "red");
    archiveStyle(this);
}

function groupDragStart(d, i) {
    d3.event.sourceEvent.stopPropagation();

    // Highlight the behavior
    clearHighlight();
    // applyOpacity(lowestOpacity);
    // highlightBehaviorNodeIndex(i, "red");
    archiveStyle(this);
}

var archiveStyle = function (domNode) {
    prevStroke = d3.select(domNode).style("stroke");
    prevFill = d3.select(domNode).style("fill");
    prevStrokeOpa = d3.select(domNode).style("stroke-opacity");
    prevFillOpa = d3.select(domNode).style("fill-opacity");
    prevTextFill = d3.select(domNode).select("text").style("fill");
};

var restoreStyle = function (domNode) {
    d3.select(domNode).style("stroke-opacity", prevStrokeOpa)
        .style("stroke", prevStroke)
        .style("fill-opacity", prevFillOpa)
        .style("fill", prevFill);

    d3.select(domNode).select("text").style("fill", prevTextFill);
};

var highlightNodeID = function (reverse = false, hoverNode) {
    nArray = d3.select("#playtrace-index").node().value.replace(/\s/g, '').split(",");
    if (nArray.length > 0 && nArray[0] !== '') {
        clearHighlight();
        applyOpacity(lowestOpacity);

        if (reverse)
            nArray = nArray.reverse();

        if (hoverNode) {
            let index = nArray.indexOf(hoverNode)
            nArray.splice(index, 1)
            nArray.push(hoverNode)
        }
        _.each(nArray, function (item, ind) {
            let color = d3.select(`#behaviornode${item}`).node().getAttribute('color')
            highlightBehaviorNodeIndex(parseInt(item), color)
        })
        displayInfo(data.trajectories[nArray[0]], nArray[0]);

        // if reverse is set, set the text to the reverse
        if (reverse)
            d3.select("#playtrace-index").node().value = nArray.join();
    }
};

var setPlaytraceIndex = function (d) {
    let arr = []
    if (d.user_ids) {
        d.user_ids.forEach((u) => {
            let node_index = d3.select(`.${u}`).attr('node_index')
            arr.push(node_index)
        })
    } else {
        d.forEach((u) => {
            arr.push(u)
        })
    }
    document.getElementById("playtrace-index").value = arr;
}

var highlightNodeStroke = function (nodes, bool) {
    nodes.user_ids.forEach(d => {
        d3.select(`.${d}`).classed('selectednode', bool)
    })
};

var highlightNodeID_index = function (index = 0) {
    nArray = d3.select("#playtrace-index").node().value.replace(/\s/g, '').split(",");
    if (nArray.length > 0 && nArray[0] !== '') {
        clearHighlight();
        applyOpacity(lowestOpacity);
        if (index == -1)
            index = nArray.length - 1;
        highlightBehaviorNodeIndex(parseInt(nArray[index]), fill(index));
    }
};


function showInfoNodeID() {
    var index = parseInt(d3.select("#playtrace-show-info").node().value);
    displayInfo(data.trajectories[index], index);
}
/*************************** Highlighting ******************/


function clearHighlight() {

    // clear all styles for state graph
    d3.selectAll(".statelink,.statenode").style("stroke-opacity", null)
        .style("stroke", null)
        .style("fill", null)
        .style("fill-opacity", null);

    d3.selectAll(".statenode circle").style("fill", null).style("stroke", null);

    d3.selectAll(".statenode").select("text")
        .style("fill", null)
        .style("fill-opacity", null);

    // clear behavior graph
    d3.selectAll(".behaviornode").style("stroke-opacity", null)
        .style("stroke", null)
        .style("fill", null)
        .style("fill-opacity", null);

    d3.selectAll(".behaviornode circle").style("fill", null).style("stroke", null);

    applyOpacity(currentOpacity);

    displayingFreq = false;
}

function clearTextField() {
    document.getElementById('playtrace-index').value = '';
}


var highlightUserID = function () {
    clearHighlight();
    input = d3.select("#userID").node().value;
    // 1. find the user traj from the trajectories

    userIDs = input.split(",");
    first_one_highlighted = true;
    _.each(userIDs, function (userID, id) {
        var trajIndex = -1;
        for (var i = 0; i < data.trajectories.length; i++) {
            if (_.includes(data.trajectories[i].user_ids, userID)) {
                trajIndex = i;
                break;
            }
        }

        if (trajIndex >= 0) {
            if (first_one_highlighted) {
                applyOpacity(lowestOpacity);
                first_one_highlighted = false;
            }
            // 2 is red
            highlightBehaviorNodeIndex(trajIndex, fill(id));
            found_user = true;
        } else {
            alert('cant find');
        }
    });
};

var groupCache = {};
// This function construct the key to retrieve from groupCache
var constructGroupKey = function (feature, groupValue) {
    return feature + '_' + groupValue;
};

// flag: 1: team2, blue; 2: team3, red; 0: all
var highlightGroup = function (flag) {
    clearHighlight();
    applyOpacity(lowestOpacity);
    switch (flag) {
        case 1:
            highlightGroupWithName('blue', 'blue');  //<!team2>
            break;
        case 2:
            highlightGroupWithName('red', 'red');  //<!team3>
            break;
        default:
            highlightGroupWithName('blue', 'blue');  //<!team2>
            highlightGroupWithName('red', 'red');  //<!team3>
    }
};

//working
var highlightGroupWithName = function (grpName, color) {
    _.each(data.trajectories, function (traj, id) {
        //change this to high or low
        // if (traj.teams.indexOf(grpName) > -1)
        //     highlightBehaviorNodeIndex(id, color);
    });
};


function highlightBehaviorNodeIndex(index, color) {
    highlightTraj(data.trajectories[index], color);
    highlightBehaviorNode(index, color);
    displayInfo(data.trajectories[index], index);
    displayingFreq = true;
}

function highlightBehaviorNode(nodeToHighlight, color) {
    d3.select("#behaviornode" + nodeToHighlight).style("stroke-opacity", 1)
        .style("stroke", color)
        .style("fill", color)
        .style("fill-opacity", 1)
    // somehow have to set fill for cirle only.
    d3.select("#behaviornode" + nodeToHighlight).select("circle")
        .style("stroke", color)
        .style("fill", color);
}

function toggleKthTrajectories() {
    clearHighlight();
    applyOpacity(lowestOpacity);
    var numHighlight = parseInt(d3.select("#number-highlight").node().value);
    if (data.hasOwnProperty('trajectories') && numHighlight <= data.trajectories.length) {
        numFrequent = (numHighlight - 1 + data.trajectories.length) % data.trajectories.length;
        highlightBehaviorNodeIndex(numFrequent, fill(numFrequent));
    }
}

function toggleHighlightFreqTrajectories() {
    clearHighlight();
    var numHighlight = parseInt(d3.select("#number-highlight").node().value);
    if (data.hasOwnProperty('trajectories') && numHighlight <= data.trajectories.length) {
        applyOpacity(lowestOpacity);
        numFrequent = numHighlight;
        var bNodeArray = _.range(numFrequent);
        _.each(bNodeArray, function (d) {
            highlightBehaviorNodeIndex(d, fill(d));
        });
    }
}

function highlightTraj(trajString, color) {

    // 1. break the trajectory into nodes and statelinks ID
    ids = trajToIDs(trajString);

    // 2. assign the color to a corresponding list of colors.
    d3.selectAll(ids)
        .style("stroke", color)
        .style("stroke-opacity", 1);

    d3.selectAll(ids).select("circle")
        .style("fill-opacity", 1);

    d3.selectAll(ids).select("text")
        .style("fill", 'black')
        //            .style("fill", color)
        .style("fill-opacity", 1);
}


// return: "#statenode975, #statelink975_0, #statenode1015, #statelink1015_0, #statenode475 "
// for "975, 0, 1015, 1015_0, 475"
var trajToIDs = function (traj) {
    pArray = traj.trajectory;
    selectArray = "";
    for (var i = 0; i < pArray.length; i++) {
        selectArray += "#statenode" + pArray[i];
        if (i < pArray.length - 1) {
            selectArray += ", ";
            selectArray += "#statelink" + pArray[i] + "_" + pArray[i + 1] + ", ";
        }
    }
    return selectArray;
};

var currentOpacity = 0.7;
function incrementOpacity() {
    currentOpacity = currentOpacity + 0.1;
    if (currentOpacity > 1) currentOpacity = 1;
    applyOpacity(currentOpacity);
}

function decrementOpacity() {
    currentOpacity = currentOpacity - 0.1;
    if (currentOpacity < 0.2) currentOpacity = 0.2;
    applyOpacity(currentOpacity);
}

function applyOpacity(opacityValue) {
    d3.selectAll(".statelink,.statenode,.behaviorlink,.behaviornode")
        .style("stroke-opacity", opacityValue)
        .style("fill-opacity", opacityValue);
}

var freezeLayout = function () {
    // still moving
    if (behaviorforce.alpha() > 0) {
        stateforce.stop();
        behaviorforce.stop();
    } else {
        stateforce.resume();
        behaviorforce.resume();
    }
}

var allCurrentlyFixed = false;
var fixLayout = function () {
    allCurrentlyFixed = !allCurrentlyFixed;
    d3.selectAll(".statenode,.behaviornode")
        .classed("fixed", function (d) {
            d.fixed = allCurrentlyFixed;
        });
}

var incrementGraph = function (forceChoice) {
    var force = stateforce;
    if (forceChoice > 0)
        force = behaviorforce;
    var currentCharge = force.charge();
    force.charge(currentCharge * 1.5).start();
};

var decrementGraph = function (forceChoice) {
    var force = stateforce;
    if (forceChoice > 0)
        force = behaviorforce;
    var currentCharge = force.charge();
    force.charge(currentCharge * 0.7).start();
};

function toggleHighlightPanel() {
    let panel = document.getElementById('highlight-controls')
    let title = document.getElementById('highlight-title')
    let button = document.getElementById('highlight-button')
    let icon = document.getElementById('highlight-button-icon')
    if (panel.classList.contains('highlight-open')) {
        panel.classList.remove('highlight-open')
        panel.classList.add('highlight-closed')
        title.classList.remove('highlight-title-inactive')
        title.classList.add('highlight-title-active')
        button.classList.add('highlight-button-closed')
        icon.classList.remove('highlight-button-icon-closed')
    } else {
        panel.classList.remove('highlight-closed')
        panel.classList.add('highlight-open')
        title.classList.remove('highlight-title-active')
        title.classList.add('highlight-title-inactive')
        button.classList.remove('highlight-button-closed')
        icon.classList.add('highlight-button-icon-closed')
    }
}

function activateCompleteSequence() {
    let complete = document.getElementById('complete-sequence-container')
    if (!complete.classList.contains('complete-sequence-active')) {
        complete.classList.add('complete-sequence-active')
    }
}
