const canvas = document.getElementById('canvas');
//Setting Canvas to 2D
const context = canvas.getContext('2d');

//Total Width of X axis
let tx = window.innerWidth;
//Total Height of Y Axis
let ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;

var mouseX = 0;
var mouseY = 0;

var gravity = 0.99;
context.strokeWidth = 5;

//Generate Random RGB Color
function randomColor() {
    return (
        "rgb(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        ")"
    )
}

//Balls Rendered on the Screen are stored here
let ball = [];

function Ball() {
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startRadius = this.radius;
    this.x = mouseX;
    this.y = mouseY;
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.velocity = Math.random() / 5;

    //Updating Ball Positions (Moving the Ball);
    this.update = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill()

    }
}

//Adding ball on click
window.addEventListener('click', () => {
    ball.push(new Ball)
})

// Setting MouseX and MouseY according to the mouse positions on window when move
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})


function animate() {

    //Change Canvas width when window width changes
    if (tx != window.innerWdith || ty != window.innerHeight) {
        tx = window.innerWidth;
        ty = window.innerHeight;
        canvas.width = tx;
        canvas.height = ty;
    }
    requestAnimationFrame(animate);

    context.clearRect(0, 0, tx, ty);

    //Using For loop to render and update every ball object in ball array;

    for (let i = 0; i < ball.length; i++) {

        //Updating Ball
        ball[i].update();
        ball[i].y += ball[i].dy;
        ball[i].x += ball[i].dx;

        //Conditions when ball hits the border of window.
        if (ball[i].y + ball[i].radius >= ty) {
            ball[i].dy = -ball[i].dy * gravity;
        } else {
            ball[i].dy += ball[i].velocity;
        }

        if (ball[i].x + ball[i].radius > tx || ball[i].x - ball[i].radius < 0) {
            ball[i].dx = -ball[i].dx
        }


    }

}

animate();
