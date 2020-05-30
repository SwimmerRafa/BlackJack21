const mongoose = require("mongoose")
const baraja = require("../models/baraja_model.js")
const jugador = require("../models/jugador_model.js")

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
            let newCard = new carta("", nombre[j], valor, mazo[i] )
            baraja.push(newCard)
        }
    }
    return baraja
    // const randomValue = parseInt(Math.random() * baraja.length)
    // console.log(baraja[randomValue])
    // baraja.splice(randomValue, 1)
    // console.log(baraja)
}

const listaCartas = createBaraja()

exports.postCrearJuego = async(req, res) =>{
    try {
        const partidas = await baraja.find
    } catch (e) {}
}