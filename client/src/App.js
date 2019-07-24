import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar.js';
import Channel from './components/ChannelContainer.js'
import Home from './components/Home.js';
import Group from './components/Group.js'

function App() {

  let HomeComponent = () => <Home />
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          {/* Display Channels page */}
          <Route exact path="/" render={HomeComponent}/>
          <Route path='/channels' component={Channel}/>
          {/* Display groups and message */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
