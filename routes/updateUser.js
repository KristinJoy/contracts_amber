var express = require("express");
var router = express.Router();

var User = require('../models/user');
const findOrCreate = require('mongoose-find-or-create')


router.put("/", function(req, res) {
  console.log(
    "updating user" + " @ " + new Date() + "----------------------------------"
  );
  var data = req.body;
  //findOrCreate({query}, {document to insert}, [options], [callback])
  User.findOrCreate({ publicAddress: data.publicAddress.toLowerCase() }, {username: data.username}, (err, result) => {
    if(err){console.log(err);}
    console.log("successful find user by public address: ", result);
    res.status(200).send(result);
  });
}); //closes router.put

module.exports = router;
