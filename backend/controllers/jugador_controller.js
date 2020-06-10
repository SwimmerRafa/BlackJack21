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
    
    let hand = [...jugador.mano, cartas.pop(), cartas.pop()]
    
    jugador.mano = hand;
    jugador.score = hand.reduce((sum, currenValue) =>{
        return sum + currenValue.valor
    },0)
    console.log("There are this remaining carts on the deck: " + cartas.length);    
    
    barajaJuego.cartas = cartas;
    
    try {
        await Baraja.findOneAndUpdate({idJuego}, barajaJuego);
    }catch (e){
        console.log({e}, "There was an error when trying to save the deck for the game:" + idJuego );
        return res.status(500).json({error: "There was an error when trying to save the deck for the game"});
    }
    
    try {
        await Jugador.findOneAndUpdate({_id: idJugador}, {mano: hand});
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
    
    let playerCards = jugador.mano.map(element =>{
        return {
            carta: element.carta,
            valor: element.valor,
            mazo: element.mazo
        }
    })
    
    playerCards.push(cartas.pop());
    
    
    console.log(playerCards);
    console.log("There are this remaining carts on the deck: " + cartas.length);    
    
    jugador.mano = playerCards;
    const sum = playerCards.reduce((sum, currenValue) =>{
        return sum + currenValue.valor
    },0);
    
    if(sum >= 21) {
        jugador.activo = false;
    }
    jugador.score = sum
    
    barajaJuego.cartas = cartas;
    
    try {
        await Baraja.findOneAndUpdate({idJuego}, barajaJuego);
    }catch (e){
        console.log({e}, "There was an error when trying to save the deck for the game:" + idJuego );
        return res.status(500).json({error: "There was an error when trying to save the deck for the game"});
    }
    
    try {
        await Jugador.findOneAndUpdate({_id: idJugador}, jugador);
    }catch(e){
        console.log({e}, "There was an error when trying to save the hand for the player:" + idJugador );
        return res.status(500).json({error: "There was an error when trying to save the hand for the player"});
    }
    await resolveGame(idJuego)
    console.log("Sending the card to the client")
    return res.json({
        jugador
    })
}

exports.postTerminarTurno = async (req, res) => {
    if(!req.body){
        console.log("Empty body we cannot get cards");
        return res.status(400).json({error: "There was an empty body cannot process request"});
    }
    
    const { idJugador, idJuego } = req.body;
    
    if(!idJugador || !idJuego){
        console.log({idJugador, idJuego},"One of the parameters is empty cannot accept the request");
        return res.status(400).json({error: "There was an error with the body that was sent. Missing one paramet"});
    }
    
    let jugador;
    try {
        jugador = await Jugador.findById({_id: idJugador});
    }catch (e){
        console.log({e}, "There was an error finding the player with id: " + idJugador);
        return res.status(404).json({error: "There was an error finding the player with the supplied id"});
    }
    
    console.log(jugador, "Information!!!!");
    const valores = jugador.mano.map((element) => {
        return element.valor;
    })
    jugador.activo = false;
    jugador.score = valores.reduce((sum, element) => {
        return sum + element;
    },0);
    try {
        await Jugador.findOneAndUpdate({_id: idJugador}, jugador);
    }catch(e){
        console.log({e}, "There was an error when trying to save the hand for the player:" + idJugador );
        return res.status(500).json({error: "There was an error when trying to save the hand for the player"});
    }
    await resolveGame(idJuego)
    
    return res.json({
        jugador
    })
}

 const resolveGame = async (idJuego) => {

    if(!idJuego){
        console.log("One of the parameters was empty please verify your request");
    }
    let players;
    try {
        players = await Jugador.find({idJuego : idJuego });
    } catch (e){
        console.log({e}, "There was an error finding the Player");

    }
    
    const playingPlayers = players.filter((element) => element.isPlayer);
    const gameIsDone = playingPlayers.every((element) =>  !element.activo)
    if(gameIsDone){
        console.log("HELLLOOOO FRIEND");
        let casaPlayer;
        let barajaJuego;
        try {
            barajaJuego = await Baraja.findOne({idJuego});
        }catch (e){
            console.log({e}, "There was an error when finding the deck for the game: " + idJuego);
        }
        
        const { cartas } = barajaJuego;
        
        casaPlayer = players.find(element => {
            return !element.isPlayer
        })
        
        let currentCardsObject = casaPlayer.mano.map((element)=>{
            return {
                carta: element.carta,
                valor: element.valor,
                mazo: element.mazo
            }
        })
        
        let currentCardsSum = currentCardsObject.reduce((sum,currentValue) => {
            return  sum + currentValue.valor
        }, 0);
        
        while(currentCardsSum < 18){
            const lastCardDeck = cartas.pop();
            currentCardsSum = currentCardsSum + lastCardDeck.valor
            currentCardsObject.push({
                carta: lastCardDeck.carta,
                valor: lastCardDeck.valor,
                mazo: lastCardDeck.mazo
            })
        }
        
        casaPlayer.mano = currentCardsObject;
        casaPlayer.score = currentCardsSum;
        console.log({casaPlayer},"CASA PLAYER!!!!")
        const manoInfo = casaPlayer.mano;
        manoInfo.forEach((element) => {
            console.log({element});
        })
        try {
            await Jugador.findOneAndUpdate({_id: casaPlayer._id}, casaPlayer);
        }catch(e){
            console.log({e}, "There was an error when trying to save the hand for the player:" + casaPlayer.idJugador );
        }
        
                
        barajaJuego.cartas = cartas;
        
        try {
            await Baraja.findOneAndUpdate({idJuego}, barajaJuego);
        }catch (e){
            console.log({e}, "There was an error when trying to save the deck for the game:" + idJuego );
        }
        
        return;
        
    }
    return;
    
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