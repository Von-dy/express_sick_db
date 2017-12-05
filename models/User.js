var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    pass: String
});

UserSchema.methods.addNewUser = function() {
    mongoose.connection.collection('users').insert(this);
};

UserSchema.methods.authenticateUser = function(cb) {
    return mongoose.connection.collection('users').findOne({ name: this.name, pass: this.pass }, cb);
};

module.exports = mongoose.model("User", UserSchema);