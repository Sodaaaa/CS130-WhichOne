from api import db, User, Question, Option, UserVote, UserAttitude
import datetime

user_data = [
    {'username': 'xinyu', 'email': 'xinyuz9611@gmail.com','password': '123456', 'confirm_password': '123456', 'image_file': '2'},
    {'username': 'xinyi', 'email': 'xinyi@gmail.com','password': '1234562', 'confirm_password': '1234562', 'image_file': '5'},
    {'username': 'winnie', 'email': 'winnie@gmail.com','password': 'password123@', 'confirm_password': 'password123@', 'image_file': '9'},
    {'username': 'yuefuliu', 'email': 'yuefuliu@gmail.com','password': 'passwordNB12', 'confirm_password': 'passwordNB12', 'image_file': '15'},
    {'username': 'fangqingx', 'email': 'fangqingx@gmail.com','password': 'voteUser1', 'confirm_password': 'voteUser1', 'image_file': '21'},
    {'username': 'zikunli', 'email': 'zikunli@gmail.com','password': 'voteUser2', 'confirm_password': 'voteUser2', 'image_file': '22'}
]

question_data = [
    {'ownerId': 1, 'time': datetime.datetime(2021, 11, 20), 'tag': 'Food', 'question': 'What food should I choose?',
     'anonymous': False, 'timeLimit': datetime.datetime(2021, 12, 30)},
    {'ownerId': 2, 'time': datetime.datetime(2021, 11, 20), 'tag': 'Movie', 'question': 'What movie should I choose?',
     'anonymous': False, 'timeLimit': datetime.datetime(2021, 12, 30)},
    {'ownerId': 3, 'time': datetime.datetime(2021, 11, 11), 'tag': 'Movie', 'question': 'What movie should I choose for date?',
     'anonymous': False, 'timeLimit': datetime.datetime(2021, 12, 12)},
    {'ownerId': 3, 'time': datetime.datetime(2021, 11, 22), 'tag': 'Travel', 'question': 'Where should I go for winter break?',
     'anonymous': False, 'timeLimit': datetime.datetime(2021, 12, 25)},
    {'ownerId': 4, 'time': datetime.datetime(2021, 11, 16), 'tag': 'Style', 'question': 'Which lipstick color is better?',
     'anonymous': False, 'timeLimit': datetime.datetime(2021, 12, 19)},
    {'ownerId': 1, 'time': datetime.datetime(2021, 11, 23), 'tag': 'Sports', 'question': 'Which club should I choose this quarter?',
     'anonymous': False, 'timeLimit': datetime.datetime(2021, 12, 24)},
    {'ownerId': 2, 'time': datetime.datetime(2021, 11, 24), 'tag': 'Music', 'question': 'Should I go to Taylor Swift\' concert?',
     'anonymous': False, 'timeLimit': datetime.datetime(2021, 12, 26)},
    {'ownerId': 5, 'time': datetime.datetime(2021, 11, 25), 'tag': 'Sports', 'question': 'Which sport should I learn in high school?',
     'anonymous': False, 'timeLimit': datetime.datetime(2021, 11, 27)},
    {'ownerId': 1, 'time': datetime.datetime(2021, 11, 23), 'tag': 'Travel', 'question': 'Should I travel in Europe in Current Covid-19 condition?',
     'anonymous': False, 'timeLimit': datetime.datetime(2021, 11, 24)},
    {'ownerId': 2, 'time': datetime.datetime(
        2021, 11, 24), 'tag': 'Travel', 'question': 'Which national park should I visit in Winter?', 'anonymous': False, 'timeLimit': datetime.datetime(2021, 11, 26)}
]

