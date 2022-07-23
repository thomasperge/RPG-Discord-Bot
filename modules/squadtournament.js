const mongoose = require('mongoose')

const squadTournamentSchema = mongoose.Schema({
    squadTournamentName : String,
    squadTournamantLeader: Array,
    maxSquad: Number,
    squadMember: Array,
})

module.exports = mongoose.model('SquadTournament', squadTournamentSchema)
