// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
error Transaction_ZeroFundingError();
error Transaction_TargetNotReached();
error Transaction_FunderNotPresent();

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import "@chainlink/contracts/src/v0.8/tests/MockV3Aggregator.sol";

contract tansaction {
    event fundingComplete(uint256 amount_funded, address funder_address);
    event Fund_Withdraw(uint256 amount_withdraw, address funder_address);
    event firstTransaction_Complete();
    event projectListed(address inventor, uint256 proposedAmount);
    //Steps of transaction
    // 1.Transferring money from investor to contract
    // 2.Mapping the amount and address of investors
    // 3.Striking an update when a growth rate is reached
    uint256 amt;
    address payable inventor;
    mapping(address => uint256) private s_funderToAmount;
    uint256 private balance = 0;
    uint256 private proposedAmount;
    mapping(address => uint256) s_inventorToProposedAmount;
    mapping(address => address) s_FunderToInventor;

    mapping(string => mapping(address => uint256)) projectIdToFunderToAmt;

    // Constructor to intiate the value of smt and funder's address
    // constructor(/*uint256 _amt address payable _funder*/  uint256 _proposedAmount ,address payable _inventor)
    // {
    //         amt =_amt;
    //         funder = _funder;
    //         proposedAmount = _proposedAmount ;
    //          _inventor = _inventor;

    // }

    // function to list the project
    function listTheProject(uint256 _proposedAmount) external {
        s_inventorToProposedAmount[msg.sender] = _proposedAmount;
        emit projectListed(msg.sender, _proposedAmount);
    }

    //function to send funds to the contract
    function fund(address _inventor, string memory _projectId) public payable {
        if (msg.value <= 0) {
            revert Transaction_ZeroFundingError();
        }
        s_funderToAmount[msg.sender] += msg.value;
        balance = balance + msg.value; //updating the balance of contract acc
        if (projectIdToFunderToAmt[_projectId][msg.sender] == 0) {
            projectIdToFunderToAmt[_projectId][msg.sender] = msg.value;
        } else {
            projectIdToFunderToAmt[_projectId][msg.sender] += msg.value;
        }
        (bool sent, bytes memory data) = address(this).call{
            gas: 2300,
            value: msg.value
        }("func_signature(uint256 args)");
        emit fundingComplete(msg.value, msg.sender);
    }

    // function to retrive the donated amount
    function Fullretrive(string memory _projectId) external {
        //require condition to check if the withdrawer has funded any amount or not
        if (s_funderToAmount[msg.sender] == 0) {
            revert Transaction_FunderNotPresent();
        }
        (bool sent, ) = (address(this)).call{
            value: projectIdToFunderToAmt[_projectId][msg.sender]
        }("");
        //    _to.transfer(s_funderToAmount[msg.sender]);
        //  address to = payable(msg.sender);
        //  address(this).transfer( projectIdToFunderToAmt[_projectId][msg.sender]);
        // require(sent, "Failed to send Ether");
        delete projectIdToFunderToAmt[_projectId][msg.sender];
        // emit Fund_Withdraw(msg.value, msg.sender);
    }

    //fucntion
    function firstTransaction() external {
        if (address(this).balance > proposedAmount) {
            (bool sent, ) = inventor.call{
                value: s_inventorToProposedAmount[msg.sender] / 2
            }("");
            require(sent, "Failed to send Ether");
            emit firstTransaction_Complete();
        } else {
            revert Transaction_TargetNotReached();
        }
    }

    //getter function
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getAmountFunded() public view returns (uint256) {
        return s_funderToAmount[msg.sender];
    }

    function projectIdToFunderToAmt_getter(
        string memory _projectId,
        address _funder
    ) public view returns (uint256) {
        return projectIdToFunderToAmt[_projectId][_funder];
    }
}
