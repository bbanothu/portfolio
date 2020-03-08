import React, { Component } from 'react';
import Async from "react-async"
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import Loading from "./images/loading.svg";
// import "./styles.css"
class projects extends Component {
  constructor(props) {
    super(props);
  }


  loadJson = () =>
    fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getProjects")
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json())

  render() {
    return (


      <Async promiseFn={this.loadJson}>
        {({ data, error, isLoading }) => {
          if (isLoading) return <div style={{ marginTop: "5em" }}>
            <img src={Loading} style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }} ></img></div>
          if (error) return `Something went wrong: ${error.message}`
          if (data)
          return (
            <Tabs defaultTab={data[0].title} vertical style={{ color: "white", marginTop: "5em" }}>
              <TabList className="shadow p-3 mb-5 bg-white rounded mt-4 ml-3 " style={{ height: "80%" }}>
                {data.map((project, index) => (
                  <Tab tabFor={project.title} >{project.title}</Tab>
                ))}
              </TabList>
              {data.map((project, index) => (
                <TabPanel tabId={project.title} style={{ color: "black", width: "80%" }}>
                  <div className="shadow p-3 mb-5 bg-white rounded mt-4 ml-3 ">
                    <h1><a style={{ textDecoration: "none", color: "black" }} href={project.github}>{project.title}</a></h1>
                    <p>My Role: {project.role}</p>
                    <p>Project Description: {project.description}</p>
                    <p>Technologies Used: {project.tech}</p>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="thumbnail">
                            <img alt="" src={project.image} style={{ width: "100%" }} ></img>
                            <div className="caption">
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="thumbnail">
                            <img alt="" src={project.image1} style={{ width: "100%" }}></img>
                            <div className="caption">
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="thumbnail">
                            <img alt="" src={project.image2} style={{ width: "100%" }}></img>
                            <div className="caption">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              ))}
            </Tabs>
          )
          return null
        }}
      </Async>
    );
  }
}
export default projects;
