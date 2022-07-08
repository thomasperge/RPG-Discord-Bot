const mongoose = require('mongoose')

const bossSchema = mongoose.Schema({
    idboss : Number,
    bossname: String,
    userattack: Array,
    stats: {
        attack: Number,
        health: Number,
    },
})

module.exports = mongoose.model('Boss', bossSchema)
