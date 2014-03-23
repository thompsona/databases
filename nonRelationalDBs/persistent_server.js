var _ = require("underscore");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

var messageSchema = mongoose.Schema({
    text: String,
    roomname: String,
    created_at: String,
    username: String
    user:{sadf:"asdf"
          asdf:"asdfsdg"
        }
});

var Message = mongoose.model('Message', messageSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
});

exports.getMessages = function(cb) {
  Message.find(function(err, messages){
     if (err) throw err;
     cb(messages);
  });
};
exports.insertMessage = function(msg) {
  msg = msg || {};
  console.log("Trying to insert:", msg);
  var message = new Message(msg);
  message.save();
};

