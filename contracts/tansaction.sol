
// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import "@chainlink/contracts/src/v0.8/tests/MockV3Aggregator.sol";


contract tansaction 
{
    //Steps of transaction
    // 1.Transferring money from investor to contract
    // 2.Mapping the amount and address of investors 
    // 3.Striking an update when a growth rate is reached
    uint256 amt;
    address payable  inventor;
    // address payable public funder;
    mapping (address=>uint256) private s_funderToAmount;
    uint256 private balance =0 ;
    uint256 private proposedAmount;

    
    
AggregatorV3Interface internal priceFeed;

// Constructor to intiate the value of smt and funder's address 
    constructor(/*uint256 _amt address payable _funder*/  uint256 _proposedAmount ,address payable _inventor)
    {
            // amt =_amt;
            // funder = _funder;
            proposedAmount = _proposedAmount;
             _inventor = _inventor;
             priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
    }


//  function getLatestPrice() public view returns (int) {
//         (,/*uint80 roundID*/ int price /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/,,,) = priceFeed.latestRoundData();
//         return price;
//     }

// int _price = getLatestPrice()/10e8;

    //function to send funds to the contract 
    function fund() public payable 
    {
        s_funderToAmount[msg.sender] += msg.value;
        balance = balance + msg.value; //updating the balance of main acc

    }
    
    
    // function to retrive the donated amount 
    function retrive() public payable 
    {
        //require condition to check if the withdrawer has funded any amount or not 
        if(s_funderToAmount[msg.sender] != 0 )
        {
        (bool sent, bytes memory data) = msg.sender.call{value: s_funderToAmount[msg.sender]}("");
        require(sent, "Failed to send Ether");
        delete s_funderToAmount[msg.sender];
        }
    
            }
    
    
    //fucntion 
        function firstTransaction() public payable
        {
            if(address(this).balance> proposedAmount)
            {
        (bool sent, bytes memory data) = inventor.call{value: (address(this).balance)/2}("");
        require(sent, "Failed to send Ether");
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