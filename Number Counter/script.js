const displayNumber = document.getElementById('displayNumber');
const incBtn = document.getElementById('incrementBtn');
const decBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

//This number increments and decrements on actions of user and then set this to display number inner text
let currentDisplayNumber = 0;
displayNumber.innerText = currentDisplayNumber;

//Increment Number
incBtn.addEventListener('click',()=>{
    currentDisplayNumber += 1;
    displayNumber.innerText = currentDisplayNumber;
})

//Decrement Number
decBtn.addEventListener('click',()=>{
    if (currentDisplayNumber === 0) {
        return
    }
    currentDisplayNumber -= 1;
    displayNumber.innerText = currentDisplayNumber;
})

//Reset Number (Set number to 0)
resetBtn.addEventListener('click',()=>{
    if (currentDisplayNumber === 0) {
        return
    }
    currentDisplayNumber = 0;
    displayNumber.innerText = currentDisplayNumber;
})