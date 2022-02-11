const MAX_ALLOWED_SIZE_PXLS = window.innerWidth * 4 / 5;

let rotateValue = 0;
const mandalaToinCoss = getRandomInt(100);
let loadedImage;
let canvas;
const randomR = getRandomInt(255);
const randomG = getRandomInt(255);
const randomB = getRandomInt(255);

let shouldRotate = false;

console.log('Thank you for supporting @artofschwarz NFTs.');
console.log('Your lottery results: ', window.$fxhashFeatures);

function getRandomInt(max) {
    return Math.floor(fxrand() * max);
}

function preload() {
    const index = getRandomInt(3) + 1;
    loadedImage = loadImage(`media/roundfloral${index}.png`);
}

function resizeImage() {
    if (loadedImage) {
        const imageScreenWidthRatio = loadedImage.width <= MAX_ALLOWED_SIZE_PXLS ? 1 : (loadedImage.width / MAX_ALLOWED_SIZE_PXLS);
        const imageScreenHeightRatio = loadedImage.height <= MAX_ALLOWED_SIZE_PXLS ? 1:  (loadedImage.height / MAX_ALLOWED_SIZE_PXLS);
        const newImageWidth = loadedImage.width / Math.min(imageScreenWidthRatio, imageScreenHeightRatio);
        const newImageHeight = loadedImage.height / Math.min(imageScreenWidthRatio, imageScreenHeightRatio);
        loadedImage.resize(newImageWidth > 0 ? newImageWidth : MAX_ALLOWED_SIZE_PXLS, newImageHeight > 0 ? newImageHeight : MAX_ALLOWED_SIZE_PXLS);
        tint(getRandomInt(255), getRandomInt(255), getRandomInt(255), 50);
        redraw();
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    resizeImage();
}

function mouseClicked() {
    shouldRotate = !shouldRotate;
}

function drawGradientBackground() {
    // code below adapted from: https://editor.p5js.org/Jaemi13/sketches/gAS-FB5Sx
    const ceilColor = color(255);
    const gradient = color(randomR, randomG, randomB);
    for (let gradientY = 0; gradientY < height; gradientY++) {
        const mappedValue = map(gradientY, 0, height, 0, 1);
        const newColor = lerpColor(ceilColor, gradient, mappedValue);
        // draw the actual gradient manually
        stroke(newColor);
        line(0, gradientY, width, gradientY);
    }
}
function setup(){
    angleMode(DEGREES);
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    resizeImage();
    drawGradientBackground();
}

let flip = false;

function draw(){
    imageMode(CENTER);
    translate(window.innerWidth / 2, window.innerHeight / 2);
    scale(0.5);
    rotate(rotateValue);
    image(loadedImage, 0, 0);
    if (shouldRotate) {
        rotateValue += flip ? -0.18 : 0.18;
    } else {
        tint(randomR, randomG, randomB, getRandomInt(100));
    }

    if (rotateValue >= 180 || rotateValue <= -180) {
        flip = !flip;
    }
}