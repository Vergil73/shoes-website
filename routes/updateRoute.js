const Router = require('express');
const routes = Router();
const isAdmin = require('../middleware/authMiddleware');
const { prevShoeData } = require('../controllers/updateController');
const { updateShoe } = require('../controllers/updateController');
const { addShoe } = require('../controllers/updateController');
const { deleteShoe } = require('../controllers/updateController')


routes.get('/addShoe', (req, res) => {
    res.render('addShoe');
});

routes.get('/update/:shoeId', prevShoeData);

// Updates the shoe
routes.post('/updateSubmit', updateShoe);

// Delete shoe
routes.post('/deleteShoe', deleteShoe);

// Add new shoe
routes.post('/addShoe', addShoe);


module.exports = routes;