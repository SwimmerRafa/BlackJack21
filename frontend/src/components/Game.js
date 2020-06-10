import React from 'react';
import {Link} from "react-router-dom";
import 'w3-css/w3.css';
import axios from 'axios';
import Card from "./Card"
import { hostnames } from '../config/hosts'

class Game extends React.Component {

    state = {
        casa: this.props.game.casa ? this.props.game.casa : {},
        jugador: {},
        jugadores: [],
        interValPlayers: undefined,
        isGameDone: false,
        resultMessage: ''
    }
    

    componentDidMount(){
        const { game } = this.props;
        if(!this.props.game.casa){
           this.props.history.push("/create-game");
           return;
        }
    
        
        if(game && game.jugador){
            this.repartirCartasJugador(game.jugador._id, game.jugador.idJuego)
            this.setState({
                interValPlayers: setInterval(this.conseguirInformacionDeJugadores, 10000)
            })
        }
    }
    
    
    getGameResults = () => {
        const { jugador } = this.state;
        axios({
            method: 'post',
            url: `http://${hostnames.awsip}/juego/terminar-juego`,
            data: {
                "idJuego": jugador.idJuego
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            const { casa } = res.data;
            const { jugador } = this.state;
            const casaScore = casa.score;
            console.log(casaScore);
            const jugadorScore = jugador.score;
            console.log(jugadorScore)
            let resultMessage = 'GAME OVER!!!';
            
            if (jugadorScore === 21){
                resultMessage = "YOU WIN!"
            }
            if(jugadorScore < 21 && jugadorScore > casaScore){
                resultMessage = "YOU WIN!"
            }
            
            if(jugadorScore > 21){
                resultMessage = "YOU LOST!"
            }
            
            if(jugadorScore < 21 && casaScore > jugador ){
                resultMessage = "YOU LOST!"
            }

            this.setState({casa: casa, resultMessage})
        }).catch((err) => {
            console.log(err)
        })
        
    }

    repartirCartasJugador = (idJugador, idJuego) => {
        axios({
            method: 'post',
            url: `http://${hostnames.awsip}/jugador/cartas`,
            data: {
                "idJugador": idJugador,
                "idJuego": idJuego
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            this.setState({jugador: res.data.jugador})
        }).catch((err) => {
            console.log(err)
        })
        // Refactor this
        axios({
            method: 'get',
            url: `http://${hostnames.awsip}/juego/jugadores/${idJuego}`,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            const { publicInformationOfPlayers } = res.data;
            this.setState({jugadores: publicInformationOfPlayers})
        }).catch((err) => {
            console.log(err)
        })
    }
    
    conseguirInformacionDeJugadores = () => {
        const {jugador} = this.state;
        axios({
            method: 'get',
            url: `http://${hostnames.awsip}/juego/jugadores/${jugador.idJuego}`,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            const { publicInformationOfPlayers } = res.data;
            this.setState({jugadores: publicInformationOfPlayers})
            const isGameDone = publicInformationOfPlayers.every(element => !element.activo) 
            if(isGameDone){
                clearInterval(this.state.interValPlayers);
                this.setState({
                    isGameDone: true
                })
                this.getGameResults();
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    pedirCarta = () => {
        const {jugador} = this.state
        if(!jugador.activo){
            return;
        }
        axios({
            method: 'post',
            url: `http://${hostnames.awsip}/jugador/pedir-carta`,
            data: {
                "idJugador": jugador._id,
                "idJuego": jugador.idJuego
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            const { jugador } = res.data;
            this.setState({jugador: jugador})
        }).catch((err) => {
            console.log(err)
        })
    }
    
    acabarTurno = () => {

        const { jugador } = this.state;
        if(!jugador.activo){
            return;
        }
        axios({
            method: 'post',
            url: `http://${hostnames.awsip}/jugador/terminar-turno`,
            data: {
                "idJugador": jugador._id,
                "idJuego": jugador.idJuego
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
           console.log(res.data);
           this.setState({jugador: res.data.jugador})
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        const {game} = this.props
        const {jugador, casa, jugadores, resultMessage, isGameDone} = this.state
        const shouldRenderResultMessage = isGameDone
        return (
            <div id="game" className="w3-mobile">

                <div className="w3-container w3-blue-gray">
                    <div className="w3-left w3-margin-left">
                        <Link to="/" className="w3-left w3-bar-item w3-btn w3-blue-grayy">
                            <i className="fas fa-home"/>
                        </Link>
                    </div>
                    
                    <div  className="w3-center">
                        <h1>21 Game</h1>
                    </div>
                </div>
                
                <div className="w3-container w3-sand">
                    <div className="w3-left w3-margin-left w3-sand">
                        <h3><strong>Game Pin: {casa.idJuego} </strong></h3>
                        <h3><strong>Number of players in the room: {`${jugadores.length}`}</strong></h3>
                        <h4> <strong>Players Tags: </strong></h4>
                        {jugadores.map((element, index) => {
                            const { activo, nombre } = element
                            return <span className={element.activo ? "w3-green" : "w3-red"}>{index + 1}: {nombre}</span>
                        })}
                    </div>
                    
                    <div className="w3-center w3-margin-right">
                        {isGameDone && <h1 className="w3-animate-zoom w3-display-bottommiddle w3-deep-orange w3-text-black"> <strong>{resultMessage}</strong></h1>}
                    </div>
                </div>

                <div id="game-screen">
                    <div style={{backgroundColor: "#0f6b5a"}}>
                        <div className="w3-container w3-mobile">
                            <h2 className="w3-text-white"><strong>Dealer</strong></h2>
                            <h3 className="w3-text-white"><strong>Score: {casa.score}</strong></h3>
                            <div className="w3-container is-row">
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

                    <div style={{backgroundColor: "#0e6253"}}>
                        <div id="PS" className="w3-mobile w3-container">
                            <h2 className="w3-text-white"><strong>{jugador.nombre}</strong></h2>
                            <h3 className="w3-text-white"><strong>Score: {jugador.score}</strong></h3>
                            
                            <div className="w3-container is-row">
                                {jugador.mano && (
                                    <>
                                        {jugador.mano.map((carta) => (
                                            <Card mazo={carta.mazo} carta={carta.carta}/>
                                        ))}
                                    </>
                                )}
                            </div>
                            
                            <div className="w3-container w3-center">
                                <div className="w3-bar">
                                    <button id="hit" className="w3-mobile 3-margin w3-btn w3-round-large" onClick={this.pedirCarta} disabled={!jugador.activo}>Hit</button>
                                    <button id="stand" className="w3-mobile w3-margin w3-btn w3-round-large" onClick={this.acabarTurno} disabled={!jugador.activo}>Stand</button>
                                 </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }

}

export default Game