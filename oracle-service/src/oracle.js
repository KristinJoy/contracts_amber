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
// console.log(providerWallet);

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
			"constant": false,
			"inputs": [],
			"name": "issue_refund",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
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
			"name": "get_contract_balance",
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
			"inputs": [
					{
							"name": "_owner",
							"type": "address"
					}
			],
			"payable": true,
			"stateMutability": "payable",
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
	}
]

// ------------------------------------------------------------------
//      THE ORACLE WILL SEE YOU NOW
// ------------------------------------------------------------------

let data = [
	{
		"_id": "-------------- FIRST FAKE DATABASE RECORD -------------",
		"contracts": [
			{
				"contractType": "rainy_day",
				"contractBetween": [
					"0x59001902537Fa775f2846560802479EccD7B93Af",
					"0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0"
				],
				"actionFrom": "0x59001902537Fa775f2846560802479EccD7B93Af",
				"actionTo": "0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0",
				"contractAddress": "0x234B994f30f68A604f886FcB5768D79F04592616",
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
		"_id": "-------------- SECOND FAKE DATABASE RECORD -------------",
		"contracts": [
			{
				"contractType": "rainy_day",
				"contractBetween": [
					"0x59001902537Fa775f2846560802479EccD7B93Af",
					"0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0"
				],
				"actionFrom": "0x59001902537Fa775f2846560802479EccD7B93Af",
				"actionTo": "0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0",
				"contractAddress": "0xD97c0edE0d7Fc15240a146a2C3F5E966C242e6A3",
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
// console.log("Data: ", data)

const getAllOracleContracts = () => {

	let contracts = []

	console.log("********************** GETTING ALL ORACLE CONTRACTS **********************")

	for (let i = 0; i < data.length; i++) {

		// console.log("********************** FIRST LOOP DATA: ", data[i].contracts)

		for (let j = 0; j < data[i].contracts.length; j++) {

			// console.log("********************** SECOND LOOP DATA: ", data[i].contracts[j])

			if (data[i].contracts[j].contractType === "rainy_day" && data[i].contracts[j].active === true) {
				console.log("********************** THE DATA WE REALLY WANT", data[i].contracts[j].contractAddress)
				contracts.push({contractAddress: data[i].contracts[j].contractAddress, publicAddress: data[i].publicAddress, location: data[i].contracts[j].action})
			}
		}
	}

	console.log("********************** OUR ARRAY: ", contracts.length)
	return contracts

}

const oracleProcess = setInterval(function rainCheck() {

	const contracts = getAllOracleContracts()
	console.log("***************** CONTRACTS AFTER DB CALL **********************", contracts)

	contracts.forEach(async contract => {

		console.log("********************** OUR CONTRACT ADDRESS: ", contract.contractAddress)
		let contractInstance = new ethers.Contract(contract.contractAddress, abi, wallet)
		// console.log("Our contract instance: ", contractInstance)

		// contract.location can replace Missoula
		if (helper.getCurrentWeatherByCityName("Missoula") !== "rain") {

			console.log("********************** It's raining! The oracle will attempt to make a transaction with the deployed contract right now.");

			await contractInstance.issue_refund().then((tx, err) => {
				if (tx) {
					console.log("****************** WE HAVE ARIVEN ************************")
					contractInstance.on("next_action", (address, value, action, active) => {
						console.log("********************** Success! Rainy day refund issued to owner. Transaction details: ", tx, "Contract event emissions: ", address, value, action, active)
					});
				}
				if (err) {
					console.log("********************** Whoops! Something isn't right. Details: ", err)
				}
			})
			
			//might have to remove this and let oracle run forevermore 
			// .then(clearInterval(oracleProcess));
		}

		else {
			console.log("********************** It's not raining! The oracle will not trigger a contract refund at this time and will check the weather again in 10 seconds.");
		}

	})

}, 20000);
