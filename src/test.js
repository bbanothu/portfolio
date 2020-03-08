import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import Async from "react-async"
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




  // For retriving all data for this page
  const [projects, projectItems] = useState([])
  useEffect(() => {
    async function fetchData() {
      var projects;
      await axios.get('https://us-central1-portfolio-6b427.cloudfunctions.net/getProjects').then((response) => {
        projects = response.data;
      })
      projectItems(projects);
    } fetchData()
  }, []);

  // Main Body
  return (
    <div className={classes.root} style={{ marginTop: "3em" }} id="smooth">
      <div className="col-sm-1.5" styles={{ height: "100%" }}>
        <div className="shadow p-3 mb-5 bg-white rounded mt-4 ml-3">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >


            {projects.map((project, index) => (
              <Tab key={index} label={project.title}{...a11yProps({ index })} />
            ))}

          </Tabs>
        </div>
      </div>
      <div className="col-sm-10" styles={{ height: "100%" }}>
        <div className="shadow p-3 mb-5 bg-white rounded mt-4 ml-3" id="smooth" >
          {projects.map((project, index) => (
            <TabPanel key={index}  value={value} index={index}>
              <h1><a style={{ textDecoration: "none", color: "black" }} href={project.github}>{project.title}</a></h1>
              <p>My Role: {project.role}</p>
              <p>Project Description: {project.description}</p>
              <p>Technologies Used: {project.tech}</p>
              {/* 
          <hr /> */}
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
                      <img alt=""  src={project.image2} style={{ width: "100%" }}></img>
                      <div className="caption">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          ))}
        </div>
      </div>
    </div>
  );
}

// const loadJson = () =>
// fetch("https://us-central1-portfolio-6b427.cloudfunctions.net/getProjects")
//     .then(res => (res.ok ? res : Promise.reject(res)))
//     .then(res => res.json())

// const App = () => (
//   <Async promiseFn={loadJson}>
//     {({ data, error, isLoading }) => {
//       if (isLoading) return "Loading..."
//       if (error) return `Something went wrong: ${error.message}`
//       if (data)
//         return (
//           <div>
//             <strong>Loaded some data:</strong>
//             <p>{data[0].description}</p>
//           </div>
//         )
//       return null
//     }}
//   </Async>
// )

// export default App;