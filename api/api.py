import time
import re
import enum
import pprint
from flask import Flask, json, request, jsonify, url_for, flash, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '0bbabb38f22b256ab947284622266494'
db = SQLAlchemy(app)
pp = pprint.PrettyPrinter(indent=4)


def expired(dt):
    return dt < datetime.datetime.now()


def time_to_expire(expire_dt):
    return expire_dt.timestamp() - datetime.datetime.now().timestamp()


class User(db.Model):
    __tablename__ = "user"
    UID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    image_file = db.Column(db.String(999))

    def __init__(self, username, email, password, confirm_password, image_file=None):
        self.username = username
        self.email = email
        self.password = password
        if image_file != None:
            self.image_file = image_file
        else:
            self.image_file = None

    def __repr__(self):
        return f"User('{self.UID}', '{self.username}', '{self.email}', '{self.password}', '{self.image_file}')"


def getAllUsers():
    """return a list of all current users' information dictionary"""
    users = User.query.all()
    return [{"UID": i.UID, "username": i.username, "email": i.email, "password": i.password} for i in users]


def getUser(email):
    """given user's email, return UID, username, email and password of this user"""
    users = User.query.all()
    user = list(filter(lambda x: x.email == email, users))[0]
    return {"UID": user.UID, "username": user.username, "email": user.email, "password": user.password}


def getUID(email):
    """given user's email, return this user's UID"""
    users = User.query.all()
    user = list(filter(lambda x: x.email == email, users))[0]
    return user.UID


def getUserImage(UID):
    """given user's UID, return this user's user image"""
    users = User.query.all()
    user = list(filter(lambda x: x.UID == UID, users))[0]
    return user.image_file


def getUsername(UID):
    """given user's UID, return this user's username"""
    users = User.query.all()
    user = list(filter(lambda x: x.UID == UID, users))[0]
    return user.username


class Question(db.Model):
    __tablename__ = "question"
    questionID = db.Column(db.Integer, primary_key=True)
    ownerID = db.Column(db.Integer, db.ForeignKey('user.UID'), nullable=False)
    time = db.Column(db.DateTime)
    tag = db.Column(db.String(20))
    question = db.Column(db.String(200))
    anonymous = db.Column(db.Boolean)
    likes = db.Column(db.Integer)
    dislikes = db.Column(db.Integer)
    timeLimit = db.Column(db.DateTime)

    option = db.relationship(
        "Option", cascade="all, delete", backref="Question")

    def __init__(self, ownerID, time, tag, question, anonymous,  timeLimit):
        self.ownerID = ownerID
        self.time = time
        self.tag = tag
        self.question = question
        self.anonymous = anonymous
        self.likes = 0
        self.dislikes = 0
        self.timeLimit = timeLimit

    def __repr__(self):
        return f"Question('{self.questionID}', '{self.ownerID}', '{self.time}')"


class Option(db.Model):
    __tablename__ = "option"
    OptionID = db.Column(db.Integer, primary_key=True)
    questionID = db.Column(db.Integer, db.ForeignKey(
        'question.questionID'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(100000000000000000000000000000))
    votes = db.Column(db.Integer, nullable=False)

    def __init__(self, name, image=None):
        self.name = name
        if image != None:
            self.image = image
        else:
            self.image = 'none'
        self.votes = 0

    def __repr__(self):
        return f"Option('{self.OptionID}', '{self.questionID}', '{self.votes}', '{self.name}', '{self.image}')"


class UserVote(db.Model):
    UserVoteID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey(
        'user.UID'), nullable=False)
    questionID = db.Column(db.Integer, db.ForeignKey(
        'question.questionID'), nullable=False)
    # vote_result is an interger represents the option user choose
    vote_result = db.Column(db.Integer, nullable=False)

    def __init__(self, userID, questionID, vote_result):
        self.userID = userID
        self.questionID = questionID
        self.vote_result = vote_result

    def __repr__(self):
        return f"UserVote('{self.UserVoteID}', '{self.userID}', '{self.questionID}', '{self.vote_result}')"


