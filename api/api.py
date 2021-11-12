import time
import re
import enum
from os import name
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, create_refresh_token

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '0bbabb38f22b256ab947284622266494'
db = SQLAlchemy(app)


class User(db.Model):
    UID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False,
                           default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    questions = db.relationship('Question', backref='author', lazy=True)

    def __init__(self, username, email, password, image_file=None):
        self.username = username
        self.email = email
        self.password = password

        if image_file != None:
            self.image_file = image_file

    def __repr__(self):
        return f"User('{self.UID}', '{self.username}', '{self.email}', '{self.image_file}')"


class Question(db.Model):
    QuestionID = db.Column(db.Integer, primary_key=True)
    ownerID = db.Column(db.Integer, db.ForeignKey('user.UID'), nullable=False)
    time = db.Column(db.DateTime)
    tag = db.Column(db.String(20))
    question = db.Column(db.String(200))
    anonymous = db.Column(db.Boolean)
    options = db.Column(db.Text)
    likes = db.Column(db.Integer)
    dislikes = db.Column(db.Integer)
    feedback = db.Column(db.Integer)
    isAutoSelect = db.Column(db.Boolean)
    timeLimit = db.Column(db.Integer)

    def __init__(self, ownerID, time, tag, question, anonymous, options, isAutoSelect, timeLimit):
        self.ownerID = ownerID
        self.time = time
        self.tag = tag
        self.question = question
        self.anonymous = anonymous
        self.options = options
        self.likes = 0
        self.dislikes = 0
        self.feedbackID = -1
        self.isAutoSelect = isAutoSelect
        self.timeLimit = timeLimit

    def __repr__(self):
        return f"Question('{self.QuestionID}', '{self.ownerID}', '{self.time}')"


class Option(db.Model):
    OptionID = db.Column(db.Integer, primary_key=True)
    questionID = db.Column(db.Integer, db.ForeignKey(
        'question.QuestionID'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(50))
    votes = db.Column(db.Integer, nullable=False)

    def __init__(self, questionID, name, image=None):
        self.questionID = questionID
        self.name = name
        if image != None:
            self.image = None
        else:
            self.image = 'none'
        self.votes = 0

    def __repr__(self):
        return f"Option('{self.OptionID}', '{self.questionID}', '{self.votes}')"


class Feedback(db.Model):
    FeedbackID = db.Column(db.Integer, primary_key=True)
    questionID = db.Column(db.Integer, db.ForeignKey(
        'question.QuestionID'), nullable=False)
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
    userID = db.Column(db.Integer, db.ForeignKey('user.UID question.QuestionID'), nullable=False)
    questionID = db.Column(db.Integer, db.ForeignKey('question.QuestionID'), nullable=False)
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
    userID = db.Column(db.Integer, db.ForeignKey('user.UID question.QuestionID'), nullable=False)
    questionID = db.Column(db.Integer, db.ForeignKey('question.QuestionID'), nullable=False)
    # attitude is an interger, 0 represents like, 1 represents dislike
    attitude = db.Column(db.Integer, nullable=False)

    def __init__(self, userID, questionID, attitude):
        self.userID = userID
        self.questionID = questionID
        self.attitude = attitude
    
    def __repr__(self):
        return f"UserVote('{self.UserAttitudeID}', '{self.userID}', '{self.questionID}', '{self.attitude}')"

@app.route('/api/recordPostedQuestion', methods=["POST"])
def recordPostedQuestion(question):
    """ Record the posted question into our database. """
    method = request.method
    if method.lower() == 'post':
        ownerID = request['ownerID']
        time = request['time']
        tag = request['tag']
        question = request['question']
        anonymous = request['anonymous']
        isAutoSelect = request['isAutoSelect']
        timeLimit = request['timeLimit']
    # TODO: options?


@app.route('/api/recordVote')
def recordVote(user, option):
    """ Record the "vote" action of a user. """
    pass


@app.route('/api/recordLike')
def recordLike(user, question):
    """ Record the "like" action of a user. """
    pass


@app.route('/api/recordDislike')
def recordDislike(user, question):
    """ Record the "dislike" action of a user. """
    pass


@app.route('/api/recordFeedback')
def recordFeedback(user, feedback):
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


@app.route('/api/listHotTopics')
def listHotTopics():
    """ Return the hottest topic of each tag. """
    pass


@app.route('/api/listTopics')
def listTopics(tag):
    """ Return all topics of a specific tag. """
    pass


@app.route('/time')
def get_current_time():
    return {'time': time.time()}
