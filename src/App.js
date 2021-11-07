import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Link, Route, Switch, BrowserRouter} from 'react-router-dom'
import login from './pages/login/login'
import homepage from "./pages/homepage/homepage";
import question from "./pages/question/question";
import vote from "./pages/vote/vote";

function App() {
  return (
    <BrowserRouter>
        <Route exact path='/' component={homepage} />
          {/* <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/question'>Post a Question</Link></li>
            <li><Link to='/vote'>Vote</Link></li>
            <li><Link to='/login'>Log in</Link></li>
          </ul> */}
          <Switch>
            <Route path='/homepage' component={homepage} />
            <Route path='/login' component={login} />
            <Route path='/question' component={question}/>
            <Route path='/vote' component={vote}/>
          </Switch>
    </BrowserRouter>
  );
}

export default App;
