const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.wav');
let inputDirection = { x: 0, y: 0 };
const speed = 10; //Moving Speed of Snake
let lastPaintTime = 0; //Last Render Point
const board = document.getElementById('board');

//Snake Initial Position
let snakeArr = [
    { x: 7, y: 7 }
]

//Initial Food Position
let food = {
    x: 12,
    y: 12
}

let score = 0;
let scoreElem = document.getElementById('scoreNo');
//HighScore from local Storage or new 0
let highScore = localStorage.getItem('highScore') || 0;
let highScoreElem = document.getElementById('highScoreNo');
highScoreElem.innerText = highScore
scoreElem.innerText = score;

//Main Function to run animationFrame
function main(currentTime) {
    window.requestAnimationFrame(main);
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return
    }
    lastPaintTime = currentTime;
    gameEngine()
}


//Function to detech if snake collides end the game
function isCollide(snake) {

    //If snake Collides itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }

    //If Snake Hits the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y <= 0 || snake[0].y >= 18) {
        return true
    }

    if (highScore < score) {
        localStorage.setItem('highScore',score);
        highScoreElem.innerText = score
    }

}

function gameEngine() {

    //If Snake Collides to itself or wall
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        inputDirection = { x: 0, y: 0 }; // Stop moving 
        alert('Game Over');
        snakeArr = [{ x: 13, y: 13 }];
        score = 0;
        scoreElem.innerText = score;
    }


    //If Snake ate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y })
        foodSound.play();
        let a = 2;
        let b = 16;
        score += 1;
        scoreElem.innerText = score;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Update Snake Arr and position
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }


    //Updating Moving Direction (input Direction);
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    //Clear Game board 
    board.innerHTML = '';

    //Creating a div for every object in the array of snakeArr
    snakeArr.forEach((e, index) => {
        let snakeElem = document.createElement('div');
        snakeElem.style.gridColumnStart = e.x;
        snakeElem.style.gridRowStart = e.y;
        if (index === 0) {
            //If it is head
            snakeElem.classList.add('head');
        }
        else {
            snakeElem.classList.add('snake');
        }
        //Append the div / body part of snake in board
        board.appendChild(snakeElem)
    })

    //Render Food Element
    let foodElem = document.createElement('div');
    foodElem.style.gridRowStart = food.y;
    foodElem.style.gridColumnStart = food.x;
    foodElem.classList.add('food');
    board.appendChild(foodElem)
}

window.requestAnimationFrame(main);

//Adding Event listener to window for key
window.addEventListener('keydown', (e) => {
    inputDirection = { x: 0, y: 1 } //Start the Game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case "ArrowDown":
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case "ArrowLeft":
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case "ArrowRight":
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }
})
