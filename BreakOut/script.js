let grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
// block Width and Height
let blockWidth = 100;
let blockHeight = 20;
// grid Width and height
let boardWidth = 780;
let boardHeight = 500;
// ball width and height
ballDiameter = 30;
let timeId;
let xDirection = 2;
let yDirection = 2;
let score = 0;
// Giving All corner Axis to every block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// All blocks position start from bottom left
const blocks = [
  new Block(40, 460),
  new Block(160, 460),
  new Block(280, 460),
  new Block(400, 460),
  new Block(520, 460),
  new Block(640, 460),
  new Block(40, 420),
  new Block(160, 420),
  new Block(280, 420),
  new Block(400, 420),
  new Block(520, 420),
  new Block(640, 420),
  new Block(40, 380),
  new Block(160, 380),
  new Block(280, 380),
  new Block(400, 380),
  new Block(520, 380),
  new Block(640, 380),
];

// giving initial positioning to user block
let userStart = [340, 40];
let currentPosition = userStart;
// ball starting positioning
let ballStart = [375, 60];
let ballCurrentPosition = ballStart;
// creating blocks

console.log(blocks);

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");

    // giving positioning to blocks in xAxis, yAxis turm
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";

    grid.appendChild(block);
  }
}
addBlocks();

// creating a user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

// positioning  the user
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//  moving user to left and right
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;

    case "ArrowRight":
      if (currentPosition[0] < 680) {
        // 680 = grid width - block width
        currentPosition[0] += 10;
        drawUser();
      }
      break;

    default:
      break;
  }
}
document.addEventListener("keydown", moveUser);

// creating a Ball and adding into grid
let ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// giving position to the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

// Moving the ball in grid
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkCollision();
}

timeId = setInterval(moveBall, 20);

// Checking the collision with wall and blocks
function checkCollision() {
  //   check for block collision
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      // console.log(
      //   blocks[i].bottomLeft[0],
      //   blocks[i].bottomLeft[1],
      //   blocks[i].bottomRight[0],
      //   blocks[i].bottomRight[1],
      //   // ballCurrentPosition[0],
      //   blocks[i].topLeft[0],
      //   blocks[i].topLeft[1],
      //   blocks[i].topRight[0],
      //   blocks[i].topRight[1],
      //   ballCurrentPosition[0] + ballDiameter,
      //   ballCurrentPosition[1] + ballDiameter
      // );

      //  removing blocks who face collision with ball
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      // check for win-- if all blocks disappeared
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "You won!";
        clearInterval(timeId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  //  collision with wall
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    // collision with left side gird wall
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  //   check collision with user
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }
  //  when ball collision with bottom wall side
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timeId);
    scoreDisplay.innerHTML = "You Lose :(";
  }
}

//  redirecting to ball after collision with wall and blocks
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    // console.log("y  -2");
    yDirection = -2; // Changes to right-down movement
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    // console.log("x  -2");
    xDirection = -2; // Changes to left-down movement
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    // console.log("y 2");
    yDirection = 2; // Changes to left-up movement
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    // console.log("x  2");
    xDirection = 2; // Changes to right-up movement
    return;
  }
}

/*
Movement Pattern:
↗️ (2,2) → ↘️ (2,-2) → ↙️ (-2,-2) → ↖️ (-2,2) → ↗️ (2,2)
*/
