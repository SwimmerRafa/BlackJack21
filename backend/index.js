const path = require('path');
const express = require("express")
const bodyParser = require("body-parser")
const mongoose=require('mongoose');
const Carta = require("./models/carta.js")
const carta = Carta.carta
const app = express()

const gameRoutes = require("./routes/game_routes");
const jugadorRoutes = require("./routes/jugador_routes");

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET", "POST")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    next()
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/juego", gameRoutes)
app.use("/jugador", jugadorRoutes)

mongoose.connect('mongodb://localhost/21blackjack',{useNewUrlParser: true,useUnifiedTopology: true})
.then(result=>{
    app.listen(8081,()=>{console.log('Servidor en línea')});
})
.catch(err=>console.log(err));