const eFactory = artifacts.require('AmberContractFactory');

contract("factory", async accounts => {
	it("should deploy a contract", async () => {
		let instance = await eFactory.deployed()
		let address = await instance.address;
		console.log(instance.methods);
		console.log(address);
		assert.ok(address);
	});

	it("should call the service_agreement function", async () => {
		let factory;
		let account_one = accounts[0]
		let account_two = accounts[1]
		let value = 1000000;
		let instance = await eFactory.deployed();
		factory = instance; 

		let results = await factory.service_agreement(account_one, value, {from: account_two});
		console.log(results.logs);
	})

});