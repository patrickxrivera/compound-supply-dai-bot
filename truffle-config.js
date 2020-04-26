require('dotenv').config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const utils = require("web3-utils");

const mnemonic = process.env["MNEMONIC"];
const mainNetInfuraEndpoint = process.env["INFURA_MAINNET_ENDPOINT"];

const mainNetProvider = new HDWalletProvider(mnemonic, mainNetInfuraEndpoint);

module.exports = {
  networks: {
		mainnet: {  // Provided by Infura, load keys in .env file
			network_id: "1",
			provider: mainNetProvider,
			gas: 1500000,
			gasPrice: utils.toWei("5", "gwei"),
		}
	}
};