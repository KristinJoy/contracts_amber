var express = require("express");
var router = express.Router();
var User = require("../models/user");
const findOrCreate = require('mongoose-find-or-create')

// console.log(req.body.publicAddress)
// {
// 	actionFrom: '0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0', //TODO: make this the accounts[0]
// 	actionTo: this.state.toAddress,
// 	contractAddress: this.state.deployedContractAddress,
// 	abi: contractAbi,
// 	action: "nextAction"
//   }
router.put("/", function(req, res){

	console.log("new contract [action] route called @ " + new Date());
	var data = req.body;
	let conAddress;
	User.findOne({publicAddress: data.publicAddress.toLowerCase()}, (err, results) => {
		if(err) {console.log(err);}
		if(results){
			console.log(results);
		//if results exsist search for the contract address and if actionNeeded is true
			for (let i = 0; i < results.contracts.length; i++) {
				if(results.contracts[i].contractAddress && results.contracts[i].actionNeeded === true) {
					//return the address so we can pass it to our instance
					conAddress = results.contracts.contractAddress;
					console.log(results.contracts[i]);
			}
		}
		//this isnt working in postman at the moment, I'm overloading the for loop I think. 
	}
	});//Close .find()
	let response = conAddress;
	res.status(200).send(response);
	//Next call would fire when they call the deposit function and we can query the database to 
	//find any users with the same contract address and then handle the flag swap there.

});//Close .put()


// 	User.findOrCreate({ publicAddress: data.actionFrom.toLowerCase()}, {upsert: true},
// 		(err, result) => {
// 			if(err){console.log(err);}
// 			//if the resulting user has contracts, search em
// 			for (var i = 0; i < result.contracts.length; i++){
// 				if (result.contracts[i].contractAddress === data.contractAddress){
// 					//update contract here and break / send
// 					result.contracts[i].actionNeeded = false;
// 					result.save();
// 					console.log("successful update contract by public address: ", result);
// 					toData = result;
// 					return;
// 				}
// 			}
// 			console.log("no matching contract found on server, pushing new one");
// 			//if can't find contract, push it to the contracts array
// 			result.contracts.push({
// 				abi: data.abi,
// 				contractAddress: data.contractAddress
// 			});
// 			result.save();
// 			console.log("successful add contract [and possible user] by public address: ", result);
// 			toData = result;
			
// 		});//closes findOrCreate
// 		User.findOrCreate({ publicAddress: data.actionTo.toLowerCase()}, {upsert: true},
// 			(err, result) => {
// 				if(err){console.log(err);}
// 				//if the resulting user has contracts, search em
// 				for (var i = 0; i < result.contracts.length; i++){
// 					if (result.contracts[i].contractAddress === data.contractAddress){
// 						//update contract here and break / send
// 						result.contracts[i].actionNeeded = true;
// 						result.contracts[i].action = data.action;
// 						result.save();
// 						console.log("successful update contract by public address: ", result);
// 						fromData = result;
// 						return;
// 					}
// 				}
// 				console.log("no matching contract found on server, pushing new one");
// 				//if can't find contract, push it to the contracts array
// 				result.contracts.push({
// 					abi: data.abi,
// 					contractAddress: data.contractAddress,
// 					actionNeeded: true,
// 					action: data.action
// 				});
// 				result.save();
// 				console.log("successful add contract [and possible user] by public address: ", result);
// 				fromData = result;
				
// 			});//closes findOrCreate
// 		var response = [toData, fromData];
// 		res.status(200).send(response);




// 	// let query = {publicAddress: req.body.publicAddress.toLowerCase()};
// 	// let newContract = req.body.contractObj
// 	// User.findOrCreate(query, {contracts: newContract}, (err, result) => {
// 	// 	if (err){console.log(err);}
// 	// 	console.log("successful find user by public address and added Contract: ", result);
// 	// 	res.status(200).send(result);
// 	// });
// });

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