class UserAttitude(db.Model):
    UserAttitudeID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey(
        'user.UID'), nullable=False)
    questionID = db.Column(db.Integer, db.ForeignKey(
        'question.questionID'), nullable=False)
    # attitude is an interger, 0 represents like, 1 represents dislike
    attitude = db.Column(db.Integer, nullable=False)

    def __init__(self, userID, questionID, attitude):
        self.userID = userID
        self.questionID = questionID
        self.attitude = attitude

    def __repr__(self):
        return f"UserVote('{self.UserAttitudeID}', '{self.userID}', '{self.questionID}', '{self.attitude}')"


@app.route("/api/register", methods=["POST"])
def register():
    """ request an email address, a password, a confirm_password, 
    a username and a random user image string,
    return {"success": True} if successfuly register a new user, 
    otherwise return corresponding error"""
    try:
        email = request.json["email"]
        password = request.json["password"]
        confirm_password = request.json["confirm_password"]
        username = request.json["username"]
        image_file = request.json["image_file"]
        print({"email": email, "password": password,
              "confirm_password": confirm_password, "username": username})

        # registration information check
        if not (email and password and confirm_password and username):
            return jsonify({"error": "Invalid form"})
        elif password != confirm_password:
            return jsonify({"error": "Inconsistent confirm password"})

        # Email validation check
        if not re.match(r"[\w._]{5,}@\w{3,}\.\w{2,4}", email):
            return jsonify({"error": "Invalid email"})

        # Check to see if user already exists
        users = getAllUsers()
        if len(list(filter(lambda x: x["email"] == email, users))) == 1:
            return jsonify({"error": "Email address already existed"})

        # add a new user
        try:
            user = User(username, email, password,
                        confirm_password, image_file)
            db.session.add(user)
            db.session.commit()
            print("Successfully add a user!")
        except Exception as error:
            print(error)
        return jsonify({"success": True})

    except Exception as error:
        print(error)
        return jsonify({"error": "Invalid form"})


@app.route("/api/login", methods=["POST"])
def login():
    """ request an email address and a password, 
    return {"success": True} if successfuly register login, 
    otherwise return corresponding error"""
    try:
        email = request.json["email"]
        password = request.json["password"]
        if email and password:
            user = list(filter(
                lambda x: x["email"] == email and x["password"] == password, getAllUsers()))
            print("User Information:", user)
            # Check if user exists
            if len(user) == 1:
                print("Successfully Login")
                UID = getUID(email)
                return jsonify({"success": UID})
            else:
                return jsonify({"error": "Invalid credentials"})
        else:
            return jsonify({"error": "Invalid form"})
    except Exception as error:
        print(error)
        return jsonify({"error": "Invalid form"})


@app.route("/api/getUserinfo", methods=["POST"])
def getUserinfo():
    """ request an UID, return username, email and user image in json format"""
    try:
        uid = request.json["UID"]
        users = User.query.all()
        user = list(filter(lambda x: x.UID == uid, users))[0]
        result = [{"userID": user.UID, "username": user.username,
                   "email": user.email, "owner_image": user.image_file}]
        print("------ successful get userinfo---------")
        pp.pprint(result)
        return jsonify(result)
    except Exception as error:
        print(error)
        return jsonify({"error": error})


