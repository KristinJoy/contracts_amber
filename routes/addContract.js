var express = require("express");
var router = express.Router();
var User = require("../models/user");
//req.body.publicAddress
//User.findOne(req.body.publicAddress)
//.then(err, user)
//user.contracts.push({
//   contractAddress: req.body.contractAddress,
//   title: req.body.title,
//   etc
// })
// addContract(address, senderAddress, recipAddress){
//   User.find(senderAddress).then(user){
//     user.contracts.push({address: address,
//     flag: deployed
//   });
//   User.find(recipAddress).then(user){
//     user.contracts.push({address: address,
//     flag: waitingForApproval
//   });
// }
//other possible statuses: in hiatus, declined, seen/unseen
router.put("/", function(req, res) {}); //closes router.put

module.exports = router;
