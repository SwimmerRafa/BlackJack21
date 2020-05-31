import React from 'react';
import './App.css';
import Main from './components/Main'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/create-game" component={Main} />
        <Route path="/join-game" component={Main} />
        <Route path="/game" component={Main} />
      </Switch>
    </BrowserRouter>
      )
}

export default App;
