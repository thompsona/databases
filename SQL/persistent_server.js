var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();

exports.getMessages = function(cb) {
  dbConnection.query('SELECT * from messages', function(err, rows, fields) {
    if(err) throw err;
    cb(rows);
  });

};
exports.insertMessage = function(message) {
  message = message || {};
  console.log("Trying to insert:", message);
  dbConnection.query('select * from users where name = "'+message.username+'"', function(err, rows, fields) {
    if(err) throw err;
    if(rows.length <= 0){
      //not found
      dbConnection.query('INSERT INTO users (name) VALUES("'+message.username+'")', function() {
        dbConnection.query('INSERT INTO messages (text, roomname, created_at, userId) VALUES("' +message.text+ '", "' +message.roomname+'", "' +message.created_at+'", LAST_INSERT_ID())');
      });
    }else{
      //found
      dbConnection.query('INSERT INTO messages (text, roomname, created_at, userId) VALUES("' +message.text+ '", "' +message.roomname+'", "' +message.created_at+'", '+rows[0].id+')');
    }

  });
};
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */
