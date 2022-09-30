const container = document.getElementById('container');

//Random Colors Array
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']

//Number of squares to be generated
const squares = 500;

//Using For loop to render number of squares
for (let i = 0; i < squares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover',()=> setColor(square))

    square.addEventListener('mouseout',()=> removeColor(square))
    
    container.appendChild(square)
}

//Set Color to square when hover
let setColor = (square)=>{
    const color = getRandomColor();
    square.style.background = color;
    square.style.boxShadow = `0 0 2px ${color},0 0 10px ${color}`
}

//Remove Background Color of square when mouse out
let removeColor = (square)=>{
    square.style.background = `#1d1d1d`;
    square.style.boxShadow = `0 0 2px #000`
}

//Get a Random Color from colors Array
let getRandomColor = ()=>{
    //Selecting Random color from colors array by random number of color index
    return colors[Math.floor(Math.random()* colors.length)]
}