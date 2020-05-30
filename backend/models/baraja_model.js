const mongoose=require('mongoose')

const barajaSchema = mongoose.Schema({
    idJuego:{
        type: Number,
        required: true
    },
    cartas:[{
        _id :mongoose.Schema.Types.ObjectId,
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

module.exports= mongoose.model('Baraja', barajaSchema);