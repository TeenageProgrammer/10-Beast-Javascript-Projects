const container = document.getElementById('insert');

//Change HTML on keypress
window.addEventListener('keydown',(e)=>{
    container.innerHTML = `
        <div class="key">
            ${e.key === ' '? 'Space':e.key}
            <small>e.key</small>
        </div>
        <div class="key">
            ${e.keyCode}
            <small>e.keyCode</small>
        </div>
        <div class="key">
            ${e.code}
            <small>e.code</small>
        </div>
    `
})