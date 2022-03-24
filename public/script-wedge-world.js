const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

let loadedImage;
let canvas;
let angle;

// radius of the "virtual" circle we'll be drawing along
// to have wedges 60 deg from each other.
const radius = 80;

window.$fxhashFeatures = {};

console.log('Features: ', window.$fxhashFeatures);

function getRandomInt(max) {
    return Math.floor(fxrand() * max);
}

let images = [];

function preload() {
    for(let i = 0; i < 6; i++) {
        images.push(loadImage(`wedgeworld/wedge${i+1}.png`));
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    drawWedges();
}

function mouseClicked() {
}

const MAX_ALLOWED_SIZE_PXLS = 200;

// wedges will be displayed along the circle at an angle of 60 degrees each.
// however, the algorithm is not perfect and wedges still overlap even when split apart
// so the offsets below account for this by manually adjusting each wedge.
// Not ideal but fastest way I could implement this for now.
// TODO: revamp this whole logic to use 1 wedge png instead and rotate it along the arc of the circle.
const offsetsPerwedge = {
    0: [2, -25],
    1: [40, 55],
    2: [-20, 60],
    3: [-44, 80],
    4: [-80, 0],
    5: [-22, -4],
}

function drawWedges() {
    canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    imageMode(CENTER);
    background(255, 255, 255);
    translate(CANVAS_WIDTH / 20, 0);
    let angle = 0;
    let pointCount = 6;
    for(let i = angle, j = 0; i < radians(360 + angle) ; i += radians(360 / pointCount) ){
        // code adapted from: https://www.alpharithms.com/evenly-spacing-objects-around-a-circle-in-p5js-processing-180222/
        let x = radius * Math.cos(i) + CANVAS_WIDTH * 0.5;
        let y = radius * Math.sin(i) + CANVAS_HEIGHT * 0.5;
        const loadedImage = images[j];
        const scaleRatio = loadedImage.width > 1 && loadedImage.width < MAX_ALLOWED_SIZE_PXLS
            ? 1 : loadedImage.width / MAX_ALLOWED_SIZE_PXLS;
        const scaledWidth = loadedImage.width / scaleRatio;
        const scaledHeight = loadedImage.height / scaleRatio;
        // uncomment this to ease troubleshooting
        // if (j === 0) {
        //     stroke(255, 204, 0);
        //     strokeWeight(5);
        //     point(x, y);
        // } else {
        //     stroke(0, 0, 0);
        //     strokeWeight(1);
        //     point(x, y);
        // }
        image(loadedImage,
            x + offsetsPerwedge[j][0],
            y + offsetsPerwedge[j][1],
            scaledWidth,
            scaledHeight
        );
        // FIXME see if we can safely use 5 points instead
        if (j === images.length - 1) {
            j = 0;
        } else {
            j++;
        }

    }
}

function setup() {
    angleMode(DEGREES);
    drawWedges();
}

function draw() {
}