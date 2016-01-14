var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  matchId: { type: String, required: true, unique: true },
  champion: { type: Number, required: true },
  queue: { type: String },
  season: { type: String },
  lane: { type: String, required: true },
  role: { type: String, required: true }
});

module.exports = mongoose.model('Game', gameSchema);
