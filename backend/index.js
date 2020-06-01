const express = require("express")
const bodyParser = require("body-parser")
const mongoose=require('mongoose');
const Carta = require("./models/carta.js")
const carta = Carta.carta
const app = express()

mongoose.connect('mongodb://localhost/21blackjack',{useNewUrlParser: true,useUnifiedTopology: true})
.then(result=>{
    app.listen(8081,()=>{console.log('Servidor en línea')});
})
.catch(err=>console.log(err));