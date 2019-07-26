import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar.js';
import Channel from './components/ChannelContainer.js';
import Home from './components/Home.js';
import Group from './components/GroupsListContainer.js';
import Account from './components/Account.js';

function App() {

  let HomeComponent = () => <Home />
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          {/* Display Channels page */}
          <Route exact path="/" render={HomeComponent}/>
          <Route path='/channels/:channelId' component={Group}/>
          <Route path='/channels' component={Channel}/>
          <Route path='/account' component={Account}/>
          {/* Display groups and message */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
