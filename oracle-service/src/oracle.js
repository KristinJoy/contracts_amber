/*
Instructions for use/testing: Deploy an instance of RainyDay-for-remix.sol. If you deploy it on a network other than Rinkeby, you'll need to change the corresponding parameter under the "NETWORK CONNECTION AND WALLET" section below. Also, make sure that your deployed contract has whitelisted an account to serve as your oracle and whose private key that you know.

Once deployed, replace the values for const abi and const deployedContractAddress in the "RAINY DAY CONTRACT DETAILS" section below. Also, set your environment variable with your API key from OpenWeatherMap and the private key of the oracle address that you had whitelisted in your deployed contract. If you want to have the oracle scan for rain in a city other than Missoula, replace the corresponding parameter in the "THE ORACLE WILL SEE YOU NOW" section below.

If it's not currently raining in your chosen city, but you want to see the refund in action, change the following conditional from this:

    if (helper.getCurrentWeatherByCityName("Missoula") == "rain")

to this:

    if (helper.getCurrentWeatherByCityName("Missoula") !== "rain")

Then, in the terminal, run: nodemon server.js. Check your log. If succesful, then check your deployed contract details on Etherscan. You should see that the contract balance was refunded to the owner, with a small amount going to the oracle for the transaction cost.
*/

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

const deployedContractAddress = "0xDDD99805B64c5cc23701f2fE8aD796a6d2726166";

let contract = new ethers.Contract(deployedContractAddress, abi, wallet);

// ------------------------------------------------------------------
//      THE ORACLE WILL SEE YOU NOW
// ------------------------------------------------------------------

// Oracle process loop: If it's raining, create a transaction that triggers the deployed Rainy Day Contract's issueRefund() method, then terminate the whole loop. Else (if it's not raining), wait 10 seconds and restart.
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
