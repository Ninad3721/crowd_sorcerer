const deploy = require("./deploy");
const {development} = require("../hardhat-helper-config");
const { network } = require("hardhat");

const DECIMALS = "8"
const INITIAL_PRICE = "200000000000" // 2000
module.exports = async ({getNamedAccounts , deployments})=>
{
    const {deployer } = await getNamedAccounts();
    const {deploy, log} = deployments

    if(development.includes(network.name)) //chainId is testnet so deploy mocks 
    {
        log("Development Chain Detected Deploying mocks")
        const MockAggregator = await deploy("MockV3aggregator",{
            contract: "MockV3Aggregator",
            from:deployer,
            log: true,
            args:[DECIMALS, INITIAL_PRICE]
        })
        log("Mocks deployed ")
    } 
} 

