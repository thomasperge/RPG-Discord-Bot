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
        lifeSteal: Number,
        execute: Number,
        aegis: Number, // bouclier
        stuff: {
            stuffUnlock: Array,
            weaponID: Number,
            bootsID: Number,
            armorID: Number,
            magicItemID: Number,
        },
        ultimate:{
            reflect: Number,
            heal: Number,
            luckyStrike: Number,
        },
        other:{
            dm: Boolean,
            bossattack: Number,
            squadName: String,
            squadCoinGiven: Number,
        },
    },
})

module.exports = mongoose.model('Player', playerSchema)
