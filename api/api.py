import time
import re
import enum
from flask import Flask, json, request, jsonify, url_for, flash, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '0bbabb38f22b256ab947284622266494'
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = "user"
    UID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    # confirm_password = db.Column(db.String(60), nullable=False)
    image_file = db.Column(db.String(20))
    # , nullable=False, default='default.jpg')
    # questions = db.relationship('Question', backref='author', lazy=True)

    def __init__(self, username, email, password, confirm_password, image_file=None):
        self.username = username
        self.email = email
        self.password = password
        # self.confirm_password = confirm_password

        if image_file != None:
            self.image_file = image_file

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
    feedbackID = db.Column(db.Integer)
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
        self.feedbackID = -1
        self.timeLimit = timeLimit

    def __repr__(self):
        return f"Question('{self.questionID}', '{self.ownerID}', '{self.time}')"


class Option(db.Model):
    __tablename__ = "option"
    OptionID = db.Column(db.Integer, primary_key=True)
    questionID = db.Column(db.Integer, db.ForeignKey(
        'question.questionID'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(50))
    votes = db.Column(db.Integer, nullable=False)

    def __init__(self, name, image=None):
        self.name = name
        if image != None:
            self.image = None
        else:
            self.image = 'none'
        self.votes = 0

    def __repr__(self):
        return f"Option('{self.OptionID}', '{self.questionID}', '{self.votes}')"


class Feedback(db.Model):
    __tablename__ = "feedback"
    FeedbackID = db.Column(db.Integer, primary_key=True)
    questionID = db.Column(db.Integer, db.ForeignKey(
        'question.questionID'), nullable=False)
    text = db.Column(db.String(500))
    image = db.Column(db.String(50))

    def __init__(self, questionID, text, image=None):
        self.questionID = questionID
        self.text = text
        if image != None:
            self.image = None
        else:
            self.image = 'none'

    def __repr__(self):
        return f"Feedback('{self.FeedbackID}', '{self.questionID}', '{self.text}')"


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
    """ return {"success": True} if successfuly register a new user, otherwise return corresponding error"""
    try:
        email = request.json["email"]
        password = request.json["password"]
        confirm_password = request.json["confirm_password"]
        username = request.json["username"]
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
            user = User(username, email, password, confirm_password)
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
    """ return {"success": True} if successfuly login, otherwise return corresponding error"""
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
                return jsonify({"success": True})
            else:
                return jsonify({"error": "Invalid credentials"})
        else:
            return jsonify({"error": "Invalid form"})
    except Exception as error:
        print(error)
        return jsonify({"error": "Invalid form"})


@app.route('/api/recordPostedQuestion', methods=["POST"])
def recordPostedQuestion():
    """ Record the posted question into our database.
    This API use the POST method.
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
                "optionText"    : "option content",
                "optionImage"   : "ImageFiliePath"
            },
            {
                "optionText"    : "option content",
                "optionImage"   : "ImageFiliePath"
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

        for op in request.json['options']:
            option = None
            if(op['optionImage'] == ''):
                option = Option(op['optionText'])
            else:
                option = Option(op['optionText'], op['optionImage'])
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
    Return all questions. 
    The returned data should be in format below:
    [{
        "questionID"    : 123456,
        "ownerID"       : 123456,
        "time"          : 1636665474,
        "tag"           : "tagname",
        "question"      : "question content",
        "annoymous"     : TRUE,
        "timeLimit"     : 1636665474,
        "options": [
            {
                "optionText"    : "option content",
                "optionImage"   : "ImageFiliePath"
            },
            {
                "optionText"    : "option content",
                "optionImage"   : "ImageFiliePath"
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
                       'feedbackID': q.feedbackID,
                       'timeLimit': int(q.timeLimit.timestamp())} for q in questions]
    for q in question_dicts:
        options = Option.query.filter(
            Option.questionID == q['questionID']).all()
        # TODO: return image
        option_dicts = [{'optionText': o.name, 'optionImage': ''}
                        for o in options]
        q['options'] = option_dicts
    return jsonify(question_dicts)


@app.route('/api/listTopics', methods=["GET"])
def listTopics():
    """ 
    The request should provide a 'tag' parameter
    Return all topics of a specific tag. 
    The returned data should be in format below:
    [{
        "questionID"    : 123456,
        "ownerID"       : 123456,
        "time"          : 1636665474,
        "tag"           : "tagname",
        "question"      : "question content",
        "annoymous"     : TRUE,
        "timeLimit"     : 1636665474,
        "options": [
            {
                "optionText"    : "option content",
                "optionImage"   : "ImageFiliePath"
            },
            {
                "optionText"    : "option content",
                "optionImage"   : "ImageFiliePath"
            }
        ]
    }]
    """
    questions = Question.query.filter(
        Question.tag == request.args.get('tag')).all()
    question_dicts = [{'questionID': q.questionID,
                       'ownerID': q.ownerID,
                       'time': int(q.time.timestamp()),
                       'tag': q.tag,
                       'question': q.question,
                       'anonymous': q.anonymous,
                       'likes': q.likes,
                       'dislikes': q.dislikes,
                       'feedbackID': q.feedbackID,
                       'timeLimit': int(q.timeLimit.timestamp())} for q in questions]
    for q in question_dicts:
        options = Option.query.filter(
            Option.questionID == q['questionID']).all()
        # TODO: return image
        option_dicts = [{'optionText': o.name, 'optionImage': ''}
                        for o in options]
        q['options'] = option_dicts
    return jsonify(question_dicts)
    pass


@app.route('/api/recordVote', methods=["POST"])
def recordVote():
    """ Record the "vote" action of a user. 
    This API use the POST method.
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
            user_vote = UserVote(userID, questionID, vote_result)
            db.session.add(user_vote)
            option = Option.query.get(vote_result)
            option.votes += 1
            db.session.commit()
            return jsonify({"success": True})
        else:
            return jsonify({"error": "Missing userID or questionID or vote_result"})
    except Exception as e:
        return jsonify({"error": e})


@app.route('/api/recordAttitude', methods=["POST"])
def recordAttitude():
    """ Record the "like" or "dislike" action of a user. 
    This API use the POST method.
    The posted json object should be in the form below:
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
        if userID and questionID and attitude:
            user_attitude = UserAttitude(userID, questionID, attitude)
            db.session.add(user_attitude)
            question = Question.query.get(questionID)
            if attitude == 0:
                question.likes += 1
            elif attitude == 1:
                question.dislikes += 1
            else:
                return jsonify({"error": "invalid attitude"})
            db.session.commit()
            return jsonify({"success": True})
        else:
            return jsonify({"error": "Missing userID or questionID or attitude"})
    except Exception as e:
        return jsonify({"error": e})


@app.route('/api/recordFeedback')
def recordFeedback():
    """ Record the feedback of a user's question. """
    pass


@app.route('/api/getHistoricalQuestions')
def getHistoricalQuestions(user):
    """ Return all questions posted by a user. """
    pass


@app.route('/api/getVotes')
def getVotes(user):
    """ Return all vote actions of a user. """
    pass


@app.route('/api/getAttitudes')
def getAttitudes(user):
    """ Return all attitudes of a user. """
    pass


@app.route('/api/provideOptions')
def provideOptions(question):
    """ Return a list of possible options based on the question. """
    pass


@app.route('/api/listHotTopics', methods=["GET"])
def listHotTopics():
    """ Return the hottest topic of each tag. 
    This API use the GET method.
    The returned json object is be in the form below:
    [
        {
            "questionID"    : 123456,
            "ownerID"       : 123456,
            "time"          : ,
            "tag"
            "question"
            "anonymous"
            "likes"
            "dislikes"
            "feedback"
            "timeLimit"
            "options"       :
            [
                {
                    "optionID"  : 
                    "name"      :
                    "image"     :
                    "votes"     :
                },
                ...
            ]
        },
        ...
    ]
    """
    try:
        tags = ["Style", "Sports", "Music", "Movie", "Food", "Travel"]
        ret_dict = {}
        for tag_ in tags:
            q = Question.query\
                .filter_by(tag=tag_)\
                .order_by((Question.likes+Question.dislikes).desc())\
                .first()
            ret_dict[tag_] = getQuestion(q)
        return jsonify(ret_dict)
    except Exception as e:
        return jsonify({"error": e})


def getQuestion(q):
    id = q.questionID
    options = Option.query.filter_by(questionID=id).all()
    option_list = []
    for op in options:
        op_dict = {}
        op_dict["optionID"] = op.OptionID
        op_dict["name"] = op.name
        op_dict["image"] = op.image
        op_dict["votes"] = op.votes
        option_list.append(op_dict)

    q_dict = {
        "questionID": id,
        "ownerID": q.ownerID,
        "time": q.time,
        "tag": q.tag,
        "question": q.question,
        "anonymous": q.anonymous,
        "likes": q.likes,
        "dislikes": q.dislikes,
        "feedback": q.feedback,
        "timeLimit": q.timeLimit,
        "options": option_list
    }
    return jsonify(q_dict)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/')
def index():
    db.create_all()
    return "hello world"


if __name__ == '__main__':
    app.run(debug=True)
