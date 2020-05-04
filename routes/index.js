const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureAuthenticated } = require('../config/auth');



router.get('/', (req,res) => res.render('index'));

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req,res) =>
 res.render('dashboard',{
   user: req.user.name
 }));

module.exports = router;
