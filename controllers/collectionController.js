const { pool } = require('../data/dbConnection');



// All information on the shoes
async function shoesInfo(req, res){
    try {
        const result = await pool.query ("SELECT * FROM shoes_info");
        const shoes = result.rows;

        let brand = [];
        let gender = [];
        let category = [];
        // let price = [];

        shoes.forEach(shoe => {
            const currbrand = shoe.brand
            const currgender = shoe.gender;
            const currcategory = shoe.category;
            const currprice = shoe.price;

            if(!brand.includes(currbrand))
                brand.push(currbrand);

            if(!gender.includes(currgender))
                gender.push(currgender);

            if(!category.includes(currcategory))
                category.push(currcategory);

            // if(!price.includes(currprice))
            //     price.push(currprice);
            
        }); 
    

        res.render('collection', {shoes, brand, gender, category});
        

       

    } catch (error) {
        console.log('Error while reading from database for all shoes: ', error);
    }
}


// async function shoeBrand(req, res) {
//     try {
//         const { rows } = await pool.query("SELECT brand FROM shoes_info");
//         console.log("sd");
//         res.render('collection', { rows });

//     } catch (error) {
//         console.log('Error while reading from database for shoe brand: ', error);
//     }    
// }








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