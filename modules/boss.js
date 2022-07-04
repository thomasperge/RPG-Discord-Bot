const mongoose = require('mongoose')

const bossSchema = mongoose.Schema({
    bossname: String,
    stats: {
        attack: Number,
        defense: Number,
        health: Number,
    },
})

module.exports = mongoose.model('Boss', bossSchema)
