const mongoose = require('mongoose')

const ecoSchema = mongoose.Schema({
    userId: String,
    pseudo: String,
    eco: {
        money: Number,
        gem: Number,
        chest: Number,
        businessvalue: Number,
        profit: Number,
    },
})

module.exports = mongoose.model('Economy', ecoSchema)
