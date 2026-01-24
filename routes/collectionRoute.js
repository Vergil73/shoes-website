const express = require('express');
const routes = express.Router();
const { shoesInfo } = require('../controllers/collectionController');
const { getSingleShoes } = require('../controllers/collectionController');

// All shoes in the menu section
routes.get('/collection', shoesInfo);


// Single shoe details
routes.get('/shoes/:shoesName', getSingleShoes);

module.exports = routes;