const mongoose = require('mongoose')

const statSchema = mongoose.Schema({
    botID: Number,
    numberPlayer: Number,
    numberSquad: Number,
    amoutCoin: Number,
    amoutItem: Number,
    amoutMonsterKilled: Number,
    boxOpen: Number,
})

module.exports = mongoose.model('Stats', statSchema)