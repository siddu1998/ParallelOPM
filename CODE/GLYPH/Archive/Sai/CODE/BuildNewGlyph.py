from tqdm import tqdm
from collections import Counter
from datetime import datetime
from os.path import isdir, join
from sys import exit, flags
from os import mkdir, listdir
import os
import json
import shutil

DATADIR = './OriginData/'
RESDIR = './Res/'
GLYPHDIR = '../../glyph/data/'
FILENAME = 'test_sai.json'
INFINITE_SIMILARITY = 50000


# USERMAP = {'6c48747a-8c8c-43c5-8c7e-ff80f281b508.json': '8', 
#             "c057d16f-023e-491d-baee-371e5081939a.json": '2',
#             "03021ea9-78a2-434d-adc0-b9fd063d4291.json": '9', 
#             "f5d99f4b-d52e-412b-8111-54cbbafffcfb.json": '4',
#             "81dc330b-4077-494b-91b3-fc8cc4fe2604.json": '6',
#             '8bbeff9b-9e06-4993-b919-c9cd59a77f16.json':'101',
#             'ae26b920-1410-437f-bcba-c481ec3098f0.json':'102'}

#LEVEL 7
# USERMAP = {'6c48747a-8c8c-43c5-8c7e-ff80f281b508.json': '6c48747a-8c8c-43c5-8c7e-ff80f281b508.json', 
#             "c057d16f-023e-491d-baee-371e5081939a.json": 'c057d16f-023e-491d-baee-371e5081939a.json',
#             "03021ea9-78a2-434d-adc0-b9fd063d4291.json": '03021ea9-78a2-434d-adc0-b9fd063d4291.json', 
#             "f5d99f4b-d52e-412b-8111-54cbbafffcfb.json": 'f5d99f4b-d52e-412b-8111-54cbbafffcfb.json',
#             "81dc330b-4077-494b-91b3-fc8cc4fe2604.json": '81dc330b-4077-494b-91b3-fc8cc4fe2604.json',
#             '8bbeff9b-9e06-4993-b919-c9cd59a77f16.json':'8bbeff9b-9e06-4993-b919-c9cd59a77f16.json',
#             'ae26b920-1410-437f-bcba-c481ec3098f0.json':'ae26b920-1410-437f-bcba-c481ec3098f0.json'}


