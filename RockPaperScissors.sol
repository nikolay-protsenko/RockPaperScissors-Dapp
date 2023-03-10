// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RockPaperScissors{
    
    constructor() payable {}

    string[] public choices;

    event GamePlayed(address player, uint256[] selectedChoice, bool isWinner, string resultMessage);

    function calculateChoice(uint256[] memory payerChoices) public payable returns(uint256, uint256, uint256, uint256[] memory, string memory){

        uint256[] memory _computerResult = new uint256[](payerChoices.length);

        uint256 _computerWins=0;
        uint256 _playerWins=0;
        uint256 _numberOfDraws=0;

        for (uint i=0; i < payerChoices.length; i++) {
            
            uint256 _computerSelection = block.timestamp%3+1;
            uint256 _playerSelection = payerChoices[i];

            //rock = 1
            //paper = 2
            //scissors = 3
            if (_playerSelection == _computerSelection){
                    _numberOfDraws++;
            // Possible computer wins
            } else if (((_playerSelection == 1) && (_computerSelection == 2)) ||
                ((_playerSelection == 2) && (_computerSelection == 3)) ||
                ((_playerSelection == 3) && (_computerSelection == 1))){
                    _computerWins++; 
            // Possible player wins
            } else if (((_computerSelection == 1) && (_playerSelection == 2)) ||
                ((_computerSelection == 2) && (_playerSelection == 3)) ||
                ((_playerSelection == 1) && (_computerSelection == 3))){
                    _playerWins++;
            }

            _computerResult[i] = _computerSelection;

        }
        
        string memory _resultWinner;

        if (_playerWins > _computerWins) {
            _resultWinner = "Winner: Player!";
            emit GamePlayed(msg.sender,  _computerResult, true, _resultWinner);
            payable(msg.sender).transfer(msg.value*2);
        }else if (_computerWins > _playerWins){ 
            _resultWinner = "Winner: Computer!";

            emit GamePlayed(msg.sender,  _computerResult, false, _resultWinner);
        }else { 
            _resultWinner = "Winner: It's a draw!!";
            emit GamePlayed(msg.sender,  _computerResult, false, _resultWinner);
        }

        return (_computerWins, _playerWins, _numberOfDraws, _computerResult, _resultWinner);
    
    }

    receive() external payable {}

}