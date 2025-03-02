// Constants
const JUMP_DURATION = 1000;
const GAME_TICK = 10;
const COLLISION_THRESHOLD = {
  X: 230,
  Y: 29,
  SCORE: 150,
};
const MOVEMENT_SPEED = 112;

// Game state
let score = 0;
let cross = true;
let gameActive = true;

// Audio setup
const audio = {
  background: new Audio("music.mp3"),
  gameOver: new Audio("gameover.mp3"),
};

// DOM Elements
const dino = document.querySelector(".dino");
const obstacle = document.querySelector(".obstacle");
const gameOver = document.querySelector(".gameOver");
const scoreCount = document.querySelector("#scoreCount");

// Movement handler
function handleMovement(e) {
  if (!gameActive) return;

  switch (e.key) {
    case "ArrowUp":
      handleJump();
      break;
    case "ArrowLeft":
      moveDino(-MOVEMENT_SPEED);
      break;
    case "ArrowRight":
      moveDino(MOVEMENT_SPEED);
      break;
  }
}

function handleJump() {
  dino.classList.add("animateDino");
  setTimeout(() => {
    dino.classList.remove("animateDino");
  }, JUMP_DURATION);
}

function moveDino(distance) {
  const currentPosition = parseInt(
    window.getComputedStyle(dino).getPropertyValue("left")
  );
  const newPosition = currentPosition + distance;
  dino.style.left = `${newPosition}px`;
}

// Collision detection
function getPositions() {
  return {
    dino: {
      x: parseInt(window.getComputedStyle(dino).getPropertyValue("left")),
      y: parseInt(window.getComputedStyle(dino).getPropertyValue("top")),
    },
    obstacle: {
      x: parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")),
      y: parseInt(window.getComputedStyle(obstacle).getPropertyValue("top")),
    },
  };
}

function checkCollision() {
  const positions = getPositions();
  const offsetX = Math.abs(positions.dino.x - positions.obstacle.x);
  const offsetY = Math.abs(positions.dino.y - positions.obstacle.y);
  // console.log(positions.dino.x, "dino x", positions.obstacle.x, "obstacle x");
  // console.log(positions.dino.y, "dino y", positions.obstacle.y, "obstacle y");
  // console.log(offsetX, offsetY);

  if (offsetX < COLLISION_THRESHOLD.X && offsetY < COLLISION_THRESHOLD.Y) {
    handleGameOver();
  } else if (offsetX < COLLISION_THRESHOLD.SCORE && cross) {
    handleScore();
  }
}

function handleGameOver() {
  gameActive = false;
  gameOver.style.visibility = "visible";
  obstacle.classList.remove("obstacleAni");
  playGameOverSound();
}

function handleScore() {
  score++;
  updateScore();
  cross = false;
  setTimeout(() => (cross = true), JUMP_DURATION);
  increaseSpeed();
}

function increaseSpeed() {
  setTimeout(() => {
    const currentDuration = parseFloat(
      window.getComputedStyle(obstacle).getPropertyValue("animation-duration")
    );
    const newDuration = currentDuration - 0.05;
    obstacle.style.animationDuration = `${newDuration}s`;
  }, 700);
}

function playGameOverSound() {
  audio.gameOver.play();
  setTimeout(() => {
    audio.gameOver.pause();
    audio.gameOver.currentTime = 0;
  }, JUMP_DURATION);
}

function updateScore() {
  scoreCount.innerHTML = `Your Score: ${score}`;
}

// Game loop
function gameLoop() {
  if (!gameActive) return;
  checkCollision();
  requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener("keydown", handleMovement);

// Initialize game
function initGame() {
  gameActive = true;
  score = 0;
  cross = true;
  updateScore();
  gameLoop();
}

// Start the game
initGame();
