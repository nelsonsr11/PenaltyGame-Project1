


function StartGame(){
    animate()
    
}

let score = 0; 
let int;
let kicked =false


let canvas = document.getElementById(`canvas`)
let ctx = canvas.getContext(`2d`)


canvas.h = 800;
canvas.w = 1400;




ctx.fillStyle = 'Grey'
ctx.fillRect(0,0,canvas.w,canvas.h)
ctx.fillStyle = 'BLUE'
ctx.font = '64px Arial'
ctx.fillText('Penalty Game',60,150)
ctx.fillStyle = 'Black'
ctx.font = '30px Arial'
ctx.fillText('Instructions for the game',900,100)




class Kicker {
    constructor(){
      this.w = 50;
      this.h = 80;
      this.x = 400;
      this.y = 700;
    //   this.image = img;
    }
  
    draw(){
        // ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x,this.y,this.w,this.h)
    }
}


class Goalie {
    constructor(){
     this.w = 50;
     this.h = 95;
     this.x = 675;
     this.y = 500;
     this.position = 0
    }

    move(){
       // positions -1 0 1 
        let newPosition = Math.floor((Math.random() * 3) - 1)
        console.log(newPosition)
         if(newPosition === -1 ){
            this.x = 720
         }
         else if(newPosition === 1){
            this.x = 630
         } else if(newPosition === 0) {
            this.x = 675
         }

         this.position = newPosition
        // if(ball.x !== ball.position){
        // ctx.fillRect(this.x + this.position + 500,this.y,this.w,this.h)
        // }
        
       
        //randomly choose a position for the goalie to m,ove
    }

    draw(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x+(200*this.position),this.y,this.w,this.h)
    }
}

class Ball {
    constructor(){
        this.w = 30;
        this.h = 30;
        this.x = 685;
        this.y = 670;
        this.speedX = 10;
        this.speedY = 10;
        this.position = 0


   
    }
    move(newBallPosition){
        this.position = newBallPosition
    }
  
       
     draw(){
        ctx.fillStyle = 'white'
         ctx.fillRect(this.x,this.y,this.w,this.h)
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



let player1 = new Kicker()
let player2 = new Goalie()
let ball = new Ball()
//let goalie = new GoalieBox()


function RestartGame(){
    // console.log("RESTARTING GAME", ball.x)
    if(ball.y !== 670 && player2.position === ball.position ){
        ctx.font= '30px Arial'
        ctx.fillText('MISSED',200,400)
        ScoreCounter()
        window.cancelAnimationFrame(int)
     } else if(player2.position !== ball.position ){ 
        ctx.font= '30px Arial'
        ctx.fillText('GOT IT',200,400)
        ScoreCounter()
        window.cancelAnimationFrame(int)
        }
    }

function ScoreCounter(){
    if(ball.position === player2.position){
        score += 0;
    } else if(ball.position !== player2.position){
        score += 1
    }
}


 window.addEventListener('keydown',function(e){
    console.log(e.key)
    
    switch(e.key){
    case `Enter`:
     StartGame()
    }


    if(e.key === 'ArrowUp'){
        ball.y -= 150
        ball.move(0)

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player2.move()
     

        // if(player2.position === ball.position){
        //     console.log('loser')
        // } else{
        //     console.log('you won')
        // }
        // ctx.fillStyle = 'blue'
        // ctx.fillText('Press Space to Continue to Next Round',50,400)
    } 

    if(e.key === 'ArrowLeft'){
        ball.move(-1)
        ball.x -= 155
        ball.y -= 155

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player2.move()
        


        // if(player2.position === ball.position){
        //     console.log('loser')
        // } else{
        //     console.log('you won')
        // }
        // ctx.fillStyle = 'blue'
       
        // ctx.fillText('Press Space to Continue to Next Round',50,400)
    }

    if(e.key === 'ArrowRight'){
        ball.move(1)
        ball.x += 155
        ball.y -= 155

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player2.move()
        console.log('ball',ball.position)

        // if(player2.position === ball.position){
        //     console.log('loser')
        // } else{
        //     console.log('you won')
        // }
        // ctx.fillStyle = 'blue'
        // ctx.fillText('Press Space to Continue to Next Round',50,400)
    } 


      if(player2.position === ball.position){ 
            console.log('loser')
        } else{
            console.log('you won')
        }


    kicked = true
    
        

// console.log('e', e.key)
    if(e.key === " "){

        player2.position = 0
        player2.w = 50;
        player2.h = 95;
        player2.x = 675;
        player2.y = 500;
        
        ball.w = 30;
        ball.h = 30;
        ball.x = 685;
        ball.y = 670;
        ball.position = 0

        // kicked= false;
        animate()
       
    }
})




function animate(){
  
    int = window.requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.w,canvas.h)
    player1.draw()
    player2.draw()
    ball.draw()
    // ball.move()
    RestartGame()
    ctx.fillText(`Score = ${score}`,200,250)

    // if(kicked){
    // RestartGame()
//}

    }


//  animate()


