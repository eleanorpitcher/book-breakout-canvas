// const canvas = document.getElementById('canvas');

// canvas.width = window.innerWidth
// canvas.height = window.innerHeight

// const ctx = canvas.getContext('2d'); //returning a drawing context to the variable, basically allows us to draw on the canvas
// ctx.fillStyle = 'pink'
// ctx.fillRect(100, 100, 100, 100)

// ctx.beginPath()
// ctx.moveTo(50, 300)
// ctx.lineTo(300, 100)
// ctx.strokeStyle = 'blue'
// ctx.stroke()

// ctx.beginPath()
// ctx.arc(300,300,30, 0, Math.PI * 2, false)
// ctx.strokeStyle = 'green'
// ctx.stroke()

// for (let i = 0; i < 3; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight
//     ctx.fillStyle = 'pink'
//     ctx.fillRect(x,y,100,100)
// }


// function Circle(x, y, dx, dy, radius){
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = radius

//     this.draw = function(){
//         ctx.beginPath()
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//         ctx.strokeStyle = 'green'
//         ctx.stroke()
//     }

//     this.update = function(){
//         if(this.x + this.radius >innerWidth || this.x - this.radius < 0){
//             this.dx = -this.dx
//         }
    
//         if(this.y + this.radius >innerHeight || this.y - this.radius < 0){
//             this.dy = -this.dy
//         }
    
//         this.x+=this.dx
//         this.y+=this.dy
    
//         this.draw()
//     }
// }


// let circleArray = [];

// for (let i = 0; i< 100; i++){
//     let radius = 30
//     let x = Math.random() * (innerWidth - radius * 2) + radius
//     let y = Math.random() * (innerHeight - radius * 2) + radius
//     let dx = (Math.random() - 0.5)*10
//     let dy = (Math.random() - 0.5)*10
//     circleArray.push(new Circle(x, y, dx, dy, radius))

// }

// console.log(circleArray)

// function animate(){
//     requestAnimationFrame(animate) //creates a loop
//     ctx.clearRect(0, 0, innerWidth, innerHeight)

//     for (let i = 0; i < circleArray.length; i++){
//         circleArray[i].update()
//     }

// }
// animate()