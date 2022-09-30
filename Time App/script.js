const hourElem = document.getElementById('hour');
const minuteElem = document.getElementById('minute');
const secondElem = document.getElementById('second');

const timer = ()=>{
    const currentTime = new Date(); //Current Time
    hourElem.innerText = currentTime.getHours();
    minuteElem.innerText = currentTime.getMinutes();
    secondElem.innerText = currentTime.getSeconds();
}
//Setting Interval to update Timer every Second
setInterval(timer,1000)