// import
// main function
// calling main function

const { network } = require("hardhat")
const {
    networkConfig,
    DECIMALS,
    INITIAL_ANSWER,
    developmentChains
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

// function deployFunc(hre) {
//     console.log("Hi!")
// }
// module.exports.default = deployFunc

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // const ethUsdPriceFeed = networkConfig[chainId]["ethUsdPriceFeed"]

    let ethUsdPriceFeed
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })

    // now to create an autoverication but NOT on localhost/hardhat

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    log("____________________________________")
}

module.exports.tags = ["all", "fundme"]
// if ChainID is X then use address Y

// when working with localhost or hardhat, use a mock
