const express = require('express');
const session = require('express-session');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const axios = require('axios');
const ejsLint = require('ejs-lint');

var ssn;
// Login Page
router.get('/login', (req, res)=>{
  ssn = req.session;
  if(ssn.user){
    res.redirect('/user/resume');
  } else {
    res.render('login');
  }
});

router.get('/resume', (req, res) => {
  ssn = req.session;
  if(ssn.user){
    res.render('resumepage', {
      user: ssn.user
    });
  } else {
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/user/login');
  }
});

// Register Page
router.get('/register', (req, res)=>{
  ssn = req.session;
  if(ssn.user){
    res.redirect('/user/resume');
  } else {
    res.render('register');
  }
});

router.post('/register', (req, resx) => {
  const {
    fname,
    lname,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  //check req fields
  if (!fname ||!lname || !email || !password || !password2) {
    errors.push({
      msg: 'Please fill in all the fields'
    });
  }

  //Check passwords match
  if (password !== password2) {
    errors.push({
      msg: 'Passwords dont match'
    });
  }

  //Password length
  if (password.length < 6) {
    errors.push({
      msg: 'Password must be at least 6 characters'
    });
  }

  if (errors.length > 0) {
    resx.render('register', {
      errors,
      fname,
      lname,
      email,
      password,
      password2
    })
  } else {
    //Validation passed
    axios.post('http://192.168.137.1:3000/employee/signup', {
      "fname": fname,
      "lname": lname,
      "email": email,
      "password": password
    })
      .then((res) => {
        if(res.data.message == 'you have successfully registered'){
          req.flash('success_msg', res.data.message);
          resx.redirect('/user/login');
        } else {
          req.flash('error_msg', res.data.message);
          resx.redirect('/user/register');
        }
      })
      .catch((error) => {
        console.error(error)
      })
}
});

router.post('/login', (req,resx)=>{
  axios.post('http://192.168.137.1:3000/employee/login', {
  "email": req.body.email,
  "password": req.body.password
  })
    .then((res) => {
      ssn = req.session;
      ssn.user = res.data[0];
      resx.redirect('/user/resume');
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
      res.redirect('/user/login');
    }
  });
});
module.exports = router;
