const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    userId: String,
    pseudo: String,
    player: {
        level: Number,
        attack: Number,
        defense: Number,
        health: Number,
        dodge: Number, // Esquive
        crit: Number, // Chance de coup critique
        critMultplicator: Number, // attack * critMultplicator
        attackSpeed: Number,
        lifeSteal: Number,
        execute: Number,
        aegis: Number, // bouclier
        vengeance: Number,
        ultimate:{
            reflect: Number,
            heal: Number,
            luckyStrike: Number,
        },
        other:{
            dm: Boolean,
        },
    },
})

module.exports = mongoose.model('Player', playerSchema)
