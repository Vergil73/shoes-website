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
  cookie: {
    secure: false,
    maxAge: 60000
  }
  }
))

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




app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Is Running On Port ${process.env.PORT}`);
})


// express, ejs, pg, nodemon, dotenv