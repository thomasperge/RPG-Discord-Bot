const mongoose = require('mongoose')

const toolsSchema = mongoose.Schema({
    userId: String,
    pseudo: String,
    tool: {
        pickaxe: Number,
        shovel: Number,
        generator: Number,
    },
})

module.exports = mongoose.model('Tools', toolsSchema)
