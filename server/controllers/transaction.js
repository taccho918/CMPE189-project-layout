var dbConnection = require('../../dbConnection');
dbConnection.connect();

// add transaction 
module.exports.add = function(req, res){
	console.log("inside adding to transaction: "+ req.body.accountId + " "+req.body.amount);
	var trans = {
    		accountId: req.body.accountId,
    		amount: req.body.amount
    	};
	// query to insert item to shopping cart
    dbConnection.get().query('INSERT INTO transaction SET ?',[trans],function(err, outResult){
    		if (err) throw err;
            // insert into transaction fact table 
            dbConnection.get().query('SELECT * FROM shoppingcart WHERE accountId = ? ',[req.body.accountId],function(err, result){
                if (err) throw err;
                console.log("inside add transaction test lenght: "+result.length+"insertId "+outResult.insertId +" "+result[0].price);
                for (var i=0;i<result.length;i++){
                    var transactionFact={
                        accountId: req.body.accountId,
                        name: result[i].name,
                        productId: result[i].productId,
                        price: result[i].price,
                        quantity: result[i].quantity,
                        transactionId: outResult.insertId
                    };
                    // query to insert item to shopping cart
                    dbConnection.get().query('INSERT INTO transactionfact SET ?',[transactionFact],function(err, result){
                            if (err) throw err;
                            console.log("test inside insert to transactionfact table");
                        });// end query insert item to transaction fact
                }// end for loop
            
            });
            // end insert into transaction face table

            // delete from shopping cart  after making payment
            dbConnection.get().query("DELETE FROM shoppingcart WHERE accountId = ? ",[req.body.accountId],function(err, result){
                if (err) throw err;
            });    
            //end delete from shopping cart

    		res.status(200);
    		res.json({
            	"message" : "Adding To transaction Successfully"
            });
            
    	});
}; // end add function

// get history of transaction    transaction.transactionDate, transaction.amount, transaction.deliveryTime
module.exports.getTransactionFact = function(req, res){
    // query to insert item to shopping cart
    console.log("inside getTransactionFact id: "+ req.body._id);
    dbConnection.get().query('SELECT * FROM transaction WHERE transaction.accountId = ? ',[req.body._id],function(err, result){
            if (err) throw err;
            res.status(200);
            console.log(" inside get getTransactionFact : " +result[0]);
            res.json(result);
            
        });
}; // end get transacion fact

// get history of transaction   transactionfact.name
module.exports.getTransactionFactDetail = function(req, res){
    // query to insert item to shopping cart
    console.log("inside getTransactionFact id: "+ req.body._id);
    dbConnection.get().query('SELECT * FROM transactionfact  WHERE transactionFact.accountId = ?',[req.body._id],function(err, result){
            if (err) throw err;
            res.status(200);
            console.log(" inside get getTransactionFactdetail : " +result[0]);
            res.json(result);
            
        });
}; // end get transacion fact