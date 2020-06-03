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

exports.postCrearJuego = async(req, res) =>{
    let idGame = 0;
    
    Baraja.find()
    .then(barajas => {
        idGame = barajas.estimatedDocumentCount() + 1;
    })
    
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
    
    jugadorCasa.save()
    .then(response => {
        console.log("Casa Creada");
    })
    .catch(error => console.log(error));
    
    const nuevaBaraja = new Baraja({
        idJuego : idGame,
        cartas : createBaraja()
    })
    
    nuevaBaraja.save()
    .then(response => {
        console.log("Nueva Baraja Creada");
    })
    .catch(error => console.log(error));
    
    const nombreJugador = req.body.nomnbre;
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
    
    nuevoJugador.save()
    .then(response => {
        console.log("Jugador Creada");
    })
    .catch(error => console.log(error));
    
    Jugador.findById(nuevoIDJugador)
    .then(jugador => {
             Jugador.findById(idCasa)
            .then(casa => {
                res.render("", {
                    jugador : jugador,
                    casa: casa
                })
            })
            .catch(error =>  console.log(error));
    })
    .catch(error =>  console.log(error));
}

exports.postUnirJuego = (req, res) =>{
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
    
    nuevoJugador.save()
    .then(response => {
        console.log("Jugador Creada");
        Jugador.findById(nuevoIDJugador)
        .then(jugador => {
            res.render("", {
                jugador : jugador
            })
        })
        .catch(error =>  console.log(error));
    })
    .catch(error => console.log(error));
}

exports.postTerminarJuego = (req, res) => {
    
}