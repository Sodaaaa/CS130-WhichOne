from api import db, User, Question, Option
import datetime

db.drop_all()
db.create_all()

user_data = [
    {'username': 'testuser', 'email': 'testuser@gmail.com','password': '123456', 'confirm_password': '123456'},
    {'username': 'testuser2', 'email': 'testuser2@gmail.com', 'password': '1234562', 'confirm_password': '1234562'}
]

question_data = [
    {'ownerId': 1, 'time': datetime.datetime(2021, 11, 20), 'tag': 'Food', 'question': 'What food should I choose?', 'anonymous': False, 'timeLimit': datetime.datetime(2021, 11, 30)},
    {'ownerId': 2, 'time': datetime.datetime(2021, 11, 20), 'tag': 'Movie', 'question': 'What movie should I choose?', 'anonymous': False, 'timeLimit': datetime.datetime(2021, 11, 30)}
]

option_data = [
    {'name': 'Food1', 'questionID': 1},
    {'name': 'Food2', 'questionID': 1},
    {'name': 'Movie1', 'questionID': 2},
    {'name': 'Movie2', 'questionID': 2}
]

for data in user_data:
    user = User(data['username'], data['email'], data['password'], data['confirm_password'])
    db.session.add(user)

for data in question_data:
    question = Question(data['ownerId'], data['time'], data['tag'], data['question'], data['anonymous'], data['timeLimit'])
    db.session.add(question)

for data in option_data:
    question = Question.query.get(data['questionID'])
    question.option.append(Option(data['name']))

db.session.commit()
