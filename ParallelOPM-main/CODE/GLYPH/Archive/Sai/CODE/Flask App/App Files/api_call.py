from flask import Flask, request
import json
from GlyphBoardState_api import GetAbstraction

app = Flask(__name__)

@app.route('/getAbstraction')
def get_abstraction():
    data = json.loads(str(request.data, encoding='utf-8'))
   
    # TODO: Need to handle error for level not found in 
    # zone sheet (currently works for level 7,5)    
    
    level = data['events'][0]['order']
    abstractions = GetAbstraction(data,level)    
    print(type(abstractions))
    
    #TODO: build a function which takes board_snapshot
    # as input and gives screenshot and 
    # send it part of the api call
    
    return {"abstractions":abstractions}



@app.route('/')
def hello_world():
    return 'Hello World'
  
if __name__ == '__main__':  
    app.run(debug=True)