const button = document.getElementById("button");
const audioElement = document.getElementById("audio");


// Disableenable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing our joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '3f4c1b4d14b0485dbf5ac421cce127fc',
        src: joke,
        hl: 'es-es',
        v: 'Diego',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get jokes from Joke API
async function getJokes() {
    let joke = "";
    const apiURL = "https://v2.jokeapi.dev/joke/Programming?lang=es";
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // text-to-speech
        tellMe(joke);
        //Disable button
        toggleButton();
    } catch (error) {
        console.log(error)
    }
}

button.addEventListener("click", getJokes)
audioElement.addEventListener("ended", toggleButton);