@app.route('/api/recordPostedQuestion', methods=["POST"])
def recordPostedQuestion():
    """ Record the posted question into our database.
    This API use the POST method.
    """
    """
    The posted json object should be in the form below:

    {
        "ownerID"       : 123456,
        "time"          : 1636665474,
        "tag"           : "tagname",
        "question"      : "question content",
        "annoymous"     : TRUE,
        "timeLimit"     : 1636665474,
        "options": [
            {
                "option_name"    : "option content",
                "option_image"   : "ImageFiliePath"
            },
            {
                "option_name"    : "option content",
                "option_image"   : "ImageFiliePath"
            }
        ]
    }

    "time" should be a unix timestamp indicating the time the question is posted
    "timeLimit" should be a unix timestamp indicating the time the question expires
    If no image, the "optionImage" field should be an empty string
    """
    method = request.method
    if method.lower() == 'post':
        ownerID = request.json['ownerID']
        time = datetime.datetime.fromtimestamp(request.json['time'])
        tag = request.json['tag']
        question = request.json['question']
        anonymous = request.json['anonymous']
        timeLimit = datetime.datetime.fromtimestamp(request.json['timeLimit'])

        question = Question(ownerID, time, tag, question,
                            anonymous, timeLimit)
        data = request.json['options']
        for op in data:
            option = None
            if 'option_image' not in op:
                option = Option(op['option_name'])
            else:
                option_name = op['option_name']
                option_image = op['option_image'][0]['thumbUrl']
                option = Option(option_name, option_image)
                print("--------- try-------------")
                print(option)
            question.option.append(option)
        try:

            db.session.add(question)
            # db.session.refresh(question)
            # questionID = question.id
            db.session.commit()

        except Exception as e:
            print(e)
            return ({'error': e})
    return ({'success': True})


@app.route('/api/getAllQuestions', methods=["GET"])
def getAllQuestions():
    """ 
    The request should provide a 'UID' parameter which is a int.
    Return all questions. 
    """
    """
    The returned data should be in format below:
    [{
        "questionID"    : 123456,
        "ownerID"       : 123456,
        "username"      : "name",
        "time"          : 1636665474,
        "tag"           : "tagname",
        "question"      : "question content",
        "annoymous"     : TRUE,
        "timeLimit"     : 1636665474,
        "chosenAttitude": -1,    (-1 for not chosen, 0 for liked, 1 for disliked)
        "voted"         : 1,     (-1 for not voted, otherwise return the voted optionID)
        "total_votes"   : 5,
        "expired"       : TRUE,
        "time_to_expire": 123456,
        "owner_image"   : "image",
        "option_list": [
            {
                "optionID"       : 1234556,
                "option_name"    : "option content",
                "option_image"   : "base64 string or none",
                "option_vote"    : 123
            },
            {
                "optionID"       : 1234557,
                "option_name"    : "option content",
                "option_image"   : "base64 string or none",
                "option_vote"    : 123
            }
        ]
    }]
    """
    questions = Question.query.all()
    question_dicts = [{'questionID': q.questionID,
                       'ownerID': q.ownerID,
                       'time': int(q.time.timestamp()),
                       'tag': q.tag,
                       'question': q.question,
                       'anonymous': q.anonymous,
                       'likes': q.likes,
                       'dislikes': q.dislikes,
                       'timeLimit': int(q.timeLimit.timestamp())} for q in questions if not expired(q.timeLimit)]
    for q in question_dicts:
        option_list = Option.query.filter(
            Option.questionID == q['questionID']).all()
        # TODO: return image
        option_dicts = [{'option_name': o.name, 'option_image': o.image, 'optionID': o.OptionID, 'option_vote': o.votes}
                        for o in option_list]
        total_votes = 0
        for o in option_dicts:
            total_votes += o['option_vote']
        q['total_votes'] = total_votes
        q['option_list'] = option_dicts
        q['username'] = User.query.filter(
            User.UID == q['ownerID']).first().username
        q['owner_image'] = User.query.filter(
            User.UID == q['ownerID']).first().image_file

        UID = int(request.args.get('UID'))
        user_vote_record = UserVote.query.filter(
            UserVote.userID == UID).filter(UserVote.questionID == q['questionID']).first()
        if user_vote_record == None:
            q['voted'] = -1
        else:
            q['voted'] = user_vote_record.vote_result
        user_attitude_record = UserAttitude.query.filter(
            UserAttitude.userID == UID).filter(UserAttitude.questionID == q['questionID']).first()
        if user_attitude_record == None:
            q['chosenAttitude'] = -1
        else:
            q['chosenAttitude'] = user_attitude_record.attitude
        if datetime.datetime.fromtimestamp(q['timeLimit']) < datetime.datetime.now():
            q['expired'] = True
        else:
            q['expired'] = False
    question_dicts.sort(key=lambda k: k['time'], reverse=True)
    return jsonify(question_dicts)


