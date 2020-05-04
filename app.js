const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();
const db = require('./config/keys').MongoURI;
const ejsLint = require('ejs-lint');


app.use(express.static('public'));

// Passport Config
require('./config/passport')(passport);

//connect to mongodb
mongoose.connect(db, { useNewUrlParser: true,useUnifiedTopology: true})
  .then(() => console.log("mdb connected"))
  .catch(err => console.log(err));

//EJS
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({extended: false}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use('/', require('./routes/index.js'));
app.use('/user', require('./routes/user.js'));
app.use('/forms', require('./routes/forms.js'));
app.use('/employer', require('./routes/employer.js'));

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
