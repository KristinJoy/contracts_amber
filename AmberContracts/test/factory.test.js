const eFactory = artifacts.require('AmberContractFactory');

contract("factory", async accounts => {
	it("should deploy a contract", async () => {
		let instance = await eFactory.deployed()
		let address = await instance.address;
		console.log(address);
		assert.ok(address);
	})
});