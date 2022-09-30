const balanceElem = document.getElementById('balance');
const productsContainer = document.querySelector('.productsContainer');
let currentBalance = 100000000000; //Current balance
balanceElem.innerText = currentBalance;

//Products Array
let productsArray = [
    {
        id: 1897885,
        name: 'Iphone 14',
        price: 8000
    },
    {
        id: 189785,
        name: 'Movie Production',
        price: 741200000
    },
    {
        id: 214578,
        name: 'Lexus Bag',
        price: 12000
    },
    {
        id: 678944,
        name: 'LED TV',
        price: 25500
    },
    {
        id: 8789854,
        name: 'HD Monitor',
        price: 8450
    },
    {
        id: 7982547,
        name: 'Iphone 12',
        price: 69000
    },
    {
        id: 1897498,
        name: 'Cricket Stadium',
        price: 187500000
    },
    {
        id: 187875,
        name: 'Brand Company',
        price: 5480000000
    }
]

//Decrement Speed of Count
let speed = 10000

let countFunction = () => {
    const updateCount = ()=>{
        let target = currentBalance;
        let count = balanceElem.innerText;
        let decrement = Math.ceil(target / speed); //Speed of Decreasing Numbers in balanceElem
        if (count > target) {
            balanceElem.innerText = count - decrement;
            //Repeating the function untill the conditions are satisfied
            setTimeout(updateCount,1)
        }else{
            balanceElem.innerText = target
        }
    }
    updateCount()
}


//Using map() method to render all products from productsArray to DOM
productsArray.map((productObj) => {
    //Creating Elements
    const productDiv = document.createElement('div');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const button = document.createElement('button');

    //Adding Class to elements and innerText
    productDiv.classList.add('product');
    h1.innerText = productObj.name;
    p.innerText = `Price - ₹`;
    span.innerText = productObj.price;
    p.appendChild(span);
    productDiv.append(h1);
    productDiv.append(p);
    button.innerText = 'Buy';
    button.classList.add('buyBtn');
    productDiv.append(button)


    //Event Listener to button to add element buy to cartContainer
    button.addEventListener('click', () => {

        if (productObj.price > currentBalance) {
            //Returning if Balance is not sufficient
            return
        }
        currentBalance -= productObj.price;
        countFunction()
        appendElementToCart(productObj)
    })

    //Appending All Elements in productDiv and productDiv in Products Container
    productsContainer.append(productDiv)
})

//Function to Append Product to cart
const appendElementToCart = (productObj) => {
    let cartContainer = document.querySelector('.cartContainer');
    const cartDiv = document.createElement('div');
    cartDiv.innerHTML = `
    <h1>${productObj.name}</h1>
    <p>x <span id="${productObj.id}">1</span></p>
    `;
    cartDiv.classList.add('productCart');


    //Validating If product already Exist in the cart
    const isProductExistInCart = document.getElementById(productObj.id);
    if (isProductExistInCart) {
        let number = parseInt(isProductExistInCart.innerText);
        isProductExistInCart.innerText = number + 1; //Increasing Number Count of Product
        return
    } else {
        cartContainer.append(cartDiv);
    }
}