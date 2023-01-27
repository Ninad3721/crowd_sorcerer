require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: 
  {
    compilers:
    [
      {
        version: "0.8.0",
    },
    {
        version: "0.6.0",
    },
    ]
  },
  defaultNetwork:"hardhat",
  // network:
  // {
  //   account:[],
  //   url:"https://eth-goerli.g.alchemy.com/v2/DUMqftJofufvzIoxXLk46iSMnA_zymBx",
  //   chainId: 5,

  // },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/ZlZhkMbMMEKrEM2Wxb0oiFtceOEWcEbQ",
      }
    }
  },
  namedAccounts:
  {
    deployer:
    {
      default:0
    }
  }
};
