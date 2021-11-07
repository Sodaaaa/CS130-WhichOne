import time
import enum
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Questions(db.Model):
    questionID = db.Column(db.Integer, primary_key=True)
    ownerID = db.Column(db.Integer)
    time = db.Column(db.DateTime)
    tag = db.Column(db.Enum)
    question = db.Column(db.String(200))
    anonymous = db.Column(db.Boolean)
    options = db.Column(db.Text)
    likes = db.Column(db.Integer)
    dislikes = db.Column(db.Integer)
    feedback = db.Column(db.Integer)
    isAutoSelect = db.Column(db.Boolean)
    timeLimit = db.Column(db.Integer)
