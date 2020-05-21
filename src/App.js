import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from "./login";
import Admin from "./admin_verify";
import Main from "./main";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-web-tabs/dist/react-web-tabs.css";
import "react-tabs/style/react-tabs.css";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Particles from 'react-particles-js'
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
    const particlesLoader = () => {
      return (
        <div id="particles-js">
          <Particles
            canvasClassName="particlesBackground"
            params={
              {
                "particles": {
                  "number": {
                    "value": 100,
                    "density": {
                      "enable": true,
                      "value_area": 800
                    }
                  },
                  "color": {
                    "value": "#fff"
                  },
                  "shape": {
                    "type": "circle",
                    "stroke": {
                      "width": 0,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 5
                    },
                    "image": {
                      "src": "img/github.svg",
                      "width": 100,
                      "height": 100
                    }
                  },
                  "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 10,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.1,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": false,
                    "distance": 500,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 2
                  },
                  "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "bottom",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                    }
                  }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": true,
                      "mode": "repulse"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "repulse"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 400,
                      "line_linked": {
                        "opacity": 0.5
                      }
                    },
                    "bubble": {
                      "distance": 400,
                      "size": 4,
                      "duration": 0.3,
                      "opacity": 1,
                      "speed": 3
                    },
                    "repulse": {
                      "distance": 200,
                      "duration": 0.4
                    },
                    "push": {
                      "particles_nb": 4
                    },
                    "remove": {
                      "particles_nb": 2
                    }
                  }
                },
                "retina_detect": true
              }

            }
          />
        </div>
      );
    };
    return (
      <div id="smooth">
        {particlesLoader()}
        <Provider store={store}>
          <Router>
            <nav className="navbar navbar-expand-md navbar-light fixed-top ">
              <a
                className="pull-right"
                style={{
                  textAlign: "right",
                  color: "white",
                  whiteSpace: "nowrap",

                  textDecoration: "none",
                }}
                href="/"
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
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin" component={Admin} />
              <Route path='*' exact={true} component={Main} />
            </Switch>

          </Router>
        </Provider>
      </div>
    );
  }
}
export default App;
