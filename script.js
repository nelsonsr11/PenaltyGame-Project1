let score = 0;
let goalieScore = 0;
let int;
let stopCount = 0;
let kicked = false;
let start = false;
let player1;
let player2;
let ball;

let canvas = document.getElementById(`canvas`);
let ctx = canvas.getContext(`2d`);

canvas.h = 800;
canvas.w = 1400;

img4.onload = function () {
  ctx.drawImage(img4, 0, 0, canvas.width, canvas.height);
  // penalty game logo
  ctx.fillStyle = "Black";
  ctx.font = "75px Bangers";
  ctx.fillText("Penalty Game", 60, 150);
  // intructions for the game
  ctx.fillStyle = "Black";
  ctx.font = "45px Orbitron";
  ctx.fillText("Instructions for the game", 760, 100);
  ctx.font = "20px  Bangers";
  ctx.fillText("-Use arrow keys to select direction of your shoot.", 795, 150);
  ctx.fillText("-Press Space key after each kick to restart round. ", 795, 200);
  ctx.fillText(
    "-You have 5 tries to beat the goalie so try your best.",
    795,
    250
  );
};

// stopping the blinking start game message after it starts
let blink_speed = 800;
let t = setInterval(function () {
  let ele = document.getElementById("pressEnter");
  ele.style.visibility = ele.style.visibility == "hidden" ? "" : "hidden";
}, blink_speed);

// create class for each character
class Kicker {
  constructor() {
    this.w = 230;
    this.h = 150;
    this.x = 550;
    this.y = 650;
    this.image = img;
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }
}

class Goalie {
  constructor() {
    this.w = 195;
    this.h = 155;
    this.x = 585;
    this.y = 460;
    this.position = 0;
    this.image = img3;
  }

  move() {
    let newPosition = Math.floor(Math.random() * 3 - 1);
    console.log(newPosition);
    if (newPosition === -1) {
      this.x = 430;
    } else if (newPosition === 1) {
      this.x = 730;
    } else if (newPosition === 0) {
      this.x = 585;
    }

    this.position = newPosition;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }
}

class Ball {
  constructor() {
    this.w = 60;
    this.h = 60;
    this.x = 670;
    this.y = 690;
    this.position = 0;
    this.image = img2;
  }
  move(newBallPosition) {
    this.position = newBallPosition;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }
}

// start game
function StartGame() {
  let el = document.querySelector("#pressEnter");
  if (el) {
    el.remove();
  }

  player1 = new Kicker();
  player2 = new Goalie();
  ball = new Ball();
  score = 0;
  goalieScore = 0;

  crowd.play();
  crowd.volume = 0.15;

  animate();
  clearInterval(t);
}

// restart game
function RestartGame() {
  if (ball.y !== 690 && player2.position === ball.position) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("The Goalie got your ball! Press SPACE to Continue", 370, 400);
    ScoreCounter();
    window.cancelAnimationFrame(int);
  } else if (player2.position !== ball.position) {
    ctx.font = "30px Arial";
    ctx.fillText("GOALLLLL!!!!! Press Space For Next Round", 410, 400);

    ScoreCounter();
    window.cancelAnimationFrame(int);
  }
}

//score counter
function ScoreCounter() {
  if (ball.position === player2.position) {
    goalieScore += 1;
  } else if (ball.position !== player2.position) {
    score += 1;
    goal.play();
  }
}

// game over
function gameOver() {
  window.cancelAnimationFrame(int);
  clearInterval(int);
  start = false;
  ctx.drawImage(img4, 0, 0, canvas.w, canvas.h);
  // match facts
  ctx.fillStyle = "black";
  ctx.font = "45px Orbitron";
  ctx.fillText("Match Facts:", 900, 100);
  ctx.font = "23px Bangers";
  ctx.fillText(`-You scored ${score} penalties.`, 850, 150);
  ctx.fillText(`-The Goalie stopped ${goalieScore} penalties.`, 850, 200);
  // press enter to play again
  ctx.fillStyle = "white";
  ctx.font = "55px Bangers";
  ctx.fillText("Press Enter to Play Again", 1050, 750, 300, 300);
  //picking winner
  ctx.fillStyle = "black";
  if (score > goalieScore) {
    ctx.drawImage(img6, 150, 400, 300, 300);
    ctx.font = "50px Bangers";
    ctx.fillText("WINNER: KICKER", 200, 380, 200, 200);
    ctx.font = "23px Bangers";
    ctx.fillText(
      "-Great Job! You beat the Goalie and won the game. CONGRATS!",
      850,
      250
    );
  } else if (goalieScore > score) {
    ctx.drawImage(img6, 150, 400, 300, 300);
    ctx.font = "50px Bangers";
    ctx.fillText("WINNER: GOALIE", 200, 380, 200, 200);
    ctx.font = "23px Bangers";
    ctx.fillText(
      "-Good Luck next time. The Goalie won by saving many penalties.",
      850,
      250
    );
  }
}

// stop the counting
function StopCounting() {
  if (score + goalieScore === 5) {
    gameOver();
  }
}

// score board on top left side
function scoreBoard() {
  ctx.drawImage(img5, 10, -50, 400, 180);
  ctx.fillStyle = "black";
  ctx.font = "25px Arial";
  ctx.fillText(`Kicker      ${score}`, 70, 50);
  ctx.fillText(`${goalieScore}    Goalie `, 230, 50);
}

// all the key commands
window.addEventListener("keydown", function (e) {
  console.log(e.key);
  switch (e.key) {
    case "Enter":
      start = true;
      StartGame();
      break;
  }

  if (e.key === "ArrowUp") {
    if (kicked === false && start === true) {
      ball.y -= 115;
      ball.x += 45;
      ball.w -= 90;
      ball.h -= 90;
      ball.move(0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player2.move();
      kicked = true;
    }
  }

  if (e.key === "ArrowLeft") {
    if (kicked === false && start === true) {
      ball.move(-1);
      ball.x -= 110;
      ball.y -= 115;
      ball.w -= 90;
      ball.h -= 90;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player2.move();
      kicked = true;
    }
  }

  if (e.key === "ArrowRight") {
    if (kicked === false && start === true) {
      ball.move(1);
      ball.x += 190;
      ball.y -= 115;
      ball.w -= 90;
      ball.h -= 90;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player2.move();
      kicked = true;
    }
  }

  if (e.key === " " && kicked === true) {
    player2.position = 0;
    player2.w = 195;
    player2.h = 155;
    player2.x = 585;
    player2.y = 460;

    ball.w = 60;
    ball.h = 60;
    ball.x = 670;
    ball.y = 690;
    ball.position = 0;

    kicked = false;

    animate();
  }
});

function animate() {
  int = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.w, canvas.h);
  player1.draw();
  player2.draw();
  ball.draw();
  StopCounting();
  RestartGame();
  scoreBoard();
}
