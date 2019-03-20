const eFactory = artifacts.require('./Efactory.sol');

module.exports = function(deployer) {
	deployer.deploy(eFactory);
};
