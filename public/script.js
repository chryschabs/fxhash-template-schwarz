const MAX_IMAGE_COUNT = 3;
let rotationAngle = 0;
const randomCoreIndex = getRandomInt(MAX_IMAGE_COUNT);
const randomOuterRimIndex = getRandomInt(MAX_IMAGE_COUNT);
console.log('randomCoreIndex: ', randomCoreIndex);
console.log('randomOuterRimIndex: ', randomOuterRimIndex);
let currentCore;
let currentOuterRim;
let canvas;

function getRandomInt(max) {
    return Math.floor(fxrand() * max);
}

function preload() {
    currentCore = loadImage(`media/F${randomCoreIndex + 1}.png`);
    currentOuterRim = loadImage(`media/nft_ring-I-00${randomOuterRimIndex + 1}.png`);
}

function resizeImage() {
    if (currentCore && currentOuterRim) {
        const imageScreenWidthRatio = (currentCore.width / Math.max(window.innerWidth, 500));
        const imageScreenHeightRatio = (currentCore.height / Math.max(window.innerHeight, 500));
        const newImageWidth = currentCore.width / Math.min(imageScreenWidthRatio, imageScreenHeightRatio);
        const newImageHeight = currentCore.height / Math.min(imageScreenWidthRatio, imageScreenHeightRatio);
        const outerRimScreenWidthRatio = (currentOuterRim.width / window.innerWidth);
        const outerRimScreenHeightRatio = (currentOuterRim.height / window.innerHeight);
        const newOuterRimWidth = currentOuterRim.width / Math.min(outerRimScreenWidthRatio, outerRimScreenHeightRatio);
        const newOuterRimHeight = currentOuterRim.height / Math.min(outerRimScreenWidthRatio, outerRimScreenHeightRatio);
        currentCore.resize(newImageWidth, newImageHeight);
        currentOuterRim.resize(newOuterRimWidth, newOuterRimHeight);
        redraw();
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    resizeImage();
}

function setup(){
    noSmooth();
    angleMode(DEGREES);
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    resizeImage();
}

let alternateRotation = false;

function draw(){
    translate(window.innerWidth / 4, window.innerHeight / 2.5);
    imageMode(CENTER);
    rotate(rotationAngle);
    image(currentCore, 0, 0,);
    image(currentOuterRim, 0, 0);
    if (!alternateRotation) {
        rotationAngle += 0.18;
        if (rotationAngle >= 25) {
            alternateRotation = true;
        }
    } else if (alternateRotation) {
      rotationAngle += -0.18;
    }
    if (rotationAngle <= -20) {
        alternateRotation = false;
        clear();
    }
}
