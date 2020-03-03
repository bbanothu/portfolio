import React from 'react';
import ExampleComponent from "react-rounded-image";
import Background from './images/bgaaa.jpg';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import './index.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  categories: {
    borderRadius: "25px",
    border: "solid",
    borderWidth: "thin",

    backgroundColor: "rgba(129, 139, 124, 0.1);",
    opacity: "90%",
    padding: "0px 4px 0px",
    height: "6px",
    fontSize: "0.9em",
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  // For retriving all data for this page
  const [aboutme, aboutmePut] = useState([])
  const [skills, skillsPut] = useState([])
  const [work, workPut] = useState([])
  const [hobbies, hobbiesPut ] = useState([])

  useEffect(() => {
    async function fetchData() {
      const aboutme = [];
      var skills;
      var work;
      var hobbies;
      await axios.all([
        axios.get('https://us-central1-portfolio-6b427.cloudfunctions.net/getAboutMe'),
        axios.get('https://us-central1-portfolio-6b427.cloudfunctions.net/getSkills'),
        axios.get('https://us-central1-portfolio-6b427.cloudfunctions.net/getWork'),
        axios.get('https://us-central1-portfolio-6b427.cloudfunctions.net/getHobbies'),
      ])
      .then(responseArr => {
        //this will be executed only when all requests are complete
        aboutme.push(responseArr[0].data);
        skills = responseArr[1].data
        work = responseArr[2].data
        hobbies = responseArr[3].data
      });
      aboutmePut(aboutme);
      skillsPut(skills);
      workPut(work);
      hobbiesPut(hobbies);
    } fetchData()
  }, []);

  // Main Body
  return (
    <div style={{ fontSize: "16px", fontFamily: "Proxima Nova, sans-serif", lineHeight: "1.0rem", marginTop: "5em" }} >
      {aboutme.map((aboutme, index) => (

        <div key={index} className="shadow p-3 mb-5 rounded "
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
              <h3>{aboutme.name}</h3>
              <p>{aboutme.degree}</p>
              <p className="fa fa-graduation-cap"> {aboutme.college}</p><br />
              <p className="fa fa-map-marker"> {aboutme.currentlocation}</p>
            </div>
            <div className="col-sm-5">
              <br />
              <ExampleComponent
                image={aboutme.myface}
                roundedColor="white"
                imageWidth="150"
                imageHeight="150"
                roundedSize="13"
              />
            </div>
          </div>
        </div>
      ))}
      <br />
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
                      <span style={{ fontFamily: "Proxima Nova, sans-serif" }}> EDUCATION</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td >
                    <div className="row">
                      <div className="col-sm-1">
                        <img alt="isu" src="https://firebasestorage.googleapis.com/v0/b/portfolio-6b427.appspot.com/o/isu.png?alt=media&token=aa20d626-345e-41e2-bcd3-2224ba58dea6" height="40" width="40" ></img>
                        &nbsp; &nbsp;
                      </div>
                      <div className="col-sm-11 pl-4" style={{ verticalAlign: "center" }}>
                        Iowa State University <br />
                        <p className="fa fa-calendar"> 2015-2019</p>
                      </div>
                    </div>
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
                  <td >LANGUAGES <br />  <br />
                    <p style={{ display: "inline", wordBreak: "keep-all", marginRight: "5px" }} className={classes.categories}>English</p>
                    <p style={{ display: "inline", wordBreak: "keep-all", marginRight: "5px" }} className={classes.categories}>Hindi</p>
                    <p style={{ display: "inline", wordBreak: "keep-all", marginRight: "5px" }} className={classes.categories}>Telegu</p>
                  </td>
                </tr>
                <tr>
                  <td style={{ display: "inline", paddingLeft: "15px", lineHeight: "1.5em" }} >
                    <p>SKILLS</p>
                    {skills.map((skills, index) => (
                      <p key={index} className={classes.categories} style={{ display: "inline", wordBreak: "keep-all", whiteSpace: "nowrap", marginRight: "5px" }} value={skills} index={index}> {skills.name}</p>

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
                {work.map((work, index) => (
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
                      {hobbies.map((hobbies, index) => (

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
  );
}


