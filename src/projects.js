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
  useEffect(() => {
    db.collection('projects').get()
      .then(querySnapshot => {
        const projects = [];
        querySnapshot.docs.forEach(doc => {
          projects.push(doc.data());
        });
        setItems(projects);
        console.log(projects);
      });
  }, []);


  // Main Body
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >


        {projects.map((project, index) => (
          <Tab label={project.title}{...a11yProps({ index })} />
        ))}

      </Tabs>

      {projects.map((project, index) => (
        <TabPanel value={value} index={index}>
          <h1><a style={{ textDecoration: "none", color:"black" }}  href={project.github}>{project.title}</a></h1>
          <p>My Role: {project.role}</p>
          <p>Project Description: {project.description}</p>
          <p>Technologies Used: {project.tech}</p>


          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="thumbnail">
                  <img src={project.image} style={{ width: "100%" }} ></img>
                  <div class="caption">
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="thumbnail">
                  <img src={project.image1} style={{ width: "100%" }}></img>
                  <div class="caption">
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="thumbnail">
                  <img src={project.image1} style={{ width: "100%" }}></img>
                  <div class="caption">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </TabPanel>
      ))}


    </div>
  );
}


