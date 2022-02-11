const MAX_ALLOWED_SIZE_PXLS = window.innerWidth * 0.5;
let rotationAngle = 0;
let loadedImage;
let canvas;
const mandalaIndex = getRandomInt(3) + 1;

const randomR = getRandomInt(255);
const randomG = getRandomInt(255);
const randomB = getRandomInt(255);

let invertRotation = false;

window.$fxhashFeatures = {
    MandalaRarity: mandalaIndex === 1
        ? 'Golden Mandala'
        : mandalaIndex === 2 ? 'Pink Mandala' : 'Green Mandala',
}


console.log('Thank you for supporting @artofschwarz NFTs.');
console.log('Your lottery results: ', window.$fxhashFeatures);

function getRandomInt(max) {
    return Math.floor(fxrand() * max);
}

function preload() {
    loadedImage = loadImage(`media/asset-${mandalaIndex}.png`);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    background(randomR, randomG, randomB);
}

function mouseClicked() {
    invertRotation = !invertRotation;
}

function setup() {
    angleMode(DEGREES);
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    background(randomR, randomG, randomB);
}

function draw() {
    imageMode(CENTER);
    translate(window.innerWidth / 2, window.innerHeight / 2);
    rotate(rotationAngle);
    const scaleRatio = loadedImage.width > 1 && loadedImage.width < MAX_ALLOWED_SIZE_PXLS
        ? 1 : loadedImage.width / MAX_ALLOWED_SIZE_PXLS;
    image(loadedImage, 0, 0, loadedImage.width / scaleRatio, loadedImage.height / scaleRatio);
    rotationAngle += invertRotation ? -0.08 : 0.08;
    if (rotationAngle >= 20) {
        invertRotation = true;
        clear();
        background(randomR, randomG, randomB);
    }
    if (rotationAngle <= -20) {
        invertRotation = false;
        clear();
        background(randomR, randomG, randomB);
    }
}