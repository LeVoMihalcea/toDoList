from flask import *
import pyodbc
from MyJsonEncoder import MyJsonEncoder
from ToDo import ToDo
import uuid

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=LAPTOP-LEO\SQLEXPRESS;'
                      'Database=toDo;'
                      'Trusted_Connection=yes;')
cursor = conn.cursor()
cursor.execute('SELECT * from dbo.activities order by activityDate')


def get_list():
    global cursor
    cursor.execute('SELECT * from dbo.activities order by activityDate')
    my_list = []
    for activity in cursor:
        todo = ToDo()
        todo.name = activity[1]
        todo.location = activity[2]
        todo.date = activity[3]
        todo.id = activity[0]
        my_list.append(todo)
    return my_list


app = Flask(__name__)


@app.route('/server/add', methods=['POST'])
def add():
    data = request.get_json()
    # todo = ToDo()
    # todo.name = data["name"]
    # todo.location = data["location"]
    # todo.date = data["date"]
    # todo.id = str(uuid.uuid1())
    # my_list.append(todo)

    sql = 'insert into activities(id, activityName, locationName, activityDate) values (?, ?, ?, ?)'
    vars = (uuid.uuid1(), data['name'], data['location'], data['date'])

    cursor.execute(sql, vars)

    return make_response("", 201)


@app.route('/server/getall', methods=['GET'])
def getall():
    return make_response(jsonify(get_list()), 200)

@app.route('/server/getone/<id>', methods=['GET'])
def getone(id):
    sql = 'select * from activities where activities.id = ?'
    vars = (id)
    cursor.execute(sql, vars)
    my_list = []
    print(str(cursor))
    for activity in cursor:
        todo = ToDo()
        todo.name = activity[1]
        todo.location = activity[2]
        todo.date = activity[3]
        todo.id = activity[0]
        my_list.append(todo)
    return make_response(jsonify(my_list[0]), 200)


@app.route('/server/update/<id>', methods=['PATCH'])
def update(id):
    data = request.get_json()
    sql = 'update activities set activityName=?, locationName=?, activityDate=? where activities.id = ? '
    vars = (data['name'], data['location'], data['date'], id)
    try:
        cursor.execute(sql, vars)
        return make_response("", 202)
    except Exception:
        return make_response("", 404)


@app.route('/server/delete/<id>', methods=['DELETE'])
def delete(id):
    sql = 'delete from activities where activities.id = ? '
    vars = (id)

    try:
        a = cursor.execute(sql, vars)
        return make_response("", 200)
    except Exception:
        return make_response("", 404)


if __name__ == "__main__":
    app.json_encoder = MyJsonEncoder
    app.run(port=19999, host="localhost")
