var mongoose = require('mongoose');

var MatchSchema = new mongoose.Schema({
    tournament: String,
    players: [],
    winner: String
});

MatchSchema.methods.addNewMatch = function() {
    mongoose.connection.collection('match').insert(this);
};

module.exports = mongoose.model("Match", MatchSchema);