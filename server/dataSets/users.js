var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var dbConnection = require('../../dbConnection');
dbConnection.connect();

module.exports.setPassword = function(password){
  var encrypt= this;
  encrypt.salt = crypto.randomBytes(16).toString('hex');
  encrypt.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha1').toString('hex');
  return encrypt; 
}

module.exports.validPassword = function(password,hash,salt) {
  console.log('khanh inside validPassword salt'+ salt+' hash'+ hash);
  var testhash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
  return hash === testhash;
}

module.exports.generateJwt = function(id,email,name) {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: id,
    email: email,
    name: name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // K H A N H testing !! should change this secret to env variables  
}

module.exports.getUserByEmail =function(userEmail, done) {
  db.get().query('SELECT * FROM users WHERE email = ? LIMIT 1', [userEmail], function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows[0]);
    done(rows[0]);
  });
}