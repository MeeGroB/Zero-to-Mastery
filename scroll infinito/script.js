
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let isInitialLoad = true;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//Unsplash API
let initalCount = 5;
const apiKey = "qmIr1o1V6uw_xCVcxBTRoffunwB7J58fzj7PyXoNsTI";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initalCount}`;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
    }
}

function updateCountApi(newCount) {
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount}`;
}

//Helper to set Attributes on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create elements for Links & Photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    // run function foreach
    photosArray.forEach(photo => {
        //Create a element to Unsplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })

        //Create image for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        //Event listener, check when each is finished loading
        img.addEventListener("load", imageLoaded)

        //Put img inside de A element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


//Get photos from Unsplash API
async function getPhotos() {
    try {
        
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();

        if(isInitialLoad) {
            updateCountApi(30);
            isInitialLoad = false;
        }
        
    } catch (error) {
        console.log(error)
    }
}

//Check to see if scrolling near bottom the page, load more photos
window.addEventListener("scroll", ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// on load
getPhotos();