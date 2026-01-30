const Router = require('express');
const routes = Router();


// Middleware
const isAdmin = require('../middleware/authMiddleware');


routes.get('/',(req, res)=>{
    res.render('homepage');
});

module.exports = routes;