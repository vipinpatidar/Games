const computerChoiceDisplay = document.querySelector(".computer-choice");
const userChoiceDisplay = document.querySelector(".user-choice");
const resultDisplay = document.querySelector(".result");
const posssibleChoices = Array.from(document.querySelectorAll("button"));

console.log(posssibleChoices);

let userChoice;
let computerRandomChoice;
let result;

posssibleChoices.forEach((posssibleChoice) =>
  posssibleChoice.addEventListener("click", (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;

    getComputerChoice();
    getResult();
  })
);

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  console.log(randomNumber);
  computerRandomChoice =
    posssibleChoices[randomNumber].textContent.toLowerCase();
  console.log(computerRandomChoice);

  computerChoiceDisplay.innerHTML = computerRandomChoice;
}

const getResult = () => {
  switch (userChoice + computerRandomChoice) {
    case "scissorspaper":
    case "rockscissors":
    case "paperrock":
      resultDisplay.innerHTML = "YOU WIN!";
      break;
    case "paperscissors":
    case "scissorsrock":
    case "rockpaper":
      resultDisplay.innerHTML = "YOU LOSE!";
      break;
    case "paperpaper":
    case "scissorsscissors":
    case "rockrock":
      resultDisplay.innerHTML = "ITS A DRAW!";
      break;
  }
};

/*
const resultDisplay = document.querySelector('#result')
const choicesDisplay = document.querySelector('#choices')
const choices = ['rock', 'paper', 'scissors']

const handleClick = (e) => {
  getResults(e.target.innerHTML, choices[Math.floor(Math.random() * choices.length)])
}
choices.forEach(choice => {
  const button = document.createElement('button')
  button.innerHTML = choice
  button.addEventListener('click', handleClick)
  choicesDisplay.appendChild(button)
})

const getResults = (userChoice, computerChoice) => {
  switch (userChoice + computerChoice) {
    case 'scissorspaper':
    case 'rockscissors':
    case 'paperrock':
      resultDisplay.innerHTML = 'You chose ' + userChoice + ' and the computer chose ' + computerChoice + ' , YOU WIN!'
      break
    case 'paperscissors':
    case 'scissorsrock':
    case 'rockpaper':
      resultDisplay.innerHTML = 'You chose ' + userChoice + ' and the computer chose ' + computerChoice + ' , YOU LOSE!'
      break
    case 'scissorsscissors':
    case 'rockrock':
    case 'paperpaper':
      resultDisplay.innerHTML = 'You chose ' + userChoice + ' and the computer chose ' + computerChoice + ' , ITS A DRAW!'
      break
  }
}
*/
