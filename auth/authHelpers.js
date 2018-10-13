const localAuth = require('./local');
const User = require('../models/user');

function ensureAuthenticated(req, res, next) {  
  const { auth } = req.body;  
  
    if (!(req.body && auth)) {
      res.json('Not logged in');
    }
    // decode the token
  
    // var header = auth.split('.');
    // console.log(header);
    // var token = header[1];
    
    localAuth.decodeToken(auth, (err, payload) => {
      if (err) {
        res.json('Token has expired');
      } else {
        // check if the user still exists in the db  
        
           User.find({_id:payload.sub}, (err, user) => {
            if (err) {
                res.json(err);
            } else {                
                //res.json(user);
              res.json(true);
            }        
        });
      }
    });
}

function getLoggedInUser(headers, callback) {
  if (!(headers && headers.authorization)) {
    callback('Please log in');
  }
  
  var header = headers.authorization.split(' ');
  var token = header[1];
  
  localAuth.decodeToken(token, (err, payload) => {
    if (err) {
      callback('Token has expired');
    } else {      
      User.find({_id:payload.sub}, (err, user) => {
        if (err) {
            callback(err);
        } else {                      
          callback(user);
        }            
      })
      .catch((err) => {
        callback('error');   
      });
    }
  });
}


  
module.exports = {    
  ensureAuthenticated,
  getLoggedInUser
  
  };