from datetime import datetime
from flask import Flask, render_template, url_for, flash, redirect
from flask_sqlalchemy import SQLAlchemy
from forms import RegistrationForm, LoginForm

app = Flask(__name__)
app.config['SECRET_KEY'] = '0bbabb38f22b256ab947284622266494'
app.config['SQLALCHEMY_DATABASE_URI']  = 'sqlite:///site.db'
db = SQLAlchemy(app)

class User(db.Model):
    UID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    posts = db.relationship('Question', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Question(db.Model):
    QuestionID = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.UID'), nullable=False)

    def __repr__(self):
        return f"Question('{self.title}', '{self.date_posted}')"

posts = [
    {
        'author': 'Xinyu',
        'title': 'Blog Post 1',
        'content': 'First post content',
        'date_posted': 'Nov 7, 2021'
    },
    {
        'author': 'Shirley',
        'title': 'Blog Post 2',
        'content': 'Second post content',
        'date_posted': 'Nov 11, 2021'
    }
]


@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html', posts=posts)

@app.route("/about")
def about():
    return render_template('about.html', title='About')

@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        # same as 'Account created for {username}!'.format(username=form.username.data)
        flash(f'Account created for {form.username.data}!', 'success')
        return redirect(url_for('home'))
    return render_template('register.html', title='Register', form=form)

@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if form.email.data == 'mimiyouxiang640@gmail.com' and form.password.data == '123456':
            flash('You have been logged in!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Login Unsucessful. Please check email address and password', 'danger')
    return render_template('login.html', title='Login', form=form)

if __name__ == '__main__':
    app.run(debug=True)