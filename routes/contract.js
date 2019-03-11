var express = require("express");
var router = express.Router();
var User = require("../models/user");
const findOrCreate = require('mongoose-find-or-create')

async function toAddress(data){
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
					result.markModified('contracts');
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
							result.markModified('contracts');
							result.save();
							return result.contracts[i+1];
						}
					}
					if (!found){
						console.log("can't find contract for actionTo, push it baybay");
						data.actionNeeded = true;
						result.contracts.push(data);
						result.markModified('contracts');
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
		async (err, result) => {
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
					result.markModified('contracts');
					await result.save();
					fromData = result;
					//then call to send data to toAddress user:
					toData = await toAddress(data);

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
							result.markModified('contracts');
						  await	result.save();
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
						result.markModified('contracts');
						await result.save();
						fromData = result;
					}
					console.log("now moving on to find or create actionTo user------------------------------------");
					//then call to send data to toAddress user:
					toData = await toAddress(data);
					var response = [toData, fromData];
					console.log("sending contract route response back: ", response);
					res.status(200).send(response);
				}
				
			}//closes if(data.actionTo)
		}); //closes find or create actionFrom
});// closes route

module.exports = router;
