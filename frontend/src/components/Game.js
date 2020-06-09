import React from 'react';
import {Link} from "react-router-dom";
import 'w3-css/w3.css';
import axios from 'axios';
import Card from "./Card"

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jugador: {},
            casa: {},
            initGame: true
        }
    }

    repartirCartasJugador = (idJugador, idJuego) => {
        axios({
            method: 'post',
            url: `http://${process.env.REACT_APP_SERVER}/jugador/cartas`,
            data: {
                "idJugador": idJugador,
                "idJuego": idJuego
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res.data)
            this.setState({jugador: res.data.jugador})
        }).catch((err) => {
            console.log(err)
        })
    }

    repartirCartasCasa = (idJugador, idJuego) => {
        axios({
            method: 'post',
            url: `http://${process.env.REACT_APP_SERVER}/jugador/cartas`,
            data: {
                "idJugador": idJugador,
                "idJuego": idJuego
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res.data)
            this.setState({casa: res.data.jugador})
        }).catch((err) => {
            console.log(err)
        })
    }

    pedirCarta = () => {
        const {jugador} = this.state

        axios({
            method: 'post',
            url: `http://${process.env.REACT_APP_SERVER}/jugador/pedir-carta`,
            data: {
                "idJugador": jugador._id,
                "idJuego": jugador.idJuego
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res.data.jugador.mano)
            console.log(jugador)

            let tempJugador = jugador
            tempJugador.mano.push(res.data.jugador.mano[0])

            console.log(tempJugador)

            this.setState({jugador: tempJugador})
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        const {game} = this.props
        const {jugador, casa, initGame} = this.state

        if (game.casa && game.jugador && initGame) {
            this.setState({
                jugador: game.jugador,
                casa: game.casa,
                initGame: false
            }, () => {
                this.repartirCartasCasa(game.casa._id, game.casa.idJuego)
                this.repartirCartasJugador(game.jugador._id, game.jugador.idJuego)
            })
        }

        return (
            <div id="game" className="w3-mobile">

                <div className="w3-container w3-blue-gray">
                    <h1 className="w3-center">
                        <h3>
                            <Link to="/" className="w3-left w3-bar-item w3-btn w3-blue-grayy">
                                <i className="fas fa-home"/>
                            </Link>
                        </h3>
                        <strong>21 Game</strong>
                        <h3 className="w3-right w3-margin-right">Game Pin: {casa.idJuego}</h3>
                    </h1>
                    <h5>Players in the room: 1</h5>
                </div>

                <div id="game-screen">
                    <div id="dealer-section">
                        <div className="w3-container w3-mobile">
                            <h1><strong>Dealer</strong></h1>
                            <h3><strong>Score: {casa.score}</strong></h3>
                            <div className="is-row">
                                {casa.mano && (
                                    <>
                                        {casa.mano.map((carta) => (
                                            <Card mazo={carta.mazo} carta={carta.carta}/>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div id="player-section">
                        <div id="PS" className="w3-mobile w3-container">
                            <h1><strong>{jugador.name}</strong></h1>
                            <h3><strong>Score: {jugador.score}</strong></h3>
                            <div className="is-row">
                                {jugador.mano && (
                                    <>
                                        {jugador.mano.map((carta) => (
                                            <Card mazo={carta.mazo} carta={carta.carta}/>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        <div id="button-id">
                            <div className="w3-bar">
                                <button id="hit" className="w3-mobile 3-margin w3-btn w3-round-large" onClick={this.pedirCarta}>Hit</button>
                                <button id="stand" className="w3-mobile w3-margin w3-btn w3-round-large">Stand</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default Game