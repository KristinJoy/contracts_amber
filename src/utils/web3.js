import Web3 from "web3";

const web3 = new Web3(window.web3.currentProvider);

export default web3;

//This file allows us to piggy back off of the web3 instance that metamask automatically injects on the page
//since metamask is still at v0.20.0 we sneak are version in there and can use the updated version 1.0.0-beta.46
