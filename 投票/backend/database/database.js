const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vote', {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection it')
});

var usersSchema = new mongoose.Schema({
  username: {
    type:String,
    require:true,
  },
  nickname: {
    type:String,
    require:true,
  },
  password: {
    type:String,
    require:true,
  },
});

var Users = mongoose.model('users', usersSchema);

var chooseSchema = new mongoose.Schema({
  voteNumber: {
    type:Number,
    default:0,
  },
  voteName: {
    type:String,
    require:true,
  },
});
var TopicsSchema = new mongoose.Schema({
  topictittle: {
    type:String,
    require:true,
  },
  chooses: {
    type:[chooseSchema],
    require:true,
  },
});

var Users = mongoose.model('users', usersSchema);
var Topics = mongoose.model('topics', TopicsSchema);

// new Users({
//   username:'shiyubi123',
//   password:'3633569',
//   nickname:'myself'
// }).save(function(err,users){
//   if(err){
//     console.log(err)
//   }
// })

module.exports = {Users,Topics}