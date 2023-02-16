
// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.4;
  error  Transaction_ZeroFundingError();
  error Transaction_TargetNotReached();
   error  Transaction_FunderNotPresent();

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import "@chainlink/contracts/src/v0.8/tests/MockV3Aggregator.sol";


contract tansaction 
{

  
    event  fundingComplete(uint256 amount_funded, address funder_address);
    event  Fund_Withdraw(uint256 amount_withdraw, address funder_address);
    event   firstTransaction_Complete();
    event   projectListed(address inventor , uint256 proposedAmount);
    //Steps of transaction
    // 1.Transferring money from investor to contract
    // 2.Mapping the amount and address of investors 
    // 3.Striking an update when a growth rate is reached
    uint256 amt;
    address payable  inventor;
    mapping (address=>uint256) private s_funderToAmount;
    uint256 private balance =0 ;
    uint256 private proposedAmount;
    mapping (address  => uint256) s_inventorToProposedAmount;


// Constructor to intiate the value of smt and funder's address 
    constructor(/*uint256 _amt address payable _funder*/  uint256 _proposedAmount ,address payable _inventor)
    {
            // amt =_amt;
            // funder = _funder;
            proposedAmount = _proposedAmount;
             _inventor = _inventor;
 
    }
    
    // function to list the project
    function listTheProject (uint256 _proposedAmount) external 
    {
        s_inventorToProposedAmount[msg.sender] = _proposedAmount;
        emit projectListed(msg.sender, _proposedAmount);
    }



    //function to send funds to the contract 
    function fund() public payable 
    {
        if(msg.value <= 0)
        {
            revert Transaction_ZeroFundingError();
        }
        s_funderToAmount[msg.sender] += msg.value;
        balance = balance + msg.value; //updating the balance of main acc
        emit fundingComplete(msg.value, msg.sender);


    }
    
    
    // function to retrive the donated amount 
    function retrive() public payable 
    {
        //require condition to check if the withdrawer has funded any amount or not 
        if(s_funderToAmount[msg.sender] == 0 )
        {
            revert Transaction_FunderNotPresent();
        }
        delete s_funderToAmount[msg.sender];
        (bool sent, ) = msg.sender.call{value: s_funderToAmount[msg.sender]}("");
        require(sent, "Failed to send Ether");
        emit Fund_Withdraw(msg.value, msg.sender);
        
    }
    
    
    //fucntion 
        function firstTransaction() public payable
        {
            if(address(this).balance > proposedAmount)
            {
        (bool sent,) = inventor.call{value: (address(this).balance)/2}("");
        require(sent, "Failed to send Ether");
        emit firstTransaction_Complete();
            }
            else{
                revert Transaction_TargetNotReached();
            }
        } 
    
    //getter function
    function getBalance() public view returns (uint256){
            return address(this).balance;
            
    }

// function getAmountDepositedinUsd() private view returns (int)
// {
//     return int(amt)*_price;
// }   
    
}