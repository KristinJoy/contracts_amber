// var User = require('../models/user');


require("dotenv").config();
const ethers = require ("ethers");

// ------------------------------------------------------------------
//      NETWORK CONNECTION AND WALLET
// ------------------------------------------------------------------
let provider = ethers.getDefaultProvider('rinkeby');
let privateKey = process.env.ORACLE_PRIVATE_KEY;
let wallet = new ethers.Wallet(privateKey, provider);
let providerWallet = wallet.provider;
console.log(providerWallet);

// ------------------------------------------------------------------
//      WEATHER API DETAILS
// ------------------------------------------------------------------
const OpenWeatherMapHelper = require("../node_modules/openweathermap-node");
const helper = new OpenWeatherMapHelper({
  APPID: process.env.WEATHER_APP_ID,
  units: "imperial"
});

// ------------------------------------------------------------------
//      RAINY DAY CONTRACT DETAILS
// ------------------------------------------------------------------
const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "depositsBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "issue_refund",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "balance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "accountAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "status",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "action",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "ActionStatus",
		"type": "event"
	}
]

// TODO: Need to turn this into a variable that takes in address from factory component:
//TODO: store deployed contract addresses in an array and loop through them to create abstract contracts 

//address.map(address =>{
//	let contract = new ethers.Contract(address, abi, wallet)
//})

// ------------------------------------------------------------------
//      THE ORACLE WILL SEE YOU NOW
// ------------------------------------------------------------------

// Oracle process loop: If it's raining, create a transaction that triggers the deployed Rainy Day Contract's issueRefund() method, then terminate the whole loop. Else (if it's not raining), wait 10 seconds and restart.

// const deployedContractAddress = "0xDDD99805B64c5cc23701f2fE8aD796a6d2726166";

// let contract = new ethers.Contract(deployedContractAddress, abi, wallet);