#LEVEL 5 USERMAP
USERMAP = {'c7ecee3a-f7e7-4b4a-9415-aa57a304ee43.json': 'c7ecee3a-f7e7-4b4a-9415-aa57a304ee43.json', '5c62ae0e-41c1-49e5-8b98-4c28be09539c.json': '5c62ae0e-41c1-49e5-8b98-4c28be09539c.json', 'b4152ba7-4846-4ba2-93c4-eba434125dbe.json': 'b4152ba7-4846-4ba2-93c4-eba434125dbe.json', 'bc196560-cafb-4ae0-8e10-bb12911ff32c.json': 'bc196560-cafb-4ae0-8e10-bb12911ff32c.json', '248d368d-232d-46c8-b137-8f81dc77f809.json': '248d368d-232d-46c8-b137-8f81dc77f809.json', 'b752ff5e-fa1c-427a-b6f7-7195818ffc0c.json': 'b752ff5e-fa1c-427a-b6f7-7195818ffc0c.json', '34939330-b4bf-42a6-88b1-294148819974.json': '34939330-b4bf-42a6-88b1-294148819974.json', '37023d9a-a8a3-4998-be0e-447962220be0.json': '37023d9a-a8a3-4998-be0e-447962220be0.json', '64ea8334-1539-4f9c-a5fd-9788528f5c3f.json': '64ea8334-1539-4f9c-a5fd-9788528f5c3f.json', '05243b18-5570-4a7f-9a72-b1754d655efd.json': '05243b18-5570-4a7f-9a72-b1754d655efd.json', '74b44793-56a8-4273-b534-ac65dc021d59.json': '74b44793-56a8-4273-b534-ac65dc021d59.json', '8db5cdd0-68e1-433b-829f-a948b9f3804f.json': '8db5cdd0-68e1-433b-829f-a948b9f3804f.json', 'd0cd0662-ac0d-4d28-a799-3ed4a0495793.json': 'd0cd0662-ac0d-4d28-a799-3ed4a0495793.json', 'f34e4bd3-6e71-4666-8329-c37b8dbe53cb.json': 'f34e4bd3-6e71-4666-8329-c37b8dbe53cb.json', 'e74a8e34-0def-4c5d-b68d-d0a01283b185.json': 'e74a8e34-0def-4c5d-b68d-d0a01283b185.json', 'a75411b3-98a4-4d80-ae3e-f26022dc6e56.json': 'a75411b3-98a4-4d80-ae3e-f26022dc6e56.json', '7e7e9d04-fccd-43ca-90f8-25fcb8fa731b.json': '7e7e9d04-fccd-43ca-90f8-25fcb8fa731b.json', '5ab92afb-b42c-4453-9edc-897eaee8dec9.json': '5ab92afb-b42c-4453-9edc-897eaee8dec9.json', '9b5d16e5-b059-428b-a3a5-38e0f115bb0b.json': '9b5d16e5-b059-428b-a3a5-38e0f115bb0b.json', '8ff05d4e-24dd-41e8-9993-a36175297b55.json': '8ff05d4e-24dd-41e8-9993-a36175297b55.json', '0ba55f9b-be6f-4478-b31a-547ea6f64ef4.json': '0ba55f9b-be6f-4478-b31a-547ea6f64ef4.json', '44e69456-7f4c-4701-afa3-d2b34de63d59.json': '44e69456-7f4c-4701-afa3-d2b34de63d59.json', '2e07ba3c-51be-498f-815a-768f3b7cb7e1.json': '2e07ba3c-51be-498f-815a-768f3b7cb7e1.json', '787785b5-e800-45e2-82dd-9001eae092ef.json': '787785b5-e800-45e2-82dd-9001eae092ef.json', '4666e412-31ab-421b-b335-b30c7c322bdd.json': '4666e412-31ab-421b-b335-b30c7c322bdd.json', '780fc9bd-794c-4906-9f64-c04d19144e0f.json': '780fc9bd-794c-4906-9f64-c04d19144e0f.json', 'd766e0b6-f9a3-49e2-bf39-afd2bf804f7a.json': 'd766e0b6-f9a3-49e2-bf39-afd2bf804f7a.json', 'ceb929b7-97d0-4d10-89f8-8206ce24e7a5.json': 'ceb929b7-97d0-4d10-89f8-8206ce24e7a5.json', '48a119ff-73df-4007-8c3d-f33098aa8f74.json': '48a119ff-73df-4007-8c3d-f33098aa8f74.json', 'e95dfdda-ad84-47c2-8d04-105692208369.json': 'e95dfdda-ad84-47c2-8d04-105692208369.json', 'e9ba6451-d997-4d62-9267-32039ef4426f.json': 'e9ba6451-d997-4d62-9267-32039ef4426f.json', '9553b141-533e-4cd7-bb59-5d8f8c56a507.json': '9553b141-533e-4cd7-bb59-5d8f8c56a507.json', '3a25390a-71ac-447a-8af6-d7d6ac9745b6.json': '3a25390a-71ac-447a-8af6-d7d6ac9745b6.json', 'c996d3cd-6f96-4b58-a4f4-60026db0edcc.json': 'c996d3cd-6f96-4b58-a4f4-60026db0edcc.json', '0df64be6-6b66-4bd8-8894-173ae3c5393c.json': '0df64be6-6b66-4bd8-8894-173ae3c5393c.json', '5c2947cc-34b1-42ac-864c-3f69f9171c54.json': '5c2947cc-34b1-42ac-864c-3f69f9171c54.json', '8a28d10a-a617-46af-87a4-ad04f85d19eb.json': '8a28d10a-a617-46af-87a4-ad04f85d19eb.json'}


