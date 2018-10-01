const User = require('../models/user');
const bcrypt = require('bcryptjs');
const localAuth = require('../auth/local');

const newUser = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json('incorrect form submission');
    }

    User.collection.ensureIndex({username: 1}, {unique: true})
    
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);      
        User.create({   
            username: username, 
            password: hash
        }, (err, user) => {
            if (err) {
                res.json("Username already exists");
            } else {                
                const token = localAuth.encodeToken(user);
                res.json(token);
            }
        });
}

module.exports = {
    newUser    
}



