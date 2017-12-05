var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
    gamertag: String
});

PlayerSchema.methods.addNewPlayer = function() {
    mongoose.connection.collection('players').insert(this);
};

PlayerSchema.methods.removePlayer = function() {
    mongoose.connection.collection('players').find({gamertag:this.gamertag}).remove().exec();
};

module.exports = mongoose.model("Player", PlayerSchema);