import React, { Component } from 'react';
import Async from "react-async"
import Loading from "./images/loading.svg";
import ExampleComponent from "react-rounded-image";
import Background from './images/bgaaa.jpg';
import "./css/index.css"

class Home extends Component {

  // multi fetch
  async loadJson() {
    var data = [];
    const promise1 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getAboutMe").then(res => res.json())
    const promise2 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getSkills").then(res => res.json())
    const promise3 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getWork").then(res => res.json())
    const promise4 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getHobbies").then(res => res.json())
    data = Promise.all([promise1, promise2, promise3, promise4]);
    return data;
  }

  // Render Function
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
          if (error) return `Something went wrong: ${error.message}`
          if (data)
            return (
              <div style={{ fontSize: "16px", fontFamily: "Proxima Nova, sans-serif", lineHeight: "1.0rem", marginTop: "3em" }} >
                <div className="shadow p-3 mb-5 rounded "
                  style={{
                    color: "white",
                    backgroundImage: `url(${Background})`,
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed", backgroundRepeat: "noRepeat"
                  }}>
                  <div className="row">
                    <div className="col-sm-1">
                    </div>
                    <div className="col-sm-6" >
                      <br />
                      <h3>{data[0].name}</h3>
                      <p>{data[0].degree}</p>
                      <p className="fa fa-graduation-cap"> {data[0].college}</p><br />
                      <p className="fa fa-map-marker"> {data[0].currentlocation}</p>
                    </div>
                    <div className="col-sm-5">
                      <br />
                      <ExampleComponent
                        image={data[0].myface}
                        roundedColor="white"
                        imageWidth="150"
                        imageHeight="150"
                        roundedSize="13"
                      />
                    </div>
                  </div>
                </div>
                ))}
              <div className="row" style={{ textAlign: "left", fontSize: "16px", fontFamily: "Proxima Nova, sans-serif" }}>
                  <div className="col-sm-1">
                  </div>
                  <div className="col-sm-5">
                    <div className="shadow p-3 mb-5 bg-white rounded zoom">
                      <table className="table table-borderless">
                        <thead>
                          <tr >
                            <th scope="col" >
                              <div >
                                <span style={{ display: "inline" }} className="fa fa-graduation-cap"></span>
                                <span style={{ fontFamily: "Proxima Nova, sans-serif" }}> Education</span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td >
                              Iowa State University <br />
                              <p className="fa fa-calendar">&nbsp;&nbsp;2015-2019</p>
                            </td>
                          </tr>
                          <tr>
                            <td>DEGREE <br /> Bachelor's</td>
                          </tr>
                          <tr>
                            <td>MAJOR <br /> Computer Science</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <br />
                    <div className="shadow p-3 mb-5 bg-white rounded zoom">
                      <table className="table  table-borderless" >
                        <thead>
                          <tr>
                            <th scope="col">
                              <span style={{ display: "inline" }} className="fa fa-pencil"></span>
                              <span style={{ fontFamily: "Proxima Nova, sans-serif" }}> Skills</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td >Languages:<br /><br />
                              <p id="ovalOutline">English</p>
                              <p id="ovalOutline">Hindi</p>
                              <p id="ovalOutline">Telegu</p>
                            </td>
                          </tr>
                          <tr>
                            <td >Technical Experience: <br /><br />
                              {data[1].map((skills, index) => (
                                <p id="ovalOutline" key={index} value={skills} index={index}> {skills.name}</p>
                              ))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="shadow p-3 mb-5 bg-white rounded zoom">
                      <table className="table  table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">
                              <span style={{ display: "inline" }} className="fa fa-building"></span>
                              <span style={{ fontFamily: "Proxima Nova, sans-serif" }}> Work Experience</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data[2].map((work, index) => (
                            <tr key={index}>
                              <td value={work} index={index}>
                                <p>{work.company}</p>
                                <p>{work.role}</p>
                                <p className="fa fa-calendar"> {work.duration}</p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="shadow p-3 mb-5 bg-white rounded zoom">
                      <table className="table  table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">
                              <span style={{ display: "inline", }} className="fa fa-pencil"></span>
                              <span style={{ fontFamily: "Proxima Nova, sans-serif" }}> Hobbies</span>
                            </th>
                          </tr>
                          <tr>
                            <td>
                              <ul>
                                {data[3].map((hobbies, index) => (
                                  <li key={index} value={hobbies} index={index}>{hobbies.name}</li>
  
                                ))}
                              </ul>
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                  <div className="col-sm-1">
                  </div>
                </div>
              </div>
            )
          return null
        }}
      </Async>
    );
  }
}
export default Home;