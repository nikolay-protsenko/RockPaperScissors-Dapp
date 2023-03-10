let roundNumber = 0;
let playerWins = 0,
    computerWins = 0,
    numberOfDraws = 0;
let computerChoice = "",
    playerChoice = "";
let computerChoiceList = [];
var playerChoiceList = [];
var playerChoiceListNumbers = [];
let gameComplete = false;

const roundNumberSpan = document.getElementById("round");

const playerChoiceSpan = document.getElementById("playerChoice");
const computerChoiceSpan = document.getElementById("computerChoice");

const playerChoiceListSpan = document.getElementById("playerChoiceList");
const computerChoiceListSpan = document.getElementById("computerChoiceList");

const computerWinsSpan = document.getElementById("computerWins");
const playerWinsSpan = document.getElementById("playerWins");
const drawsSpan = document.getElementById("draws");

const resultsAreaDiv = document.getElementById("resultsArea");

function computerPlay() {

    let min = 1,
        max = 3;

    let selectionNumber = Math.floor(Math.random() * (max - min) + min);

    switch (selectionNumber) {

        case 1: {
            return "rock";
            break;
        }
        case 2: {
            return "paper";
            break;
        }
        case 3: {
            return "scissors";
            break;
        }
    };

}

function convertIntToString(intChoiceArray) {
    var choiceStringList = [];

    console.log('intChoiceArray'+intChoiceArray);

    for (i=0; i<intChoiceArray.length; i++) {
        
        if(intChoiceArray[i] == 1){
            choiceStringList.push("rock");
        } else if(intChoiceArray[i] == 2){
            choiceStringList.push("paper");
        }else if(intChoiceArray[i] == 3){
            choiceStringList.push("scissors");
        }

      }
      return choiceStringList;

}

function init() {
    roundNumber = 0;
    playerWins = 0;
    computerWins = 0;
    numberOfDraws = 0;
    playerChoiceSpan.textContent = "Player Choices: ";
    computerChoiceSpan.textContent = "Computer Choices:";

    computerChoiceList = [];
    playerChoiceList = [];
    playerChoiceListNumbers = [];

    playerChoiceListSpan.textContent = "Player Choices: ";
    computerChoiceListSpan.textContent = "Computer Choices:";
    computerChoice = "";
    playerChoice = "";

    resultsAreaDiv.textContent = "NO RESULTS - GAME ONGOING";
    gameComplete = false;
    document.getElementById("resultScores").style.display = 'none';


    document.getElementById("playGameBtn").style.visibility = 'hidden';
    document.getElementById("newGameBtn").style.visibility = 'hidden';

    document.getElementById("playerChoice").style.visibility = 'hidden';
    document.getElementById("computerChoice").style.visibility = 'hidden';
    document.getElementById("computerChoiceList").style.visibility = 'hidden';
}

function newGame() {
    roundNumber = 0;
    playerWins = 0;
    computerWins = 0;
    numberOfDraws = 0;

    playerChoiceSpan.textContent = "Player Choices: ";
    computerChoiceSpan.textContent = "Computer Choices:";

    playerChoiceList = [];
    computerChoiceList = [];
    playerChoiceListNumbers = [];
    playerChoiceListSpan.textContent = "Player Choices: ";
    computerChoiceListSpan.textContent = "Computer Choices:";
    computerChoice = "";
    playerChoice = "";
    resultsAreaDiv.textContent = "NO RESULTS - GAME ONGOING";
    gameComplete = false;
    DOMscoreUpdate();

    document.getElementById("rock").style.visibility = 'visible';
    document.getElementById("paper").style.visibility = 'visible';
    document.getElementById("scissors").style.visibility = 'visible';
    document.getElementById("resultScores").style.display = 'none';
    document.getElementById("computerChoiceList").style.visibility = 'hidden';

    document.getElementById("playGameBtn").style.visibility = 'hidden';
    document.getElementById("newGameBtn").style.visibility = 'hidden';
}

function playRound(playerSelection, computerSelection) {

    if (playerSelection == computerSelection)
        return "tie";

    // Possible computer wins
    else if (((playerSelection == "rock") && (computerSelection == "paper")) ||
        ((playerSelection == "paper") && (computerSelection == "scissors")) ||
        ((playerSelection == "scissors") && (computerSelection == "rock")))
        return "computer";

    // Possible player wins
    else if (((computerSelection == "rock") && (playerSelection == "paper")) ||
        ((computerSelection == "paper") && (playerSelection == "scissors")) ||
        ((playerSelection == "rock") && (computerSelection == "scissors")))
        return "player";
}

function DOMscoreUpdate() {
    roundNumberSpan.textContent = "ROUND: " + roundNumber;

    playerChoiceSpan.textContent = "Player Choice: " + playerChoice;
    computerChoiceSpan.textContent = "Computer Choices: " + computerChoice;
    playerChoiceListSpan.textContent = "Player Choices: " + playerChoiceList;
    computerChoiceListSpan.textContent = "Computer Choices: " + computerChoiceList;

    computerWinsSpan.textContent = "Computer Wins: " + computerWins;
    playerWinsSpan.textContent = "Player Wins: " + playerWins;
    drawsSpan.textContent = "Draws: " + numberOfDraws;
}


function playerClick(playerButton) {

    if ((roundNumber <= 4) & (gameComplete == false)) {
        console.log("Round: " + roundNumber);

        
        playerChoice = playerButton;
        playerChoiceList.push(playerButton);

        if(playerChoice == "rock"){
            playerChoiceListNumbers.push(1);
        }else if(playerChoice == "paper"){
            playerChoiceListNumbers.push(2);
        }else if(playerChoice == "scissors"){
            playerChoiceListNumbers.push(3);
        }
        
        if (roundNumber == 4) {
            roundNumber++;
            DOMscoreUpdate();

            gameComplete = true;

            document.getElementById("rock").style.visibility = 'hidden';
            document.getElementById("paper").style.visibility = 'hidden';
            document.getElementById("scissors").style.visibility = 'hidden';
            document.getElementById("newGameBtn").style.visibility = 'visible';
            document.getElementById("playGameBtn").style.visibility = 'visible';
            resultsAreaDiv.textContent = 'Press button "Play Game" and send your choices!';

        } else {
            roundNumber++;
            DOMscoreUpdate();
        }
        console.log('playerChoiceListNumbers:'+playerChoiceListNumbers);

    }

}

function playGame() {
    DOMscoreUpdate();
    displayResults();
    document.getElementById("resultScores").style.display = 'inline';
    document.getElementById("playGameBtn").style.visibility = 'hidden';
    document.getElementById("computerChoiceList").style.visibility = 'visible';
}

function displayResults() {
    resultsAreaDiv.textContent = "WINNER: "

    if (playerWins > computerWins) resultsAreaDiv.textContent += "Player!";
    else if (computerWins > playerWins) resultsAreaDiv.textContent += "Computer!";
    else resultsAreaDiv.textContent += "It's a draw!";

    console.log("Computer Wins: " + computerWins);
    console.log("Player Wins: " + playerWins);
    console.log("Draws: " + numberOfDraws);
}

function game() {
    init();
    DOMscoreUpdate();
};

game();