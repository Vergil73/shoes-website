require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');

// express-session
const session = require('express-session');
// app.set('trust proxy', 1); trust proxy for https

app.use(session({
  secret: process.env.secretSession,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: false,
    maxAge: 10000 * 60 * 60
  }
  }
));
// checks for the admin user
app.use((req, res, next) => {
  res.locals.admin = req.session.isAdmin && true; 
  next();
});

// views
app.set('views', './views');
app.set('view engine', 'ejs');

// public
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// Use built-in middleware to parse JSON payloads
app.use(express.json());


// Homepage
const homepage = require('./routes/homepageRoute');
app.use('/', homepage);

// Menu page 
const collection = require('./routes/collectionRoute');
app.use('/',collection);

// Contact page
const contact = require('./routes/contactRoute');
app.use('/', contact);

// About us page
const aboutUs = require('./routes/aboutRoute');
app.use('/', aboutUs);

// Authentication
const authentication = require('./routes/authenticationRoute');
app.use('/', authentication);

// Update
const update = require('./routes/updateRoute');
app.use('/', update);

// ERROR: page 404 not found
app.use((req, res, next) => {
  const err = new Error('Page not found. '); //Error message for page not found
  err.status = 404;
  next(err); //Sends the err funcion to error handling below
});

// Error handling in the server
app.use((err, req, res, next) => {
  const status = err.status || 500;  //checks whether the status us 404 or 500

  res.status(status).render('error', { 
    status,
    message: err.message || 'Something went wrong'
  });

  // console.error(err); this is not working as expected

});

app.listen(process.env.PORT || 3000, () => {
  const PORT = process.env.PORT || 3000
  console.log(`Server Is Running On Port ${process.env.PORT || 3000}`);
});

// express, ejs, pg, nodemon, dotenv