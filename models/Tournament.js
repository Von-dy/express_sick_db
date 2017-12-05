var mongoose = require('mongoose');

var TournamentSchema = new mongoose.Schema({
    name: String,
    date: String,
    year: String,
    location: String,
    placements: {}
});

TournamentSchema.methods.find = function(cb) {
    return mongoose.connection.collection('tournament').find();
};

TournamentSchema.methods.addNewTournament = function() {
    mongoose.connection.collection('tournament').insert(this);
};

module.exports = mongoose.model("Tournament", TournamentSchema);