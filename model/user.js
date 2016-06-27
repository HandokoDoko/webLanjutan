var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://data:12345@ds023634.mlab.com:23634/tenomed');

var userSchema = new Schema({
  user_id             : { type: String, required: true, unique: true },
  oauth_token         : { type: String, required: true, unique: true },
  oauth_token_secret  : { type: String, required: true, unique: true },
  screen_name         : { type: String, required: true, unique: true },
  x_auth_expires      : String,
  premium             : Boolean,
  created_at          : Date,
  updated_at          : Date
});

var User = mongoose.model('User', userSchema);

userSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});



module.exports = User;