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