const moment = require('moment');
const jwt = require('jwt-simple');

// const uuidV4 = require('uuid/v4');
// console.log(uuidV4());

function encodeToken(user) {
  console.log(user.id);
  const payload = {
    exp: moment().add(1, 'days').unix(),
    iat: moment().unix(),
    sub: user.id
    };    
  return jwt.encode(payload, process.env.TOKEN_SECRET);
}

function decodeToken(token, callback) {  
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);  
    const now = moment().unix();
    // check if the token has expired
    if (now > payload.exp) callback('Token has expired.');
    else callback(null, payload);
}
  
function getToken(headers) {
  var header = headers.authorization.split(' ');
  return(header[1]);
}

module.exports = {
    encodeToken,
  decodeToken,
    getToken
};