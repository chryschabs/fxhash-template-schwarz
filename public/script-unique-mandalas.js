const MAX_ALLOWED_SIZE_PXLS = Math.min(window.innerWidth, window.innerHeight) * 0.9;
let rotationAngle = 0;
let loadedImage;
let canvas;

// if you have a limited set of images instead you can use a map with indexes instead
const indexMap = {
    1: 'golden-sun-tiger',
    2: 'jade-moon-tiger',
    3: 'pink-saphire-tiger',
}

// manage bg color based on core mandala index
const backgroundMap = {
    1: '#FF914D',
    2: '#00C2CB',
    3: '#F786E0',
}

const mandalaIndex = getRandomInt(3) + 1;

const randomR = getRandomInt(255);
const randomG = getRandomInt(255);
const randomB = getRandomInt(255);

let invertRotation = false;

window.$fxhashFeatures = {
    MandalaType: indexMap[mandalaIndex],
}


console.log('Thank you for supporting @artofschwarz NFTs.');
console.log('Your lottery results: ', window.$fxhashFeatures);

function getRandomInt(max) {
    return Math.floor(fxrand() * max);
}

function preload() {
    loadedImage = loadImage(`media/${indexMap[mandalaIndex]}.png`);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    background(backgroundMap[mandalaIndex]);
}

let zoomOut = false;
let scaleValue = 1.0;

function mouseClicked() {
    zoomOut = true;
    scaleValue = 2.0;
}

function setup() {
    angleMode(DEGREES);
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    background(backgroundMap[mandalaIndex]);
}


function draw() {
    imageMode(CENTER);
    translate(window.innerWidth / 2, window.innerHeight / 2);
    if (zoomOut) {
        scaleValue -= 0.01;
    }
    if (scaleValue <= 1.0) {
        zoomOut = false;
    }
    scale(scaleValue);
    const scaleRatio = loadedImage.width > 1 && loadedImage.width < MAX_ALLOWED_SIZE_PXLS
        ? 1 : loadedImage.width / MAX_ALLOWED_SIZE_PXLS;
    image(loadedImage, 0, 0, loadedImage.width / scaleRatio, loadedImage.height / scaleRatio);
}