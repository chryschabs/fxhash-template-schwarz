const MAX_IMAGE_COUNT = 3;
const MIN_ALLOWED_SIZE_PXLS = 500;
let rotationAngle = 0;
const randomCoreIndex = getRandomInt(MAX_IMAGE_COUNT);
const randomOuterRimIndex = getRandomInt(MAX_IMAGE_COUNT);
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
        const imageScreenWidthRatio = (currentCore.width / Math.max(window.innerWidth, MIN_ALLOWED_SIZE_PXLS));
        const imageScreenHeightRatio = (currentCore.height / Math.max(window.innerHeight, MIN_ALLOWED_SIZE_PXLS));
        const newImageWidth = currentCore.width / Math.min(imageScreenWidthRatio, imageScreenHeightRatio);
        const newImageHeight = currentCore.height / Math.min(imageScreenWidthRatio, imageScreenHeightRatio);
        const outerRimScreenWidthRatio = (currentOuterRim.width / Math.max(window.innerWidth, MIN_ALLOWED_SIZE_PXLS));
        const outerRimScreenHeightRatio = (currentOuterRim.height / Math.max(window.innerHeight, MIN_ALLOWED_SIZE_PXLS));
        const newOuterRimWidth = currentOuterRim.width / Math.min(outerRimScreenWidthRatio, outerRimScreenHeightRatio);
        const newOuterRimHeight = currentOuterRim.height / Math.min(outerRimScreenWidthRatio, outerRimScreenHeightRatio);
        currentCore.resize(newImageWidth * 1.25, newImageHeight * 1.25);
        currentOuterRim.resize(newOuterRimWidth * 1.25, newOuterRimHeight * 1.25);
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
    imageMode(CENTER);
    translate(window.innerWidth / 2, window.innerHeight / 2);
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
