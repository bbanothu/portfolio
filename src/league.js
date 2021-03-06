import React, { Component } from 'react';
import Async from "react-async"
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import Loading from "./images/loading.svg";
import "./css/index.css"
import WinLoss from "./WinLoss"
import PlayerStats from "./PlayerStats"

class league extends Component {
  constructor(props) {
    super(props);
    this.getStatsWins = this.getStatsWins.bind(this);
    this.getStatsLosses = this.getStatsLosses.bind(this);


    this.getStatsInfo = this.getStatsInfo.bind(this);
    this.getStatsChampions = this.getStatsChampions.bind(this);
    this.sortDataByName = this.sortDataByName.bind(this);
  }

  // Single fetch
  loadJson = () =>
    fetch("https://bbanothupi.ddns.net:3340/inhouseStats",
      {
        method: "GET", // POST, PUT, DELETE, etc.
        headers: {
          // the content type header value is usually auto-set
          // depending on the request body
          "Content-Type": "text/plain;charset=UTF-8"
        },
        body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
        referrer: "about:client", // or "" to send no Referer header,
        // or an url from the current origin
        referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
        mode: "cors", // same-origin, no-cors
        credentials: "same-origin", // omit, include
        cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
        redirect: "follow", // manual, error
        integrity: "", // a hash, like "sha256-abcdef1234567890"
        keepalive: false, // true
        signal: undefined, // AbortController to abort request
        window: window // null
      }
    )

      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json())

  // Render Function      



  getStatsWins(playerInfo) {
    var tempInfo = []
    var temp = playerInfo.winsWithPlayer
    Object.entries(temp).map(([key, value]) => {
      tempInfo.push({
        y: value,
        label: key

      });
    })

    return tempInfo

  }

  getStatsInfo(playerInfo) {
    var tempInfo = []
    var temp = playerInfo.mostWinLossSet
    Object.entries(temp).map(([key, value]) => {
      tempInfo.push({
        wins: value.wins,
        losses: value.losses,
        username: value.name


      });
    })

    return tempInfo

  }

  getStatsLosses(playerInfo) {
    console.log(playerInfo)
    var tempInfo = []
    var temp = playerInfo.lossesWithPlayer
    Object.entries(temp).map(([key, value]) => {
      tempInfo.push({
        y: value,
        label: key

      });
    })
    return tempInfo
  }

  getStatsChampions(playerInfo) {
    var myChamps = []
    var temp = playerInfo.myChampStats
    Object.entries(temp).map(([key, value]) => {
      myChamps.push({
        wins: value.wins,
        losses: value.losses,
        champName: value.champName

      });
    })

    return myChamps
  }

  sortDataByName(data) {
    console.log(data)
    data.sort(function (a, b) {
      return a.username.localeCompare(b.username)
    });
    console.log(data)
    return data;
  }

  render() {
    return (
      <Async promiseFn={this.loadJson}>
        {({ data, error, isLoading }) => {
          if (isLoading) return <div style={{ marginTop: "3em" }}>
            <img alt="loading" src={Loading} style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }} ></img></div>
          if (error) {
            return (
              <div className="shadow p-3 mb-5 bg-white rounded mt-3 ml-3 ">
                <h2>If you are seeing this error, You need to go to this link first, accept it, and then refresh the page:</h2>
                <a target="_blank" href="https://bbanothupi.ddns.net:3340/inhouseStats"> <h3>Click here to proceed to the link</h3> </a>
              </div>
            )
          }
          if (data) {
            var arr = []
            Object.keys(data).forEach(function (key) {
              arr.push(data[key]);
            });
            console.log("PLAYERS" + arr)
            arr = this.sortDataByName(arr)
            return (
              <Tabs defaultTab="Win/Losses" vertical style={{ marginTop: "0px" }}>
                <TabList className="shadow pt-1 pl-4 pr-4 bg-grey rounded"
                  style={{ height: "100%" }}>
                  <h1 style={{ color: "white", textAlign: "center" }}> Overall Stats </h1>
                  <Tab tabFor="Win/Losses"  ><p style={{ color: "white" }}>Win/Losses</p></Tab>
                  <h1 style={{ color: "white", textAlign: "center" }}> Player Stats </h1>
                  {arr.map((user, index) => (
                    <Tab key={index} tabFor={user.username}
                      style={{ color: "white" }}>{user.username}</Tab>
                  ))}
                </TabList>
                <TabPanel tabId="Win/Losses" style={{ color: "black", width: "80%" }}>

                  <div >
                    <WinLoss />
                  </div>
                </TabPanel>
                {arr.map((user, index) => (
                  <TabPanel key={index} tabId={user.username} style={{ color: "white", width: "80%" }}>
                    <PlayerStats playerStats={user} playerInfoWins={this.getStatsWins(user)} playerInfoLosses={this.getStatsLosses(user)}
                      champInfo={this.getStatsChampions(user)}
                      playerInfo={this.getStatsInfo(user)}

                    />
                  </TabPanel>
                ))}
              </Tabs>
            )
            return null;
          }
        }}
      </Async>
    );
  }
}

export default league;
