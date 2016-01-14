var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = {
  stats: { type: Object, required: true },
  goldPerMinDeltas: { type: Object, required: true },
  creepsPerMinDeltas: { type: Object, required: true },
  csDiffPerMinDeltas: { type: Object, required: true },
  matchId: { type: String, required: true, unique: true }
};

module.exports = mongoose.model('Match', matchSchema);
