import React, {useEffect} from 'react';
import { useHistory, Link } from "react-router-dom";
import 'w3-css/w3.css';
import Card from "./Card.js"
import Logo from "./img/logo.png"
import axios from 'axios';

class Game extends React.Component{
  constructor() {
    super();
    this.state = {
      idJugador: "",
      idJuego: "",
      id: "",
      carta: "",
      valor: "",
      mazo: ""
    }
  }
  
  componentDidMount=()=>{
    const {idJugador, idJuego} = this.state
    axios({
      method: 'post',
      url: 'http://13.59.95.229:8081/jugador/cartas',
      data: {'idJugador' : idJugador, "idJuego": idJuego},
      headers: {'Content-Type': 'application/json' }})
      .then(
        res => {
          console.log(res.data)
        }
        )
        .catch(e=>{
          console.log(e)
        })

  }
  
  pedirCarta=()=>{
    const {idJugador, idJuego} = this.state
    axios({
      method: 'post',
      url: 'http://13.59.95.229:8081/jugador/pedir-carta',
      data: {'idJugador' : idJugador, "idJuego": idJuego},
      headers: {'Content-Type': 'application/json' }})
      .then(
        res => {
          console.log(res.data)
        }
        )
        .catch(e=>{
          console.log(e)
        })
  }
  
  render(){
    return(
    <div id="game" className="w3-mobile">
      
      <div className="w3-container w3-blue-gray">
        <h1 className="w3-center">
          <h3>
            <Link to ="/" className="w3-left w3-bar-item w3-btn w3-blue-grayy">
              <i class="fas fa-home"></i>
            </Link>
          </h3>
          <strong>21 Game</strong>
          <h3 className="w3-right w3-margin-right"> Game Pin: </h3>
        </h1>
        <h5>Players in the room: </h5>
      </div>
      
      <div id="game-screen">
        <div id="dealer-section">
          <div  className="w3-container w3-mobile">
            <h1><strong>Dealer</strong></h1>
            <h3><strong>Score: </strong></h3>
          </div>
        </div>
        
        <div id="player-section">
          <div id="PS" className="w3-mobile w3-container">
            <h1><strong>Player Name</strong></h1>
            <h3><strong>Score: </strong></h3>
          </div>
          
          <div id="button-id">
            <div class="w3-bar">
              <button id="hit" class="w3-mobile 3-margin w3-btn w3-round-large">Hit</button>
              <button id="stand" class="w3-mobile w3-margin w3-btn w3-round-large">Stand</button>
            </div>
          </div>
    
        </div>
      </div>
    </div>
  )
  }
  
}

export default Game