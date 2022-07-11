const mongoose = require('mongoose')

const suadSchema = mongoose.Schema({
    squadName : String,
    leader: Number,
    member: Array,
    squadbank: Number,
})

module.exports = mongoose.model('Squad', suadSchema)
