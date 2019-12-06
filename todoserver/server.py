from flask import *

from MyJsonEncoder import MyJsonEncoder
from ToDo import ToDo
import uuid

app = Flask(__name__)

todo1 = ToDo()
todo1.id = str(uuid.uuid1())
todo1.name = "todo1"
todo1.location = "marasti"
todo1.date = "12/22/2019"
todo2 = ToDo()
todo2.id = str(uuid.uuid1())
todo2.name = "todo2"
todo2.location = "manastur"
todo2.date = "12/13/2019"
todo3 = ToDo()
todo3.id = str(uuid.uuid1())
todo3.name = "todo3"
todo3.location = "iris"
todo3.date = "8/22/2019"

currentId = 4

my_list = list()
my_list.append(todo1)
my_list.append(todo2)
my_list.append(todo3)


@app.route('/server/add', methods=['POST'])
def add():
    global currentId
    data = request.get_json()
    todo = ToDo()
    todo.name = data["name"]
    todo.location = data["location"]
    todo.date = data["date"]
    todo.id = str(uuid.uuid1())
    my_list.append(todo)
    return make_response("", 201)


@app.route('/server/getall', methods=['GET'])
def getall():
    return make_response(jsonify(my_list), 200)


@app.route('/server/update/<id>', methods=['PATCH'])
def update(id):
    data = request.get_json()
    todo = ToDo()
    todo.name = data["name"]
    todo.location = data["location"]
    todo.date = data["date"]

    for activity in my_list:
        if activity.id == id:
            activity.name = todo.name
            activity.location = todo.location
            activity.date = todo.date
            return make_response("", 202)
    return make_response("", 404)


@app.route('/server/delete/<id>', methods=['DELETE'])
def delete(id):
    for i in range(len(my_list)):
        if str(my_list[i].id) == str(id):
            del my_list[i]
            return make_response("", 200)
    return make_response("", 404)


if __name__ == "__main__":
    app.json_encoder = MyJsonEncoder
    app.run(port=19999, host="localhost")
