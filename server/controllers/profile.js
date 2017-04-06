var user = require('../dataSets/users');
var dbConnection = require('../../dbConnection');
dbConnection.connect();

module.exports.profileRead = function(req, res) {

  console.log("khanh test inside profile "+req.payload.email+"  khanh "+req.payload._id+ " khanh "+req.body);

  if (!req.payload._id) {
      console.log("khanh Req.payload._id is not exist in side profileRead"+req.payload._id);
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    
    dbConnection.get().query("SELECT * FROM user WHERE accountID = ? ",[req.payload._id], function(err, rows){
      if (err){
          console.log('error form query dbConnection');
          res.status(401).json({
     		 "message" : "err dbConnection"
    	  });
      }    
      // if there is no user found for this email   
      if (!rows.length) {
          console.log('error form query dbConnection rows.length');
          res.status(401).json({
     		 "message" : "no such user with that id"
    	  });
      }
      if (rows){
      	  res.status(200).json(rows[0]);
          console.log(rows[0]);
      }

    });// end dbConnection query
  }

};// end profileRead

module.exports.updateUser = function(req, res) {
  var userId = req.body.accountID;
  console.log("inside update user with accountID is "+userId);
  dbConnection.get().query("SELECT * FROM user WHERE accountID = ? ",[req.body.accountID], function(err, rows){
      if (err){
          console.log('error form query dbConnection');
          res.status(401).json({
     		 "message" : "err dbConnection"
    	  });
      }    
      console.log("testign for rows.length is "+ rows.length+ " rows is "+ rows);
      // if there is no user found for this email   
      if (rows.length == 0) {
          console.log('error form query dbConnection rows.length' + rows.length + 'rows is '+rows);
          res.status(401).json({
     		 "message" : "no such user with that id"
    	  });
      }
      if (rows.length == 1){
      	  dbConnection.get().query("UPDATE user SET userName=?, email=?, address=?, city=?, state=?, zipcode=? WHERE accountID = ? ",
      	  	[req.body.userName, req.body.email, req.body.address, req.body.city, req.body.state, req.body.zipcode, req.body.accountID], function(err, insideRows){
      	  		if (err){
		          console.log('error form query dbConnection');
		          res.status(401).json({
		     		 "message" : "err dbConnection"
		    	  });
		      }    
		      else{
			      	console.log("update user Successfully with new data ");
			      	res.status(200);
		      }
      	  
      	  })// end dbConnection query update user
      }

    });// end dbConnection query

}; // end updateUser