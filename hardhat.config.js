require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("solidity-coverage")
require("@nomiclabs/hardhat-ethers")
require("dotenv").config()
require("hardhat-gas-reporter")

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETKEY_API_KEY = process.env.COINMARKETKEY_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }]
    },
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6
        }
    },

    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    },

    namedAccounts: {
        deployer: {
            default: 0
        },
        user: {
            default: 1
        }
    },

    gasReporter: {
        enabled: true,
        outputFile: "gas-Report.txt",
        noColors: true,
        currency: "USD",
        // coinmarketcap: COINMARKETCAP_KEY_API,
        token: "MATIC"
    }
}
