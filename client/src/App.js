import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar.js';
import Channel from './components/ChannelContainer.js'
import Home from './components/Home.js';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          {/* Display Channels page */}
          <Route exact path="/" component={Home}/>
          <Route path='/channels' component={Channel}/>
          {/* Display groups and message */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
