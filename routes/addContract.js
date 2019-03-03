var express = require("express");
var router = express.Router();
var User = require("../models/user");
const findOrCreate = require('mongoose-find-or-create')

// console.log(req.body.publicAddress)

router.put("/", function(req, res){

console.log(req.body.publicAddress);
let query = {publicAddress: req.body.publicAddress};
let newContract = req.body.contractObj
User.findOneAndUpdate(query, {$push: {contracts: newContract}}, (err, result) => {
	if (err){console.log(err);}
	console.log("successful find user by public address and added Contract: ", result);
	res.status(200).send(result);
})
});

// addContract(address, senderAddress, recipAddress){
//   User.find(senderAddress).then(user){
//     user.contracts.push({contract: transaction object,
//     flag: deployed
//   });
//   User.find(recipAddress).then(user){
//     user.contracts.push({address: address,
//     flag: waitingForApproval
//   });
// }
//other possible statuses: in hiatus, declined, seen/unseen


// router.put("/", function(req, res) {}); //closes router.put

module.exports = router;
