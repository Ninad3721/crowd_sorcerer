const { ethers } = require("hardhat");
require("dotenv").config()
module.exports = async function main({getNamedAccounts, deployments})
{
    // const getNamedAccounts = hre.getNamedAccounts;
    const {deployer} = await getNamedAccounts();
    const {deploy, log} = deployments
    const inventor = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    const proposed_amt = ethers.utils.parseEther("0.02")
    const transaction = await deploy("tansaction",
      {
        from:deployer,
        args:[proposed_amt, inventor],
        log:true,
        gasLimit: 3e7,
      }
   
    )
    await log("Transaction complete by contract "+ transaction.address)
    const options = {value:ethers.utils.parseEther("0.01")}
    const transaction_instance = await ethers.getContract("tansaction")
    await transaction_instance.fund(options)
    const balance = await  transaction_instance.getBalance()
    console.log(ethers.utils.formatEther(balance))
}
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
