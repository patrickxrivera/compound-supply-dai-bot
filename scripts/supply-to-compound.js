const Web3 = require("web3");
const utils = require("web3-utils");
const { infuraEndpoint, privateKey, gasConfig } = require("../config");
const DaiContractAbi = require("../.build/DaiContractAbi.json");
const CompoundCDaiContractAbi = require("../.build/CompoundCDaiContractAbi.json");
const CErc20SupplierAbi = require("../.build/CErc20SupplierAbi.json");

const web3 = new Web3(infuraEndpoint)

const DAI_CONTRACT_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
const COMPOUND_C_DAI_CONTRACT_ADDRESS = '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643';
const C_ERC_20_SUPPLIER_CONTRACT_ADDDRESS = '0x8dd4Ff3A5AFCBaAb2FFB94648D7c6C77470b929F';

(async function() {
    web3.eth.accounts.wallet.add(`0x${privateKey}`);

    const myWalletAddress = web3.eth.accounts.wallet[0].address;

    const daiContract = new web3.eth.Contract(DaiContractAbi, DAI_CONTRACT_ADDRESS)
    const cErc20SupplierContract = new web3.eth.Contract(CErc20SupplierAbi, C_ERC_20_SUPPLIER_CONTRACT_ADDDRESS);

    const daiAmount = utils.toHex(1e18) // 1 DAI

    const transferDaiResponse = await daiContract.methods.transfer(
        C_ERC_20_SUPPLIER_CONTRACT_ADDDRESS,
        daiAmount
    ).send({
        from: myWalletAddress,
        ...gasConfig
    });

    const supplyToCompoundResponse = await cErc20SupplierContract.methods.supplyToCompound(
        DAI_CONTRACT_ADDRESS,
        COMPOUND_C_DAI_CONTRACT_ADDRESS,
        daiAmount
    )
})();