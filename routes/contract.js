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
// 		actionFrom: actionFrom, 
//       actionTo: this.state.contractActionFrom,
//       contractAddress: this.state.contractAddress,
//		abi: contractAbi
//       action: result.events.NextAction.returnValues[0]
function toAddress(data){
	console.log("to address function accessed");
	User.findOrCreate({ publicAddress: data.actionTo}, {appendToArray: false, saveOptions: {validateBeforeSave: false}},
		(err, result) => {
			if(err){console.log(err);}
			console.log("there is actionTo, finding contracts");
				if(result.contracts.length === 0){
					console.log("actionTo has no contracts, pushing this one");
					//actionFrom actionNeeded is set to false
					data.actionNeeded = true;
					result.contracts.push(data);
					result.save();
					return result.contracts[0];
				}
				else {
					console.log("actionTo has contracts, looping to find:");
					var found = false;
					for (var i = 0; i < result.contracts.length; i++){
						if(result.contracts[i].contractAddress === data.contractAddress){
							console.log("actionTo contract found");
							result.contracts[i].actionNeeded = true;
							result.contracts[i].action = data.action;
							result.save();
							return result.contracts[i+1];
							//might not need these two lines
							console.log("DO YOU EVEN SEE THIS CONSOLE LOG?????? - after return statement in actionTo");
							found = true;
							break;
						}
					}
					if (!found){
						console.log("can't find contract for actionTo, push it baybay");
						data.actionNeeded = false;
						result.contracts.push(data);
						result.save();
					}
					console.log("actionTo contract added, returning");
					//it was pushed, return the last contract in that case:
					return result.contracts[result.contracts.length];
				}
		});//closes find or create actionTo
}

router.put("/", function(req, res){
	var data = req.body;
	var toData, fromData;
	console.log("new contract route accessed @ ", new Date());
	console.log("request body: ", data);
	console.log("with the next action being: ", data.action);
	//testing promise stuff here
	User.findOrCreate({ publicAddress: data.actionFrom}, {upsert: true},
		(err, result) => {
			if(err){console.log(err);}
			console.log("actionFrom user found or created");
			//if no actionTo, just get contract data:
			if(!data.actionTo) {
				var contract = result.contracts.find(function(contract){
					return contract.contractAddress === data.contractAddress;
				});
				console.log("contract found with no actionTo so returning", contract.contractAddress);
				res.status(200).send(contract);
				return;
			}
			//if actionTo, either find and amend the contract or create it, then do the same for the actionTo user(s)
			else {
				console.log("there is actionTo, first finding contract in actionFrom");
				if(result.contracts.length === 0){
					console.log("actionFrom has no contracts, pushing this one");
					//actionFrom actionNeeded is set to false
					data.actionNeeded = false;
					result.contracts.push(data);
					result.save();
					fromData = result;
					//then call to send data to toAddress user:
					toData = toAddress(data);
					var response = [toData, fromData];
					console.log("sending contract route response back: ", response);
					res.status(200).send(response);
				}
				else {
					console.log("actionFrom has contracts, looping to find:");
					var found = false;
					for (var i = 0; i < result.contracts.length; i++){
						if(result.contracts[i].contractAddress === data.contractAddress){
							console.log("found contract for actionFrom, amending");
							result.contracts[i].actionNeeded = false;
							result.contracts[i].action = data.action;
							result.save();
							fromData = result;
							console.log("actionFrom amended result", result);
							found = true;
							break;
						}
					}
					if (!found){
						console.log("can't find contract for actionFrom, push it baybay");
						data.actionNeeded = false;
						result.contracts.push(data);
						console.log("actionFrom pushed result", result);
						result.save();
						fromData = result;
					}
					console.log("now moving on to find or create actionTo user------------------------------------");
					//then call to send data to toAddress user:
					toData = toAddress(data);
					var response = [toData, fromData];
					console.log("sending contract route response back: ", response);
					res.status(200).send(response);
				}
				
			}//closes if(data.actionTo)
		}); //closes find or create actionFrom
});// closes route
//////////////////////////////////////////////////////////////////////////////////////////////////

