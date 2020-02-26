import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './home';
import Projects from './projects';
import newProjects from './newProjects';
import Login from './login';
import About from './about';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RoutedTabs, NavTab } from "react-router-tabs";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class App extends Component {
  constructor() {
    super();
  }

  // Main Page
  render() {
    return (
      <div>
        <h1 style={{ textAlignVertical: "center", textAlign: "center"}}>Bharath Banothu</h1>
        <Router>
          <Tabs style={{fontSize: "1.5rem"}}>

            <TabList>
              <Tab style={{backgroundColor:"#ffffff00"}} ><Link style={{ textDecoration: "none", color:"black" }} to="/">Home</Link></Tab>
              <Tab style={{backgroundColor:"#ffffff00"}} ><Link style={{ textDecoration: "none", color:"black" }} to="/projects">Projects</Link></Tab>
              <Tab style={{backgroundColor:"#ffffff00"}} ><Link style={{ textDecoration: "none", color:"black" }} to="/newProjects">New Projects</Link></Tab>
              <Tab style={{backgroundColor:"#ffffff00"}} ><Link style={{ textDecoration: "none", color:"black" }} to="/about">About</Link></Tab>
              <Tab style={{backgroundColor:"#ffffff00"}} ><Link style={{ textDecoration: "none", color:"black" }} to="/login">Login</Link></Tab>
            </TabList>
          </Tabs>
          <Route exact path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/newProjects" component={newProjects} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
        </Router>
      </div>
    );
  }
}

export default App;