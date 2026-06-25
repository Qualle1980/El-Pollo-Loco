// #region variables

let canvas;
let world;

// #endregion

// #region initialization

// Initializes the canvas and creates the game world.
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    console.log('Game initialized');
}

// #endregion

// #region events

window.addEventListener('load', init);

// #endregion
