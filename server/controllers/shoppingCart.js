var dbConnection = require('../../dbConnection');
dbConnection.connect();

// add item to shopping cart
module.exports.add = function(req, res){
	console.log("inside adding to shopping cart: "+ req.body.accountId + " "+req.body.productId);
	var item = {
    		accountId: req.body.accountId,
    		productId: req.body.productId,
    		quantity: req.body.quantity,
    		price: req.body.price,
    		name: req.body.name,
    		image: req.body.image
    	};
	// query to insert item to shopping cart
    dbConnection.get().query('INSERT INTO shoppingcart SET ?',[item],function(err, result){
    		if (err) throw err;
    		res.status(200);
    		res.json({
            	"message" : "Adding To shoppingcart Successfully"
            });
            
    	});
}; // end add function

// get items in shoppingcart from particular user id
module.exports.get = function(req, res){
	// query to insert item to shopping cart
	console.log("before query : "+req.body._id);
    dbConnection.get().query('SELECT * FROM shoppingcart WHERE accountId = ? ',[req.body._id],function(err, result){
    		if (err) throw err;
    		res.status(200);
    		console.log(" inside get shopping cart : " +result[0]);
    		res.json(result);
            
    	});
}; // end get function

// delete item from shooping cart table by item id
module.exports.delete = function(req, res){
	// query to insert item to shopping cart
	console.log("before delete query : "+req.body.productId + "accountId : "+req.body.accountId);
    dbConnection.get().query("DELETE FROM shoppingcart WHERE productId = ? AND accountId = ? ",[req.body.productId,req.body.accountId],function(err, result){
    		if (err) throw err;
    		res.status(200);
    		console.log(" inside get shopping cart : " );
    		res.json({
            	"message" : "Delete item from shoppingcart Successfully"
            });
            
    	});
}; // end delete function