let data = [
	{
		"_id": "5c94880b1134f13bf697537f",
		"contracts": [
			{
				"contractType": "rainy_day",
				"contractBetween": [
					"0x59001902537Fa775f2846560802479EccD7B93Af",
					"0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0"
				],
				"actionFrom": "0x59001902537Fa775f2846560802479EccD7B93Af",
				"actionTo": "0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0",
				"contractAddress": "0x1178A9223ae66FE71cA40786F91dE495c4a108cc",
				"abi": [
					{
						"inputs": [
							{
								"name": "_depositor",
								"type": "address"
							},
							{
								"name": "_creator",
								"type": "address"
							},
							{
								"name": "_request_amount",
								"type": "uint256"
							}
						],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "constructor"
					},
					{
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "action_to",
								"type": "address"
							},
							{
								"indexed": false,
								"name": "value",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "action",
								"type": "string"
							},
							{
								"indexed": false,
								"name": "active",
								"type": "bool"
							}
						],
						"name": "next_action",
						"type": "event"
					},
					{
						"constant": false,
						"inputs": [],
						"name": "deposit_funds",
						"outputs": [],
						"payable": true,
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [],
						"name": "agree_upon_services_delivered",
						"outputs": [],
						"payable": true,
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [],
						"name": "withdraw_and_terminate_contract",
						"outputs": [],
						"payable": true,
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [],
						"name": "cancel",
						"outputs": [],
						"payable": true,
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "get_balance_of_contract",
						"outputs": [
							{
								"name": "",
								"type": "uint256"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "see_contract_owner",
						"outputs": [
							{
								"name": "",
								"type": "address"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "see_the_depositor_of_the_contract",
						"outputs": [
							{
								"name": "",
								"type": "address"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}
				],
				"value": "0.0000058",
				"steps": [
					"deposit_funds",
					"agree_upon_services_delivered",
					"withdraw_and_terminate_contract"
				],
				"active": true,
				"action": "deposit_funds",
				"createdOn": "2019-03-22T21:36:06.926Z",
				"actionNeeded": false
			}
		],
		"publicAddress": "0x59001902537Fa775f2846560802479EccD7B93Af",
		"__v": 1
	},
	{
		"_id": "*************************************",
		"contracts": [
			{
				"contractType": "rainy_day",
				"contractBetween": [
					"0x59001902537Fa775f2846560802479EccD7B93Af",
					"0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0"
				],
				"actionFrom": "0x59001902537Fa775f2846560802479EccD7B93Af",
				"actionTo": "0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0",
				"contractAddress": "0x1178A9223ae66FE71cA40786F91dE495c4a108XX",
				"abi": [
					{
						"inputs": [
							{
								"name": "_depositor",
								"type": "address"
							},
							{
								"name": "_creator",
								"type": "address"
							},
							{
								"name": "_request_amount",
								"type": "uint256"
							}
						],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "constructor"
					},
					{
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "action_to",
								"type": "address"
							},
							{
								"indexed": false,
								"name": "value",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "action",
								"type": "string"
							},
							{
								"indexed": false,
								"name": "active",
								"type": "bool"
							}
						],
						"name": "next_action",
						"type": "event"
					},
					{
						"constant": false,
						"inputs": [],
						"name": "deposit_funds",
						"outputs": [],
						"payable": true,
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [],
						"name": "agree_upon_services_delivered",
						"outputs": [],
						"payable": true,
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [],
						"name": "withdraw_and_terminate_contract",
						"outputs": [],
						"payable": true,
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [],
						"name": "cancel",
						"outputs": [],
						"payable": true,
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "get_balance_of_contract",
						"outputs": [
							{
								"name": "",
								"type": "uint256"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "see_contract_owner",
						"outputs": [
							{
								"name": "",
								"type": "address"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "see_the_depositor_of_the_contract",
						"outputs": [
							{
								"name": "",
								"type": "address"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}
				],
				"value": "0.0000058",
				"steps": [
					"deposit_funds",
					"agree_upon_services_delivered",
					"withdraw_and_terminate_contract"
				],
				"active": true,
				"action": "deposit_funds",
				"createdOn": "2019-03-22T21:36:06.926Z",
				"actionNeeded": false
			}
		],
		"publicAddress": "0x59001902537Fa775f2846560802479EccD7B93Af",
		"__v": 1
	}



]
console.log("Data: ", data)
// User.find(function(err, res) {
// 	if (err) {console.log(err)}
// 	if (res) {
// 		data = res
// 	}
// })

// let filter = data.filter((user, i) => user.contracts[i].contractType === "rainy_day" && user.contracts[i].active === true)
// console.log("Filter: ", filter)





let contractsArray = [];

const pleaseWork = () => {

	console.log("This is please work!!!")

	for (let i = 0; i < data.length; i++) {

		console.log("First loop data: ", data[i].contracts)

		for (let j = 0; j < data[i].contracts.length; j++) {

			console.log("Second loop data: ", data[i].contracts[j])


			if (data[i].contracts[j].contractType === "rainy_day" && data[i].contracts[j].active === true) {
				console.log("THE DATA WE REALLY WANT", data[i].contracts[j].contractAddress)
				contractsArray.push(data[i].contracts[j].contractAddress)
		
			}
	
	}
	
	console.log("Our array: ", contractsArray)

}
}

pleaseWork()




let contract = contractsArray.map((user, i) => new ethers.Contract(user, abi, wallet))

console.log("Every contract instance: ", contract)


const oracleProcess = setInterval(function rainCheck() {

  if (helper.getCurrentWeatherByCityName("Missoula") !== "rain") {

    console.log(".......... It's raining! The oracle will attempt to make a transaction with the deployed contract right now.");
		//loop through contracts and send 
		// contract[i].issue_refund().then((tx, err) => {
    contract.issue_refund().then((tx, err) => {
      if (tx) {
				contract.on("ActionStatus", (status, action, value) => {
					console.log(".......... Success! Rainy day refund issued to owner. Transaction details: ", tx, "Contract event emissions: ", status, action, value)
				});
      }
      if (err) {
        console.log(".......... Whoops! Something isn't right. Details: ", err)
      }
		})
		
		//might have to remove this and let oracle run forevermore 
    .then(clearInterval(oracleProcess));
  }

  else {
    console.log(".......... It's not raining! The oracle will not trigger a contract refund at this time and will check the weather again in 10 seconds.");
  }

}, 10000);