option_data = [
    {'name': 'Pizza', 'questionID': 1}, #1
    {'name': 'Sushi', 'questionID': 1}, #2
    {'name': 'Red Dog', 'questionID': 2}, #3
    {'name': 'Eternals', 'questionID': 2}, #4
    {'name': 'Dune', 'questionID': 3}, #5
    {'name': 'No Time To Die', 'questionID': 3}, #6
    {'name': 'Eternals', 'questionID': 3}, #7
    {'name': 'Shangqi', 'questionID': 3}, #8
    {'name': 'Hawaii', 'questionID': 4}, #9
    {'name': 'Alaska', 'questionID': 4}, #10
    {'name': 'Cancun', 'questionID': 4}, #11
    {'name': 'Orlando', 'questionID': 4}, #12
    {'name': 'Armani 400', 'questionID': 5}, #13
    {'name': 'Armani 405', 'questionID': 5},
    {'name': 'Armani 206', 'questionID': 5},
    {'name': 'Armani 201', 'questionID': 5},
    {'name': 'Archery Range', 'questionID': 6}, #17
    {'name': 'Skiing Monsters', 'questionID': 6},
    {'name': 'Badminton Club', 'questionID': 6},
    {'name': 'Weight Lifter Club', 'questionID': 6},
    {'name': 'GOGOGO!', 'questionID': 7}, #21
    {'name': 'Either is fine', 'questionID': 7},
    {'name': 'Don\' Go', 'questionID': 7},
    {'name': 'Basket Ball', 'questionID': 8}, #24
    {'name': 'Soccer Ball', 'questionID': 8},
    {'name': 'Tennis', 'questionID': 8},
    {'name': 'Squash', 'questionID': 8},
    {'name': 'No! This will kill you!', 'questionID': 9}, #28
    {'name': 'I think it\'s OK, just take care and wear mask.', 'questionID': 9},
    {'name': 'Joshua Tree National Park', 'questionID': 10}, #30
    {'name': 'Yosemite National Park', 'questionID': 10},
    {'name': 'Olympic National Park', 'questionID': 10},
    {'name': 'Grand Canyon National Park', 'questionID': 10}
]

user_vote_data = [
#    {'userID': 1, 'questionID': 1, 'vote_result': 1},
    {'userID': 2, 'questionID': 1, 'vote_result': 1},
    {'userID': 3, 'questionID': 1, 'vote_result': 1},
    {'userID': 4, 'questionID': 1, 'vote_result': 1},
    {'userID': 5, 'questionID': 1, 'vote_result': 1},
    {'userID': 6, 'questionID': 1, 'vote_result': 2},
    {'userID': 1, 'questionID': 2, 'vote_result': 2},
#    {'userID': 2, 'questionID': 2, 'vote_result': 1},
    {'userID': 3, 'questionID': 2, 'vote_result': 1},
    {'userID': 4, 'questionID': 2, 'vote_result': 2},
    {'userID': 5, 'questionID': 2, 'vote_result': 2},
    {'userID': 6, 'questionID': 2, 'vote_result': 2},
    {'userID': 1, 'questionID': 3, 'vote_result': 5},
    {'userID': 2, 'questionID': 3, 'vote_result': 6},
#    {'userID': 3, 'questionID': 3, 'vote_result': 5},
    {'userID': 4, 'questionID': 3, 'vote_result': 6},
    {'userID': 5, 'questionID': 3, 'vote_result': 5},
    {'userID': 6, 'questionID': 3, 'vote_result': 7},
    {'userID': 5, 'questionID': 4, 'vote_result': 10},
    {'userID': 6, 'questionID': 4, 'vote_result': 12},
    {'userID': 1, 'questionID': 5, 'vote_result': 14},
    {'userID': 2, 'questionID': 5, 'vote_result': 14},
#    {'userID': 3, 'questionID': 5, 'vote_result': 14},
    {'userID': 1, 'questionID': 5, 'vote_result': 15},
    {'userID': 5, 'questionID': 5, 'vote_result': 16},
    {'userID': 6, 'questionID': 5, 'vote_result': 16},
#    {'userID': 1, 'questionID': 6, 'vote_result': 17},
    {'userID': 2, 'questionID': 6, 'vote_result': 17},
    {'userID': 3, 'questionID': 6, 'vote_result': 17},
    {'userID': 4, 'questionID': 6, 'vote_result': 18},
    {'userID': 5, 'questionID': 6, 'vote_result': 19},
    {'userID': 6, 'questionID': 6, 'vote_result': 20},
    {'userID': 1, 'questionID': 7, 'vote_result': 22},
#    {'userID': 2, 'questionID': 7, 'vote_result': 23},
    {'userID': 3, 'questionID': 7, 'vote_result': 22},
    {'userID': 4, 'questionID': 7, 'vote_result': 22},
    {'userID': 5, 'questionID': 7, 'vote_result': 22},
    {'userID': 6, 'questionID': 7, 'vote_result': 22},
    {'userID': 1, 'questionID': 8, 'vote_result': 26},
    {'userID': 2, 'questionID': 8, 'vote_result': 26},
    {'userID': 3, 'questionID': 8, 'vote_result': 27},
    {'userID': 4, 'questionID': 8, 'vote_result': 27},
#    {'userID': 5, 'questionID': 8, 'vote_result': 27},
    {'userID': 6, 'questionID': 8, 'vote_result': 27},
    {'userID': 1, 'questionID': 10, 'vote_result': 33},
#    {'userID': 2, 'questionID': 10, 'vote_result': 33},
    {'userID': 3, 'questionID': 10, 'vote_result': 33},
    {'userID': 4, 'questionID': 10, 'vote_result': 33},
    {'userID': 5, 'questionID': 10, 'vote_result': 33},
    {'userID': 6, 'questionID': 10, 'vote_result': 30},
    {'userID': 4, 'questionID': 9, 'vote_result': 28},
    {'userID': 2, 'questionID': 9, 'vote_result': 29},
    {'userID': 3, 'questionID': 9, 'vote_result': 29}
]

