let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    console.log('Game initialized');
}

window.addEventListener('load', init);
