var express = require("express");
var router = express.Router();

var User = require('../models/user');
const findOrCreate = require('mongoose-find-or-create')


router.put("/", function(req, res) {
  console.log(
    "getting user" + " @ " + new Date() + "----------------------------------"
  );
  console.log(req.body);
  var data = req.body;

  //findOrCreate({query}, {document to insert}, [options], [callback])
	User.findOrCreate({ publicAddress: data.publicAddress }, (err, result) => {
	if(err){console.log(err);}
    console.log("successful find user by public address: ", data.publicAddress);
    res.status(200).send(result);
  });
}); //closes router.put

module.exports = router;
