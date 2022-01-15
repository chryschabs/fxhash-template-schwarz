const MAX_ALLOWED_SIZE_PXLS = window.innerWidth;
let rotationAngle = 0;
const mandalaToinCoss = getRandomInt(100);
let loadedImage;
let canvas;
const randomR = getRandomInt(255);
const randomG = getRandomInt(255);
const randomB = getRandomInt(255);

const singleHaloR = getRandomInt(255);
const singleHaloG = getRandomInt(255);
const singleHaloB = getRandomInt(255);

const doubleHaloR = getRandomInt(255);
const doubleHaloG = getRandomInt(255);
const doubleHaloB = getRandomInt(255);

let invertRotation = false;

const coinTossHalo = getRandomInt(100);
const hasHalo = coinTossHalo <= 30; // 30% of instances will have a halo
const hasDoubleHalo = coinTossHalo <= 5; // 5% of instances will have a double halo
const gradientBgCoinToss = getRandomInt(100);
const hasGradientBackground = gradientBgCoinToss <= 2; // 2% of instances with radiant background

const hasRareMandala = mandalaToinCoss <= 10;
const hasPremiumMandala = mandalaToinCoss <= 30 && mandalaToinCoss > 10;

window.$fxhashFeatures = {
    Halo: hasHalo,
    DoubleHalo: hasDoubleHalo,
    GradientBackground: hasGradientBackground,
    MandalaRarity: hasRareMandala ? 'Rare' : hasPremiumMandala ? 'Premium' : 'Common',
}

console.log('Thank you for supporting @artofschwarz NFTs.');
console.log('Your lottery results: ', window.$fxhashFeatures);

function getRandomInt(max) {
    return Math.floor(fxrand() * max);
}

let originalImageWidth;
let originalImageHeight;

function preload() {
    const index = hasRareMandala ? 1 : hasPremiumMandala ? 2 : 3;
    loadedImage = loadImage(`media/F${index}.png`);
    originalImageWidth = loadedImage.width;
    originalImageHeight = loadedImage.height;
}

function resizeImage() {
    if (loadedImage) {
        const imageScreenWidthRatio = originalImageWidth <= MAX_ALLOWED_SIZE_PXLS ? 1 : (loadedImage.width / MAX_ALLOWED_SIZE_PXLS);
        const imageScreenHeightRatio = originalImageHeight <= MAX_ALLOWED_SIZE_PXLS ? 1:  (loadedImage.height / MAX_ALLOWED_SIZE_PXLS);
        const newImageWidth = loadedImage.width / Math.min(imageScreenWidthRatio, imageScreenHeightRatio);
        const newImageHeight = loadedImage.height / Math.min(imageScreenWidthRatio, imageScreenHeightRatio);
        loadedImage.resize(newImageWidth, newImageHeight);
        redraw();
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    resizeImage();
}

function mouseClicked() {
    invertRotation = !invertRotation;
}

let previewTriggered = false; // to trigger fxhash preview function once only.

function setup(){
    noSmooth();
    angleMode(DEGREES);
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    resizeImage();
    if (hasGradientBackground) {
        // code below adapted from: https://editor.p5js.org/Jaemi13/sketches/gAS-FB5Sx
        const ceilColor = color(255);
        const gradient = color(getRandomInt(255), getRandomInt(255), getRandomInt(255));
        for (let gradientY = 0; gradientY < height; gradientY++) {
            const mappedValue = map(gradientY, 0, height, 0, 1);
            const newColor = lerpColor(ceilColor, gradient, mappedValue);
            // draw the actual gradient manually
            stroke(newColor);
            line(0, gradientY, width, gradientY);
        }
    } else {
        background(randomR, randomG, randomB);
    }
}

function draw(){
    imageMode(CENTER);
    translate(window.innerWidth / 2, window.innerHeight / 2);
    rotate(rotationAngle);
    if (hasDoubleHalo) {
        circle(0, 0, loadedImage.width / 1.2);
        const circleColor = color(doubleHaloR, doubleHaloG, doubleHaloB);
        fill(circleColor);
    }
    if (hasHalo) {
        circle(0, 0, loadedImage.width / 1.5);
        const circleColor = color(singleHaloR, singleHaloG, singleHaloB);
        fill(circleColor);
    }
    image(loadedImage, 0, 0);
    if(!previewTriggered) {
        fxpreview();
        previewTriggered = true; // do not remove
    }
    rotationAngle += invertRotation ? -0.13 : 0.13;
}