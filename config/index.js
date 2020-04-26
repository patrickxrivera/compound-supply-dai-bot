require('dotenv').config()

module.exports = {
    infuraEndpoint: process.env.INFURA_ENDPOINT,
    privateKey: process.env.PRIVATE_KEY,
    zeroAddress: "0x0000000000000000000000000000000000000000",
    gasConfig: {
        gasPrice: "3000000000",
        gasLimit: "1000000"
    }
}