import React, { Component } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Collapse,
} from "@material-ui/core";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: "",
      searchValTags: "",
      newTag: "",
      refreshUsersBool: true,
      students: this.props.studentsArray,
      searchUsers: this.props.studentsArray,
      toggleVals: this.props.toggleVals,
    };
    this.searchUser = this.searchUser.bind(this);
    this.toggleDiv = this.toggleDiv.bind(this);
  }

  // Handle Changes Functions
  handleChangeName(e) {
    this.setState({
      searchVal: e.target.value,
    });
    this.searchUser(e.target.value, this.state.searchValTags);
  }

  handleChangeTags(e) {
    this.setState({
      searchValTags: e.target.value,
    });
    this.searchUser(this.state.searchVal, e.target.value);
  }

  handleChangeAddTags(e) {
    this.setState({
      newTag: e.target.value,
    });
  }

  toggleDiv(index) {
    this.state.toggleVals[index] = !this.state.toggleVals[index];
    this.refreshUsers();
  }

  refreshUsers = () =>
    this.setState({ refreshUsersBool: !this.state.refreshUsersBool });

  // Core Functions
  addNewtags(firstName) {
    for (var i = 0; i < this.state.students.length; i++) {
      if (this.state.students[i].firstName === firstName) {
        this.state.students[i].tags.push(this.state.newTag);
      }
    }
  }

  searchUser(searchVal, tags) {
    var returnUsers = [];
    for (var i = 0; i < this.state.students.length; i++) {
      var firstName = this.state.students[i].firstName;
      var lastName = this.state.students[i].lastName;
      firstName = firstName.toLowerCase();
      lastName = lastName.toLowerCase();
      tags = tags.toLowerCase();
      searchVal = searchVal.toLowerCase();
      var searchVallength = searchVal.length;
      var tagsLength = tags.length;
      if (
        firstName.substring(0, searchVallength) === searchVal ||
        lastName.substring(0, searchVallength) === searchVal
      ) {
        // if (firstName.includes(searchVal) || lastName.includes(searchVal)) {
        if (tags !== "") {
          for (var j = 0; j < this.state.students[i].tags.length; j++) {
            if (
              this.state.students[i].tags[j]
                .substring(0, tagsLength)
                .toLowerCase() === tags
            ) {
              // if (this.state.students[i].tags[j].includes(tags)) {
              returnUsers.push(this.state.students[i]);
              break;
            }
          }
        } else {
          returnUsers.push(this.state.students[i]);
        }
      }
    }
    this.setState({ searchUsers: returnUsers });
  }

  // Render Function
  render() {
    return (
      <div className="App">
        <div className="container" style={{ paddingTop: "20px" }}>
          <Card style={{ alignContent: "top" }}>
            <div
              className="row"
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
            >
              <TextField
                id="name-input"
                label="Search By name"
                multiline
                fullWidth
                onChange={this.handleChangeName.bind(this)}
              />
            </div>
            <div
              className="row"
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
            >
              <TextField
                id="tag-input"
                label="Search By Tag"
                multiline
                fullWidth
                onChange={this.handleChangeTags.bind(this)}
              />
            </div>
            <div refresh={this.state.refreshUsers}>
              {this.state.searchUsers.map((student, index) => (
                <div key={index}>
                  <div className="row">
                    <div className="col-sm-3">
                      <img
                        src={student.pic}
                        alt="Avatar"
                        style={{
                          borderRadius: "75%",
                          height: "110px",
                          width: "110px",
                          border: "1px solid grey",
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "20px",
                        }}
                      ></img>
                    </div>
                    <div className="col-sm-9">
                      <CardContent>
                        <div className="row">
                          <div className="col-sm-9">
                            <Typography>
                              <h2
                                style={{
                                  textAlign: "left",
                                  fontWeight: "bold",
                                  textTransform: "uppercase",
                                }}
                              >
                                {student.firstName} {student.lastName}
                              </h2>
                            </Typography>
                            <div
                              style={{
                                paddingLeft: "20px",
                              }}
                            >
                              <Typography style={{ textAlign: "left" }}>
                                Email: {student.email}
                              </Typography>
                              <Typography style={{ textAlign: "left" }}>
                                Comapny: {student.company}
                              </Typography>
                              <Typography style={{ textAlign: "left" }}>
                                Skill: {student.skill}
                              </Typography>
                              <Typography style={{ textAlign: "left" }}>
                                Average: {student.average}
                              </Typography>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            {(() => {
                              if (this.state.toggleVals[index]) {
                                return (
                                  <div
                                    className="expand-btn"
                                    onClick={this.toggleDiv.bind(this, index)}
                                  >
                                    <svg
                                      class="bi bi-dash"
                                      width="2em"
                                      height="2em"
                                      viewBox="0 0 16 16"
                                      fill="currentColor"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    onClick={this.toggleDiv.bind(this, index)}
                                    className="expand-btn"
                                  >
                                    <svg
                                      class="bi bi-plus"
                                      width="2em"
                                      height="2em"
                                      viewBox="0 0 16 16"
                                      fill="currentColor"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z"
                                        clip-rule="evenodd"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                );
                              }
                            })()}
                          </div>
                        </div>
                      </CardContent>

                      <Collapse
                        in={this.state.toggleVals[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent
                          style={{ paddingLeft: "40px", textAlign: "left" }}
                        >
                          {student.grades.map((grades, index) => (
                            <Typography key={index}>
                              Test {index} : {grades}%
                            </Typography>
                          ))}
                          <div>
                            {student.tags.map((tags, index) => (
                              <div
                                className="btn btn-disabled btn-outline-dark btn-sm"
                                key={index}
                                variant="outline-dark"
                                size="sm"
                                style={{ marginLeft: "5px" }}
                              >
                                {tags}
                              </div>
                            ))}
                          </div>
                          <div
                            className="row"
                            style={{ paddingLeft: "20px", textAlign: "left" }}
                          >
                            <TextField
                              id="add-tag-input"
                              label="Add a tag"
                              multiline
                              onChange={this.handleChangeAddTags.bind(this)}
                            />
                            <Button
                              size="sm"
                              style={{ marginLeft: "10px" }}
                              onClick={this.addNewtags.bind(
                                this,
                                student.firstName
                              )}
                            >
                              Add tag
                            </Button>
                          </div>
                        </CardContent>
                      </Collapse>
                    </div>
                  </div>
                  <hr></hr>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