@app.route('/api/listTopics', methods=["GET"])
def listTopics():
    """ 
    The request should provide a 'tags' parameter whose value is a string.
    The request should provide a 'UID' parameter which is a int.
    Different tags should be separated by coma.
    Example url: "http://localhost:5000/api/listTopics?tags=abc,def".
    Return all topics of specific tags. 
    """
    """
    The returned data should be in format below:
    [{
        "questionID"    : 123456,
        "ownerID"       : 123456,
        "username"      : "name",
        "time"          : 1636665474,
        "tag"           : "tagname",
        "question"      : "question content",
        "annoymous"     : TRUE,
        "timeLimit"     : 1636665474,
        "chosenAttitude": -1,    (-1 for not chosen, 0 for liked, 1 for disliked)
        "voted"         : 1,     (-1 for not voted, otherwise return the voted optionID)
        "total_votes"   : 5,
        "expired"       : TRUE,
        "time_to_expire": 123456,
        "owner_image"   : "image",
        "option_list": [
            {
                "optionID"       : 1234556,
                "option_name"    : "option content",
                "option_image"   : "base64 str or none",
                "option_vote"    : 123
            },
            {
                "optionID"       : 1234557,
                "option_name"    : "option content",
                "option_image"   : "base64 str or none",
                "option_vote"    : 123
            }
        ]
    }]
    """
    question_dicts = []
    for tag in request.args.get('tags').split(','):
        questions = Question.query.filter(
            Question.tag == tag).all()
        question_dicts += [{'questionID': q.questionID,
                            'ownerID': q.ownerID,
                            'time': int(q.time.timestamp()),
                            'tag': q.tag,
                            'question': q.question,
                            'anonymous': q.anonymous,
                            'likes': q.likes,
                            'dislikes': q.dislikes,
                            'timeLimit': int(q.timeLimit.timestamp())} for q in questions if not expired(q.timeLimit)]

    for q in question_dicts:
        option_list = Option.query.filter(
            Option.questionID == q['questionID']).all()
        # TODO: return image
        option_dicts = [{'option_name': o.name, 'option_image': o.image, 'optionID': o.OptionID, 'option_vote': o.votes}
                        for o in option_list]
        total_votes = 0
        for o in option_dicts:
            total_votes += o['option_vote']
        q['total_votes'] = total_votes
        q['option_list'] = option_dicts
        q['username'] = User.query.filter(
            User.UID == q['ownerID']).first().username
        q['owner_image'] = User.query.filter(
            User.UID == q['ownerID']).first().image_file

        UID = int(request.args.get('UID'))
        user_vote_record = UserVote.query.filter(
            UserVote.userID == UID).filter(UserVote.questionID == q['questionID']).first()
        if user_vote_record == None:
            q['voted'] = -1
        else:
            q['voted'] = user_vote_record.vote_result
        user_attitude_record = UserAttitude.query.filter(
            UserAttitude.userID == UID).filter(UserAttitude.questionID == q['questionID']).first()
        if user_attitude_record == None:
            q['chosenAttitude'] = -1
        else:
            q['chosenAttitude'] = user_attitude_record.attitude
        if datetime.datetime.fromtimestamp(q['timeLimit']) < datetime.datetime.now():
            q['expired'] = True
        else:
            q['expired'] = False
            # q['time_to_expire'] = time_to_expire(q.)
    question_dicts.sort(key=lambda k: k['time'], reverse=True)
    return jsonify(question_dicts)


