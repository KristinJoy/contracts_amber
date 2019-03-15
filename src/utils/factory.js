import web3 from "./web3";


const address = "0x2134d55F7E7708F3EF434FD0Bb756459b608B76D";
const abi = [
	{
		constant: false,
		inputs: [
			{
				name: "_depositor",
				type: "address"
			}
		],
		name: "creator",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "_newEscrow",
				type: "address"
			}
		],
		name: "NewContract",
		type: "event"
	}
];

export default new web3.eth.Contract(abi, address);