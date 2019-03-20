const serviceAgreement = artifacts.require('./serviceAgreement.sol');

module.exports = function(deployer) {
	deployer.deploy(serviceAgreement);
};
