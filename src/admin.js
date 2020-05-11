import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "./actions";
import Async from "react-async";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import Button from "react-bootstrap/Button";
import ImageUploader from "react-images-upload";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Collapse,
} from "@material-ui/core";
import Loading from "./images/loading.svg";
import "./css/index.css";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValTags: "",
      projectTitle: "",
      role: "",
      projectDescription: "",
      techUsed: "",
      pictures: [],
    };
    this.addPictures = this.addPictures.bind(this);
  }
  // Single fetch
  async loadJson() {
    var data = [];
    const promise1 = fetch(
      "https://us-central1-portfolio-6b427.cloudfunctions.net/getNewProjects"
    ).then((res) => res.json());
    const promise2 = fetch(
      "https://us-central1-portfolio-6b427.cloudfunctions.net/getProjects"
    ).then((res) => res.json());
    const promise3 = fetch(
      "https://us-central1-portfolio-6b427.cloudfunctions.net/getNewProjectTasks"
    ).then((res) => res.json());

    data = Promise.all([promise1, promise2, promise3]);
    return data;
  }
  changeProjectTitle(e) {
    this.setState({
      projectTitle: e.target.value,
    });
  }
  changeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }
  changeProjectDescription(e) {
    this.setState({
      projectDescription: e.target.value,
    });
  }
  changetTechUsed(e) {
    this.setState({
      techUsed: e.target.value,
    });
  }

  addPictures(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
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
          if (isLoading)
            return (
              <div style={{ marginTop: "3em" }}>
                <img
                  alt="loading"
                  src={Loading}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                ></img>
              </div>
            );
          if (error) return `Something went wrong: ${error.message}`;
          if (data)
            return (
              <div>
                <Tabs
                  defaultTab="Add New Project"
                  vertical
                  style={{ color: "white", marginTop: "3em" }}
                >
                  <TabList
                    className="shadow p-3 mb-5 bg-white  mt-4 ml-3 "
                    style={{ height: "80%" }}
                  >
                    <Tab tabFor="Add New Project">Add New Project</Tab>

                    {data[0].map((project, index) => (
                      <Tab key={index} tabFor={project.title}>
                        {project.title}
                      </Tab>
                    ))}
                    {data[1].map((project, index) => (
                      <Tab key={index} tabFor={project.title}>
                        {project.title}
                      </Tab>
                    ))}
                  </TabList>
                  <TabPanel
                    tabId="Add New Project"
                    style={{ color: "black", width: "80%" }}
                  >
                    <div className="shadow p-3 mb-5 bg-white rounded mt-4  ">
                      <p
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        Project Title:
                        <TextField
                          id="add-tag-input"
                          label="Add a tag"
                          multiline
                          onChange={this.changeProjectTitle.bind(this)}
                        />
                      </p>
                      <p>
                        My Role:
                        <TextField
                          id="add-tag-input"
                          label="Add a tag"
                          multiline
                          onChange={this.changeRole.bind(this)}
                        />
                      </p>
                      <p>
                        Project Description:
                        <TextField
                          id="add-tag-input"
                          label="Add a tag"
                          multiline
                          onChange={this.changeProjectDescription.bind(this)}
                        />
                      </p>
                      <p>
                        Technologies Used:
                        <TextField
                          id="add-tag-input"
                          label="Add a tag"
                          multiline
                          onChange={this.changetTechUsed.bind(this)}
                        />
                      </p>

                      <ImageUploader
                        withIcon={true}
                        buttonText="Choose images"
                        onChange={this.onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                      />
                      <Button
                        style={{ marginLeft: "10px" }}
                        onClick={this.addPictures.bind(this, "hello")}
                      >
                        Add New Project
                      </Button>
                    </div>
                  </TabPanel>
                  {data[0].map((project, index) => (
                    <TabPanel
                      key={index}
                      tabId={project.title}
                      style={{ color: "black", width: "80%" }}
                    >
                      <div className="shadow p-3 mb-5 bg-white rounded mt-4  ">
                        <h1>
                          <a
                            style={{ textDecoration: "none", color: "black" }}
                            href={project.github}
                          >
                            {project.title}
                          </a>
                        </h1>
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
                              {data[2]
                                .filter((project1) =>
                                  project1.id.includes(project.title)
                                )
                                .map((project1, index) => (
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
                    <TabPanel
                      key={index}
                      tabId={project.title}
                      style={{ color: "black", width: "80%" }}
                    >
                      <div className="shadow p-3 mb-5 bg-white rounded mt-4 ml-3 ">
                        <h1>
                          <a
                            style={{ textDecoration: "none", color: "black" }}
                            href={project.github}
                          >
                            {project.title}
                          </a>
                        </h1>
                        <p>My Role: {project.role}</p>
                        <p>Project Description: {project.description}</p>

                        <p>Technologies Used: {project.tech}</p>
                      </div>
                    </TabPanel>
                  ))}
                </Tabs>
                <div className=" p-3 mb-5  rounded mt-5 ml-3 ">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </button>
                  {isLoggingOut && <p>Logging Out....</p>}
                  {logoutError && <p>Error logging out</p>}
                </div>
              </div>
            );
          return null;
        }}
      </Async>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}

export default connect(mapStateToProps)(Home);
