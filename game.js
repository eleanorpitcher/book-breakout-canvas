// create class function with constructor and draw function and update function
// create array of obstacles
// create animate function that calls the update function


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const startButton = document.getElementById('start-button')
const scoreCard = document.getElementById('score-card')
const score = document.getElementById('score')
let scoreCount = 0;


class Player{
    constructor(x, y, radius){
        this.x = Math.random()*canvas.width
        this.y = Math.random()*canvas.height
        this.radius = radius
    }
    draw(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x, this.y, 100, 100)
    }
    moveRight(){
        this.x+=20
    }
    moveLeft(){
        this.x-=20
    }
    moveUp(){
        this.y-=20
    }
    moveDown(){
        this.y+=20
    }
}
let player = new Player(50,50,50)

class Book{
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    drawBook(){
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, this.radius, 50, 50)
    }
}

let bookArray = []

function drawBooks(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bookArray.forEach(book => {
        book.drawBook()
    })
}

for (let i=0; i<10; i++){
    let radius = 50;
    let x = Math.random()*(canvas.width-radius*2)+radius
    let y = Math.random()*(canvas.height-radius*2)+radius
    bookArray.push(new Book(x, y, radius))
}




window.addEventListener('keydown',(event) => {
    if (event.key === 'ArrowRight'){
        player.moveRight()
    }
    if (event.key === 'ArrowLeft'){
        player.moveLeft()
    }
    if(event.key === 'ArrowUp'){
        player.moveUp()
    }
    if(event.key === 'ArrowDown'){
        player.moveDown()
    }
})

function updateCounter(){
    scoreCount+=1
    console.log(scoreCount)
}


function collectBooks(){

    for (let i=0;i<bookArray.length;i++){
        if(
            player.x < bookArray[i].x + 50 &&
            player.x + 100 > bookArray[i].x &&
            player.y < bookArray[i].y + 50 &&
            player.y + 100 > bookArray[i].y
        ){
            updateCounter()
            bookArray.splice(i, 1)

            if (scoreCount === 10){
                alert("you've won!")
            }
        }
    }
}




//         for (let i=0; i<bookArray.length; i++){
//             if (
//                 player.x < bookArray[i].x + 50 &&
//                 player.x + 100 > bookArray[i].x &&
//                 player.y < bookArray[i].y + 50 &&
//                 player.y + 100 > bookArray[i].y
//             ){
//                 // console.log('got book')
//                 updateCounter()
//             })
//         }
// }



class Obstacle{
    constructor(x,y,radius,dx,dy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
    draw(){
        ctx.fillStyle = 'pink'
        ctx.fillRect(this.x, this.y, this.radius, 100, 100)
    }

    update(){
        if (this.x + this.radius > canvas.width || this.x < 0){
            this.dx = -this.dx
        }
        if (this.y + this.radius > canvas.height || this.y < 0){
            this.dy = -this.dy
        }

        this.x += this.dx
        this.y += this.dy

        this.obstacle = this.draw()
    }
}

let obstacleArray = []

for (let i =0; i<3; i++){
    let radius = 100;
    let x = Math.random()* (canvas.width-radius*2)+radius
    let y = Math.random()* (canvas.height-radius*2)+radius
    let dx = 4
    let dy = 4
    obstacleArray.push(new Obstacle(x, y, radius, dx, dy))
}

function animate(){
    
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBooks()
    player.draw()

    collectBooks()
    
    for (let i =0; i<obstacleArray.length; i++){
        obstacleArray[i].update()

        if(
            player.x < obstacleArray[i].x + obstacleArray[i].radius &&
            player.x + 50 > obstacleArray[i].x &&
            player.y < obstacleArray[i].y + 50 &&
            player.y + 50 > obstacleArray[i].y 
        ) {
            console.log('collision')
        }
    }
}


class Game{
    start(){
        canvas.style.display = "block"
        startButton.style.display = "none"
        scoreCard.style.display = "block"

        animate()
    }
}

startButton.addEventListener('click', function(){
    let game = new Game()

    game.start() 
}) 
