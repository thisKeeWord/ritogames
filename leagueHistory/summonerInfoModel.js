var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = {
  userId: { type: String, required: true, unique: true }
};

module.exports = mongoose.model('User', userSchema);
