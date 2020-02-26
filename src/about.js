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
  const [aboutme, setItems] = useState([])
  useEffect(() => {
    db.collection('about').get()
      .then(querySnapshot => {
        const projects = [];
        querySnapshot.docs.forEach(doc => {
          aboutme.push(doc.data());
        });
        setItems(aboutme);
        console.log(aboutme);
      });
  }, []);


  // Main Body
  return (
    <div className="row">

      <div className="col-sm-6">
        {aboutme.map((about, index) => (
          <div value={value} index={index}>
            <div className="container">
              <h1>{about.name}</h1>
              <div className="container">
                <p>{about.degree}</p>
                <p>{about.college}</p>
                <p>{about.email}</p>
                <p><a href={about.linkedin}>{about.linkedin}</a></p>
                <p><a href={about.github}>{about.github}</a></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="col-sm-6">

      </div>
    </div>
  );
}


