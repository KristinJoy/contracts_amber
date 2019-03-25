var express = require("express");
var router = express.Router();
var User = require("../models/user");
const findOrCreate = require('mongoose-find-or-create')


function updateContractBetweenAction(contractBetween, data){
	console.log("action between as passed: ", contractBetween);
	//actionBetween is an array, loop through and properly update each user's contract
	var loopLimit;
	if(contractBetween[0] === contractBetween[1]) {loopLimit = 1;}
	else {loopLimit = contractBetween.length}
	for (var i = 0; i < loopLimit; i++){
		console.log("action between loop, address: ", contractBetween[i]);
		User.findOrCreate({ publicAddress: contractBetween[i]}, {appendToArray: false, saveOptions: {validateBeforeSave: false}},
			(err, result) => {
				for (var z = 0; z < result.contracts.length; z++){
					if(result.contracts[z].contractAddress === data.contractAddress){
						result.contracts[z].action = data.action;
						result.contracts[z].active = data.active;
						if(data.action === 'set_message'){result.contracts[z].actionNeeded = true;}
						if(data.contractType === 'rainy_day' && data.active){
							result.contracts[z].actionNeeded = true;
							result.contracts[z].action = data.steps[0];
						}
						console.log("testing if it is services delievered: ", data.action);
						console.log("testing if contract between is data from: ", result.publicAddress, " ", data.actionFrom);
						if(data.action === "agree_upon_services_delivered" && (result.publicAddress === data.actionFrom)){
							console.log("setting action needed to true for address", result.publicAddress);
							result.contracts[z].actionNeeded = true;
						}
						console.log("contract before save: ", result.contracts[z]);
						result.markModified('contracts');
						result.save();
					}
				}
			});
	}
	//this is a placeholder return: 
	return loopLimit;

}
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
							if (!data.active){
								result.contracts[i].actionNeeded = false;
							}
							result.contracts[i].action = data.action;
							result.contracts[i].active = data.active;
							



/*------------------------IF THIS IS BREAKING LOOK HERE----------------------------------------*/
							if(data.actionTo === data.actionFrom){
								return updateContractBetweenAction(result.contracts[i].contractBetween, data);
							}
							//return result.contracts[i]; not sure why i+1 was original...
							found = true; //not sure if needed... (returns at end of this if found...)
							result.markModified('contracts');
							result.save();
							return result.contracts[i];
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
	data.createdOn = new Date();
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
							result.contracts[i].active = data.active;
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

					//----------------------THE FOLLOWING LINE SHOULD ONLY TRIGGER IF ACTIONTO === ACTIONFROM
					var response = [toData, fromData];
					console.log("sending contract route response back: ", response);
					res.status(200).send(response);
				}
				
			}//closes if(data.actionTo)
		}); //closes find or create actionFrom
});// closes route

module.exports = router;
