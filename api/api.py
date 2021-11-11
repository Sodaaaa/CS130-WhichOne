import time
from os import name
import enum
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '0bbabb38f22b256ab947284622266494'
db = SQLAlchemy(app)

class User(db.Model):
    UID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    questions = db.relationship('Question', backref='author', lazy=True)

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
    
    def __repr__(self):
        return f"Question('{self.QuestionID}', '{self.ownerID}', '{self.time}')"

class Option(db.Model):
    OptionID = db.Column(db.Integer, primary_key=True)
    questionID = db.Column(db.Integer, db.ForeignKey('question.QuestionID'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(50))
    votes = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Option('{self.OptionID}', '{self.questionID}', '{self.votes}')"

class Feedback(db.Model):
    FeedbackID = db.Column(db.Integer, primary_key=True)
    questionID = db.Column(db.Integer, db.ForeignKey('question.QuestionID'), nullable=False)
    text = db.Column(db.String(500))
    image = db.Column(db.String(50))

    def __repr__(self):
        return f"Feedback('{self.FeedbackID}', '{self.questionID}', '{self.text}')"

def recordPostQuestion(question):
    """ Record the posted question into our database. """
    pass

def recordVote(user, option):
    """ Record the "vote" action of a user. """
    pass

def recordLike(user, question):
    """ Record the "like" action of a user. """
    pass

def recordDislike(user, question):
    """ Record the "dislike" action of a user. """
    pass

def recordFeedback(user, feedback):
    """ Record the feedback of a user's question. """
    pass

def getQuestions(user):
    """ Return all questions posted by a user. """
    pass

def getVotes(user):
    """ Return all vote actions of a user. """
    pass

def getAttitudes(user):
    """ Return all attitudes of a user. """
    pass

def provideOptions(question):
    """ Return a list of possible options based on the question. """
    pass

def listHotTopics():
    """ Return the hottest topic of each tag. """
    pass

def listTopics(tag):
    """ Return all topics of a specific tag. """
    pass

@app.route('/time')
def get_current_time():
    return {'time': time.time()}
