const User = require('../models/user');
const bcrypt = require('bcryptjs');

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
                else 
                    res.json(user);                
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
