const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    userId: String,
    pseudo: String,
    player: {
        level: Number,
        attack: Number,
        defense: Number,
        health: Number,
        dodge: Number,
        crit: Number,
        penetration: Number,
        lifeSteal: Number,
        elo: Number,
        slotItem: {
            slot1: Number,
            slot2: Number,
            slot3: Number,
            slot4: Number,
            slot5: Number,
        },
        stuff: {
            stuffUnlock : Array,
            weaponID: Number,
            bootsID: Number,
            armorID: Number,
            magicItemID: Number,
        },
        other:{
            dm: Boolean,
            bossattack: Number,
            squadName: String,
            squadCoinGiven: Number,
            monsterKill: Number,
            box: Number,
        },
    },
})

module.exports = mongoose.model('Player', playerSchema)