class GlyphBuilder():
    def __init__(self, userStates, userActions, filename):
        self.states = []            #Store all of the states
        self.trajectories = []      #Store all of the trajectories
        self.links = []             #Store all of the links
        self.traj_similarity = []   #Store all of the trajectory similarities
        self.stateToVis = {}        #Store all of the state for each user, different from userStates because this contains actions

        self.stateId = 0            #Count the number of state(node) in glyph
        self.trajectoryId = 0       #Count the number of trajecotry in glyph

        self.userTrajectories = {}  #Use users as keys and trajectories as values. Used to find trajectory given user id
        self.stateIdToState = {}    #Use stateID as keys and state as values. Used to find state given state id
        self.userStates = userStates            #Raw user states
        self.numOfUser = len(userStates)        #num of users 
        self.userIds = self.createUserIDs(list(userStates.keys()))  #User ids which is shown in glyph
        self.filename = filename                #filename of the visualizaition

        self.buildStateToVis(userStates, userActions) #build complete state to visualize.

    def createUserIDs(self, ids):
        '''
        Create user ids to be shown in glyph visualization. 
        '''
        res = []
        for id in ids:
            print(USERMAP[id])
            res.append(USERMAP[id])
        return res

    def buildStateToVis(self, userStates, userActions):
        for user in userStates:
            if len(userStates[user]) - len(userActions[user]) != 1:
                print(f'Something wrong! There are {len(userStates[user])} states with {len(userActions[user])} actions!' )
                exit(0)
            for i in range(len(userActions[user])):
                userStates[user][i]['nextAction'] = userActions[user][i]
            userStates[user][-1]['nextAction'] = 'end game'
            self.stateToVis[user] = userStates[user]


        # print(self.stateToVis)
            
    def save(self):
        '''
        Save the visualization
        '''
        data = {
            'level_info': 'Parallel Data Visualization V2',
            'num_patterns': 1,
            'num_users': self.numOfUser,
            'nodes': self.states,
            'links': self.links,
            'trajectories': self.trajectories,
            'traj_similarity': self.traj_similarity,
            'setting': 'Parallel data'
        }
        filename = self.filename
        with open(os.path.join(GLYPHDIR, filename), 'w') as f:
            json.dump(data, f)
        
    def createStartEndStates(self):
        '''
        create start state and end state
        Fixed start state with id 0 and end state with id 1
        '''
        start = {
            'id': 0,
            'parent_sequence': [],
            'type': 'start',
            'details': {'event_type': 'Start'},
            'stat': {},
            'user_ids': self.userIds
        }
        end = {
            'id': 1,
            'parent_sequence': [],
            'type': 'end',
            'details': {'event_type': 'End'},
            'stat': {},
            'user_ids': self.userIds
        }
        self.states.append(start)
        self.states.append(end)
        self.stateIdToState[0] = start
        self.stateIdToState[1] = end

    def buildVisFile(self):
        '''
        Build visualization_ids.json listing all of the name of the visualization json files.
        '''
        files = os.listdir(GLYPHDIR)
        filesToVis = []
        for filename in files:
            if filename == '.DS_Store' or filename == 'visualization_ids.json':
                continue
            filesToVis.append(filename.split('.')[0])
        with open(os.path.join(GLYPHDIR, 'visualization_ids.json'), 'w') as f:
            json.dump(filesToVis, f)    

    def run(self):
        '''
        Main process to build visualization
        '''
        self.createStartEndStates()
        self.createStates()
        self.createTrajectories()
        self.createLinks()
        self.calSimilarity()
        self.save()
        self.buildVisFile()
    
    def generateEventType(self, states, action):
        '''
        Generate event_type which is shown in the state graph in glyph

        PROBLEM: no new line or other operation. Only one line shown in glyph
        '''
        res = {}
        res['board_state']=states
        return str(res)

    def buildAbstraction(self, stateInfo):

        abstraction = {}
        abstraction['nSemaphores'] = stateInfo['nSemaphores']
        abstraction['nSignals'] = stateInfo['nSignals']
        abstraction['semaphore_zone_dict'] = stateInfo['semaphore_zone_dict']
        abstraction['signal_zone_dict'] = stateInfo['signal_zone_dict']
        abstraction['link_dict'] = stateInfo['link_dict']
    
        # print(stateInfo)
        # print(abstraction)


        return abstraction

    def compareAreaAbstraction(self, areaAbstraction1, areaAbstraction2):
        if len(list(areaAbstraction1.keys())) != len(list(areaAbstraction2.keys())):
            return False
        
        for area in areaAbstraction1:
            if area not in list(areaAbstraction2.keys()):
                return False
        
        for area in areaAbstraction2:
            if area not in list(areaAbstraction1.keys()):
                return False
        
        for area in areaAbstraction1:
            abstraction1 = areaAbstraction1[area]
            abstraction2 = areaAbstraction2[area]
            if len(abstraction1) != len(abstraction2):
                return False
            
            for i in range(len(abstraction1)):
                element1Type = abstraction1[i][0:3]
                element2Type = abstraction2[i][0:3]
                if element1Type != element2Type:
                    return False
        
        return True

    def compareElementAbstraction(self, elementAbstraction1, elementAbstraction2):
        element1Dict = {}
        element2Dict = {}
        for element in elementAbstraction1:
            area = elementAbstraction1[element]['area']
            order = elementAbstraction1[element]['order']
            key = f'{area}_{order}'
            element1Dict[key] = elementAbstraction1[element]['status']
        for element in elementAbstraction2:
            area = elementAbstraction2[element]['area']
            order = elementAbstraction2[element]['order']
            key = f'{area}_{order}'
            element2Dict[key] = elementAbstraction2[element]['status']

        for locAndOrder in element1Dict:
            if locAndOrder not in list(element2Dict.keys()):
                return False
        for locAndOrder in element2Dict:
            if locAndOrder not in list(element1Dict.keys()):
                return False        

        for elementLocOrder in element1Dict:
            status1 = element1Dict[elementLocOrder]
            status2 = element2Dict[elementLocOrder]
            if status1 != status2:
                return False
        
        return True

    def compareLinkAbstraction(self, linkAbstraction1, linkAbstraction2):
        if len(linkAbstraction1) != len(linkAbstraction2):
            return False
        
        if len(linkAbstraction1) == 0:
            return True

        for link1 in linkAbstraction1:
            exist = False
            for link2 in linkAbstraction2:
                if link1[0] in link2 and link1[1] in link2:
                    exist = True
            if not exist:
                return False
        
        return True

    def compareStateAbstraction(self, abstraction1, abstraction2):
        '''
        Compare to two states. 
        Return true if they are the same
        '''
        # print(abstraction1['states'])
        # print(abstraction2['states'])
        # print(self.compareAreaAbstraction(abstraction1['states'], abstraction2['states']))
        # print(abstraction1['elements'])
        # print(abstraction2['elements'])
        # print(self.compareElementAbstraction(abstraction1['elements'], abstraction2['elements']))
        # print(abstraction1['links'])
        # print(abstraction2['links'])
        # print(self.compareLinkAbstraction(abstraction1['links'], abstraction2['links']))
        if abstraction2 != abstraction1:
            return False

        return True

    def checkStateExist(self, stateToCheck):
        '''
        Chech if the state is already exist based on the abstraction of the state.
        Currently always false means there will never be same state exist in the visualization.
        '''
        # return 0

        for state in self.states:
            if state['details']['event_type'] == 'Start' or state['details']['event_type'] == 'End':
                continue
            stateAbstraction = state['details']['abstraction']
            stateToCheckAbstraction = stateToCheck['details']['abstraction']
            if self.compareStateAbstraction(stateAbstraction, stateToCheckAbstraction):
                # print('check:', stateToCheckAbstraction)
                # print(stateAbstraction)
                return state['id']
        return 0

    def createStates(self):
        """
        Create state/node of Glyph visualization
        """
        for user in self.stateToVis:
            userTrajectory = [0]
            for stateInfo in self.stateToVis[user]:
                # print(stateInfo)
                event_type = ''
                abstraction = self.buildAbstraction(stateInfo) 
                stateId = len(self.states)
                event_type = self.generateEventType(stateInfo, stateInfo['nextAction'])
                # print(event_type)
                stateToBuild = {
                    'id': stateId,
                    'parent_sequence': [],
                    'type': 'mid',
                    'details': {'event_type': event_type, 'abstraction':abstraction, 'nextAction':stateInfo['nextAction']},
                    # 'details': {'event_type': event_type},
                    'stat': {},
                    'user_ids': [USERMAP[user]]
                }
                existId = self.checkStateExist(stateToBuild)
                if not existId:
                    self.states.append(stateToBuild)
                    userTrajectory.append(stateId)
                    self.stateIdToState[stateToBuild['id']] = stateToBuild
                else:
                    stateExist = self.stateIdToState[existId]
                    if USERMAP[user] not in stateExist['user_ids']:
                        stateExist['user_ids'].append(USERMAP[user])
                    userTrajectory.append(existId)
            
            # print(userTrajectory)
            userTrajectory.append(1)
            self.userTrajectories[USERMAP[user]] = userTrajectory

    def checkLinkExist(self, link):
        '''
        Implement later, how to recognize same link
        '''
        return False

    def createLinks(self):
        """
        Create Links of Glyph visualization
        """
        for user in self.userIds:
            traj = self.userTrajectories[user]
            for i in range(len(traj)):
                if traj[i] == 1:
                    break
                linkId = f'{traj[i]}_{traj[i+1]}'
                source = traj[i]
                target = traj[i+1]
                linkToBuild = {
                    'id': linkId,
                    'source': source,
                    'target': target,
                    'user_ids': [user],
                    'details': {'event_type': str(linkId)}
                }
                if not self.checkLinkExist(linkToBuild): 
                    self.links.append(linkToBuild)
                else:
                    pass
                
    def checkTrajExist(self, trajectory):
        '''
        Implement later, how to recognize same trajectory
        '''
        return False

    def createTrajectories(self):
        """
        Create Trajectories of Glyph visualization
        """
        for user in self.userIds:
            trajectory = self.userTrajectories[user]
            action_meaning = ['transition'] * (len(trajectory) - 2)
            action_meaning.insert(0, 'start_game')
            action_meaning.append('end_game')
            trajectory_id = len(self.trajectories)
            if not self.checkTrajExist(trajectory):
                trajectoryToBuild = {
                    'trajectory': trajectory,
                    'action_meaning': action_meaning,
                    'user_ids': [user],
                    'id': trajectory_id,
                    'completed': True}
                self.trajectories.append(trajectoryToBuild)
            else:
                pass
    
    def is_start_or_end(self, state):
        return state['type'] == 'start' or state['type'] == 'end'

    def getStateScore(self, state):
        '''
        Need to do in the future
        '''
        pass
    
    def compareNextAction(self, NextAction1, NextAction2):
        # print(NextAction1, NextAction2)
        words1 = NextAction1.split(' ')
        words2 = NextAction2.split(' ')
        if words1 != words2:
            return False
        # print(words1, words2)
        for i in range(len(words1)):
            toCompare1 = words1[i]
            toCompare2 = words2[i]
            if ':' in toCompare1:
                toCompare1 = words1[i].split(':')[0]
                toCompare2 = words2[i].split(':')[0]
            if toCompare1 != toCompare2:
                # print(len(toCompare1), toCompare1)
                # print(len(toCompare1), toCompare2)
                return False    
        
        # print(NextAction1, NextAction2)
        return True
                
    def get_state_diff(self, state1, state2):
        if self.is_start_or_end(state1) or self.is_start_or_end(state2):
            if state1['details'] == state2['details']:
                return 0
            else:
                return INFINITE_SIMILARITY

        else:
            # nothing is done here right now
            distance = 0

            state1Abstraction = state1['details']['abstraction']
            state2Abstraction = state2['details']['abstraction']
            state1NextAction = state1['details']['nextAction']
            state2NextAction = state2['details']['nextAction']
            # print(state1Abstraction,state2Abstraction,state1NextAction,state2NextAction)
            # print(self.compareStateAbstraction(state1Abstraction, state2Abstraction))
            if not self.compareStateAbstraction(state1Abstraction, state2Abstraction):
                distance += 1
            # if not self.compareNextAction(state1NextAction, state2NextAction):
            #     distance += 1
            # print(state1Abstraction,state2Abstraction,state1NextAction,state2NextAction,distance)
            return distance

    def dynamic_time_warming(self, trajectory_one, trajectory_two):
        """
        dynamic time warping
        Compute DTW of trajectory_one and trajectory_two
        States are the important factors
        """

        states1 = trajectory_one
        states2 = trajectory_two

        n = len(states1)
        m = len(states2)
        DTW = []
        for i in range(0, n + 1):
            DTW.append([])
            for j in range(0, m + 1):
                DTW[i].append(INFINITE_SIMILARITY)

        DTW[0][0] = 0
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                cost = self.get_state_diff(self.stateIdToState[states1[i - 1]], self.stateIdToState[states2[j - 1]])

                DTW[i][j] = cost + min(DTW[i - 1][j], DTW[i][j - 1], DTW[i - 1][j - 1])

        return DTW[n][m]

    def calSimilarity(self):
        '''
        Calculate the similarity between each trajectory pair
        '''
        for trajectory1 in self.trajectories:
            for trajectory2 in self.trajectories:
                if trajectory2['id'] <= trajectory1['id']:
                    continue
                similarity_id = len(self.traj_similarity)
                source = trajectory1['id']
                target = trajectory2['id']
                # print(trajectory1['user_ids'], trajectory2['user_ids'])
                sim = self.dynamic_time_warming(trajectory1['trajectory'], trajectory2['trajectory'])
                similarityToBuild = {
                    'id': similarity_id,
                    'source': source,
                    'target': target,
                    'similarity': sim
                }
                self.traj_similarity.append(similarityToBuild)

        # for user1 in self.userIds:
        #     for user2 in self.userIds:
        #         if user1 <= user2:
        #             continue
        #         similarity_id = len(self.traj_similarity)
        #         source = self.userTrajectories[user1]['id']
        #         target = self.userTrajectories[user2]['id']
        #         sim = self.dynamic_time_warming(self.userTrajectories[user1], self.userTrajectories[user2])
        #         similarityToBuild = {
        #             'id': similarity_id,
        #             'source': source,
        #             'target': target,
        #             'similarity': sim
        #         }
        #         self.traj_similarity.append(similarityToBuild)



