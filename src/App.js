import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./login";
import Admin from "./admin_verify";
import Main from "./main";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-web-tabs/dist/react-web-tabs.css";
import "react-tabs/style/react-tabs.css";
import Async from "react-async";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import Loading from "./images/loading.svg";

import { Provider } from "react-redux";
import configureStore from "./configureStore";

const store = configureStore();

class App extends Component {
  // initialize navbar values
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      menuVal: "none",
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  // Used to toggle navbar
  toggleMenu() {
    if (this.state.menu) {
      this.setState({ menu: !this.state.menu });
      this.setState({ menuVal: "none" });
    } else {
      this.setState({ menu: !this.state.menu });
      this.setState({ menuVal: "inline" });
    }
  }

  // Render Function
  render() {
    return (
      <div id="smooth">
        <Provider store={store}>
          <Router>
            <nav className="navbar navbar-expand-md navbar-light fixed-top ">
              <a
                className="pull-right"
                style={{
                  textAlign: "right",
                  color: "white",
                  textDecoration: "none",
                }}
                href="https:/bharath.banothu.com"
              >
                <h1>BHARATH BANOTHU</h1>
              </a>
              <button
                className=" pull-left navbar-toggler"
                type="button"
                onClick={this.toggleMenu}
                style={{ backgroundColor: "white" }}
              >
                <span className=" pull-left navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse menu "
                style={{ display: this.state.menuVal }}
              >
                {/* <div className="navbar-nav mr-auto">
                <a href="/" className="nav-link" style={{ color: "white", fontSize: "1em" }}>Home</a>
                <a href="/projects" className="nav-link" style={{ color: "white", fontSize: "1em" }}>Projects</a>
                <a href="/newProjects" className="nav-link" style={{ color: "white", fontSize: "1em", whiteSpace: "nowrap" }}>New Projects</a>
                <a href="/login" className="nav-link" style={{ color: "white", fontSize: "1em", whiteSpace: "nowrap" }}>Login</a>
              </div> */}
                <div className="navbar-nav ml-auto ">
                  <a
                    href="https://www.linkedin.com/in/bharath-banothu-54827713b/"
                    className="nav-link"
                    style={{ color: "white", fontSize: "1em" }}
                  >
                    <span className="fa fa-linkedin"></span>
                  </a>
                  <a
                    href="https://www.github.com/bbanothu"
                    className="nav-link"
                    style={{ color: "white", fontSize: "1em" }}
                  >
                    <span className="fa fa-github"></span>
                  </a>
                  <a
                    href="mailto:bbanothu1997@gmail.com"
                    className="nav-link"
                    style={{ color: "white", fontSize: "1em" }}
                  >
                    <span className="fa fa-envelope-o"></span>
                  </a>
                </div>
              </div>
            </nav>
            <Route exact path="/" component={Main} />
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={Admin} />
            {/* <Route path="/projects" component={Projects} />
          <Route path="/newProjects" component={newProjects} /> */}
          </Router>
        </Provider>
      </div>
    );
  }
}
export default App;
