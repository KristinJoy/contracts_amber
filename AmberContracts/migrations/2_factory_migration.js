const eFactory = artifacts.require('AmberContractFactory');

module.exports = function(deployer) {
	deployer.deploy(eFactory);
};
