from api import db, User, Question, Option, UserVote, UserAttitude
import datetime

db.drop_all()
db.create_all()

user_data = [
    {'username': 'testuser', 'email': 'testuser@gmail.com','password': '123456', 'confirm_password': '123456'}, 
    {'username': 'testuser2', 'email': 'testuser2@gmail.com', 'password': '1234562', 'confirm_password': '1234562'},
    {'username': 'xinyu', 'email': 'xinyuz9611@gmail.com', 'password': 'password123@', 'confirm_password': 'password123@'},
    {'username': 'shirley', 'email': 'shirley9611@gmail.com', 'password': 'passwordNB12', 'confirm_password': 'passwordNB12'},
    {'username': 'voteUser1', 'email': 'voteUser1@gmail.com', 'password': 'voteUser1', 'confirm_password': 'voteUser1'},
    {'username': 'voteUser2', 'email': 'voteUser2@gmail.com', 'password': 'voteUser2', 'confirm_password': 'voteUser2'}
]

question_data = [
    {'ownerId': 1, 'time': datetime.datetime(2021, 11, 20), 'tag': 'Food', 'question': 'What food should I choose?', 'anonymous': False, 'timeLimit': datetime.datetime(2021, 11, 30)},
    {'ownerId': 2, 'time': datetime.datetime(2021, 11, 20), 'tag': 'Movie', 'question': 'What movie should I choose?', 'anonymous': False, 'timeLimit': datetime.datetime(2021, 11, 30)},
    {'ownerId': 3, 'time': datetime.datetime(2021, 11, 11), 'tag': 'Movie', 'question': 'What movie should I choose for date?', 'anonymous': False, 'timeLimit': datetime.datetime(2021, 11, 12)},
    {'ownerId': 3, 'time': datetime.datetime(2021, 11, 22), 'tag': 'Travel', 'question': 'Where should I go for winter break?', 'anonymous': False, 'timeLimit': datetime.datetime(2021, 11, 25)},
    {'ownerId': 4, 'time': datetime.datetime(2021, 11, 16), 'tag': 'Style', 'question': 'Which lipstick color is better?', 'anonymous': False, 'timeLimit': datetime.datetime(2021, 11, 19)}
]

option_data = [
    {'name': 'Food1', 'questionID': 1},
    {'name': 'Food2', 'questionID': 1},
    {'name': 'Movie1', 'questionID': 2},
    {'name': 'Movie 2', 'questionID': 2},
    {'name': 'Dune', 'questionID': 3},
    {'name': 'No Time To Die', 'questionID': 3},
    {'name': 'Eternals', 'questionID': 3},
    {'name': 'Shangqi', 'questionID': 3},
    {'name': 'Hawaii', 'questionID': 4},
    {'name': 'Alaska', 'questionID': 4},
    {'name': 'Cancun', 'questionID': 4},
    {'name': 'Orlando', 'questionID': 4},
    {'name': 'Armani 400', 'questionID': 5},
    {'name': 'Armani 405', 'questionID': 5},
    {'name': 'Armani 206', 'questionID': 5},
    {'name': 'Armani 201', 'questionID': 5}
]

user_vote_data = [
    {'userID': 5, 'questionID': 3, 'vote_result': 5},
    {'userID': 6, 'questionID': 3, 'vote_result': 7},
    {'userID': 5, 'questionID': 4, 'vote_result': 10},
    {'userID': 6, 'questionID': 4, 'vote_result': 12},
    {'userID': 5, 'questionID': 5, 'vote_result': 15},
    {'userID': 6, 'questionID': 5, 'vote_result': 15},
    {'userID': 5, 'questionID': 1, 'vote_result': 1},
    {'userID': 6, 'questionID': 1, 'vote_result': 2}
]

user_attitude_data = [
    {'userID': 5, 'questionID': 3, 'attitude': 0},
    {'userID': 6, 'questionID': 3, 'attitude': 1},
    {'userID': 5, 'questionID': 3, 'attitude': 1},
    {'userID': 6, 'questionID': 3, 'attitude': 0},
    {'userID': 2, 'questionID': 3, 'attitude': 1},
    {'userID': 3, 'questionID': 3, 'attitude': 1}
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

for data in user_vote_data:
    vote = UserVote(data['userID'], data['questionID'], data['vote_result'])
    db.session.add(vote)

for data in user_attitude_data:
    attitude = UserAttitude(data['userID'], data['questionID'], data['attitude'])
    db.session.add(attitude)

db.session.commit()
