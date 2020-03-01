import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './home';
import Projects from './projects';
import newProjects from './newProjects';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RoutedTabs, NavTab } from "react-router-tabs";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Background from './images/bgaaa.jpg';
import Background1 from './images/bg_rock.jpg';
// import "./js/skel.min.js"
// import "./js/init.js"

// import "./css/skel.css"
//import "./css/style.css"
// import "./css/style-wide.css"
// import "./css/style-noscript.css"
import "./css/style.css"
class App extends Component {
  constructor() {
    super();
  }


  // Main Page
  render() {
    return (

      <Router>
	<body class="loading">
		<div id="wrapper">
			<div id="bg"></div>
			<div id="main">

					<header id="header">
						<h1>Siddharth Banothu</h1>
						<p>Student &nbsp;&bull;&nbsp; Artist &nbsp;&bull;&nbsp; Developer</p>
						<nav>
							<ul>

              <Nav.Link  style={{color:"white"}} href="/home">Home</Nav.Link>
								<li><a href="http://www.siddharth.banothu.com" class="icon fa-user"><span class="label">Blog</span></a></li>
								<li><a href="" class="icon fa-linkedin"><span class="label">LinkedIn</span></a></li>
								<li><a href="" class="icon fa-github"><span class="label">Github</span></a></li>
								<li><a href="" class="icon fa-paint-brush"><span class="label">Deviant Art</span></a></li>
								<li><a href="" class="icon fa-envelope-o"><span class="label">Email</span></a></li>
							</ul>
						</nav>
					</header>
			</div>
		</div>
	</body>
            <Route path="/home" component={Home} />
            {/* <Route path="/about" component={About} /> */}
            {/* <Route path="/login" component={Login} /> */}
          </Router>

    );
  }
}

export default App;