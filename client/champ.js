var React = require('react');
var ReactDOM = require('react-dom');

var League = React.createClass({
  render: function() {
    return (
      <div className="getChamps">
        <DbResults />
      </div>
    );
  }
});

var OutForm = React.createClass({
  post: function(data) {
    return $.ajax({
      type: 'POST',
      url: '/stats',
      data: JSON.stringify(data),
      contentType: 'application/json'
    })
  },

  handle: function(e) {
    e.preventDefault();
    var data = {
      userId: React.findDOMNode(this.refs.userId).value,
      champion: React.findDOMNode(this.refs.champion).value,
      season: React.findDOMNode(this.refs.season).value
    };
    var that = this;
    this.post(data).done(function(res) {
      that.props.update(res);
    });
  },

  render: function() {
    return (
      <form id="league-form" onSubmit={this.handle}>
        IGN: <input type="text" name="userId" ref="userId" /><br />
        Champion name: <input type="text" name="champion" ref="champion" />&nbsp;&nbsp;&nbsp;&nbsp;
        Season: <input type="text" name="season" ref="season" />
        <input type="submit" className="hidden" />
      </form>
    );
  }
});


var DbResults = React.createClass({
  getInitialState: function() {
    return { champData: {} }
  },

  append: function(data) {
    var cData = this.state.champData;
    this.setState({ champData: data });
  },

  getData: function() {
    var that = this;
    $.get('/stats').done(function(data) {
      that.setState({
        champData: data
      })
    });
  },

  componentWillMount: function() {
    this.getData();
  },

  render: function() {
    return (
      <ul className="list-group" id="champInfo">
        <ResToDisp data={this.state.champData} />
        <OutForm update={this.append}/>
      </ul>
    );
  }
});

var ResToDisp = React.createClass({
  render: function() {
  console.log('front-end stuff now', this.props.data);
    return (
      <li className="list-group-item" id="RtoD">
        <strong>IGN: {this.props.data.userId}</strong>
        <strong>champion: {this.props.data.champion}</strong>
        <p>champion ID: {this.props.data.championId}</p>
        <p>season: {this.props.data.season}</p>
        <p>total Sessions Played: {this.props.data.totalSessionsPlayed}</p>
        <p>total Damage Taken: {this.props.data.totalDamageTaken}</p>
        <p>total Quadra Kills: {this.props.data.totalQuadraKills}</p>
        <p>total Triple Kills: {this.props.data.totalTripleKills}</p>
        <p>total Minion Kills: {this.props.data.totalMinionKills}</p>
        <p>max Champions Killed: {this.props.data.maxChampionsKilled}</p>
        <p>total Double Kills: {this.props.data.totalDoubleKills}</p>
        <p>total Physical Damage Dealt: {this.props.data.totalPhysicalDamageDealt}</p>
        <p>total Champion Kills: {this.props.data.totalChampionKills}</p>
        <p>total Assists: {this.props.data.totalAssists}</p>
        <p>most Champion Kills Per Session: {this.props.data.mostChampionKillsPerSession}</p>
        <p>total Damage Dealt: {this.props.data.totalDamageDealt}</p>
        <p>total First Blood: {this.props.data.totalFirstBlood}</p>
        <p>total Sessions Lost: {this.props.data.totalSessionsLost}</p>
        <p>total Sessions Won: {this.props.data.totalSessionsWon}</p>
        <p>total Magic Damage Dealt: {this.props.data.totalMagicDamageDealt}</p>
        <p>total Gold Earned: {this.props.data.totalGoldEarned}</p>
        <p>total Penta Kills: {this.props.data.totalPentaKills}</p>
        <p>total Turrets Killed: {this.props.data.totalTurretsKilled}</p>
        <p>most Spells Cast: {this.props.data.mostSpellsCast}</p>
        <p>max Num Deaths: {this.props.data.maxNumDeaths}</p>
        <p>total Unreal Kills: {this.props.data.totalUnrealKills}</p>
      </li>
    );
  }
})




ReactDOM.render(<League />, document.getElementById('content'));