@app.route('/api/recordVote', methods=["POST"])
def recordVote():
    """ Record the "vote" action of a user, given userID, questionID and optionID. 
    This API use the POST method.
    """
    """
    The posted json object should be in the form below:
    {
        "userID"        : 123456,
        "questionID"    : 123456,
        "optionID"      : 123456
    }
    """
    try:
        userID = request.json['userID']
        questionID = request.json['questionID']
        vote_result = request.json['optionID']
        if userID and questionID and vote_result:
            option = Option.query.get(vote_result)
            option.votes += 1
            user_vote = UserVote(userID, questionID, vote_result)
            db.session.add(user_vote)
            db.session.commit()
            print("Success!")
            return jsonify({"success": True})
        else:
            print("missing data")
            return jsonify({"error": "Missing userID or questionID or vote_result"})
    except Exception as e:
        print(e)
        return jsonify({"error": e})


@app.route('/api/recordAttitude', methods=["POST"])
def recordAttitude():
    """ Record the "like" or "dislike" action of a user, given userID, questionID and attitude. 
    This API use the POST method.
    """
    """
    The posted json object should be in the form below:
    ("attitude" is an interger, 0 represents like, 1 represents dislike.)
    {
        "userID"        : 123456,
        "questionID"    : 123456,
        "attitude"      : 0
    }
    """
    try:
        userID = request.json['userID']
        questionID = request.json['questionID']
        attitude = request.json['attitude']
        if userID and questionID:
            if attitude != 0 and attitude != 1:
                print("invalid attitude")
                return jsonify({"error": "invalid attitude"})
            question = Question.query.get(questionID)
            user_attitude = UserAttitude.query.filter_by(
                userID=userID, questionID=questionID).first()
            if user_attitude:
                if user_attitude.attitude == attitude:
                    print("repeated attitude")
                    return jsonify({"error": "repeated attitude"})
                else:
                    if user_attitude.attitude == 0:
                        question.likes -= 1
                    else:
                        question.dislikes -= 1
                    db.session.delete(user_attitude)
            if attitude == 0:
                question.likes += 1
            else:
                question.dislikes += 1
            user_attitude = UserAttitude(userID, questionID, attitude)
            db.session.add(user_attitude)
            db.session.commit()
            print("Success!")
            return jsonify({"success": True})
        else:
            print("Missing userID or questionID")
            return jsonify({"error": "Missing userID or questionID"})
    except Exception as e:
        print(e)
        return jsonify({"error": e})


@app.route('/api/cancelAttitude', methods=["POST"])
def cancelAttitude():
    """ Cancel the "like" or "dislike" action of a user, given userID, questionID and attitude. 
    This API use the POST method.
    """
    """
    The posted json object should be in the form below:
    ("attitude" is an interger, 0 represents like, 1 represents dislike.)
    {
        "userID"        : 123456,
        "questionID"    : 123456,
        "attitude"      : 0
    }
    """
    try:
        userID = request.json['userID']
        questionID = request.json['questionID']
        attitude = request.json['attitude']
        if userID and questionID:
            if attitude != 0 and attitude != 1:
                print("invalid attitude")
                return jsonify({"error": "invalid attitude"})
            question = Question.query.get(questionID)
            user_attitude = UserAttitude.query.filter_by(
                userID=userID, questionID=questionID, attitude=attitude).first()
            if not user_attitude:
                print("attitude doesn't exist")
                return jsonify({"error": "attitude doesn't exist"})
            db.session.delete(user_attitude)
            if attitude == 0:
                question.likes -= 1
            else:
                question.dislikes -= 1
            db.session.commit()
            print("Success!")
            return jsonify({"success": True})
        else:
            print("Missing userID or questionID")
            return jsonify({"error": "Missing userID or questionID"})
    except Exception as e:
        print(e)
        return jsonify({"error": e})


