const localAuth = require('./local');
const User = require('../models/user');

function ensureAuthenticated(req, res, next) {
    const { authorization } = req.body;
    if (!(req.body && authorization)) {
      return res.status(400).json({
        status: 'Please log in'
      });
    }
    // decode the token
    
    // var header = authorization.split('.');
    // console.log(header);
    // var token = header[1];
    localAuth.decodeToken(authorization, (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 'Token has expired'
        });
      } else {
        // check if the user still exists in the db          
           User.find({_id:payload.sub}, (err, user) => {
            if (err) {
                res.json(err);
            } else {
                console.log(user);
                res.json(user);
            }
        
          //next();
        
        });
      }
    });
}
  
module.exports = {    
    ensureAuthenticated
  };