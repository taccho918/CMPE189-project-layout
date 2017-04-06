require('./passport');
var passport = require('passport');
var user = require('../dataSets/users');
var dbConnection = require('../../dbConnection');
dbConnection.connect();


module.exports.register = function(req,res){
	dbConnection.get().query('SELECT * FROM user WHERE email = ? LIMIT 1', [req.body.email], function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows[0]);
    if (rows[0]){
    	console.log("User's email alraedy used. Please use different email to signup ");
        res.status(404).json(err+" User's email alraedy uesed. Please use different email to signup");
    }
    else{
    	var newuser = user.setPassword(req.body.password);
    	var value = {
    		salt: newuser.salt,
    		hash: newuser.hash,
    		email: req.body.email,
    		userName: req.body.name
    	};
    	dbConnection.get().query('INSERT INTO user SET ?',[value],function(err, result){
    		if (err) throw err;
    		var token = user.generateJwt(result.insertId,req.body.email,req.body.name);
    		res.status(200);
            res.json({
            	"token" : token
            });
    	});
    }// end else 
  });// end db.get().query
};// end register funtions


module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log("khanh inside login controllers");

  passport.authenticate('login', function(err, luser, info){
    var token;
console.log("khanh inside passport authenticate");
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(luser){
     // console.log("found user k ha nh");
      token = user.generateJwt(luser.accountID, luser.email,luser.userName);
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  }) (req,res);

};// end login functions