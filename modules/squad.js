const mongoose = require('mongoose')

const squadSchema = mongoose.Schema({
    squadName : String,
    squadXp: Number,
    leader: Array,
    member: Array,
    squadbank: Number,
    squadboss: {
        bossattack: Number,
        bosshealth: Number,
        bossdefense: Number,
    }
})

module.exports = mongoose.model('Squad', squadSchema)
