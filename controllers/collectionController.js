const { pool } = require('../data/dbConnection');
const { categoriesList } = require('./categoryController');

// All information on the shoes
async function shoesInfo(req, res){
    try {
        const result = await pool.query ("SELECT * FROM shoes_info");
        const shoes = result.rows;

        const { brand, gender, category } = categoriesList(shoes);
        
        const selectBrand = req.query.brand;
        const selectGender = req.query.gender;
        const selectCategory = req.query.category;

    
        if(selectBrand) {
            const { rows } = await pool.query("SELECT * FROM shoes_info WHERE brand= $1", [selectBrand]);
            const shoes = rows;
            res.render('collection', {shoes, brand, gender, category});
            
        } else if(selectGender){
            const { rows } = await pool.query("SELECT * FROM shoes_info WHERE gender= $1", [selectGender]);
            const shoes = rows;
            res.render('collection', {shoes, brand, gender, category});
            
        } else if(selectCategory){
            const { rows } = await pool.query("SELECT * FROM shoes_info WHERE category= $1", [selectCategory]);
            const shoes = rows;
           
            res.render('collection', {shoes, brand, gender, category});
            
        } else{
            res.render('collection', {shoes, brand, gender, category});
        }

    } catch (error) {
        console.log('Error while reading from database for all shoes: ', error);
    }
}


// Single shoes information
async function getSingleShoes(req, res){

    try{
        const shoeName = req.params.shoesName;
        const { rows } = await pool.query("SELECT * FROM shoes_info WHERE name= $1", [shoeName]);
        const singleShoe = rows;
        res.render('singleDetail', { singleShoe });
 

    } catch(err){
        console.log('Error while reading from database for all single shoes:', err);
    }
}



module.exports = { shoesInfo, getSingleShoes };



// Inserted into the postgress database from json

// const shoeData = require('../data/shoe.json');

// async function insertData(){
//     for(const shoe of Object.values(shoeData)) {
//         const insert = await pool.query("INSERT INTO shoes_info (name, brand, gender, category, price, is_in_inventory, items_left, imageurl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [shoe.name, shoe.brand, shoe.gender, shoe.category, shoe.price, shoe.is_in_inventory, shoe.items_left, shoe.imageURL]);
//     }
// }
// insertData();