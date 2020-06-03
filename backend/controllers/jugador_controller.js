const Jugador = require("../models/jugador_model")
const Baraja = require("../models/baraja_model")
const mongoose = require("moongoose")

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

exports.getCartas = (req, res) =>{
    
    
}

exports.getPedirCarta = (req, res) =>{
   const jugador = req.bodsy.jugador;
    const idJuego = jugador.idJuego;
    
    let barajaAModificar;
    
    Baraja.find({idJuego : idJuego})
    .then(docBaraja => {
        barajaAModificar = docBaraja.cartas
    })
    
    let position = getRandomArbitrary(0, barajaAModificar.length);
    jugador.cartas.push(barajaAModificar.cartas[position])
    barajaAModificar.cartas.splice(position,1)
    
    Baraja.findOneAndUpdate({idJuego : idJuego}, barajaAModificar)
    .then()
    .catch()
}