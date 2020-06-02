import React, { Component } from 'react';
import Async from "react-async"
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import Loading from "./images/loading.svg";
import "./css/index.css"

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPointsTemp = [];
var dataPoints = [];
var dataPoints1 = [];

var dataPoints2 = [];
var dataPoints3 = [];

var kills = [];
var deaths = [];
var assists = [];
var totalDamage = [];

var arr = [];
class WinLoss extends Component {
  constructor(props) {
    super(props);
    this.compareDataPointYAscend = this.compareDataPointYAscend.bind(this);
  }
  compareDataPointYAscend(dataPoint1, dataPoint2) {
    return dataPoint1.y - dataPoint2.y;
  }

  render() {
    const winLoss = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Win/Loss Ratio"
      },
      axisX: {
        title: "Usernames"
      },
      axisY: {
        title: "Wins/Losses",
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
        dataPoints: dataPoints
      },
      {
        type: "column",
        name: "Losses",
        color: "#B22222",
        showInLegend: true,
        yValueFormatString: "# Losses",
        dataPoints: dataPoints1
      },
      ]
    }

    const mostWinLoss = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Most Wins/Losses With Player"
      },
      axisX: {
        title: "Usernames"
      },
      axisY: {
        title: "Wins/Losses",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E"
      },
      axisY2: {
        title: "WinsWith",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E"
      },
      axisY3: {
        title: "LossesWith",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },

      data: [{
        type: "column",
        name: "Most Losses With",
        color: "#B22222",
        showInLegend: true,
        yValueFormatString: "# Losses",
        dataPoints: dataPoints2
      },
      {
        type: "column",
        name: "Most Wins With",
        showInLegend: true,
        color: "#3399ff",
        yValueFormatString: "# Wins",
        dataPoints: dataPoints3
      },
      {
        type: "column",
        name: "Player",
        showInLegend: true,
        color: "#3CB371",
        yValueFormatString: "# Total Wins",
        dataPoints: dataPointsTemp
      }]
    }

    const KDAOptions = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "KDA Ratio"
      },
      axisX: {
        title: "KDA"
      },
      axisY: {
        title: "KDA",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E"
      },
      axisY2: {
        title: "Deaths",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E"
      },
      axisY3: {
        title: "Assists",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },

      data: [{
        type: "column",
        name: "Total Kills",
        color: "#3CB371",
        showInLegend: true,
        yValueFormatString: "# Kills",
        dataPoints: kills
      },
      {
        type: "column",
        name: "Total Deaths",
        showInLegend: true,
        color: "#B22222",
        yValueFormatString: "# Deaths",
        dataPoints: deaths
      },
      {
        type: "column",
        name: "Total Assists",
        showInLegend: true,
        color: "#3399ff",
        yValueFormatString: "# Assists",
        dataPoints: assists
      }]
    }

    const totalDamageOptions = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Total Damage Dealt To Players"
      },
      axisX: {
        title: "Total Damage "
      },
      axisY: {
        title: "Total Damage",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },

      data: [{
        type: "column",
        name: "Total Damage",
        color: "#3CB371",
        showInLegend: true,
        yValueFormatString: "# Total Damage To Champions",
        dataPoints: totalDamage
      }
      ]
    }
    return (
      <div >
        <div className="shadow p-3 mb-5 bg-white rounded mt-4 ">
          <CanvasJSChart options={winLoss}
            onRef={ref => this.winLossChart = ref}
          />
        </div>
        <div className="shadow p-3 mb-5 bg-white rounded mt-4 ">
          <CanvasJSChart options={mostWinLoss}
            onRef={ref => this.mostWinLossChart = ref}
          />
        </div >
        <div className="shadow p-3 mb-5 bg-white rounded mt-4 ">
          <CanvasJSChart options={KDAOptions}
            onRef={ref => this.KDAChart = ref}
          />
        </div >
        <div className="shadow p-3 mb-5 bg-white rounded mt-4 ">
          <CanvasJSChart options={totalDamageOptions}
            onRef={ref => this.totalDamageChart = ref}
          />
        </div >
      </div >

    );
  }

  componentDidMount() {
    var winLossChart = this.winLossChart;
    var mostWinLossChart = this.mostWinLossChart;
    var KDAChart = this.KDAChart;
    var totalDamageChart = this.totalDamageChart;
    fetch('https://bbanothupi.ddns.net:3340/inhouseStats')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        Object.keys(data).forEach(function (key) {
          arr.push(data[key]);
        });


        // Win/Loss Chart
        var totalWinLoss = []
        for (var i = 0; i < arr.length; i++) {
          totalWinLoss.push({
            totalWins: arr[i].totalWins,
            totalLosses: arr[i].totalLosses,
            username: arr[i].username,

          });
        }

        for (var i = 0; i < totalWinLoss.length; i++) {
          dataPointsTemp.push({
            y: totalWinLoss[i].totalWins,
            label: totalWinLoss[i].username,

          });
        }

        totalWinLoss.sort(function (a, b) { return a.totalWins - b.totalWins });

        for (var i = 0; i < totalWinLoss.length; i++) {
          dataPoints.push({
            y: totalWinLoss[i].totalWins,
            label: totalWinLoss[i].username,

          });
        }

        for (var i = 0; i < totalWinLoss.length; i++) {
          dataPoints1.push({
            y: totalWinLoss[i].totalLosses,
            label: totalWinLoss[i].username,

          });
        }


        // MostWin/Most Loss Chart 
        for (var i = 0; i < arr.length; i++) {
          dataPoints2.push({
            y: arr[i].mostLossesWithPlayer.wins,
            label: arr[i].mostLossesWithPlayer.name,

          });
        }

        for (var i = 0; i < arr.length; i++) {
          dataPoints3.push({
            y: arr[i].mostWinsWithPlayer.wins,
            label: arr[i].mostWinsWithPlayer.name,

          });
        }
        console.log(dataPoints)
        console.log(dataPoints2)
        console.log(dataPoints3)

        /// KDA Chart Chart
        var totalArr = [];
        for (var i = 0; i < arr.length; i++) {
          totalArr.push({
            totalKills: arr[i].totalKills,
            totalDeaths: arr[i].totalDeaths,
            totalAssists: arr[i].totalAssists,
            username: arr[i].username,

          });
        }
        totalArr.sort(function (a, b) { return a.totalKills - b.totalKills });

        for (var i = 0; i < totalArr.length; i++) {
          kills.push({
            y: totalArr[i].totalKills,
            label: totalArr[i].username,

          });
        }
        for (var i = 0; i < totalArr.length; i++) {
          deaths.push({
            y: totalArr[i].totalDeaths,
            label: totalArr[i].username,

          });
        }
        for (var i = 0; i < totalArr.length; i++) {
          assists.push({
            y: totalArr[i].totalAssists,
            label: totalArr[i].username,

          });
        }


        /// Total Damage Chart
        var temp = []
        for (var i = 0; i < arr.length; i++) {
          totalDamage.push({
            y: arr[i].totalDamageDealt,
            label: arr[i].username,

          });
        }


        totalDamage.sort(function (a, b) { return a.y - b.y });
        //kills.sort(function (a, b) { return a.y - b.y });


        winLossChart.render();
        mostWinLossChart.render();
        KDAChart.render();
        totalDamageChart.render();
      });
  }
}

export default WinLoss;
