var _ = require("underscore");
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "", {
  dialect: 'mysql'
});

var Message = sequelize.define('Message', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,
  created_at: Sequelize.STRING
});

var User = sequelize.define('User', {
  username: Sequelize.STRING,
});
User.hasMany(Message);
Message.belongsTo(User);

sequelize.sync().success(function() {
  console.log("Database successfully sync'ed");
});

exports.getMessages = function(cb, options, loopCount) {
  loopCount = loopCount || 0;
  // User.find({include: [Message]}).success(function(user){
  //   _.each(user.values.messages, function(item){
  //     console.log(item.values);
  //   });
  // });
  Message.findAll({include: [User]}).success(function(messages) {
    var counter = messages.length;
    var killMe = false;
    var results = _.map(messages, function(item){
      if(item.values.user){
        item.values.username = item.values.user.username;
      }else{
        killMe = true;
      }
      return item.values;
    });
    if(killMe && loopCount <= 5){
      exports.getMessages(cb, loopCount + 1);
      return;
    }else if(loopCount > 5){
      return;
    }
    cb(results);
    console.log("Database successfully get'ed");
  });
};
exports.insertMessage = function(msg) {
  msg = msg || {};
  console.log("Trying to insert:", msg);
  User.findOrCreate( {
    username: msg.username
  }).success(function(user, created){
    Message.create( {
      text: msg.text,
      roomname: msg.roomname,
      created_at: msg.created_at
    }).success(function(message) {
      user.addMessage(message);
      message.setUser(user);
      console.log("Database successfully insert'ed2");
    })
  });
}

