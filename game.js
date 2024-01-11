//animations for the 'start game' screen
const introCanvas = document.getElementById("intro-canvas")
const ctx1 = introCanvas.getContext('2d')

const fallingBookImage = new Image()
fallingBookImage.src = "./images/book.png"

class FallingBooks{
    constructor(x, y, dx, dy){
        this.x = x
        this.y = y
        this.dx = dx;
        this.dy = dy;
    }

    draw(){
        ctx1.drawImage(fallingBookImage, this.x, this.y, 70, 70)
    }

    update(){
        this.y += 2
        this.draw()
    }
}

let books = []

function createBooks(){
    let book = new FallingBooks(Math.random()*innerWidth,0)
    books.push(book)
    book.draw()

    setTimeout(createBooks, 500)
}

function animateStart(){
    requestAnimationFrame(animateStart)
    ctx1.clearRect(0,0,innerWidth,innerHeight)
   
    for(let i=0; i<books.length;i++){
        books[i].update()
    }
}

createBooks()
animateStart()



//initialise game on new canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const h1 = document.querySelector('h1')
const startButton = document.getElementById('start-button')
const scoreCard = document.getElementById('score-card')

const restartButtonWon = document.getElementById("restart-game-won")
const restartButtonLost = document.getElementById("restart-game-lost")

//draw player

const playerImage = new Image()
playerImage.src = "./images/student-6-no-bg.png"

class Player{
    constructor(x, y, width, height){
        this.x = 1
        this.y = 1
        this.width = width;
        this.height = height;
    }
    draw(){
        ctx.drawImage(playerImage, this.x, this.y, 80, 120)
    }
    moveRight(){
        this.x+=50
    }
    moveLeft(){
        this.x-=50
    }
    moveUp(){
        this.y-=50
    }
    moveDown(){
        this.y+=50
    }
}
let player = new Player(50,50)

//draw 10 books and randomise their locations

const bookImage = new Image();
bookImage.src = "./images/book.png"
let bookArray = []

class Book{
    constructor(x, y, radius, width, height){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = width;
        this.height = height;
    }
    drawBook(){
        ctx.drawImage(bookImage, this.x, this.y, 50,50)
    }
}

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

//move player

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

//log score in the counter

const score = document.getElementById("score")
let scoreCount = 0;

function updateCounter(){
    scoreCount+=1
    score.innerText = scoreCount
    console.log(scoreCount)
}

//logic for winning, collecting books

const winnerScreen = document.getElementById("winner")
function collectBooks(){
    for (let i=0;i<bookArray.length;i++){
        if(
            player.x < bookArray[i].x + 50 &&
            player.x + 100 > bookArray[i].x &&
            player.y < bookArray[i].y + 50 &&
            player.y + 100 > bookArray[i].y
        ){
            bookArray.splice(i, 1)
            updateCounter()

            if (scoreCount === 10){
                // alert("you've won!")
                canvas.style.display = 'none'
                winnerScreen.style.display = 'block'
                restartButtonWon.style.display = 'block'
                scoreCard.style.display = "none"
            }
        }
    }
}

//draw and move obstacle

const obstacleImage = new Image()
obstacleImage.src = "./images/librarian-3.webp"

class Obstacle{
    constructor(x,y,radius,dx,dy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
    draw(){
        ctx.drawImage(obstacleImage, this.x, this.y, 100,100)
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

    obstacleArray.push(new Obstacle(Math.random()* (canvas.width-radius*2)+radius, Math.random()* (canvas.height-radius*2)+radius, radius, 3, 3))
}

//logic for losing

const loserScreen = document.getElementById("loser")
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
            // console.log('collision')
            canvas.style.display = "none"
            loserScreen.style.display = "block"
            restartButtonLost.style.display = "block"
            scoreCard.style.display = "none"
            
        }
    }
}

//initialising and restarting the game

class Game{
    start(){        
        canvas.style.display = "block"
        h1.style.display = 'none'
        startButton.style.display = "none"
        scoreCard.style.display = "block"
        winnerScreen.style.display = "none"
        loserScreen.style.display = "none"
        introCanvas.style.display = "none"

        animate()
    }
}

startButton.addEventListener('click', function(){
    let game = new Game()

    game.start() 
}) 

restartButtonWon.addEventListener('click', function(){
    location.reload()
})

restartButtonLost.addEventListener('click', function(){
    location.reload()
})