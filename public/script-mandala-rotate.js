const MAX_ALLOWED_SIZE_PXLS = window.innerWidth * 0.99;
let rotationAngle = 0;
let translateDistance = 0;
let loadedImage;
let backgroundImage;
let canvas;
const mandalaIndex = getRandomInt(100) + 1;
const bgIndex = getRandomInt(3) + 1;

const randomR = getRandomInt(255);
const randomG = getRandomInt(240);
const randomB = 240; // fixed Blue value;

let invertRotation = false;
let invertTranslate = false;

const mandalaRollSheet = {
    100: [1, 'Abstract Waves I'],
    90: [4, 'Abstract Waves IV'],
    80: [7, 'Abstract Waves VII'],
    70: [2, 'Ice Flower'],
    60: [3, 'Petal Stream Helix'],
    50: [8, 'Dot Waves I'],
    40: [5, 'Dot Waves II'],
    30: [9, 'Dot Waves III'],
    25: [6, 'Rare Ocean'],
    20: [10, 'H2O Unity'],
};

const [,mandalaDisplayName] = Object.keys(mandalaRollSheet).reduceRight((currentCore, rollCeilValue) => {
    return mandalaIndex <= rollCeilValue ? mandalaRollSheet[rollCeilValue] : currentCore;
}, mandalaRollSheet[100]);

window.$fxhashFeatures = {
    MandalaCore: mandalaDisplayName,
    MandalaBorder: bgIndex === 1 ? 'Ocean Blue' : bgIndex === 2 ? 'Spring Source' : 'Neon Wave',
}


console.log('Thank you for supporting @artofschwarz NFTs.');
console.log('Your lottery results: ', window.$fxhashFeatures);

function getRandomInt(max) {
    return Math.floor(fxrand() * max);
}

function preload() {
    const [mandalaNumber] = Object.keys(mandalaRollSheet).reduceRight((currentCore, rollCeilValue) => {
        return mandalaIndex <= rollCeilValue ? mandalaRollSheet[rollCeilValue] : currentCore;
    }, mandalaRollSheet[100]);
    loadedImage = loadImage(`media/nft-water-series-${mandalaNumber}.png`);
    backgroundImage = loadImage(`media/nft-water-bg${bgIndex}.png`);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    background(randomR, randomG, randomB);
}

function mouseClicked() {
    invertRotation = !invertRotation;
    invertTranslate = !invertTranslate;
}

function setup() {
    imageMode(CENTER);
    angleMode(DEGREES);
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    const scaleRatio = backgroundImage.width > 1 && backgroundImage.width < MAX_ALLOWED_SIZE_PXLS
        ? 1 : backgroundImage.width / MAX_ALLOWED_SIZE_PXLS;
    background(randomR, randomG, randomB);
    backgroundImage.resize(backgroundImage.width / scaleRatio, backgroundImage.height / scaleRatio);
}

function draw() {
    translate(window.innerWidth / 2, window.innerHeight / 2 + translateDistance);
    rotate(-rotationAngle);
    image(backgroundImage, 0, 0);
    rotate(rotationAngle * 2);
    const scaleRatio = loadedImage.width > 1 && loadedImage.width < MAX_ALLOWED_SIZE_PXLS
        ? 1 : loadedImage.width / MAX_ALLOWED_SIZE_PXLS;
    image(loadedImage, 0, 0, loadedImage.width / scaleRatio, loadedImage.height / scaleRatio);
    rotationAngle += invertRotation ? -0.08 : 0.08;
    if (rotationAngle >= 90) {
        invertRotation = true;
        clear();
        background(randomR, randomG, randomB);
    }
    if (rotationAngle <= -90) {
        invertRotation = false;
        clear();
        background(randomR, randomG, randomB);
    }

    translateDistance += invertTranslate ? -0.03 : 0.03;
    if (translateDistance >= 5) {
        invertTranslate = true;
    }
    if (translateDistance <= -5) {
        invertTranslate = false;
    }
}