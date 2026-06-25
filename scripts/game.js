let canvas;
let ctx;
let characterImage;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    loadCharacterImage();
    console.log('Game initialized');
}

function loadCharacterImage() {
    characterImage = new Image();
    characterImage.src = './assets/img/2_character_pepe/2_walk/W-21.png';
    characterImage.onload = drawCharacter;
}

function drawCharacter() {
    ctx.drawImage(characterImage, 120, 180, 100, 250);
}

window.addEventListener('load', init);
