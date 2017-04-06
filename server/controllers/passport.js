var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var user = require('../dataSets/users');
var dbConnection = require('../../dbConnection');
dbConnection.connect();
// by default, if there was no name, it would just be called 'local'
passport.use('login',new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    console.log("khanh trigger the LocalStrategy");
    dbConnection.get().query("SELECT * FROM user WHERE email = ?",[username], function(err, rows){
      if (err){
          console.log('error form query dbConnection');
          return done(err);
      }    
      // if there is no user found for this email   
      if (!rows.length) {
          console.log('error form query dbConnection rows.length');
          return done(null, false, {
              message: 'User not found'
          });
      }
      // generate hash from user input password
      var hash = crypto.pbkdf2Sync(password, rows[0].salt, 1000, 64,'sha1').toString('hex');
      // if the user is found but the password is wrong
      if (hash != rows[0].hash){   // check if the generate hash match with the stored database hash
          return done(null, false, {
            message: 'Password is wrong'
          });
      }   
      // all is well, return successful user
      console.log('successful get user info'+ rows[0].userName);
          return done(null, rows[0]);
    });
  }
));

// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.accountID);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        dbConnection.get().query("SELECT * FROM user WHERE accountID = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });