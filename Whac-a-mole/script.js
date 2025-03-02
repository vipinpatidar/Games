const squareBox = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let hitPosition;
let currentTime = 60;
let timeId = null;

function randomSquare() {
  squareBox.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquareBox = squareBox[Math.floor(Math.random() * 9)];
  //   console.log(randomSquareBox);
  randomSquareBox.classList.add("mole");

  hitPosition = randomSquareBox.id;
}
randomSquare();

squareBox.forEach((square) => {
  square.addEventListener("mousedown", (e) => {
    if (!e.isTrusted) return;

    if (square.id === hitPosition) {
      result++;
    }
    score.innerHTML = result;
    // by hit position null we say that don't add if hid on same box again
    hitPosition = null;
  });
});

function moveMole() {
  timeId = setInterval(() => {
    randomSquare();
  }, 800);
}
moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  //   resting time 60 again
  if (currentTime == 0) {
    clearInterval(timeCountDown);
    alert("GAME OVER! Your final score is " + result);
    clearInterval(timeId);
  }
}
let timeCountDown = setInterval(() => {
  countDown();
}, 1000);
