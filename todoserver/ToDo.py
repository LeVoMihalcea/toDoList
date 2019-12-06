class ToDo(object):

    def __init__(self):
        super().__init__()

    id = ""
    name = ""
    location = ""
    date = ""

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'date': self.date
        }
