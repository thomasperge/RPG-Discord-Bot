const mongoose = require('mongoose')

const itemsSchema = mongoose.Schema({
    userId: String,
    pseudo: String,
    farm: {
        bush: Number,
        wheat: Number,
        corn: Number,
        potato: Number,
        carrot: Number,
        clover: Number,
    },
    mine: {
        stone: Number,
        coal: Number,
        iron: Number,
        gold: Number,
        diamond: Number,
        rainbow: Number,
    },
})

module.exports = mongoose.model('Items', itemsSchema)
