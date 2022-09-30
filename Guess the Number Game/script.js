const submitBtn = document.getElementById('submitNumberBtn');
const inputNumber = document.getElementById('numberInput');
const messageContainer = document.getElementById('msgBox');
let randomNumber; //Random Number generated is stored here
let isGameOver = false;
let chancesTaken = 0;
const winAudio = new Audio('./sources/music.mp3');
const chanceTakenElem = document.getElementById('chanceTaken');

//Generating Random Number
function generateRandomNumber() {
    let randomNumberGenerated = Math.floor(Math.random()*100);
    randomNumber = randomNumberGenerated;
}

//Calling Function Initially to start the game
generateRandomNumber();


//Function to throw Alerts to user
function throwAlert(message) {
    //Removing Last 'p' elements
    messageContainer.innerHTML = '';
    const p = document.createElement('p');
    p.innerText = message;
    messageContainer.append(p);
}

//Div to display when user won
const wonDiv = document.querySelector('.wonDiv')

submitBtn.addEventListener('click',()=>{

    //If user clicked Play Again Button 
    if (isGameOver) {
        wonDiv.style.display = 'none';
        inputNumber.style.display = 'flex';
        submitBtn.innerText = 'Submit';
        chancesTaken = 0;
        isGameOver = false;
        chanceTakenElem.innerText = chancesTaken;
        generateRandomNumber()
        return
    }

    //Setting Input value to Number from string
    let inputValue = parseInt(inputNumber.value);

    if (!inputValue) {
        //If input value is not a Number
        inputNumber.innerText = '';
        return throwAlert('Please Enter a Number')
    }

    //If User inputed less then 0 or more then 100 in input 
    if (inputValue < 0 || inputValue > 100) {
        inputNumber.value = '';
        return throwAlert('Please Enter a Number between 1 - 100')
    }

    // If user predicted the correct number, win the user and display won Div
    if (inputValue === randomNumber) {
        inputNumber.value = ''; 
        wonDiv.style.display = 'flex';
        inputNumber.style.display = 'none';
        submitBtn.innerText = 'Play Again'
        throwAlert(`Congratulations! You won, the random number was ${randomNumber}`);
        isGameOver = true; // Set Game over to true
        winAudio.play()
        return
    }

    //If user inputed greater or lesser number (conditions)
    if (inputValue < randomNumber) {
        inputNumber.value = '';
        throwAlert(`Sorry, You have predicted a lesser Number. Try Again`);
    }else{
        inputNumber.value = '';
        throwAlert(`Sorry, You have predicted a greater Number. Try Again`);
    }

    chancesTaken += 1; //Increasing Chances of user
    chanceTakenElem.innerText = chancesTaken; //Updating Number in HTML
})


// Making UX Easy
window.addEventListener('keydown',(e)=>{
    if (e.key === 'Enter') {
        submitBtn.click()
    }
})