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
	var toData, fromData;
	User.findOrCreate({ publicAddress: data.actionFrom}, {upsert: true},
		(err, result) => {
			if(err){console.log(err);}
			//if the resulting user has contracts, search em
			for (var i = 0; i < result.contracts.length; i++){
				if (result.contracts[i].contractAddress === data.contractAddress){
					//update contract here and break / send
					result.contracts[i].actionNeeded = false;
					result.contracts[i].actionFrom = data.actionFrom;
					result.contracts[i].actionTo = data.actionTo;
					result.save();
					console.log("successful update or get contract by public address: ", result.contracts[i].contractAddress);
					//if there is no action to, it is just a get request
					if(!data.actionTo){
						res.status(200).send(result.contracts[i]);
					}
					return;
				}
			}
			console.log("no matching contract found on server, pushing new one");
			//if can't find contract, push it to the contracts array
			result.contracts.push({
				abi: data.abi,
				contractAddress: data.contractAddress
			});
			result.save();
			console.log("successful add contract [and possible user] by public address: ", result);
			if(!data.actionTo){
				toData = result.contracts[i];
				var response = [toData, fromData];
				console.log("sending contract route response back: ", response);
				res.status(200).send(response);
				return;
			}
			toData = result.contracts[i];
		});//closes findOrCreate
		if(data.actionTo){
		User.findOrCreate({ publicAddress: data.actionTo}, {upsert: true},
			(err, result) => {
				if(err){console.log(err);}
				//if the resulting user has contracts, search em
				for (var i = 0; i < result.contracts.length; i++){
					if (result.contracts[i].contractAddress === data.contractAddress){
						//update contract here and break / send
						result.contracts[i].actionNeeded = true;
						result.contracts[i].action = data.action;
						result.save();
						console.log("successful update contract by public address: ", result);
						fromData = result;
						return;
					}
				}
				console.log("no matching contract found on server, pushing new one");
				//if can't find contract, push it to the contracts array
				result.contracts.push({
					abi: data.abi,
					contractAddress: data.contractAddress,
					actionNeeded: true,
					action: data.action
				});
				result.save();
				console.log("successful add contract [and possible user] by public address: ", result);
				fromData = result;

				var response = [toData, fromData];
				console.log("sending contract route response back: ", response);
				res.status(200).send(response);
			});//closes findOrCreate
		}
		
});


module.exports = router;
