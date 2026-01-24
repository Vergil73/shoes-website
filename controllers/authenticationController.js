const { pool } = require('../data/dbConnection');
const bcrypt = require('bcrypt');

function validPassword(paswd){
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


        const check = await pool.query("SELECT id FROM users WHERE name = $1 OR email = $2", [username, email]);


        if (check.rows.length > 0) { //checks for the duplicate username and email 
            res.render('createAccount', {
                error: 'username or email is already taken'
            })
        } else {
            if (validPassword(plainPassword)) { //
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = await bcrypt.hash(plainPassword, salt);
                console.log(hashedPassword);
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
    // getting the input forms
};


module.exports = { storeCredentials, login }