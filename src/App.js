import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './home';
import Projects from './projects';
import newProjects from './newProjects';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';

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
          <nav className="navbar navbar-expand-md navbar-light fixed-top ">
            <button className=" pull-left navbar-toggler" type="button" onClick={this.toggleMenu} style={{ backgroundColor: "white" }}>
              <span className=" pull-left navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse menu " style={{ display: this.state.menuVal }}>
              <div className="navbar-nav mr-auto">
                <a href="/" className="nav-link" style={{ color: "white", fontSize: "1em" }}>Home</a>
                <a href="/projects" className="nav-link" style={{ color: "white", fontSize: "1em" }}>Projects</a>
                <a href="/newProjects" className="nav-link" style={{ color: "white", fontSize: "1em", whiteSpace: "nowrap" }}>New Projects</a>
              </div>
              <div className="navbar-nav ml-auto ">
                <a href="https://www.linkedin.com/in/bharath-banothu-54827713b/" className="nav-link" style={{ color: "white", fontSize: "1em" }}><span className="fa fa-linkedin"></span></a>
                <a href="https://www.github.com/bbanothu" className="nav-link" style={{ color: "white", fontSize: "1em" }}><span className="fa fa-github"></span></a>
                <a href="mailto:bbanothu1997@gmail.com" className="nav-link" style={{ color: "white", fontSize: "1em" }}><span className="fa fa-envelope-o"></span></a>
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