from flask.json import JSONEncoder

from ToDo import ToDo


class MyJsonEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, ToDo):
            return {
                'id': o.id,
                'name': o.name,
                'location': o.location,
                'date': o.date
            }

        return super(MyJsonEncoder, self).default(o)

