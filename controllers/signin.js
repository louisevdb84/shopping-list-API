const User = require('../models/user');
const bcrypt = require('bcryptjs');
const localAuth = require('../auth/local');

const signIn = (req, res) => {    
    const { username, password } = req.body;
    User.find({username:username}, (err, user) => {
        if (err) {
            res.json(err);
        } else {            
            if (user[0]) {                
                const bool = bcrypt.compareSync(password, user[0].password);
                if (!bool)
                    res.json("Incorrect password")
                else {
                    const token = localAuth.encodeToken(user[0]);
                    res.json(token);               
                }
                    
            }   
            else {
                res.json("Incorrect username");
            }
        }
    })
}

module.exports = {
    signIn    
}
