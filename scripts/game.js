let canvas;
let ctx;
let character;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    createCharacter();
    console.log('Game initialized');
}

function createCharacter() {
    character = new Character();
    character.img.onload = drawCharacter;
}

function drawCharacter() {
    character.draw(ctx);
}

window.addEventListener('load', init);
