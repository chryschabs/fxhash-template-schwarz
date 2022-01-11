let w;

const images = [];
let outerRim;
const MAX_IMAGE_COUNT = 3;
let rotationAngle = 0;
const randomIndex = getRandomInt(MAX_IMAGE_COUNT);
let currentImage;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function preload() {
    for (let index = 0; index < MAX_IMAGE_COUNT; index++) {
        const loadedImage = loadImage(`media/F${3}.png`);
        images.push(loadedImage);
    }
    outerRim = loadImage(`media/nft_ring-I-00${3}.png`);
}

let imageScreenWidthRatio;
let imageScreenHeightRatio;
let newImageWidth;
let newImageHeight;
let outerRimScreenWidthRatio;
let outerRimScreenHeightRatio;
let newOuterRimWidth;
let newOuterRimHeight;

function setup(){
    console.log('window.screen.width: ', window.screen.width);
    console.log('window.screen.height: ', window.screen.height);
    // square dimensions
    angleMode(DEGREES);
    createCanvas(window.screen.width, window.screen.height);
    console.log('outerRim.width: ', outerRim.width);
    console.log('outerRim.height: ', outerRim.height);
    currentImage = images[randomIndex];
    console.log('currentImage.width: ', currentImage.width);
    console.log('currentImage.height: ', currentImage.height);
    const imageScreenWidthRatio = (currentImage.width / window.screen.width);
    const imageScreenHeightRatio = (currentImage.height / window.screen.height);
    const newImageWidth = currentImage.width / Math.min(imageScreenWidthRatio, imageScreenHeightRatio);
    const newImageHeight = currentImage.height / Math.min(imageScreenWidthRatio, imageScreenHeightRatio);
    const outerRimScreenWidthRatio = (outerRim.width / window.screen.width);
    const outerRimScreenHeightRatio = (outerRim.height / window.screen.height);
    const newOuterRimWidth = outerRim.width / Math.min(outerRimScreenWidthRatio, outerRimScreenHeightRatio);
    const newOuterRimHeight = outerRim.height / Math.min(outerRimScreenWidthRatio, outerRimScreenHeightRatio);
    currentImage.resize(newImageWidth, newImageHeight);
    outerRim.resize(newOuterRimWidth, newOuterRimHeight);
}

let alternateRotation = false;

function draw(){
    // background(220);
    // ellipse(w/2,w/2,w/2);
    translate(window.screen.width / 4, window.screen.height / 2.5);
    imageMode(CENTER);
    rotate(rotationAngle);
    image(currentImage, 0, 0,);
    image(outerRim, 0, 0);
    if (!alternateRotation) {
        rotationAngle += 0.25;
        if (rotationAngle >= 25) {
            alternateRotation = true;
        }
    } else if (alternateRotation) {
      rotationAngle += -0.25;
    }
    if (rotationAngle <= -20) {
        alternateRotation = false;
        clear();
    }
}
