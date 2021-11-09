from os import name
import time
import enum
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Question(db.Model):
    QuestionID = db.Column(db.Integer, primary_key=True)
    ownerID = db.Column(db.Integer, db.ForeignKey('user.UID'), nullable=False)
    time = db.Column(db.DateTime)
    tag = db.Column(db.string)
    question = db.Column(db.String(200))
    anonymous = db.Column(db.Boolean)
    options = db.Column(db.Text)
    likes = db.Column(db.Integer)
    dislikes = db.Column(db.Integer)
    feedback = db.Column(db.Integer)
    isAutoSelect = db.Column(db.Boolean)
    timeLimit = db.Column(db.Integer)

class Option(db.Model):
    OptionID = db.Column(db.Integer, primary_key=True)
    questionID = db.Column(db.Integer, db.ForeignKey('question.QuestionID'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(50))
    votes = db.Column(db.Integer, nullable=False)

class Feedback(db.Model):
    FeedbackID = db.Column(db.Integer, primary_key=True)
    questionID = db.Column(db.Integer, db.ForeignKey('question.QuestionID'), nullable=False)
    text = db.Column(db.String(500))
    image = db.Column(db.String(50))