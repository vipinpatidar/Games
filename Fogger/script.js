const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseBtn = document.querySelector("#start-pause-btn");
const squares = document.querySelectorAll(".grid div");
const loglefts = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");

// console.log(squares);
// starting position of the frog
let currentIndex = 76;
// width of grid by block number
let width = 9;
let timeId;
let currentTime = 20;
let outcomeTimerId;

// moving frog all side---- add putting conditions for wall
function moveFrog(e) {
  // first removing frog
  squares[currentIndex].classList.remove("frog");

  switch (e.key) {
    case "ArrowLeft":
      // on left wall where currentIndex is 0 9 18 27...
      if (currentIndex % width !== 0) currentIndex -= 1;
      break;
    case "ArrowRight":
      // on right wall where currentIndex is 8 17 26 ...
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;
    case "ArrowUp":
      // on uper wall where currentIndex is 0 1 2 3 ...
      if (currentIndex - width >= 0) currentIndex -= width;
      break;
    case "ArrowDown":
      // on down wall where currentIndex is 72 73 ...80
      if (currentIndex + width < width * width) currentIndex += width;
      break;
  }
  // after moving to next currentIndex adding frog class
  squares[currentIndex].classList.add("frog");
}
document.addEventListener("keyup", moveFrog);

// auto moment into logs and cars blocks
function autoMoveElements() {
  // timer
  currentTime--;
  timeLeftDisplay.textContent = currentTime;

  loglefts.forEach((logleft) => moveLogLeft(logleft));
  logsRight.forEach((logRight) => moveLogRight(logRight));
  carsLeft.forEach((carLeft) => movecarLeft(carLeft));
  carsRight.forEach((carRight) => movecarRight(carRight));
}
// check win and lose
function checkWinLose() {
  lose();
  win();
}
// function for log left block for auto move
function moveLogLeft(logleft) {
  switch (true) {
    case logleft.classList.contains("l1"):
      logleft.classList.remove("l1");
      logleft.classList.add("l2"); // shifting in left direction
      break;
    case logleft.classList.contains("l2"):
      logleft.classList.remove("l2");
      logleft.classList.add("l3");
      break;
    case logleft.classList.contains("l3"):
      logleft.classList.remove("l3");
      logleft.classList.add("l4");
      break;
    case logleft.classList.contains("l4"):
      logleft.classList.remove("l4");
      logleft.classList.add("l5");
      break;
    case logleft.classList.contains("l5"):
      logleft.classList.remove("l5");
      logleft.classList.add("l1");
      break;

    default:
      break;
  }
}
// function for log right block for auto move

function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5"); // moving blocks in right direction
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;

    default:
      break;
  }
}
// function for car left block for auto move

function movecarLeft(carleft) {
  switch (true) {
    case carleft.classList.contains("c1"):
      carleft.classList.remove("c1");
      carleft.classList.add("c2"); // movig blocks to left side
      break;
    case carleft.classList.contains("c2"):
      carleft.classList.remove("c2");
      carleft.classList.add("c3");
      break;
    case carleft.classList.contains("c3"):
      carleft.classList.remove("c3");
      carleft.classList.add("c1");
      break;
    default:
      break;
  }
}

// function for car right block for auto move

function movecarRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3"); // moving block to right direction
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
    default:
      break;
  }
}

// check in lose function
function lose() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    // when current time is less then time
    currentTime <= 0
  ) {
    resultDisplay.textContent = "You Lose!";
    clearInterval(timeId);
    clearInterval(outcomeTimerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
  }
}

function win() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    resultDisplay.textContent = "You Won!";
    clearInterval(timeId);
    clearInterval(outcomeTimerId);
    document.removeEventListener("keyup", moveFrog);
  }
}
//steing interval timer for repting function
timeId = setInterval(autoMoveElements, 1000);
outcomeTimerId = setInterval(checkWinLose, 50);
