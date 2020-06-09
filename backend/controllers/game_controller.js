const mongoose = require("mongoose");
const Baraja = require("../models/baraja_model.js");
const Jugador = require("../models/jugador_model.js");

const Carta = require("../models/carta");
const carta = Carta.carta;


function createBaraja(){
    let mazo = ["Corazones", "Treboles", "Espadas", "Diamantes"];
    let nombre = ["As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let baraja = [];
    
    for(let i = 0; i < mazo.length; i++){
        for(let j = 0; j < nombre.length; j++){
            let valor = j + 1;
            if (valor > 10){
                valor = 10;
            }
            let newCard = new carta( mongoose.Types.ObjectId(), nombre[j], valor, mazo[i] );
            baraja.push(newCard);
        }
    }
    return baraja;
}

exports.postCrearJuego = async (req, res) =>{
    
    console.log("Request to create a new Game Received!");
    const nombreJugador = req.body.nombre;
    if(!nombreJugador){
        console.log("The name parameter is empty!");
        return res.status(400).json({error: 'The name parameter is empty!'});
    }
    
    let idGame = undefined;
    try {
        idGame = await Baraja.estimatedDocumentCount() + 1;
    }catch (e){
        console.log({e},'There was an error in saving the deck');
        return res.status(500).json({error: 'There was an error in saving the deck'});
    }
    
    const idCasa = new mongoose.Types.ObjectId();
    
    const jugadorCasa = new Jugador({
        _id : idCasa ,
        idJuego : idGame,
        nombre : "Casa",
        activo : false,
        isPlayer : false,
        score : 0,
        mano : []
    });
    
    await jugadorCasa.save();
    
    const nuevaBaraja = new Baraja({
        idJuego : idGame,
        cartas : createBaraja()
    });
    
    await nuevaBaraja.save();
    
    const nuevoIDJugador = new mongoose.Types.ObjectId();
    
    const nuevoJugador = new Jugador({
        _id : nuevoIDJugador,
        idJuego : idGame,
        nombre : nombreJugador,
        activo : false,
        isPlayer : true,
        score : 0,
        mano : []
    });
    
    try{
        await nuevoJugador.save();
    } catch (e){
        console.log({e}, "There was an error saving the new Player");
        return res.status(500).json({error: "There was an error saving the new Player"});
    }
    
    let casa;
    let jugador;
    
    try {
        jugador = await Jugador.findById(nuevoIDJugador);
    }
    catch (e){
       console.log({e}, "There was an error finding the Player");
       return res.status(404).json({error: "There was an error finding the Player"}) ;
    }
    

    try {
        casa = await Jugador.findById(idCasa);
    }catch (e){
        console.log({e}, "There was an error finding the house");
        return res.status(404).json({error: "There was an error finding the house!"});
    }
    
    console.log("Sending the information when creating a new game");
    return res.json({
        jugador,
        casa
    });
};

exports.postUnirJuego = async (req, res) =>{
    console.log("Getting a request to join a new Game");
    const idJuego = req.body.idJuego;
    const nombreJugador = req.body.nombre;
    
    if(!idJuego || !nombreJugador){
        console.log("One of the parameters was empty please verify your request");
        return res.status(400).json({error:"The request is not correct check your body parameters"});
    }
    else{
        console.log("Conection Successful")
    }
    
    const nuevoIDJugador = new mongoose.Types.ObjectId();
     
    const nuevoJugador = new Jugador({
        _id : nuevoIDJugador,
        idJuego : idJuego,
        nombre : nombreJugador,
        activo : false,
        isPlayer : true,
        score : 0,
        mano : []
    });
    
    try {
        await nuevoJugador.save();
    } catch (e){
        console.log({e}, "There was an error when saving the new character");
        return res.status(500).json({error: "There was an error saving the new character"});
    }
    
    let jugador;
    let casa;
    
    try {
        jugador = await Jugador.findById(nuevoIDJugador);
    } catch (e){
        console.log({e},"There was an error when finding the Player");
        return res.status(404).json({error: "There was an error when finding the Playe"});
    }
    
    try {
        casa = await Jugador.find({idJugo : idJuego, nombre : "Casa"});
    } catch (e){
        console.log({e}, "There was an error finding the Player");
        return res.status(404).json({error: "There was an error finding the Player"});
        
    }
    
    console.log("Sending the information to add new player");
    return res.json({
        jugador,
        casa
    });
};

exports.postTerminarJuego = (req, res) => {
    
};