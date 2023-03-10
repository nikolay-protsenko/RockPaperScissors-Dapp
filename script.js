const  contractAirdropAddress = "0xB8b993dfb18BCFd467e6a36E6d68FA99DDB3B88c"
const contractAirdropABI = [
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "payerChoices",
				"type": "uint256[]"
			}
		],
		"name": "calculateChoice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "selectedChoice",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isWinner",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "resultMessage",
				"type": "string"
			}
		],
		"name": "GamePlayed",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "choices",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let signer
let contract
let log = `
    
    `;

const provider = new ethers.providers.Web3Provider(window.ethereum, 80001); // matic mumbai chain_id


provider.send("eth_requestAccounts",[]).then(() => {
        provider.listAccounts().then( (accounts) =>{
            signer = provider.getSigner(accounts[0]);
			console.log(signer)
            
            contract = new ethers.Contract(
                contractAirdropAddress,
                contractAirdropABI,
                signer
            )
        }
        )
    }
)

async function calculateChoice(){
    //let amountInEth = document.getElementById("amountInEth").value;
	let amountInEth = 0.01;
    let amountInWei = ethers.utils.parseEther(amountInEth.toString())
    //WEI = 10^(-18) in ETH
    let diceRolled = await contract.calculateChoice(playerChoiceListNumbers, {value: amountInWei});
	console.log('diceRolled:'+diceRolled);
    let res = await diceRolled.wait();

    let queryResult =  await contract.queryFilter('GamePlayed', await provider.getBlockNumber() - 1000, await provider.getBlockNumber());
    console.log(queryResult);
    let queryResultRecent = queryResult[queryResult.length-1]

    let isWinner = await queryResultRecent.args.isWinner.toString();
    let resultMessage = await queryResultRecent.args.resultMessage.toString();
    let player = await queryResultRecent.args.player.toString();

	let selectedChoice = await queryResultRecent.args.selectedChoice.toString();

	let computerResults = convertIntToString(selectedChoice);

    console.log(isWinner);

    let log1 = `
    Player's address: ${player},
    Result: ${resultMessage},
	Computer's  Choices: ${computerResults}
    `;

    let result =  document.getElementById("resultVal");
    result.innerText = log1;
	document.getElementById("newGameBtn").style.visibility = 'visible';
}




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

    computerChoiceList = [];
    playerChoiceList = [];
    playerChoiceListNumbers = [];

    playerChoiceListSpan.textContent = "Player Choices: ";
    computerChoice = "";
    playerChoice = "";

    gameComplete = false;


    document.getElementById("playGameBtn").style.visibility = 'hidden';
    document.getElementById("newGameBtn").style.visibility = 'hidden';

    document.getElementById("playerChoice").style.visibility = 'hidden';
    document.getElementById("computerChoice").style.visibility = 'hidden';
    document.getElementById("computerChoiceList").style.visibility = 'hidden';
	document.getElementById("resultDiv").style.visibility = 'hidden';
}

function newGame() {
    roundNumber = 0;
    playerWins = 0;
    computerWins = 0;
    numberOfDraws = 0;


    playerChoiceList = [];
    computerChoiceList = [];
    playerChoiceListNumbers = [];
    playerChoiceListSpan.textContent = "Player Choices: ";
    computerChoice = "";
    playerChoice = "";
    gameComplete = false;
    DOMscoreUpdate();

    document.getElementById("rock").style.visibility = 'visible';
    document.getElementById("paper").style.visibility = 'visible';
    document.getElementById("scissors").style.visibility = 'visible';
    document.getElementById("computerChoiceList").style.visibility = 'hidden';

    document.getElementById("playGameBtn").style.visibility = 'hidden';
    document.getElementById("newGameBtn").style.visibility = 'hidden';

	document.getElementById("resultDiv").style.visibility = 'hidden';
}

function DOMscoreUpdate() {
    roundNumberSpan.textContent = "ROUND: " + roundNumber;
    playerChoiceListSpan.textContent = "Player Choices: " + playerChoiceList;
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

async function playGame() {
    DOMscoreUpdate();

    document.getElementById("playGameBtn").style.visibility = 'hidden';
	document.getElementById("newGameBtn").style.visibility = 'hidden';
    document.getElementById("computerChoiceList").style.visibility = 'visible';
	resultsAreaDiv.textContent = 'Transaction in progress!';


	let diceRolled = await calculateChoice();
	
	document.getElementById("resultDiv").style.visibility = 'visible';
}



function game() {
    init();
    DOMscoreUpdate();
};

game();