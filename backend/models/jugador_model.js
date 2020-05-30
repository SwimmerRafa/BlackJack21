const mongoose=require('mongoose')

const jugadorShema = mongoose.Schema({
    _id :mongoose.Schema.Types.ObjectId,
    idJuego:{
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        required: true
    },
    isPlayer:{
        type: Boolean,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    mano:[{
        idCarta:{
            type: "",
            required: true
        },
        carta:{
            type: String,
            required: true
        },
        valor:{
            type: Number,
            required: true
        },
        mazo:{
            type: String,
            required: true
        }
    }]
    
}); 

module.exports= mongoose.model('Jugador', jugadorShema);