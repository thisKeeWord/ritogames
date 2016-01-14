var request = require('request');
var champion = require('champion');
var Champ = require('./champStatsModel.js');
var Game = require('./gameOverviewModel.js');
var Match = require('./matchStatsModel.js');
var User = require('./summonerInfoModel.js');
var keys = require('./../keys.js');
var matchUrl = 'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/' + keys.summonerId + '?' + keys.key;
var champUrl = 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/' + keys.summonerId + '/ranked?season=';

var statistics = {
  game: game,
  results: results
};


function game(req, res, next) {
  var storeLength = {};
  Game.find(storeLength, function(error, found) {
    if (error) return console.error(error);
    if (!found.length) {
      request(matchUrl, function(error, data) {
        if (error) return console.error(error);
        var result = JSON.parse(data.body);
        storeLength = result.matches.length;
        // if (result.matches.length < )
        for (var i = 0; i < result.matches.length; i++) {
          Game.create(result.matches[i], function(error, gameSaved) {
            if (error) return console.error(error);
            // console.log(gameLogged)
          });
        }
        return res.redirect('/stats');
      });
    }
    else {
      request(matchUrl, function(error, data) {
        if (error) return console.error(error);
        var result = JSON.parse(data.body);
        for (var i = found.length; i < result.matches.length; i++) {
          Game.create(result.matches[i], function(error, gameLogged) {
            if (error) return console.error(error);
            // console.log(gameLogged)
          });
        }
        return res.redirect('/stats');
      });
    }
  });
}

function results(req, res, next) {

  var champCheck = {};
  var toCheck = {
    championId: parseInt(champion(req.body.champion), 10),
    season: req.body.season
  };
  console.log('in results', req.body)
  console.log(toCheck.championId);
  Champ.findOne(toCheck, function(error, search) {
    if (error) return console.error(error);
    if (!search || search.season !== toCheck.season || (!toCheck.championId && !toCheck.season)) {
      request(champUrl + toCheck.season + '&' + keys.key, function(error, champStat) {
        if (error) return console.error(error);
        var champStatis = JSON.parse(champStat.body).champions;
        // res.send(champStatis);
        for (var i = 0; i < champStatis.length; i++) {
          if (champStatis[i].id === toCheck.championId) {
            Champ.create({
              champion: req.body.champion,
              championId: champStatis[i].id,
              season: req.body.season,
              totalDeathsPerSession: champStatis[i].stats["totalDeathsPerSession"],
              totalSessionsPlayed: champStatis[i].stats["totalSessionsPlayed"],
              totalDamageTaken: champStatis[i].stats["totalDamageTaken"],
              totalQuadraKills: champStatis[i].stats["totalQuadraKills"],
              totalTripleKills: champStatis[i].stats["totalTripleKills"],
              totalMinionKills: champStatis[i].stats["totalMinionKills"],
              maxChampionsKilled: champStatis[i].stats["maxChampionsKilled"],
              totalDoubleKills: champStatis[i].stats["totalDoubleKills"],
              totalPhysicalDamageDealt: champStatis[i].stats["totalPhysicalDamageDealt"],
              totalChampionKills: champStatis[i].stats["totalChampionKills"],
              totalAssists: champStatis[i].stats["totalAssists"],
              mostChampionKillsPerSession: champStatis[i].stats["mostChampionKillsPerSession"],
              totalDamageDealt: champStatis[i].stats["totalDamageDealt"],
              totalFirstBlood: champStatis[i].stats["totalFirstBlood"],
              totalSessionsLost: champStatis[i].stats["totalSessionsLost"],
              totalSessionsWon: champStatis[i].stats["totalSessionsWon"],
              totalMagicDamageDealt: champStatis[i].stats["totalMagicDamageDealt"],
              totalGoldEarned: champStatis[i].stats["totalGoldEarned"],
              totalPentaKills: champStatis[i].stats["totalPentaKills"],
              totalTurretsKilled: champStatis[i].stats["totalTurretsKilled"],
              mostSpellsCast: champStatis[i].stats["mostSpellsCast"],
              maxNumDeaths: champStatis[i].stats["maxNumDeaths"],
              totalUnrealKills: champStatis[i].stats["totalUnrealKills"]
            }, function(error, champSaved) {
              if(error) return console.error('in champ.create', error);
              return res.send(champSaved);
            });
          }
        }
      });
    }
    else if (search.season === toCheck.season && search.champion === req.body.champion) {
      return res.send(search);
    }
    else {
      return res.send("You haven't played this champ for the season specified");
    }
  })
}




module.exports = statistics;
