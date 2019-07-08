import React from 'react';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import Home from './Home';
import MyIndex from './MyIndex';
import './App.css';


const App = () => (
  <Switch>

    <Route exact path="/" component={Home} />
    <Route exact path="/my" component={MyIndex} />
  </Switch>
);

export default App;
