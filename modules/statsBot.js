const mongoose = require('mongoose')

const statSchema = mongoose.Schema({
    botID: Number,
    numberPlayer: Number,
    numberSquad: Number,
    amoutCoin: Number,
    amoutItem: Number,
    amoutMonsterKilled: Number,
    shop: {
        amoutSale: Number,
    }
})

module.exports = mongoose.model('Stats', statSchema)