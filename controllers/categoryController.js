const pool = require('../data/dbConnection');
const { shoesInfo } = require('./collectionController');

// brand, gender, category, price

async function shoeBrand(req, res) {
     try {
        const { result } = await pool.query ("SELECT * FROM shoes_info");
        const shoes = result.rows;
        console.log(shoes);
        res.render('/category');
       
    } catch (error) {
        console.log('Error while reading from database for all shoes: ', error);
    }
}



module.exports = { shoeBrand };







// async function shoeBrand(req, res) {
//     try {
//     const { row } = await pool.query("SELECT * FROM shoes_info WHERE brand=$1", [brand]);
        
//     } catch (error) {
//         console.log("Shoes Brand error in database: ", error);
//     }    
// }

// async function shoeBrand(req, res) {
//     try {
//     const { row } = await pool.query("SELECT * FROM shoes_info WHERE brand=$1", [brand]);
        
//     } catch (error) {
//         console.log("Shoes Brand error in database: ", error);
//     }    
// }

// async function shoeBrand(req, res) {
//     try {
//     const { row } = await pool.query("SELECT * FROM shoes_info WHERE brand=$1", [brand]);
        
//     } catch (error) {
//         console.log("Shoes Brand error in database: ", error);
//     }    
// }

// async function shoeBrand(req, res) {
//     try {
//     const { row } = await pool.query("SELECT * FROM shoes_info WHERE brand=$1", [brand]);
        
//     } catch (error) {
//         console.log("Shoes Brand error in database: ", error);
//     }    
// }