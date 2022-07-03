const mongoose = require('mongoose')

const statsSchema = mongoose.Schema({
    userId: String,
    pseudo: String,
    lb: String,
    stats: {
        nbfarm: Number,
        nbmine: Number,
        nbchest: Number,
        nbhourly: Number,
        nbdaily: Number,
        nbrestart: Number,
    },
})

module.exports = mongoose.model('Stats', statsSchema)
