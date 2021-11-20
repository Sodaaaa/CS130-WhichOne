import time
from os import name
import enum
from flask import Flask, json, request, jsonify, url_for, flash, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from forms import RegistrationForm, LoginForm
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '0bbabb38f22b256ab947284622266494'
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = "user"
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
    __tablename__ = "question"
    QuestionID = db.Column(db.Integer, primary_key=True)
    ownerID = db.Column(db.Integer, db.ForeignKey('user.UID'), nullable=False)
    time = db.Column(db.DateTime)
    tag = db.Column(db.String(20))
    question = db.Column(db.String(200))
    anonymous = db.Column(db.Boolean)
    likes = db.Column(db.Integer)
    dislikes = db.Column(db.Integer)
    feedback = db.Column(db.Integer)
    timeLimit = db.Column(db.Integer)

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
        return f"Question('{self.QuestionID}', '{self.ownerID}', '{self.time}')"


class Option(db.Model):
    __tablename__ = "option"
    OptionID = db.Column(db.Integer, primary_key=True)
    questionID = db.Column(db.Integer, db.ForeignKey(
        'question.QuestionID'), nullable=False)
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
    userID = db.Column(db.Integer, db.ForeignKey(
        'user.UID'), nullable=False)
    questionID = db.Column(db.Integer, db.ForeignKey(
        'question.QuestionID'), nullable=False)
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
        'question.QuestionID'), nullable=False)
    # attitude is an interger, 0 represents like, 1 represents dislike
    attitude = db.Column(db.Integer, nullable=False)

    def __init__(self, userID, questionID, attitude):
        self.userID = userID
        self.questionID = questionID
        self.attitude = attitude

    def __repr__(self):
        return f"UserVote('{self.UserAttitudeID}', '{self.userID}', '{self.questionID}', '{self.attitude}')"



@app.route("/api/register", methods=['GET', 'POST'])
def register():
    """ add new user to the database """
    form = RegistrationForm()
    if form.validate_on_submit():
        flash(f'Account created for {form.username.data}!', 'success')
        return redirect(url_for('home'))
    return render_template('register.html', title='Register', form=form)


@app.route("/api/login", methods=['GET', 'POST'])
def login():
    """ verify existed user, if success return True, otherwise return False"""
    pass


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

    If no image, the "optionImage" field should be an empty string
    """
    method = request.method
    if method.lower() == 'post':
        ownerID = request.json['ownerID']
        time = datetime.datetime.fromtimestamp(request.json['time'])
        tag = request.json['tag']
        question = request.json['question']
        anonymous = request.json['anonymous']
        timeLimit = request.json['timeLimit']

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


@app.route('/api/listTopics')
def listTopics(tag):
    """ Return all topics of a specific tag. """
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
    {
        "Food" :
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
                {
                    ...
                },
                ...
            ]
        },
        "Travel" :
        {
            ...
        },
        ...
    }
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
    id = q.QuestionID
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
        "questionID"    : id,
        "ownerID"       : q.ownerID,
        "time"          : q.time,
        "tag"           : q.tag,
        "question"      : q.question,
        "anonymous"     : q.anonymous,
        "likes"         : q.likes,
        "dislikes"      : q.dislikes,
        "feedback"      : q.feedback,
        "timeLimit"     : q.timeLimit,
        "options"       : option_list
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
