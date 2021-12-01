# CS130 - Which One

As students, we face all kinds of decisions in our daily life. There are often times that we have many options to choose from but don’t know which one is the best. In this project, we built a website called “Which One” to help people easily make decisions whenever they need.

## Dependencies

### Front End

### Back End

We use flask in the backend to interact with the frontend. 
We use flask-sqlalchemy to connect with our local SQLite database.

To install the dependencies, run:
```
pip install flask
pip install flask-sqlalchemy
```

## Launch Website

### `yarn start`
yarn start command in the main directory start the frontend of our web application. 

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start-api`
yarn start-api command in the main directory start the backend of our web application. 

You can interact with the frontend by webpage with our local database api/data.db

## Testing

### `python test.py`
In the api directory, you could run 'python test.py' and see the 13 unittest for backend in the 
terminal.
