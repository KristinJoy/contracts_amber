
var mongoose = require('./../config/db-config');
const findOrCreate = require('mongoose-find-or-create');


let UserSchema = mongoose.Schema(
  {
    publicAddress: String,
    avatar: String, //url to picture
    username: String,
    contracts: [Object]
    },
    { collection: 'users' });
UserSchema.plugin(findOrCreate, { appendToArray: true });


var User = mongoose.model("User", UserSchema);

module.exports = User;
