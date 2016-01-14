var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var champStatsSchema = {
  champion: { type: String, required: true },
  championId: { type: Number, required: true },
  season: { type: String, required: true },
  totalDeathsPerSession: { type: String, required: true },
  totalSessionsPlayed: { type: String, required: true },
  totalDamageTaken: { type: String, required: true },
  totalQuadraKills: { type: String, required: true },
  totalTripleKills: { type: String, required: true },
  totalMinionKills: { type: String, required: true },
  maxChampionsKilled: { type: String, required: true },
  totalDoubleKills: { type: String, required: true },
  totalPhysicalDamageDealt: { type: String, required: true },
  totalChampionKills: { type: String, required: true },
  totalAssists: { type: String, required: true },
  mostChampionKillsPerSession: { type: String, required: true },
  totalDamageDealt: { type: String, required: true },
  totalFirstBlood: { type: String, required: true },
  totalSessionsLost: { type: String, required: true },
  totalSessionsWon: { type: String, required: true },
  totalMagicDamageDealt: { type: String, required: true },
  totalGoldEarned: { type: String, required: true },
  totalPentaKills: { type: String, required: true },
  totalTurretsKilled: { type: String, required: true },
  mostSpellsCast: { type: String, required: true },
  maxNumDeaths: { type: String, required: true },
  totalUnrealKills: { type: String, required: true }
};

module.exports = mongoose.model('Champ', champStatsSchema);
