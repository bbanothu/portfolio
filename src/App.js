import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./login";
import Admin from "./admin_verify";
import Main from "./main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import "react-web-tabs/dist/react-web-tabs.css";
import "react-tabs/style/react-tabs.css";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Particles from 'react-particles-js'
import redirect from "./Redirect"
import League from "./league"
const store = configureStore();

class App extends Component {
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
                    "value": 50,
                    "density": {
                      "enable": true,
                      "value_area": 500
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
        {/* {particlesLoader()} */}
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/league" component={League} />
              <Route exact path="/" component={Main} />
              <Route path='*' exact={true} component={redirect} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}
export default App;
