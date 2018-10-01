const moment = require('moment');
const jwt = require('jwt-simple');
//const uuidV4 = require('uuid/v4');
//uuidV4()

function encodeToken(id) {
  const playload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: id
    };    
  return jwt.encode(playload, process.env.TOKEN_SECRET);
}

function decodeToken(token, callback) {
    const payload = jwt.decode(token, process.env.TOKEN_SECRET);
    const now = moment().unix();
    // check if the token has expired
    if (now > payload.exp) callback('Token has expired.');
    else callback(null, payload);
  }

module.exports = {
    encodeToken,
    decodeToken
};