import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';

import Home from './home';
import Projects from './projects';
import newProjects from './newProjects';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Background1 from './images/bg_rock.jpg';
// import "./js/skel.min.js"
// import "./js/init.js"
// import "./css/skel.css"
// import "./css/style.css"
// import "./css/style-wide.css"
// import "./css/style-noscript.css"

class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu })
  }

  render() {

    const show = (this.state.menu) ? "show" : "";


    return (


      <div id="smooth">

        <Router>
          <div >
          <nav className="navbar navbar-expand-md navbar-light fixed-top "  >
            <button className=" pull-left navbar-toggler" type="button" onClick={this.toggleMenu} style={{ backgroundColor: "white"}} >
              <span className=" pull-left navbar-toggler-icon"></span>
            </button>
            <div className={"collapse navbar-collapse " + show}>
              
              <div className="navbar-nav mr-auto">
                <Nav.Link style={{ color: "white", fontSize:"1.0em" }} href="/">Home</Nav.Link>
                <Nav.Link style={{ color: "white", fontSize:"1.0em"  }} href="/projects">Projects</Nav.Link>
                <Nav.Link style={{ color: "white", fontSize:"1.0em", whiteSpace: "nowrap"  }} href="/newProjects" >New Projects</Nav.Link>

              </div>
              <div class="navbar-nav ml-auto ">
                <Nav.Link style={{ color: "white", fontSize:"1.0em" }} href="https://www.linkedin.com/in/bharath-banothu-54827713b/"><span class="fa fa-linkedin"></span></Nav.Link>
                <Nav.Link style={{ color: "white", fontSize:"1.0em" }} href="https://www.github.com/bbanothu"><span class="fa fa-github"></span></Nav.Link>
                <Nav.Link style={{ color: "white", fontSize:"1.0em" }} href="mailto:bbanothu1997@gmail.com"><span class="fa fa-envelope-o"></span></Nav.Link>
              </div>


            </div>
          </nav>

      </div>
          {/* <Navbar className="mystyle" id="white" light collapseOnSelect expand="md"   fixed="top"
          style={{
            backgroundImage: `url(${Background1})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed", backgroundRepeat: "noRepeat"
          }}>  
            <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
            <Navbar.Collapse id="responsive-navbar-nav"  >
              <Nav className="mr-auto">
                <Nav.Link  style={{color:"white"}} href="/">Home</Nav.Link>
                <Nav.Link style={{color:"white"}} href="/projects">Projects</Nav.Link>
                <Nav.Link style={{color:"white"}}  href="/newProjects" style={{ whiteSpace: "nowrap", color:"white" }}>New Projects</Nav.Link>
              </Nav>
              <Nav className="justify-content-end"  fixed="top"   >
                <Nav.Link style={{color:"white"}} href="https://www.linkedin.com/in/bharath-banothu-54827713b/"><span class="fa fa-linkedin"></span></Nav.Link>
                <Nav.Link style={{color:"white"}} href="https://www.github.com/bbanothu"><span class="fa fa-github"></span></Nav.Link>
                <Nav.Link style={{color:"white"}} href="mailto:bbanothu1997@gmail.com"><span class="fa fa-envelope-o"></span></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
                    <Route path="/login" component={Login} />
          */}
          <Route exact path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/newProjects" component={newProjects} />
        </Router>
      </div>

    );
  }
}
export default App;