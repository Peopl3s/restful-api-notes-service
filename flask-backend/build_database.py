import os
from config import db
from models import Note, User
from utility import get_timestamp

NOTES = [
    {
        "id": 1,
        "title": "PyLounge",
        "content": "vk.com/pylounge",
        "timestamp": get_timestamp(),
        "remind": True
    },
    {
        "id": 2,
        "title": "Instagram",
        "content": "instagram.com/py_lounge/",
        "timestamp": get_timestamp(),
        "remind": False
    },
    {
        "id": 3,
        "title": "GitHub",
        "content": "Peopl3s",
        "timestamp": get_timestamp(),
        "remind": False
    }
]

user1 = User(username='admin', email='admin@admin.ru')
user1.set_password('secret')

user2 = User(username='max', email='max@max.ru')
user2.set_password('keep')


#if os.path.exists('notes.db'):
#   os.remove('notes.db')

db.create_all()

#db.session.add(user1)
#db.session.add(user2) 

for note in NOTES:
    record = Note(title=note['title'], content=note['content'], 
                                        remind=note['remind'])
    db.session.add(record)

db.session.commit()
