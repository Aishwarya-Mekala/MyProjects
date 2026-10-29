
const choiceButtons = document.querySelectorAll(".choice");

const playerChoiceText = document.getElementById("playerChoice");
const computerChoiceText = document.getElementById("computerChoice");
const resultText = document.getElementById("result");

const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");
const resetButton = document.getElementById("resetButton");

let playerScore = 0;
let computerScore = 0;

// Play one round when the player clicks a button
choiceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const playerChoice = button.dataset.choice;

        const choices = ["rock", "paper", "scissors"];

        const randomIndex = Math.floor(Math.random() * choices.length);

        const computerChoice = choices[randomIndex];

        playerChoiceText.textContent =
            "Your choice: " + playerChoice;

        computerChoiceText.textContent =
            "Computer's choice: " + computerChoice;

        // Check who wins
        if (playerChoice === computerChoice) {
            resultText.textContent = "It's a Draw! 🤝";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            resultText.textContent = "You Win! 🎉";
            playerScore++;
        } else {
            resultText.textContent = "Computer Wins! 🤖";
            computerScore++;
        }

        // Update the scoreboard
        playerScoreText.textContent = playerScore;
        computerScoreText.textContent = computerScore;
    });
});

// Reset the game
resetButton.addEventListener("click", function () {
    playerScore = 0;
    computerScore = 0;

    playerScoreText.textContent = 0;
    computerScoreText.textContent = 0;

    playerChoiceText.textContent = "Your choice: —";
    computerChoiceText.textContent = "Computer's choice: —";
    resultText.textContent = "Choose your move!";
});
