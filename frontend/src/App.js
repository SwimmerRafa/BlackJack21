import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Main from './components/Main'
import CreateGame from './components/CreateGame'
import JoinGame from './components/JoinGame'
import Game from './components/Game'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            casa: {
                "_id": "",
                "idJuego": -1,
                "nombre": "",
                "activo": false,
                "isPlayer": false,
                "score": 0,
                "mano": []
            },
            jugador: {
                "_id": "",
                "idJuego": -1,
                "nombre": "",
                "activo": false,
                "isPlayer": false,
                "score": 0,
                "mano": []
            }
        }
    }

    setGameProps = (game) => {
        this.setState({
            casa: game.casa,
            jugador: game.jugador
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/create-game" render={(routerProps) => <CreateGame setGameProps={this.setGameProps} {...routerProps}/>}/>
                    <Route exact path="/join-game" component={JoinGame}/>
                    <Route exact path="/game" render={(routerProps) => <Game setGameProps={this.setGameProps} {...routerProps}/>}/>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default App
