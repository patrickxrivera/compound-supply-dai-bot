require('dotenv').config()

const { bytecode } = require('../.build/CErc20SupplierBytecode.json');
const abi = require('../.build/CErc20SupplierAbi.json');
const Web3 = require('web3');
const { infuraEndpoint, privateKey, zeroAddress, gasConfig } = require("../config");

const web3 = new Web3(infuraEndpoint);

(async function() {
    web3.eth.accounts.wallet.add(`0x${privateKey}`);

    const myWalletAddress = web3.eth.accounts.wallet[0].address;

    const cErc20SupplierContract = new web3.eth.Contract(abi);

    const result = await cErc20SupplierContract.deploy({
        data: `0x${bytecode}`,
    }).send({
        from: myWalletAddress,
        ...gasConfig   
    })

    console.log(result);

    console.log("Successfully deployed contract!")

    console.log(`You can interface with the contract at address ${result.options.address}`);
})();