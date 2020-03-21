import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "./actions";
import Async from "react-async"
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import Loading from "./images/loading.svg";
import "./css/index.css"
import ExampleComponent from "react-rounded-image";
class Home extends Component {

  // Single fetch
  async loadJson() {
    var data = [];
    const promise1 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getNewProjects").then(res => res.json())
    const promise2 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getProjects").then(res => res.json())
    const promise3 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getNewProjectTasks").then(res => res.json())

    const promise4 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getAboutMe").then(res => res.json())
    const promise5 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getSkills").then(res => res.json())
    const promise6 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getWork").then(res => res.json())
    const promise7 = fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getHobbies").then(res => res.json())


    data = Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7]);
    return data;
  }



  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { isLoggingOut, logoutError } = this.props;

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
              <div>
                <Tabs defaultTab={data[0][0].title} vertical style={{ color: "white", marginTop: "3em" }}>
                  <TabList className="shadow p-3 mb-5 bg-white  mt-4 ml-3 " style={{ height: "80%" }}>
                    <Tab tabFor="AboutMe" >About Me</Tab>
                    <Tab tabFor="Skills" >Skills</Tab>
                    <Tab tabFor="WorkExperience" >Work Experience</Tab>
                    <Tab tabFor="Hobbies" >Hobbies</Tab>
                    {data[0].map((project, index) => (
                      <Tab key={index} tabFor={project.title} >{project.title}</Tab>
                    ))}
                    {data[1].map((project, index) => (
                      <Tab key={index} tabFor={project.title} >{project.title}</Tab>
                    ))}
                  </TabList>
                  <TabPanel tabId="AboutMe" style={{ color: "black", width: "80%" }}>
                    <div className="shadow p-3 mb-5 mt-4 bg-white  ">
                      <div className="row">
                        <div className="col-sm-1">
                        </div>
                        <div className="col-sm-6" >
                          <br />
                          <h3>{data[3].name}</h3>
                          <p>{data[3].degree}</p>
                          <p className="fa fa-graduation-cap"> {data[3].college}</p><br />


                          <p className="fa fa-map-marker">
                            <form>
                              <label>
                                <input type="text" name="location" defaultValue={data[3].currentlocation} />
                              </label>

                              <input type="submit" value="Submit" />
                            </form>
                          </p>
                        </div>
                        <div className="col-sm-5">
                          <br />
                          <ExampleComponent
                            image={data[3].myface}
                            roundedColor="white"
                            imageWidth="150"
                            imageHeight="150"
                            roundedSize="13"
                          />
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel tabId="Skills" style={{ color: "black", width: "80%" }}>
                    <div className="shadow p-3 mb-5 mt-4 bg-white  ">
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
                              {data[4].map((skills, index) => (
                                <p id="ovalOutline" key={index} value={skills} index={index}> {skills.name}</p>
                              ))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabPanel>


                  <TabPanel tabId="WorkExperience" style={{ color: "black", width: "80%" }}>
                    <div className="shadow p-3 mb-5 mt-4 bg-white  ">
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
                          {data[5].map((work, index) => (
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
                  </TabPanel>


                  <TabPanel tabId="Hobbies" style={{ color: "black", width: "80%" }}>
                    <div className="shadow p-3 mb-5 mt-4 bg-white  ">
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
                                {data[6].map((hobbies, index) => (
                                  <li key={index} value={hobbies} index={index}>{hobbies.name}</li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </TabPanel>

                  {data[0].map((project, index) => (
                    <TabPanel key={index} tabId={project.title} style={{ color: "black", width: "80%" }}>
                      <div className="shadow p-3 mb-5 bg-white rounded mt-4  ">
                        <h1><a style={{ textDecoration: "none", color: "black" }} href={project.github}>{project.title}</a></h1>
                        <p>My Role: {project.role}</p>
                        <p>Project Description: {project.description}</p>
                        <p>Technologies Used: {project.tech}</p>
                      </div>
                      <div className="shadow p-3 mb-5 bg-white rounded mt-2 ">
                        <div className="row container table-responsive">
                          <h3>Current Tasks</h3>
                          <table className="table table-hover table-borderless ">
                            <thead className="thead-dark">
                              <tr>
                                <th scope="col">Task</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">End Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data[2].filter(project1 => project1.id.includes(project.title)).map((project1, index) => (
                                <tr key={index} index={index}>
                                  <th>{project1.task}</th>
                                  <td>{project1.startdate}</td>
                                  <td>{project1.status}</td>
                                  <td>{project1.enddate}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabPanel>
                  ))}
                  {data[1].map((project, index) => (
                    <TabPanel key={index} tabId={project.title} style={{ color: "black", width: "80%" }}>
                      <div className="shadow p-3 mb-5 bg-white rounded mt-4 ml-3 ">
                        <h1><a style={{ textDecoration: "none", color: "black" }} href={project.github}>{project.title}</a></h1>
                        <p>My Role: {project.role}</p>
                        <p>Project Description: {project.description}</p>
                        <p>Technologies Used: {project.tech}</p>
                      </div>
                    </TabPanel>
                  ))}
                </Tabs>
                <div className=" p-3 mb-5  rounded mt-5 ml-3 ">
                  <button type="button" className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
                  {isLoggingOut && <p>Logging Out....</p>}
                  {logoutError && <p>Error logging out</p>}
                </div>
              </div>
            )
          return null
        }}
      </Async>
    );

  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}

export default connect(mapStateToProps)(Home);