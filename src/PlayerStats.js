import React, { Component } from 'react';
import "./css/index.css"

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PlayerStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerInfoWins: [],
      playerInfoLosses: [],
      champInfoWins: [],
      champInfoLosses: []
    }

  }


  render() {
    const winLossPlayer = {
      height: 400, //in pixels
      width: 1100,
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Wins/Losses with Player" + " - " + this.props.playerStats.username
      },
      axisX: {
        title: "Player Names"
      },
      axisY: {
        title: "Wins",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },

      data: [{
        type: "column",
        name: "Wins",
        color: "#3CB371",
        showInLegend: true,
        yValueFormatString: "# Wins",
        dataPoints: this.state.playerInfoWins
      }, {
        type: "column",
        name: "Losses",
        color: "#B22222",
        showInLegend: true,
        yValueFormatString: "# Losses",
        dataPoints: this.state.playerInfoLosses
      }
      ]
    }

    const winLossChampion = {
      height: 400, //in pixels
      width: 1100,
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Wins/Losses with Champion" + " - " + this.props.playerStats.username
      },
      axisX: {
        title: "Champion Names"
      },
      axisY: {
        title: "Wins",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },

      data: [{
        type: "column",
        name: "Wins",
        color: "#3CB371",
        showInLegend: true,
        yValueFormatString: "# Wins",
        dataPoints: this.state.champInfoWins
      }, {
        type: "column",
        name: "Losses",
        color: "#B22222",
        showInLegend: true,
        yValueFormatString: "# Losses",
        dataPoints: this.state.champInfoLosses
      }
      ]
    }


    return (
      <div>
        <div className="shadow  bg-white rounded mt-4 p-3 mb-5 " >
          <CanvasJSChart options={winLossPlayer}
            onRef={ref => this.winLossPlayerChart = ref}
          />
        </div>
        <div className="shadow  bg-white rounded mt-4 p-3 mb-5 " >
          <CanvasJSChart options={winLossChampion}
            onRef={ref => this.winLossChampionChart = ref}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    var playerInfo = this.props.playerInfo;
    var champInfo = this.props.champInfo;
    playerInfo.sort(function (a, b) { return a.wins - b.wins });
    champInfo.sort(function (a, b) { return a.wins - b.wins });

    var playerLosses = []
    var playerWins = []
    for (var i = 0; i < playerInfo.length; i++) {
      playerLosses.push({
        y: playerInfo[i].losses,
        label: playerInfo[i].username,

      });
    }

    for (var i = 0; i < playerInfo.length; i++) {
      playerWins.push({
        y: playerInfo[i].wins,
        label: playerInfo[i].username,

      });
    }

    var champLosses = []
    var champWins = []
    for (var i = 0; i < champInfo.length; i++) {
      champLosses.push({
        y: champInfo[i].losses,
        label: champInfo[i].champName,

      });
    }

    for (var i = 0; i < champInfo.length; i++) {
      champWins.push({
        y: champInfo[i].wins,
        label: champInfo[i].champName,

      });
    }



    this.setState({ champInfoWins: champWins })
    this.setState({ champInfoLosses: champLosses })



    this.setState({ playerInfoLosses: playerLosses })
    this.setState({ playerInfoWins: playerWins })




    console.log(champInfo)
    console.log(champWins)
    console.log(champLosses)

    this.winLossPlayerChart.render();
    this.winLossChampionChart.render();
  }
}

export default PlayerStats;
