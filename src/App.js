import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';

import Home from './home';
import Projects from './projects';
import newProjects from './newProjects';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      menuVal: "none"
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    if (this.state.menu) {
      this.setState({ menu: !this.state.menu })
      this.setState({ menuVal: "none" })
    } else {
      this.setState({ menu: !this.state.menu })
      this.setState({ menuVal: "inline" })
    }
  }

  render() {
    return (
      <div id="smooth">
        <Router>
          <nav class="navbar navbar-expand-md navbar-light fixed-top ">
            <button class=" pull-left navbar-toggler" type="button" onClick={this.toggleMenu} style={{ backgroundColor: "white" }}>
              <span class=" pull-left navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse menu " style={{ display: this.state.menuVal }}>
              <div class="navbar-nav mr-auto">
                <a href="/" class="nav-link" style={{ color: "white", fontSize: "1em" }}>Home</a>
                <a href="/projects" class="nav-link" style={{ color: "white", fontSize: "1em" }}>Projects</a>
                <a href="/newProjects" class="nav-link" style={{ color: "white", fontSize: "1em", whiteSpace: "nowrap" }}>New Projects</a>
              </div>
              <div class="navbar-nav ml-auto ">
                <a href="https://www.linkedin.com/in/bharath-banothu-54827713b/" class="nav-link" style={{ color: "white", fontSize: "1em" }}><span class="fa fa-linkedin"></span></a>
                <a href="https://www.github.com/bbanothu" class="nav-link" style={{ color: "white", fontSize: "1em" }}><span class="fa fa-github"></span></a>
                <a href="mailto:bbanothu1997@gmail.com" class="nav-link" style={{ color: "white", fontSize: "1em" }}><span class="fa fa-envelope-o"></span></a>
              </div>
            </div>
          </nav>

          <Route exact path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/newProjects" component={newProjects} />
        </Router>
      </div>

    );
  }
}
export default App;