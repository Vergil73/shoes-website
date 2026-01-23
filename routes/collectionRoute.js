const express = require('express');
const routes = express.Router();
const { shoesInfo } = require('../controllers/collectionController');
const { getSingleShoes } = require('../controllers/collectionController');
// const { categoriesList } = require('../controllers/categoryController');

// const { shoeBrand } = require('../controllers/categoryController');



// All shoes in the menu section
// routes.get('/collection', shoesInfo, categoriesList);
routes.get('/collection', shoesInfo);


// Single shoe details
routes.get('/shoes/:shoesName', getSingleShoes);

// Dynamic Brand
// routes.get('/brand/:name', shoeBrand;



module.exports = routes;