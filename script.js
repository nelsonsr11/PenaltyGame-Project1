// let lop;
function StartGame() {
  document.querySelector("#pressEnter").remove();
  //   console.log(lop);
  animate();
}

let score = 0;
let goalieScore = 0;
let int;
let stopCount = 0;
let kicked = false;
//let start = false;
//let lines = txt.split("\n");

let canvas = document.getElementById(`canvas`);
let ctx = canvas.getContext(`2d`);

canvas.h = 800;
canvas.w = 1400;

let img = new Image();
img.src = "images/Idle (1).png";

let img2 = new Image();
img2.src = "images/ball.png";

let img3 = new Image();
img3.src = "images/goalie.png";

let img4 = new Image();
img4.src = "images/main.jpg";

let img5 = new Image();
img5.src = "images/scoreboard.png";

img4.onload = function () {
  ctx.drawImage(img4, 0, 0, canvas.width, canvas.height);
  // console.log(img4);
  // ctx.fillRect(0, 0, canvas.w, canvas.h);
  ctx.fillStyle = "Black";
  ctx.font = "75px Bangers";
  ctx.fillText("Penalty Game", 60, 150);
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
  //   ctx.fillText("Instructions for the game", 900, 100);
  //   ctx.fillText("Instructions for the game", 900, 100);
};

let blink_speed = 800; // every 1000 == 1 second, adjust to suit
let t = setInterval(function () {
  let ele = document.getElementById("pressEnter");
  ele.style.visibility = ele.style.visibility == "hidden" ? "" : "hidden";
}, blink_speed);

class Kicker {
  constructor() {
    this.w = 230;
    this.h = 150;
    this.x = 550;
    this.y = 650;
    this.image = img;
  }

  draw() {
    // ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    ctx.fillStyle = "black";
    //ctx.fillRect(this.x, this.y, this.w, this.h);
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
    // positions -1 0 1
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
    // if(ball.x !== ball.position){
    // ctx.fillRect(this.x + this.position + 500,this.y,this.w,this.h)
    // }

    //randomly choose a position for the goalie to m,ove
  }

  draw() {
    ctx.fillStyle = "blue";
    // ctx.fillRect(this.x + 200 * this.position, this.y, this.w, this.h);
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
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  // update(){
  //     this.x += this.dx
  //     this.y += this.dy
  // }
}

//  class GoalieBox {
//     constructor(){
//     this.w = 480;
//     this.h = 180;
//     this.y = 415;
//     this.x = 460;

// }
//     draw(){
//         ctx.fillStyle = 'red'
//         ctx.fillRect(this.x,this.y,this.w,this.h)
//     }

// }

let player1 = new Kicker();
let player2 = new Goalie();
let ball = new Ball();
//let goalie = new GoalieBox()

function RestartGame() {
  // console.log("RESTARTING GAME", ball.x)
  if (ball.y !== 690 && player2.position === ball.position) {
    ctx.font = "30px Arial";
    ctx.fillText("You missed your shot!", 200, 400);
    ctx.fillText("Press SPACE to Continue", 200, 450);
    ScoreCounter();
    window.cancelAnimationFrame(int);
  } else if (player2.position !== ball.position) {
    ctx.font = "30px Arial";
    ctx.fillText("GOALLLLL!!!!!", 650, 300);
    ctx.fillText("Press Space For Next Round", 650, 350);
    ScoreCounter();
    window.cancelAnimationFrame(int);
  }
}

function ScoreCounter() {
  if (ball.position === player2.position) {
    goalieScore += 1;
  } else if (ball.position !== player2.position) {
    score += 1;
  }
}

function gameOver() {
  window.cancelAnimationFrame(int);
  clearInterval(int);
  console.log("GAME OVER");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.w, canvas.h);
  ctx.fillStyle = "red";
  ctx.font = "64px Arial";
  ctx.fillText("GAME OVER", 60, 350);
  console.log("red");
}

function StopCounting() {
  console.log("lol", stopCount);
  if (stopCount === 5) {
    gameOver();
  }
}

function scoreBoard() {
  ctx.drawImage(img5, 10, -50, 400, 180);
  ctx.fillStyle = "black";
  ctx.font = "25px Arial";
  ctx.fillText(`Messi      ${score}`, 70, 50);
  ctx.fillText(`${goalieScore}    Thibaut `, 230, 50);
}

window.addEventListener("keydown", function (e) {
  console.log(e.key);
  switch (e.key) {
    case "Enter":
      StartGame();
      break;
  }

  if (e.key === "ArrowUp") {
    if (kicked === false) {
      ball.y -= 115;
      ball.x += 45;
      ball.w -= 90;
      ball.h -= 90;
      ball.move(0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player2.move();
      kicked = true;
    }
    // if(player2.position === ball.position){
    //     console.log('loser')
    // } else{
    //     console.log('you won')
    // }
    // ctx.fillStyle = 'blue'
    // ctx.fillText('Press Space to Continue to Next Round',50,400)
  }

  if (e.key === "ArrowLeft") {
    if (kicked === false) {
      ball.move(-1);
      ball.x -= 110;
      ball.y -= 115;
      ball.w -= 90;
      ball.h -= 90;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player2.move();
      kicked = true;
    }

    // if(player2.position === ball.position){
    //     console.log('loser')
    // } else{
    //     console.log('you won')
    // }
    // ctx.fillStyle = 'blue'

    // ctx.fillText('Press Space to Continue to Next Round',50,400)
  }

  if (e.key === "ArrowRight") {
    if (kicked === false) {
      ball.move(1);
      ball.x += 190;
      ball.y -= 115;
      ball.w -= 90;
      ball.h -= 90;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player2.move();
      kicked = true;
    }

    // if(player2.position === ball.position){
    //     console.log('loser')
    // } else{
    //     console.log('you won')
    // }
    // ctx.fillStyle = 'blue'
    // ctx.fillText('Press Space to Continue to Next Round',50,400)
  }

  if (player2.position === ball.position) {
    console.log("loser");
  } else {
    console.log("you won");
  }

  //kicked = true

  // console.log('e', e.key)
  if (e.key === " ") {
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

    // kicked = true;

    animate();
  }

  if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp") {
    stopCount += 1;
  }

  console.log("stop the count", stopCount);
});

function animate() {
  int = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.w, canvas.h);
  player1.draw();
  player2.draw();
  ball.draw();

  // ball.move()
  RestartGame();
  StopCounting();
  scoreBoard();
  //StopingGame()
  //gameOver()

  //      if(kicked){
  //      RestartGame()
  // }
}

//  animate()
