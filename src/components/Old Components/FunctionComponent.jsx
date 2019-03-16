import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Web3Provider from '../Providers/Web3Provider';

function SomeComponent(props, context) {
  const web3Context = context.web3;
  console.log("context passed:", web3Context);
  /**
   * web3Context = {
   *   accounts: {Array<string>} - All accounts
   *   selectedAccount: {string} - Default ETH account address (coinbase)
   *   network: {string} - One of 'MAINNET', 'ROPSTEN', or 'UNKNOWN'
   *   networkId: {string} - The network ID (e.g. '1' for main net)
   * }
   */

  return (
    <div>
      <p>Account: {web3Context.accounts}</p>
      <p>Selected Account: {web3Context.selectedAccount}</p>
      <p>Network: {web3Context.network}</p>
      <p>Network ID: {web3Context.networkId}</p>
    </div>

  );
}

SomeComponent.contextTypes = {
  web3: PropTypes.object
};

export default SomeComponent;
