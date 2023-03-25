export const abi = [
  {
    "inputs": [],
    "name": "Transaction_FunderNotPresent",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Transaction_TargetNotReached",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Transaction_ZeroFundingError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount_withdraw",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "funder_address",
        "type": "address"
      }
    ],
    "name": "Fund_Withdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "firstTransaction_Complete",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount_funded",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "funder_address",
        "type": "address"
      }
    ],
    "name": "fundingComplete",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "inventor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "proposedAmount",
        "type": "uint256"
      }
    ],
    "name": "projectListed",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "Fullretrive",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "firstTransaction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_inventor",
        "type": "address"
      }
    ],
    "name": "fund",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAmountFunded",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposedAmount",
        "type": "uint256"
      }
    ],
    "name": "listTheProject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

