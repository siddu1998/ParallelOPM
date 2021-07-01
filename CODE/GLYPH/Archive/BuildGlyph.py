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
GLYPHDIR = './glyph/data/'
FILENAME = 'test.json'
INFINITE_SIMILARITY = 50000


USERMAP = {'6c48747a-8c8c-43c5-8c7e-ff80f281b508.json': '8', 
            "c057d16f-023e-491d-baee-371e5081939a.json": '2',
            "03021ea9-78a2-434d-adc0-b9fd063d4291.json": '9', 
            "f5d99f4b-d52e-412b-8111-54cbbafffcfb.json": '4',
            "81dc330b-4077-494b-91b3-fc8cc4fe2604.json": '6',
            '8bbeff9b-9e06-4993-b919-c9cd59a77f16.json':'101',
            'ae26b920-1410-437f-bcba-c481ec3098f0.json':'102'}

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
            res.append(USERMAP[id])
        return res

    def buildStateToVis(self, userStates, userActions):
        '''
        Build complete state for visualization. 
        '''
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
        for area in states:
            if len(states[area]) == 0:
                continue
            res[area] = states[area]
        res['nextAction'] = action
        return str(res)

    def buildAreaAbstraction(self, areaInfo, elements):
        '''
        Built abstraction for one area. 
        The abstraction here is to rank the components in the area, 
        Based on their row first, then rank based on their column when there is a tie

        Input:  raw area information in one area 
                raw element information
        Output: Area abstraction of the area
        '''
        res = []
        if len(areaInfo) == 0:
            return res
        if len(areaInfo) == 1:
            return areaInfo

        locationDict = {}
        arrayToSort = []
        for element in areaInfo:
            location = elements[element]['location']
            arrayToSort.append(location)
            locationDict[str(location)] = element
        
        sortedArray = sorted(arrayToSort, key=lambda x: (x[0], x[1]))
        for location in sortedArray:
            element = locationDict[str(location)]
            res.append(element)
        
        return res


    def buildElementAbstraction(self, elements, stateAbstraction):
        '''
        Build abstraction for elements.
        Abstraction here contains the area, order, and status of the element in that area.

        Input:  raw element information, completed stateAbstraction
        Output: dictionary contains each element's abstraction
        '''
        res = {}
        for area in stateAbstraction:
            components = stateAbstraction[area]
            order = 1
            info = {}
            for component in components:
                if component not in list(elements.keys()):
                    print(f'{component} not in elements: {elements}')
                info['area'] = area
                info['order'] = order
                info['status'] = elements[component]['status']
                res[component] = info

        return res

    def buildLinkAbstraction(self, links, elements, elementAbstraction):
        '''
        Build link abstraction of each link in links
        abstraction here contains the area and the order of the element in the link. 
        [['I', 1], ['G', 2]] means the first element in I area is linked to the second element in G area
        Input:  raw information about the link and elements, the completed element abstraction
        Output: a list of abstracted links
        '''
        locationDict = {}
        for element in elements:
            location = elements[element]['location']
            locationDict[str(location)] = element

        res = []

        for link in links:
            location1 = link[0]
            location2 = link[1]
            element1 = locationDict[str(location1)]
            element2 = locationDict[str(location2)]
            area1 = elementAbstraction[element1]['area']
            order1 = elementAbstraction[element1]['order']
            area2 = elementAbstraction[element2]['area']
            order2 = elementAbstraction[element2]['order']
            element1Abstract = [area1, order1]
            element2Abstract = [area2, order2]
            res.append([element1Abstract, element2Abstract])

        return res

    def buildAbstraction(self, stateInfo):
        '''
        Build abstraction of the state
        Input:  raw state information
        Output: Abstraction of the states(areas), elements and links.
        '''
        states = stateInfo['states']
        elements = stateInfo['elements']
        links = stateInfo['links']
        
        stateAbstraction = {}
        for area in states:
            areaAbstraction = self.buildAreaAbstraction(states[area], elements)
            stateAbstraction[area] = areaAbstraction
        
        elementAbstraction = self.buildElementAbstraction(elements, stateAbstraction)

        
        linkAbstraction = self.buildLinkAbstraction(links, elements, elementAbstraction)
        
        abstraction = {}
        abstraction['states'] = stateAbstraction
        abstraction['elements'] = elementAbstraction
        abstraction['links'] = linkAbstraction

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
        if not self.compareAreaAbstraction(abstraction1['states'], abstraction2['states']):
            return False
        if not self.compareElementAbstraction(abstraction1['elements'], abstraction2['elements']):
            return False
        if not self.compareLinkAbstraction(abstraction1['links'], abstraction2['links']):
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
                event_type = self.generateEventType(stateInfo['states'], stateInfo['nextAction'])
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