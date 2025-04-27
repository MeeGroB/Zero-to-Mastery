
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

//Dark of light images
function imageMode(color) {
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function toggleDarkLightMode(isDark) {
    nav.style.background = isDark === "dark" ? "rgb(0 0 0 /50%)": "rgb(255 255 255 /50%)";
    textBox.style.backgroundColor = isDark === "dark"? "rgb(255 255 255 /50%)": "rgb(0 0 0 /50%)";
    toggleIcon.children[0].textContent = isDark === "dark"? "Dark Mode" : "Light Mode";
    isDark === "dark"? toggleIcon.children[1].classList.replace("fa-sun","fa-moon") :
    toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
    isDark === "dark"? imageMode("dark") : imageMode("light");
}


//Switch theme dynamically
function switchTeme(event) {
    if(event.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme","dark");
        toggleDarkLightMode("dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme","light");
        toggleDarkLightMode("light");
    }
}


toggleSwitch.addEventListener("change", switchTeme);

//Check localStorage for the theme
const currentTheme = localStorage.getItem("theme");
if(currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if(currentTheme === "dark") {
        toggleSwitch.checked = true;
        toggleDarkLightMode("dark");
    }
}