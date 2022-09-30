const imageContainer = document.getElementById('imageContainer');
const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchBox');
const loader = document.getElementById('loader');
let loadMoreBtn = document.getElementById('loadMoreBtn');
let searchValueData; //Searched images are stored here.
let page = 1;

//Secret Client Id
let clientId = 'GQy45otJ48h2DAZBNkjmrNqCm8K4KD6KHWhDoTL6orA';

searchButton.addEventListener('click',()=>{
    let searchValue = searchInput.value.toString().replace(' ','-');

    if (searchValue === '') {
        return //Return User if Search Query is Empty
    }

    document.getElementById('imageSearch').innerText = `Images for - "${searchInput.value}"`

    //Set searchValueData to new search value (from input).
    searchValueData = searchValue;
    //Clearing Last Search Images 
    imageContainer.innerHTML = ``;
    page = 1;
    loadMoreBtn.classList.add('activeBtn'); //Activating LoadMore Button
    fetchImages()
})

let fetchImages = async()=>{
    //API link
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchValueData}&client_id=${clientId}`;
    loader.style.display = 'flex';


    await fetch(url)
    .then(response =>{
        if (response.ok) {
            return response.json()
        }else{
            alert(response.status)
        }
    }).then(data =>{
        //Using For Loop for every object in response.results Array
        for (let i = 0; i < data.results.length; i++) {
            renderImages(data.results[i])
        }

        page +=1;
    })
    loader.style.display = 'none';
}

let renderImages = (obj)=>{
    //Creating a parent Element a div to store image in it.
    let div = document.createElement('div');
    let innerDivHTML = `
        <img src="${obj.urls.full}" alt="Fetched Images">
    `
    div.innerHTML = innerDivHTML;
    imageContainer.append(div);
}

loadMoreBtn.addEventListener('click',()=>{
    //Calling Fetch Image function instead of search button because fetchImages() will append more images of same query instead of clearing the images.
    fetchImages()
})
