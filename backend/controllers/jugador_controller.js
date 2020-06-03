const Jugador = require("../models/jugador_model")
const Baraja = require("../models/baraja_model")

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

exports.getCartas = (req, res) =>{
    
}

exports.getPedirCarta = async (req, res) =>{
   const jugador = req.body.jugador;
    const idJuego = jugador.idJuego;
   
    let barajaAModificar;
   
    barajaAModificar = await Baraja.find({idJuego : idJuego})
    
    let position = getRandomArbitrary(0, barajaAModificar.length);
    jugador.cartas.push(barajaAModificar.cartas[position]);
    barajaAModificar.cartas.splice(position,1);
    
    await Baraja.findOneAndUpdate({idJuego : idJuego}, barajaAModificar);
    
    await Jugador.findOneAndUpdate({_id : jugador._id}, jugador);
}