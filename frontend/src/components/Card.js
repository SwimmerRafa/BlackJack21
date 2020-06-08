import React from 'react';
import 'w3-css/w3.css';
import axios from 'axios';
import Logo from "./img/logo.png"
import create from "./img/create.png"
import { Link } from 'react-router-dom'
import 'w3-css/w3.css';

class Card extends React.Component{
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
  
  crearCartas=()=>{
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
  
  drawCard=(event)=>{
    const {mazo} =  this.state
    switch(mazo){
      case "Corazones":
        mazo = "♥"
        break
      case "Espadas":
        mazo = "♠"
        break
      case "Treboles":
        mazo = "♣"
        break
      case "Diamantes":
        mazo = "♦"
        break
    }
  }
  
  
  render(){
    const {mazo, carta} = this.state
    return(
      <div class="w3-card-4 width:50%;">
        <header class="w3-container w3-blue w3-left">
          <h1>{mazo}</h1>
        </header>

        <div class="w3-container w3-center">
          <h1>{carta}</h1>
        </div>

        <div class="w3-container w3-blue w3-right">
           <h1>{mazo}</h1>
        </div>
      </div>
    )
  }
}

export default Card