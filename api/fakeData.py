from api import db, User, Question
import datetime

db.drop_all()
db.create_all()

user_data = [
    {'username': 'testuser', 'email': 'testuser@gmail.com','password': '123456'},
    {'username': 'testuser2', 'email': 'testuser2@gmail.com', 'password': '1234562'}
]

ques_data = [
    {'ownerId': 1, 'tag': 'Food', 'question': 'What food should I choose?', 'anonymous': False},
    {'ownerId': 2, 'tag': 'Movie', 'question': 'What movie should I choose?', 'anonymous': False}
]

for data in user_data:
    user = User(data['username'], data['email'], data['password'])
    db.session.add(user)

for data in ques_data:
    question = Question(data['ownerId'], datetime.datetime(2021, 11, 20), data['tag'], data['question'], data['anonymous'], datetime.datetime(2021, 11, 30))
    db.session.add(question)

db.session.commit()