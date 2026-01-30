const { pool } = require('../data/dbConnection');

async function prevShoeData(req, res) {
    try {
        const shoeId = req.params.shoeId;

        // const rows = await pool.query("SELECT name, brand, gender, category, price, is_in_inventory, items_left, imageurl FROM shoes_info WHERE id=$1", [ shoeId ]);
        const {rows} = await pool.query("SELECT * FROM shoes_info WHERE id=$1", [ shoeId ]);
        const result = rows;
        
        res.render('update', { result });

    } catch (error) {
        console.log('Error in the add shoe', error);
    }
}

async function updateShoe(req, res){
    try {
        const id = req.body.id;
        const name = req.body.name;
        const brand = req.body.brand;
        const gender = req.body.gender;
        const category = req.body.category;
        const price = req.body.price;

        let inventory; 
        if (req.body.is_in_inventory === 'true') {
            inventory = true;
            } else {
            inventory = false;
        }
        
        const itemsLeft = req.body.itemsLeft;
        const imageurl = req.body.imageurl;


       await pool.query("UPDATE shoes_info SET name=$1, brand=$2, gender=$3, category=$4, price=$5, is_in_inventory=$6, items_left=$7, imageurl=$8 WHERE id= $9", [name, brand, gender, category, price, inventory, itemsLeft, imageurl, id]);

        res.redirect('/collection');


    } catch (error) {
        console.log('Error in the post request of update shoe', error);
        
    }
}

async function deleteShoe(req, res){
    try {
        const id = req.body.id;
        await pool.query("DELETE FROM shoes_info WHERE id=$1;", [id]);
        res.redirect('/collection');

    } catch (error) {
        console.log('Error in the Delete Shoe', error);
    }
}


async function addShoe(req, res) {
    try {
        
        // const id = req.body.id;
        const name = req.body.name;
        const brand = req.body.brand;
        const gender = req.body.gender;
        const category = req.body.category;
        const price = req.body.price;
        
        let inventory; 
        if (req.body.is_in_inventory === 'true') {
            inventory = true;
        } else {
            inventory = false;
        }


        const itemsLeft = req.body.items_left;
        const imageurl = req.body.imageurl;

        await pool.query("INSERT INTO shoes_info(name, brand, gender, category, price, is_in_inventory, items_left, imageurl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [name, brand, gender, category, price, inventory, itemsLeft, imageurl]); 

        res.redirect('/collection')

    } catch (error) {
        console.log('Error in the Add Shoe', error);
    }
}




module.exports = { prevShoeData, updateShoe, addShoe, deleteShoe };