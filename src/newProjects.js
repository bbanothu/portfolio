import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import firestore from "./firestore";
const db = firestore.firestore();

function TabPanel(props) {
  // Required code for proper tabs 
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  // for retriving all the projects
  const [projects, setItems] = useState([])
  const [projects_tasks, setItems1] = useState([])
  useEffect(() => {
    db.collection('newProjects').get()
      .then(querySnapshot => {
        const projects = [];
        querySnapshot.docs.forEach(doc => {
          projects.push(doc.data());
        });
        setItems(projects);
      });
    db.collection("currentTasks")
      .orderBy("startdate", "asc").get()
      .then(querySnapshot => {
        const projects_tasks = [];
        querySnapshot.docs.forEach(doc => {
          projects_tasks.push(doc.data());
        });
        setItems1(projects_tasks);
      });
  }, []);


  // Main Body
  return (
    <div className={classes.root} id="smooth" style={{marginTop:"3em" }}>
      <div className="col-sm-1.5" styles={{ height: "100%" }}>
      <div class="shadow p-3 mb-5 bg-white rounded mt-4 ml-3">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          height=""
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >


          {projects.map((project, index) => (
            <Tab label={project.title}{...a11yProps({ index })} />
          ))}

        </Tabs>
        </div>
      </div>
      <div className="col-sm-10" styles={{ height: "100%" }}>
        {projects.map((project, index) => (
          
          <TabPanel value={value} index={index}>
            <div class="shadow p-3 mb-5 bg-white rounded ">
            <h1><a style={{ textDecoration: "none", color: "black" }} href={project.github}>{project.title}</a></h1>
            <p>My Role: {project.role}</p>
            <p>Project Description: {project.description}</p>
            <p>Technologies Used: {project.tech}</p>
            </div>
            {/* <hr /> */}
            <div class="shadow p-3 mb-5 bg-white rounded mt-2 ">
            <div className="row container">
              <h3>Current Tasks</h3>
              <table class="table table-hover table-borderless">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {projects_tasks.filter(project1 => project1.id.includes(project.title)).map((project1, index) => (
                    <tr value={value} index={index}>
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

      </div>

    </div>
  );
}


