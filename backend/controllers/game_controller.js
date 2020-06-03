const mongoose = require("mongoose")
const Baraja = require("../models/baraja_model.js")
const Jugador = require("../models/jugador_model.js")

const Carta = require("./models/carta.js")
const carta = Carta.carta


function createBaraja(){
    let mazo = ["Corazones", "Treboles", "Espadas", "Diamantes"]
    let nombre = ["As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let baraja = []
    
    for(let i = 0; i < mazo.length; i++){
        for(let j = 0; j < nombre.length; j++){
            let valor = j + 1
            if (valor > 10){
                valor = 10
            }
            let newCard = new carta( mongoose.Types.ObjectId(), nombre[j], valor, mazo[i] )
            baraja.push(newCard)
        }
    }
    return baraja
}

exports.postCrearJuego = async (req, res) =>{
    let idGame = await Baraja.estimatedDocumentCount() + 1
    
    const idCasa = new mongoose.Types.ObjectId();
    
    const jugadorCasa = new Jugador({
        _id : idCasa ,
        idJuego : idGame,
        nombre : "Casa",
        activo : true,
        isPlayer : false,
        score : 0,
        mano : []
    })
    
    await jugadorCasa.save()
    .catch(error => console.log(error));
    
    const nuevaBaraja = new Baraja({
        idJuego : idGame,
        cartas : createBaraja()
    })
    
    nuevaBaraja.save()
    .catch(error => console.log(error));
    
    const nombreJugador = req.body.nombre;
    const nuevoIDJugador = new mongoose.Types.ObjectId();
    
    const nuevoJugador = new Jugador({
        _id : nuevoIDJugador,
        idJuego : idGame,
        nombre : nombreJugador,
        activo : true,
        isPlayer : true,
        score : 0,
        mano : []
    })
    
    await nuevoJugador.save()
    
    let jugador = await Jugador.findById(nuevoIDJugador)
    
    let casa = await Jugador.findById(idCasa)
    
    res.render("", {
                    jugador : jugador,
                    casa: casa
    })
}

exports.postUnirJuego = async (req, res) =>{
    const idJuego = req.body.idJuego;
    const nombreJugador = req.body.nombre;
    const nuevoIDJugador = new mongoose.Types.ObjectId();
     
    const nuevoJugador = new Jugador({
        _id : nuevoIDJugador,
        idJuego : idJuego,
        nombre : nombreJugador,
        activo : true,
        isPlayer : true,
        score : 0,
        mano : []
    })
    
    await nuevoJugador.save()
    
    let jugador = Jugador.findById(nuevoIDJugador)
    
    let casa = await Jugador.find({idJugo : idJuego, nombre : "Casa"})
    
    res.render("", {
                jugador : jugador,
                casa : casa
    })
}

exports.postTerminarJuego = (req, res) => {
    
}