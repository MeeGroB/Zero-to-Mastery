
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    console.log("Hidden")
}

//Hide Loading 
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
    console.log("Complete")
}

//Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from ApiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if author field is empty
    if(!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author;
    }

    //Check Quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error)
    }
}


//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote)

// On Load
getQuotes();