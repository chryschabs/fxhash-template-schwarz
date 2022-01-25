// const { promisify } = require('util');
// const { resolve } = require('path');
// const fs = require('fs');
// const readdir = promisify(fs.readdir);
// const stat = promisify(fs.stat);
//
// async function getFiles(dir) {
//     const subdirs = await readdir(dir);
//     const files = await Promise.all(subdirs.map(async (subdir) => {
//         const res = resolve(dir, subdir);
//         return (await stat(res)).isDirectory() ? getFiles(res) : res;
//     }));
//     return files.reduce((a, f) => a.concat(f), []);
// }

let canvas;
const gradientR = getRandomInt(255);
const gradientG = getRandomInt(255);
const gradientB = getRandomInt(255);

window.$fxhashFeatures = {
    // Halo: hasHalo ? `true(~40%)` : 'false',
    // DoubleHalo: hasDoubleHalo ? `true(~5%)` : 'false',
    // GradientBackground: hasGradientBackground ? 'true(~2%)' : 'false',
    // MandalaRarity: hasRareMandala ? 'Rare(~10%)' : hasPremiumMandala ? 'Premium(~20%)' : 'Common',
}

console.log('Thank you for supporting @artofschwarz NFTs.');
console.log('Your lottery results: ', window.$fxhashFeatures);

function getRandomInt(max) {
    return Math.floor(fxrand() * max);
}

const letters = [];
const rareLetters = [];

function preload() {
    const nbSets = 9;
    const nbImagesPerSet = 4;
    const setsMap = {
        1: 'artefact',
        2: 'flower',
        3: 'invertedshield',
        4: 'leaf',
        5: 'line',
        6: 'moon',
        7: 'scribble',
        8: 'sideline',
        9: 'waves'
    };
    for (let index = 0; index < nbSets; index++) {
        for (let setIndex = 0; setIndex < nbImagesPerSet; setIndex ++) {
            const currentSet = index + 1;
            const currentSetImage = setIndex + 1;
            const currentLoadedImage = loadImage(`series/set${currentSet}/${setsMap[currentSet]}${currentSetImage}.png`);
            if (currentSetImage === 4) {
                rareLetters.push(currentLoadedImage);
            } else {
                letters.push(currentLoadedImage);
            }
        }
    }

}

function drawGridConfig() {
    const LETTER_SIZE_PXLS = canvas.width / nbLettersPerRow;
    for (let rowCounter = 0; rowCounter < nbLettersPerRow; rowCounter++) {
        for (let colCounter = 0; colCounter < nbLettersPerRow; colCounter++) {
            image(nftGridConfig[rowCounter][colCounter], colCounter * LETTER_SIZE_PXLS, 0, LETTER_SIZE_PXLS, LETTER_SIZE_PXLS);
        }
        translate(0, LETTER_SIZE_PXLS);
    }
}

function drawGradientBg() {
    const ceilColor = color(255);
    const gradient = color(gradientB, gradientG, gradientB);
    // code below adapted from: https://editor.p5js.org/Jaemi13/sketches/gAS-FB5Sx
    for (let gradientY = 0; gradientY < height; gradientY++) {
        const mappedValue = map(gradientY, 0, height, 0, 1);
        const newColor = lerpColor(ceilColor, gradient, mappedValue);
        // draw the actual gradient manually
        stroke(newColor);
        line(0, gradientY, width, gradientY);
    }
}

function windowResized() {
    const minDimension = Math.min(window.innerHeight, window.innerWidth);
    canvas.resize(minDimension, minDimension);
    drawGradientBg();
    drawGridConfig();
    redraw();
}

let nftGridConfig;
const nbLettersPerRow = 20;

function setup(){
    noSmooth();
    angleMode(DEGREES);
    const minDimension = Math.min(window.innerHeight, window.innerWidth);
    canvas = createCanvas(minDimension, minDimension);
    drawGradientBg();

    nftGridConfig = new Array(nbLettersPerRow);
    for (let rowCounter = 0; rowCounter < nbLettersPerRow; rowCounter++) {
        nftGridConfig[rowCounter] = new Array(nbLettersPerRow);
        for (let colCounter = 0; colCounter < nbLettersPerRow; colCounter++) {
            const rareLetterCoinToss = getRandomInt(100);
            const hasRareLetter = rareLetterCoinToss < 5;
            if (hasRareLetter) {
                const randomRareIndex = getRandomInt(rareLetters.length - 1);
                nftGridConfig[rowCounter][colCounter] = rareLetters[randomRareIndex];
            } else {
                const randomIndex = getRandomInt(letters.length - 1);
                nftGridConfig[rowCounter][colCounter] = letters[randomIndex];
            }
        }
    }
}

let previewTriggered = false; // to trigger fxhash preview function once only.
function draw(){
    drawGridConfig();
    if(!previewTriggered) {
        fxpreview();
        previewTriggered = true; // do not remove
    }
}