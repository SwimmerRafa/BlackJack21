const Jugador = require("../models/jugador_model")
const Baraja = require("../models/baraja_model")

exports.getCartas = async (req, res) =>{
    console.log("Getting request to get cards ");
    
    if(!req.body){
        console.log("Empty body we cannot get cards");
        return res.status(400).json({error: "There was an empty body cannot process request"});
    }
    
    const { idJugador, idJuego } = req.body;
    console.log(idJugador);
    
    if(!idJugador || !idJuego){
        console.log({idJugador, idJuego},"One of the parameters is empty cannot accept the request");
        return res.status(400).json({error: "There was an error with the body that was sent. Missing one paramet"});
    }
    
    let barajaJuego;
    try {
        barajaJuego = await Baraja.findOne({idJuego});
    }catch (e){
        console.log({e}, "There was an error when finding the deck for the game: " + idJuego);
        return res.status(404).json({error: "There was an error finding a deck for the supplied id game"});
    }
    
    let jugador;
    try {
        jugador = await Jugador.findById({_id: idJugador});
    }catch (e){
        console.log({e}, "There was an error finding the player with id: " + idJugador);
        return res.status(404).json({error: "There was an error finding the player with the supplied id"});
    }
    
    const { cartas } = barajaJuego;

    shuffleArray(cartas);
    
    const playerCards = [cartas.pop(), cartas.pop()];
    
    console.log("There are this remaining carts on the deck: " + cartas.length);    
    
    jugador.mano = playerCards;
    
    barajaJuego.cartas = cartas;
    
    try {
        await Baraja.findOneAndUpdate({idJuego}, barajaJuego);
    }catch (e){
        console.log({e}, "There was an error when trying to save the deck for the game:" + idJuego );
        return res.status(500).json({error: "There was an error when trying to save the deck for the game"});
    }
    
    try {
        await Baraja.findOneAndUpdate({idJugador}, jugador);
    }catch(e){
        console.log({e}, "There was an error when trying to save the hand for the player:" + idJugador );
        return res.status(500).json({error: "There was an error when trying to save the hand for the player"});
    }
    
    console.log("Sending the cards to the client")
    return res.json({
        jugador
    })
       
    
}


exports.getPedirCarta = async (req, res) =>{
    console.log("Getting request to get card ");
    
    if(!req.body){
        console.log("Empty body we cannot get cards");
        return res.status(400).json({error: "There was an empty body cannot process request"});
    }
    
    const { idJugador, idJuego } = req.body;
    console.log(idJugador);
    
    if(!idJugador || !idJuego){
        console.log({idJugador, idJuego},"One of the parameters is empty cannot accept the request");
        return res.status(400).json({error: "There was an error with the body that was sent. Missing one paramet"});
    }
    
    let barajaJuego;
    try {
        barajaJuego = await Baraja.findOne({idJuego});
    }catch (e){
        console.log({e}, "There was an error when finding the deck for the game: " + idJuego);
        return res.status(404).json({error: "There was an error finding a deck for the supplied id game"});
    }
    
    let jugador;
    try {
        jugador = await Jugador.findById({_id: idJugador});
    }catch (e){
        console.log({e}, "There was an error finding the player with id: " + idJugador);
        return res.status(404).json({error: "There was an error finding the player with the supplied id"});
    }
    
    const { cartas } = barajaJuego;

    shuffleArray(cartas);
    
    const playerCards = [cartas.pop()];
    
    console.log("There are this remaining carts on the deck: " + cartas.length);    
    
    jugador.mano = playerCards;
    
    barajaJuego.cartas = cartas;
    
    try {
        await Baraja.findOneAndUpdate({idJuego}, barajaJuego);
    }catch (e){
        console.log({e}, "There was an error when trying to save the deck for the game:" + idJuego );
        return res.status(500).json({error: "There was an error when trying to save the deck for the game"});
    }
    
    try {
        await Baraja.findOneAndUpdate({idJugador}, jugador);
    }catch(e){
        console.log({e}, "There was an error when trying to save the hand for the player:" + idJugador );
        return res.status(500).json({error: "There was an error when trying to save the hand for the player"});
    }
    
    console.log("Sending the card to the client")
    return res.json({
        jugador
    })
}

function shuffleArray(arrayCards){
    
    if(!arrayCards || arrayCards.length === 0){
        return;
    }
    
    for(let i = arrayCards.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = arrayCards[i]
      arrayCards[i] = arrayCards[j]
      arrayCards[j] = temp
    }
    return;
}

function getRandomArbitrary(inta,intb){
    
}