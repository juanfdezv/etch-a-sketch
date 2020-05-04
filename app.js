//Initialize
const canvas = document.querySelector(".canvas");
let black = document.querySelector("#black");
let shade = document.querySelector("#shade");
let rainbow = document.querySelector("#rainbow");
let reset = document.querySelector("#reset");
let root = document.querySelector(":root");

//Draw grid
function drawGrid(n){
    while(canvas.firstChild){
        canvas.removeChild(canvas.lastChild);
    }

    p = 512/n;
    root.style.setProperty("--pixel-size", p+"px");

    for(let i = 0; i<(n**2); i++){
        let pix = document.createElement("div");
        pix.classList.add("pixel");
        canvas.appendChild(pix);
    }

    blackMode();
    black.classList.add("current");
    shade.classList.remove("current");
    rainbow.classList.remove("current");
}

drawGrid(16);

//Get pixels
let pixels = document.querySelectorAll(".pixel");

//
/*pixels.forEach((pixel) => {
    pixel.addEventListener("mouseenter", () => {
        pixel.style.cssText = "background-color: black;";
    })
});*/

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randomHue(){
    return h = getRandomBetween(0, 360);
}

function blackMode(){
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseenter", () => {
            pixel.style.cssText = "background-color: black;";
        });
    });
}

function shadeMode(){
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
        let a = 0.0;
        pixel.addEventListener("mouseenter", () => {
            a+=0.1;
            pixel.style.cssText = "background-color: rgba(0, 0, 0," + a +");";
        });
    });
}

function rainbowMode(){
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseenter", () => {
            let h = randomHue();
            pixel.style.cssText = "background-color: hsl(" + h + ", 100%, 50%);";
        });
    });
}

black.addEventListener("click", () => {
    black.classList.add("current");
    shade.classList.remove("current");
    rainbow.classList.remove("current");
    blackMode();
});

shade.addEventListener("click", () => {
    shade.classList.add("current");
    black.classList.remove("current");
    rainbow.classList.remove("current");
    shadeMode();
});

rainbow.addEventListener("click", () => {
    rainbow.classList.add("current");
    black.classList.remove("current");
    shade.classList.remove("current");
    rainbowMode();
});

reset.addEventListener("click", () => {
    let n = 0;
    
    while(n>128 || n<2 || typeof(n) !== "number"){
        n = parseInt(prompt("Grid size: enter a number between 2 and 128"));
        if(isNaN(n)){
            n=0;
        }
    }
    
    
    drawGrid(n);
});
