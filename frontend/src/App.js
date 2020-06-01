import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './components/Main'
import CreateGame from './components/CreateGame'
import JoinGame from './components/JoinGame'
import Game from './components/Game'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/create-game" component={CreateGame} />
        <Route path="/join-game" component={JoinGame} />
        <Route path="/game" component={Game} />
      </Switch>
    </BrowserRouter>
      )
}

export default App;
