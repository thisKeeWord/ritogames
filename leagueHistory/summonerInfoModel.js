var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = {
  userName: { type: String, required: true },
  userId: { type: Number, required: true }
};

module.exports = mongoose.model('User', userSchema);