def main_progress():
    state1 = {'states':{'A':['sig1']}, 'elements':{'sig1':[7,2]}}
    state2 = {'states':{'A':['sig1']}, 'elements':{'sig1':[7,2]}, 'links':[['sig1', 'sem1']]}
    state3 = {'states':{'A':['sig1']}, 'elements':{'sig1':[7,4]}}
    state4 = {'states':{'A':['sig1']}, 'elements':{'sig1':[7,4]}, 'links':[['sig1', 'sem1']]}
    userStates1 = {'1234':[state1, state2], '2345':[state3, state4]}
    userStates2 = {'1234':[state1, state2]}
    builder = GlyphBuilder(userStates1, 'test.json')
    builder.run()

if __name__=="__main__":
    # main_progress()
    # a = [1,2,3,4,5]
    # b = [5,4,3,2,1]
    # print(a == b)
    a = 'Stop'
    b = 'Stop'
    print(a == b)
    # a = [[1,2],[1,3],[2,5],[2,8],[4,2],[4,3],[2,7],[3,6],[4,1]]
    # b = sorted(a, key=lambda x:(x[0], x[1]))
    # print(a)
    # print(b)
    # a = {"1":2}
    # print(str(a))
    # state1 = {'states':{'A':['sig1']}, 'elements':{'sig1':[7,2]}}
    # state2 = {'states':{'A':['sig1']}, 'elements':{'sig1':[7,2]}, 'link':[['sig1', 'sem1']]}
    # state3 = {'states':{'A':['sig1']}, 'elements':{'sig1':[7,3]}}
    # state4 = {'states':{'A':['sig1']}, 'elements':{'sig1':[7,3]}, 'link':[['sig1', 'sem1']]}
    # trace1 = {'1234':[state1, state2]}
    # trace2 = {'1234':[state3, state4]}
    # state5 = {'states':{'A':['sig1']}, 'elements':{'sig1':[7,2]}}
    # print(list(trace1.keys()))
    # print(len(trace1))
    # os.makedirs('Data',exist_ok=True)
    # MapInfo = 
    # ms = 1618974787
    # test = datetime.fromtimestamp(1618875678)
    # print(test)