@app.route('/api/getHistoricalQuestions', methods=["POST"])
def getHistoricalQuestions():
    """ request a user's UID, return all questions and corresponding information 
    has been posted by this user and this user's username and user image
    """
    """
    This API use the POST method.
    The returned json object is be in the form below:
    [{   'anonymous': False,
        'dislikes': 0,
        'likes': 0,
        'option_list': [   {   'optionID': 1,
                               'option_image': 'none',
                               'option_name': 'Food1',
                               'option_vote': 0},
                           {   'optionID': 2,
                               'option_image': 'none',
                               'option_name': 'Food2',
                               'option_vote': 0}],
        'ownerID': 1,
        'question': 'What food should I choose?',
        'questionID': 1,
        'tag': 'Food',
        'time': datetime.datetime(2021, 11, 20, 0, 0),
        'timeLimit': 1638259200,
        'userID': 1,
        'username': 'testuser'}]"""

    try:
        uid = request.json["UID"]
        questions = Question.query.all()
        userVotes = UserVote.query.all()
        userAttitudes = UserAttitude.query.all()
        postedQ = list(filter(lambda x: x.ownerID == uid, questions))
        options = Option.query.all()
        result = []
        for q in postedQ:
            att = -1
            attitude = list(filter(lambda x: x.userID ==
                            uid and x.questionID == q.questionID, userAttitudes))
            if len(attitude) != 0:
                att = attitude[0].attitude
            voted = -1
            vote = list(filter(lambda x: x.userID ==
                        uid and x.questionID == q.questionID, userVotes))
            if len(vote) != 0:
                voted = vote[0].vote_result
            all_options = list(
                filter(lambda x: x.questionID == q.questionID, options))
            total_votes = 0
            option_list = []
            for o in all_options:
                temp = {'optionID': o.OptionID,
                        'option_name': o.name,
                        'option_image': o.image,
                        'option_vote': o.votes}
                option_list.append(temp)
                total_votes += o.votes
            info = {'userID': uid,
                    'questionID': q.questionID,
                    'ownerID': q.ownerID,
                    'owner_image': getUserImage(uid),
                    'time': q.time,
                    'tag': q.tag,
                    'question': q.question,
                    'anonymous': q.anonymous,
                    'likes': q.likes,
                    'dislikes': q.dislikes,
                    'timeLimit': int(q.timeLimit.timestamp()),
                    'option_list': option_list,
                    'username': getUsername(uid),
                    'chosenAttitude': att,
                    'voted': voted,
                    'total_votes': total_votes}
            if datetime.datetime.fromtimestamp(info['timeLimit']) < datetime.datetime.now():
                info['expired'] = True
            else:
                info['expired'] = False
            result.append(info)
        result.sort(key=lambda k: k['time'], reverse=True)
        print('------------------successful ---------------------')
        pp.pprint(result)
        return jsonify(result)
    except Exception as e:
        print(e)
        return jsonify({"error": e})


@app.route('/api/getVotes', methods=["POST"])
def getVotes():
    """ request a user's UID, return all questions and corresponding information 
    has been voted by this user and this user's username and user image
    """
    """ request an UID, return all vote actions of a this user and its user name. For each vote action, 
    return the questionID, ownerID, time, tag , question(description) and the voted option name
    This API use the POST method. Assume not choose attitude
    The returned json object is be in the form below:
    [{'anonymous': False,
    'dislikes': 0,
    'likes': 0,
    'option_list': [{'optionID': 1,
                'option_image': 'none',
                'option_name': 'Food1',
                'option_vote': 0},
                {'optionID': 2,
                'option_image': 'none',
                'option_name': 'Food2',
                'option_vote': 0}],
    'ownerID': 1,
    'question': 'What food should I choose?',
    'questionID': 1,
    'tag': 'Food',
    'time': datetime.datetime(2021, 11, 20, 0, 0),
    'timeLimit': 1638259200,
    'userID': 5,
    'username': 'voteUser1',
    'vote_result': 1}]
    """
    try:
        uid = request.json["UID"]
        userVotes = UserVote.query.filter(UserVote.userID == uid).all()
        questions = Question.query.all()
        options = Option.query.all()
        userAttitudes = UserAttitude.query.all()
        userVotes = list(filter(lambda x: x.userID == uid, userVotes))
        result = []
        for vote in userVotes:
            q = list(filter(lambda x: x.questionID ==
                     vote.questionID, questions))[0]
            att = -1
            attitude = list(filter(lambda x: x.userID ==
                            uid and x.questionID == q.questionID, userAttitudes))
            if len(attitude) != 0:
                att = attitude[0].attitude
            all_options = list(
                filter(lambda x: x.questionID == q.questionID, options))
            total_votes = 0
            option_list = []
            for o in all_options:
                temp = {'optionID': o.OptionID,
                        'option_name': o.name,
                        'option_image': o.image,
                        'option_vote': o.votes}
                option_list.append(temp)
                total_votes += o.votes
            vote_option = list(filter(lambda x: x.OptionID ==
                               vote.vote_result, options))[0]
            info = {'userID': uid,
                    'questionID': q.questionID,
                    'ownerID': q.ownerID,
                    'owner_image': getUserImage(q.ownerID),
                    'time': q.time,
                    'tag': q.tag,
                    'question': q.question,
                    'anonymous': q.anonymous,
                    'likes': q.likes,
                    'dislikes': q.dislikes,
                    'timeLimit': int(q.timeLimit.timestamp()),
                    'option_list': option_list,
                    'username': getUsername(q.ownerID),
                    'vote_result': vote_option.OptionID,
                    'chosenAttitude': att,
                    'voted': vote_option.OptionID,
                    'total_votes': total_votes}
            if datetime.datetime.fromtimestamp(info['timeLimit']) < datetime.datetime.now():
                info['expired'] = True
            else:
                info['expired'] = False
            result.append(info)
        result.sort(key=lambda k: k['time'], reverse=True)
        print('------------------successful ---------------------')
        pp.pprint(result)
        return jsonify(result)
    except Exception as e:
        print(e)
        return jsonify({"error": e})
    questions = Question.query.filter(
        Question.tag == request.args.get('tag')).all()


