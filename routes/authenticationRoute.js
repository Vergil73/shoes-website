const express= require('express');
const routes= express.Router();

const { storeCredentials } = require('../controllers/authenticationController');
const { login } = require('../controllers/authenticationController')

// signup
routes.get('/signup', (req, res)=>{
    res.render('createAccount');
});

routes.post('/newAccount', storeCredentials);

// signin
routes.get('/signin', (req, res)=>{
    res.render('login');
});

routes.post('/login', login);


module.exports = routes;
