# CS130 - Which One

As students, we face all kinds of decisions in our daily life. There are often times that we have many options to choose from but don’t know which one is the best. In this project, we built a website called “Which One” to help people easily make decisions whenever they need.

## Dependencies

### Front End
We use React to implement the frontend. 
To install the dependencies, run:
```
npm install
```

The packages we used include:
- `@lucky-canvas/react: 0.0.4`
- `@testing-library/jest-dom: 5.11.4`
- `@testing-library/react: 11.1.0`
- `@testing-library/user-event: 12.1.10`
- `antd: 4.16.13`
- `axios: 0.24.0`,
- `parcel-bundler: 1.12.5`,
- `react: 17.0.2`,
- `react-axios: 2.0.5`,
- `react-dom: 17.0.2`,
- `react-router: 6.0.1`,
- `react-router-dom: 5.3.0`,
- `react-scripts: 4.0.3`,
- `web-vitals: 1.0.1`

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