@app.route('/api/getAttitudes', methods=["POST"])
def getAttitudes():
    """ request a user's UID, return all questions and corresponding information 
    has been liked or dislike by this user and this user's username and user image
    """
    """
    This API use the POST method. Assume not vote
    The returned json object is be in the form below:
    [{   'anonymous': False,
        'attitude': 'Like',
        'dislikes': 0,
        'likes': 0,
        'option_list': [   {   'optionID': 5,
                               'option_image': 'none',
                               'option_name': 'Dune',
                               'option_vote': 0},
                           {   'optionID': 6,
                               'option_image': 'none',
                               'option_name': 'No Time To Die',
                               'option_vote': 0},
                           {   'optionID': 7,
                               'option_image': 'none',
                               'option_name': 'Eternals',
                               'option_vote': 0},
                           {   'optionID': 8,
                               'option_image': 'none',
                               'option_name': 'Shangqi',
                               'option_vote': 0}],
        'ownerID': 3,
        'question': 'What movie should I choose for date?',
        'questionID': 3,
        'tag': 'Movie',
        'time': datetime.datetime(2021, 11, 11, 0, 0),
        'timeLimit': 1636704000,
        'userID': 6,
        'username': 'voteUser2'}]"""
    try:
        uid = request.json["UID"]
        userAttitudes = UserAttitude.query.all()
        userVotes = UserVote.query.all()
        questions = Question.query.all()
        options = Option.query.all()
        userAttitudes = list(filter(lambda x: x.userID == uid, userAttitudes))
        result = []
        for att in userAttitudes:
            q = list(filter(lambda x: x.questionID ==
                     att.questionID, questions))[0]
            voted = -1
            vote = list(filter(lambda x: x.userID ==
                        uid and x.questionID == q.questionID, userVotes))
            if len(vote) != 0:
                voted = vote[0].vote_result
            all_options = list(
                filter(lambda x: x.questionID == q.questionID, options))
            total_votes = 0
            option_list = []
            for o in all_options:
                temp = {'optionID': o.OptionID,
                        'option_name': o.name,
                        'option_image': o.image,
                        'option_vote': o.votes}
                option_list.append(temp)
                total_votes += o.votes
            info = {'userID': uid,
                    'questionID': q.questionID,
                    'ownerID': q.ownerID,
                    'owner_image': getUserImage(q.ownerID),
                    'time': q.time,
                    'tag': q.tag,
                    'question': q.question,
                    'anonymous': q.anonymous,
                    'likes': q.likes,
                    'dislikes': q.dislikes,
                    'timeLimit': int(q.timeLimit.timestamp()),
                    'option_list': option_list,
                    'username': getUsername(q.ownerID),
                    'chosenAttitude': att.attitude,
                    'voted': voted,
                    'total_votes': total_votes}
            if datetime.datetime.fromtimestamp(info['timeLimit']) < datetime.datetime.now():
                info['expired'] = True
            else:
                info['expired'] = False
            result.append(info)
        result.sort(key=lambda k: k['time'], reverse=True)
        print('------------------successful get attitude---------------------')
        pp.pprint(result)
        return jsonify(result)
    except Exception as e:
        print(e)
        return jsonify({"error": e})

