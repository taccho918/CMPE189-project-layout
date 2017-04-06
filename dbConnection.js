var mysql = require('mysql');
var pool  = null;

exports.connect = function() {
  pool = mysql.createPool({
  //	connectionLimit : 100, //important for concurence connections
    host     : 'localhost',
    user     : 'coolcode',
    password : 'November23',
    database : 'cmpe189'
  });
}

exports.get = function() {
  return pool;
}