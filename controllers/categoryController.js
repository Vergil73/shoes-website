const { pool } = require('../data/dbConnection');

// brand, gender, category, price



function categoriesList(shoes){
    
        // const shoes = req.shoes;
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

        return {brand, gender, category};
}

module.exports = { categoriesList };







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




// async function categoriesList(req, res){
//     try {
//         // const shoes = req.shoes;

//         let brand = [];
//         let gender = [];
//         let category = [];
//         // let price = [];

//         shoes.forEach(shoe => {
//             const currbrand = shoe.brand
//             const currgender = shoe.gender;
//             const currcategory = shoe.category;
//             const currprice = shoe.price;

//             if(!brand.includes(currbrand))
//                 brand.push(currbrand);

//             if(!gender.includes(currgender))
//                 gender.push(currgender);

//             if(!category.includes(currcategory))
//                 category.push(currcategory);

//             // if(!price.includes(currprice))
//             //     price.push(currprice);
            
//         }); 
    
//         res.render('/templats/category', {brand, gender, category});
               

//     } catch (error) {
//         console.log('Error while reading from database for categories list: ', error);
//     }
// }
