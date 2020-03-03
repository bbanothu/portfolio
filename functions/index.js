const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();


exports.getAboutMe = functions.https.onRequest((req, res) => {
    const docRef = db.collection('about').doc('aboutme');
    const getDoc = docRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          res.set('Access-Control-Allow-Origin', '*');
          return res.send('Not Found')
        } 
          res.set('Access-Control-Allow-Origin', '*');
          return res.send(doc.data());
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
});

   exports.getSkills = functions.https.onRequest((req, res) => {
    const docRef = db.collection('skills').orderBy("name", "asc");
    const getDoc = docRef.get()
    
      .then(querySnapshot => {
        const projects = [];
        querySnapshot.docs.forEach(doc => {
          projects.push(doc.data());
        });
        res.set('Access-Control-Allow-Origin', '*');
          return res.send(projects);
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
   });


   exports.getWork = functions.https.onRequest((req, res) => {
    const docRef = db.collection('work');
    const getDoc = docRef.get()
    
      .then(querySnapshot => {
        const projects = [];
        querySnapshot.docs.forEach(doc => {
          projects.push(doc.data());
        });
        res.set('Access-Control-Allow-Origin', '*');
          return res.send(projects);
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
   });

   exports.getHobbies = functions.https.onRequest((req, res) => {
    const docRef = db.collection('hobbies');
    const getDoc = docRef.get()
    
      .then(querySnapshot => {
        const projects = [];
        querySnapshot.docs.forEach(doc => {
          projects.push(doc.data());
        });
        res.set('Access-Control-Allow-Origin', '*');
          return res.send(projects);
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
   });

   
   exports.getProjects = functions.https.onRequest((req, res) => {
    const docRef = db.collection('projects');
    const getDoc = docRef.get()
    
      .then(querySnapshot => {
        const projects = [];
        querySnapshot.docs.forEach(doc => {
          projects.push(doc.data());
        });
        res.set('Access-Control-Allow-Origin', '*');
          return res.send(projects);
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
   });

   exports.getNewProjects = functions.https.onRequest((req, res) => {
    const docRef = db.collection('newProjects');
    const getDoc = docRef.get()
    
      .then(querySnapshot => {
        const projects = [];
        querySnapshot.docs.forEach(doc => {
          projects.push(doc.data());
        });
        res.set('Access-Control-Allow-Origin', '*');
          return res.send(projects);
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
   });

   exports.getNewProjectTasks = functions.https.onRequest((req, res) => {
    const docRef = db.collection('currentTasks');
    const getDoc = docRef.orderBy("startdate", "asc").get()
    
      .then(querySnapshot => {
        const projects = [];
        querySnapshot.docs.forEach(doc => {
          projects.push(doc.data());
        });
        res.set('Access-Control-Allow-Origin', '*');
          return res.send(projects);
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
   });

