const express = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');

router.post('/blockrep', (req, resx) => {
  axios.post('http://192.168.137.1:3000/employee/changereps', JSON.parse(JSON.stringify(req.body)))
    .then((resg) => {

    })
    .catch((error) => {
      console.error(error);
    })
  router.get('/employer/base');
})

router.post('/verif', (req, resx) => {
  axios.post('http://192.168.137.1:3000/employee/verifreq', req.body)
    .then((res) => {
      axios.post('http://192.168.137.1:3000/employee/changeverif', req.body)
        .then((resa) => {})
        .catch((error) => {
          console.error(error)
        })
    })
    .catch((error) => {
      console.error(error)
    })

  resx.redirect('/user/resume');
})

// router.post('/changeverif', (req, resx) => {
//   axios.post('http://192.168.137.1:3000/employee/changeverif', req.body)
//     .then((resa) => {})
//     .catch((error) => {
//       console.error(error)
//     })
//     router.get('/employer/base');
// })

router.post('/verifcomplete',(req,resx)=>{
   axios.post('http://192.168.137.1:3000/employer/verifcomplete', req.body)
   .then((resb) => {})
   .catch((error) => {
     console.error(error);
   })
   router.get('/employer/base');
})

router.post('/submit', (req, resx) => {
  var flag;
  Object.keys(req.body).forEach(function(key) {
    if (key == 'workexsubmit') {
      req.body["verif"] = 0;
      flag = "w";
    }
    if (key == 'edusubmit') {
      req.body["verif"] = 0;
      flag = "e";
    }
    if (key == 'leadrosubmit') {
      flag = "l";
    }
    if (key == 'certifsubmit') {
      flag = "c";
    }
    if (key == 'projsubmit') {
      flag = "p";
    }
    if (key == 'adddetsubmit') {
      flag = "a";
    }
    if (key == 'skillsubmit') {
      flag = "s";
    }
    if (req.body[key] == "Submit")
      delete req.body[key];
  });

  if (flag == "w") {
    if (Array.isArray(req.session.user.resume.workexp)) {
      req.session.user.resume.workexp.push(JSON.parse(JSON.stringify(req.body)));
    } else {
      req.session.user.resume.workexp = [];
      req.session.user.resume.workexp.push(JSON.parse(JSON.stringify(req.body)));
    }
  }
  if (flag == "s") {
    if (Array.isArray(req.session.user.resume.skill)) {
      req.session.user.resume.skill.push(JSON.parse(JSON.stringify(req.body)));
    } else {
      req.session.user.resume.skill = [];
      req.session.user.resume.skill.push(JSON.parse(JSON.stringify(req.body)));
    }
  }
  if (flag == "e") {
    if (Array.isArray(req.session.user.resume.education)) {
      req.session.user.resume.education.push(JSON.parse(JSON.stringify(req.body)));
    } else {
      req.session.user.resume.education = [];
      req.session.user.resume.education.push(JSON.parse(JSON.stringify(req.body)));
    }
  }
  if (flag == "l") {
    if (Array.isArray(req.session.user.resume.responsib)) {
      req.session.user.resume.responsib.push(JSON.parse(JSON.stringify(req.body)));
    } else {
      req.session.user.resume.responsib = [];
      req.session.user.resume.responsib.push(JSON.parse(JSON.stringify(req.body)));
    }
  }
  if (flag == "c") {
    if (Array.isArray(req.session.user.resume.certification)) {
      req.session.user.resume.certification.push(JSON.parse(JSON.stringify(req.body)));
    } else {
      req.session.user.resume.certification = [];
      req.session.user.resume.certification.push(JSON.parse(JSON.stringify(req.body)));
    }
  }
  if (flag == "p") {
    if (Array.isArray(req.session.user.resume.project)) {
      req.session.user.resume.project.push(JSON.parse(JSON.stringify(req.body)));
    } else {
      req.session.user.resume.project = [];
      req.session.user.resume.project.push(JSON.parse(JSON.stringify(req.body)));
    }
  }
  if (flag == "a") {
    if (Array.isArray(req.session.user.resume.adddet)) {
      req.session.user.resume.adddet.push(JSON.parse(JSON.stringify(req.body)));
    } else {
      req.session.user.resume.adddet = [];
      req.session.user.resume.adddet.push(JSON.parse(JSON.stringify(req.body)));
    }
  }

  axios.post('http://192.168.137.1:3000/employee/updateres', req.session.user)
    .then((res) => {})
    .catch((error) => {
      console.error(error)
    })

  resx.redirect('/user/resume');
})

module.exports = router;