@app.route('/api/listHotTopics', methods=["GET"])
def listHotTopics():
    """ Return the hottest topic (with most likes + dislikes) of each tag. 
    The request should provide a 'UID' parameter.
    This API use the GET method.
    """
    """
    The returned json object is be in the form below:
    [
        {
            "questionID"    : 123456,
            "ownerID"       : 123456,
            "ownername"     : "xxx",
            "owner_image"   : "xxx",
            "time"          : <timestamp>,
            "tag"           : "Food",
            "question"      : "What ... ?",
            "anonymous"     : False,
            "likes"         : 2,
            "dislikes"      : 2,
            "timeLimit"     : <timestamp>,
            "chosenAttitude": -1,    (-1 for not chosen, 0 for liked, 1 for disliked)
            "voted"         : 1,     (-1 for not voted, otherwise return the voted optionID)
            "total_votes"   : 100,
            "expired"       : False,
            "option_list"       :
            [
                {
                    "optionID"       : 123456,
                    "option_name"    : "option content",
                    "option_image"   : "ImageFiliePath",
                    "option_vote"    : 123
                },
                ...
            ]
        },
        ...
    ]
    """
    try:
        UID = request.args.get('UID')
        tags = ["Style", "Sports", "Music", "Movie", "Food", "Travel"]
        ret_list = []
        for tag_ in tags:
            q = Question.query\
                .filter_by(tag=tag_)\
                .filter(Question.timeLimit > datetime.datetime.now())\
                .order_by((Question.likes+Question.dislikes).desc())\
                .first()
            if not q:
                continue
            id = q.questionID
            owner = User.query.get(q.ownerID)
            expired = False
            if q.timeLimit.timestamp() < datetime.datetime.now().timestamp():
                expired = True
            options = Option.query.filter_by(questionID=id).all()
            total_votes = 0
            option_list = []
            for op in options:
                op_dict = {}
                op_dict["optionID"] = op.OptionID
                op_dict["option_name"] = op.name
                op_dict["option_image"] = op.image
                op_dict["option_vote"] = op.votes
                total_votes += op.votes
                option_list.append(op_dict)

            q_dict = {
                "questionID": id,
                "ownerID": q.ownerID,
                "ownerName": owner.username,
                "owner_image": owner.image_file,
                "time": int(q.time.timestamp()),
                "tag": q.tag,
                "question": q.question,
                "anonymous": q.anonymous,
                "likes": q.likes,
                "dislikes": q.dislikes,
                "timeLimit": int(q.timeLimit.timestamp()),
                "option_list": option_list,
                "total_votes": total_votes,
                "expired": expired
            }
            print(UID, id)
            attitude_ = UserAttitude.query.filter_by(
                userID=UID, questionID=id).first()
            if not attitude_:
                q_dict["chosenAttitude"] = -1
            else:
                q_dict["chosenAttitude"] = attitude_.attitude
            vote_ = UserVote.query.filter_by(userID=UID, questionID=id).first()
            if not vote_:
                q_dict["voted"] = -1
            else:
                q_dict["voted"] = vote_.vote_result
            ret_list.append(q_dict)
        print(ret_list)
        return jsonify(ret_list)

    except Exception as e:
        print(e)
        return jsonify({"error": e})


if __name__ == '__main__':
    app.run(debug=True)
