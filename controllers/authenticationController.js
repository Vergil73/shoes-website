const { pool } = require('../data/dbConnection');
const bcrypt = require('bcrypt');

function validatePassword(paswd){
    const regex = /[^A-Za-z0-9]/;
    const num = /[0-9]/;
    return typeof paswd === 'string' && paswd.length >= 8 && regex.test(paswd) && num.test(paswd) ;
}

async function storeCredentials(req, res) {
    try {
        // get all user details from the input form
        const username = req.body.username;
        const email = req.body.email;
        const plainPassword = req.body.password;


        const rows = await pool.query("SELECT id FROM users WHERE name = $1 OR email = $2", [username, email]);
        const check = rows;

        if (check.length > 0) { //checks for the duplicate username and email 
            res.render('createAccount', {
                error: 'username or email is already taken'
            })
        } else {
            if (validatePassword(plainPassword)) { //
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = await bcrypt.hash(plainPassword, salt);
                
                await pool.query('INSERT INTO users(name, email, password_hash) VALUES($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
                res.redirect('/signIn');
            } else {
                res.render('createAccount', {
                    error: 'Username or email taken',
                    oldUsername: username,
                    oldEmail: email
                });
            }   

        }
            
    } catch(err){
        console.log("Error while creating new account", err);
    }
};

async function login(req, res) {

    try {
        // getting the input forms
        const username = req.body.username;
        const plainPassword = req.body.password;

        const { rows } = await pool.query("SELECT password_hash FROM users WHERE name = $1 OR email = $2", [username, username]);


        if(rows.length > 0){
            const password_hash = rows[0].password_hash; // stored hash password in the database
            const match = await bcrypt.compare(plainPassword, password_hash); // compares the database hashed password with the plain pasword of user
            if(match){
                console.log("SUCCESSFULL");
                res.redirect('/');
            } else{
                res.render('login', { error: "Invalid username or password" }); 
            }

        }else{
            console.log("user doesn't exist");
            res.render('login', { error: "Invalid username or password" }); 
        }

    } catch (error) {
        console.log('Error while logging in', error);
    }
};

module.exports = { storeCredentials, login };