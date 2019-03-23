var express = require("express");
var router = express.Router();
var User = require("../models/user");
const findOrCreate = require('mongoose-find-or-create')

router.put("/", function(req, res){
	var data = req.body;
	var toData, fromData;
	console.log("new contract route accessed @ ", new Date());
	console.log("request body: ", data);
	console.log("with the next action being: ", data.action);
	data.createdOn = new Date();
	//testing promise stuff here
	User.findOrCreate({ publicAddress: data.publicAddress}, {upsert: true},
		async (err, result) => {
			if(err){console.log(err);}
			console.log("public address user found or created");
			//if actionTo, either find and amend the contract or create it, then do the same for the actionTo user(s)
				console.log("there is actionTo, first finding contract in actionFrom");
				if(result.contracts.length === 0){
					console.log("YOU SHOULD NOT SEE THIS CONSOLE LOG");
					//actionFrom actionNeeded is set to false
					data.actionNeeded = false;
					result.contracts.push(data);
					result.markModified('contracts');
					await result.save();
					fromData = result;
					var response = fromData;
					console.log("sending contract route response back: ", response);
					res.status(200).send(response);
				
				}
				else {
					console.log("publicAddress has contracts, looping to find:");
					
					var found = false;
					for (var i = 0; i < result.contracts.length; i++){
						if(result.contracts[i].contractAddress === data.contractAddress){
							console.log("found contract for publicAddress, amending");
							result.contracts[i].actionNeeded = data.active;
							result.contracts[i].action = data.action;
							result.contracts[i].active = data.active;
							result.markModified('contracts');
						  await	result.save();
							fromData = result;
							console.log("publicAddress amended result", result);
							found = true;
							break;
						}
					}
					if (!found){
						console.log("can't find contract for publicAddress, push it baybay");
						data.actionNeeded = false;
						result.contracts.push(data);
						console.log("actionFrom pushed result", result);
						result.markModified('contracts');
						await result.save();
						fromData = result;
					}
					response = fromData;
					console.log("sending contract route response back: ", response);
					res.status(200).send(response);
				}
		}); //closes find or create actionFrom
});// closes route

module.exports = router;
