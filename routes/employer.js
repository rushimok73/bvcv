const express = require('express');
const session = require('express-session');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const axios = require('axios');
const ejsLint = require('ejs-lint');

var ssn;


router.get('/login', (req, res)=>{
  ssn = req.session;
  if(ssn.user){
    res.redirect('/employer/base');
  } else {
    res.render('employerlogin');
  }
});

router.get('/base', (req, res) => {
  ssn = req.session;
  if(ssn.user){
    axios.post('http://192.168.137.1:3000/employer/verifreq', {
    "email": ssn.user.email
    })
      .then((resy) => {
        ssn.profile = resy.data;
        res.render('employerpage', {
          user: ssn.user,
          profile: ssn.profile
        });
      })
      .catch((errorx) => {
        console.error(errorx)
      })
  } else {
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/employer/login');
  }
});

router.post('/login', (req,resx)=>{
  axios.post('http://192.168.137.1:3000/employer/login', {
  "email": req.body.email,
  "password": req.body.password
  })
    .then((res) => {
      ssn = req.session;
      ssn.user = res.data[0];
      resx.redirect('/employer/base');
    })
    .catch((error) => {
      console.error(error)
    })
})

// Logout
router.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/employer/login');
    }
  });
});

module.exports = router;