user_attitude_data = [
    {'userID': 1, 'questionID': 9, 'attitude': 0},
    {'userID': 2, 'questionID': 9, 'attitude': 1},
    {'userID': 3, 'questionID': 9, 'attitude': 1},
    {'userID': 4, 'questionID': 9, 'attitude': 0},
    {'userID': 5, 'questionID': 9, 'attitude': 1},
    {'userID': 6, 'questionID': 9, 'attitude': 1},
    {'userID': 1, 'questionID': 10, 'attitude': 0},
    {'userID': 2, 'questionID': 10, 'attitude': 0},
    {'userID': 3, 'questionID': 10, 'attitude': 1},
    {'userID': 4, 'questionID': 10, 'attitude': 0},
    {'userID': 5, 'questionID': 10, 'attitude': 0},
    {'userID': 6, 'questionID': 10, 'attitude': 1},
    {'userID': 1, 'questionID': 8, 'attitude': 1},
    {'userID': 2, 'questionID': 8, 'attitude': 1},
    {'userID': 3, 'questionID': 8, 'attitude': 1},
    {'userID': 4, 'questionID': 8, 'attitude': 1},
    {'userID': 5, 'questionID': 8, 'attitude': 1},
    {'userID': 6, 'questionID': 8, 'attitude': 1},
    {'userID': 1, 'questionID': 7, 'attitude': 0},
    {'userID': 2, 'questionID': 7, 'attitude': 1},
    {'userID': 3, 'questionID': 7, 'attitude': 1},
    {'userID': 4, 'questionID': 7, 'attitude': 1},
    {'userID': 5, 'questionID': 7, 'attitude': 1},
    {'userID': 6, 'questionID': 7, 'attitude': 1},
    {'userID': 1, 'questionID': 6, 'attitude': 1},
    {'userID': 2, 'questionID': 6, 'attitude': 1},
    {'userID': 3, 'questionID': 6, 'attitude': 1},
    {'userID': 4, 'questionID': 6, 'attitude': 1},
    {'userID': 5, 'questionID': 6, 'attitude': 1},
    {'userID': 6, 'questionID': 6, 'attitude': 1},
    {'userID': 5, 'questionID': 8, 'attitude': 1}
]


def generate_fake_data():
    db.drop_all()
    db.create_all()

    for data in user_data:
        user = User(data['username'], data['email'], data['password'], data['confirm_password'], data['image_file'])
        db.session.add(user)

    for data in question_data:
        question = Question(data['ownerId'], data['time'], data['tag'],
                            data['question'], data['anonymous'], data['timeLimit'])
        db.session.add(question)

    for data in option_data:
        question = Question.query.get(data['questionID'])
        question.option.append(Option(data['name']))

    for data in user_vote_data:
        vote = UserVote(data['userID'], data['questionID'],
                        data['vote_result'])
        db.session.add(vote)
        option = Option.query.get(data['vote_result'])
        option.votes += 1

    for data in user_attitude_data:
        attitude = UserAttitude(
            data['userID'], data['questionID'], data['attitude'])
        db.session.add(attitude)
        question = Question.query.get(data['questionID'])
        if data['attitude'] == 0:
            question.likes += 1
        else:
            question.dislikes += 1

    db.session.commit()


if __name__ == '__main__':
    generate_fake_data()
