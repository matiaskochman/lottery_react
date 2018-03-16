import Web3 from 'web3';

//window.web3 is the version that comes with metamask
//and we have to replace
const web3 = new Web3(window.web3.currentProvider);

export default web3;