// User.findOrCreate({ publicAddress: data.actionFrom}, {upsert: true},
// 	(err, result) => {
// 		if(err){console.log(err);}
// 		console.log("actionFrom user found or created");
// 		//check if contract exists
// 		if(result.contracts.length > 0){
// 			console.log("actionFrom user has contracts to search through, searching by contract address", data.contractAddress);
// 			for (var i = 0; i < result.contracts.length; i++){
// 				if(result.contracts[i].contractAddress === data.contractAddress){
// 					console.log("contract found for actionFrom user");
// 					//if actionTo, change actionNeeded and keep going:
// 					if(data.actionTo){
// 						console.log("actionFrom has actionTo, switching actions");
// 						result.contracts[i].actionNeeded = false;
// 					}
// 					//if no actionTo, return because get function basically
// 					else {
// 						console.log("actionFrom has no actionTo, return contract information");
// 						res.status(200).send(result.contracts[i]);
// 						return;
// 					}
// 				}
// 				else {
// 					console.log("actionFrom has contracts, but cannot find this one - pushing");
// 					//set actionNeeded to false
// 					data.actionNeeded = false;
// 					result.contracts.push(data);
// 					result.save();
// 					fromData = result;

// 				}
// 			}
// 		}
// 		//if contract doesn't exist, less go mang
// 		else {
// 			console.log("could not find contracts in actionFrom, pushing new one");
// 			result.contracts.push(data);
// 			result.save();
// 			fromData = result;
// 			//add new contract here
// 		}

// 	});//closes actionFrom findorcreate
// 	var response = {
// 		toData: todata,
// 		fromData: fromData
// 	}
// 	res.status(200).send(response);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.put("/", function(req, res){

// 	console.log("new contract [action] route called @ " + new Date());
// 	var data = req.body;
// 	var toData, fromData;
// 	User.findOrCreate({ publicAddress: data.actionFrom}, {upsert: true},
// 		(err, result) => {
// 			if(err){console.log(err);}
// 			//if the resulting user has contracts, search em
// 			if(result.contracts.length > 0){
// 				for (var i = 0; i < result.contracts.length; i++){
// 					if (result.contracts[i].contractAddress === data.contractAddress){
// 						//if no action to, it is just a get request
// 						if(!data.actionTo){
// 							console.log("contract found, returning");
// 							res.status(200).send(result.contracts[i]);
// 							return;
// 						}
// 						//update contract here and break / send
// 						result.contracts[i].actionNeeded = false;
// 						result.contracts[i].actionFrom = data.actionFrom;
// 						result.contracts[i].actionTo = data.actionTo;
// 						result.save();
// 						console.log("successful contract action change for actionfrom by public address: ", result.contracts[i].contractAddress);
// 						res.status(200).send(result.contracts[i]);
// 					}
// 				}
// 			}
// 			else{
// 				console.log("no matching contract found on server for actionFrom, pushing new one");
// 				//if can't find contract, push it to the contracts array
// 				let action = data;
// 				action.actionNeeded = false;
// 				result.contracts.push(action);
// 				result.save();
// 				if(!data.actionTo){
// 					toData = result.contracts[i];
// 					var response = [toData, fromData];
// 					console.log("no action to recipient - contact pushed with no recip - YOU SHOULD NOT SEE THIS MESSAGE");
// 					res.status(200).send(response);
// 					return;
// 				}
// 				toData = data;
// 			}
// 		});//closes findOrCreate
// 		if(data.actionTo){
// 		User.findOrCreate({ publicAddress: data.actionTo}, {upsert: true},
// 			(err, result) => {
// 				if(err){console.log(err);}
// 				//if the resulting user has contracts, search em
// 				for (var i = 0; i < result.contracts.length; i++){
// 					if (result.contracts[i].contractAddress === data.contractAddress){
// 						//update contract here and break / send - don't need basic get function because actionTo never gets
// 						result.contracts[i].actionNeeded = true;
// 						result.contracts[i].action = data.action;
// 						result.save();
// 						console.log("successful actionTo contract update");
// 						fromData = result;
// 						return;
// 					}
// 				}
// 				console.log("no matching contract found on server for actionTo, pushing new one");
// 				//if can't find contract, push it to the contracts array
// 				let action = data;
// 				action.actionNeeded = true;
// 				result.contracts.push(action);
// 				result.save();
// 				console.log("successful add contract [and possible user] via actionTo by public address: ");
// 				fromData = result;

// 				var response = [toData, fromData];
// 				console.log("sending contract route response back: ", response);
// 				res.status(200).send(response);
// 			});//closes findOrCreate
// 		}
// 		else {
// 			var response = [toData, fromData];
// 			console.log("sending contract route response back: ", response);
// 			res.status(200).send(response);
// 		}
		
// });


module.exports = router;
