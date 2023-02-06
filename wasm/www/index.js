import { Universe, Cell} from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

const CELL_SIZE = 10; // in px


const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const universe = Universe.new();

const canvas = document.getElementById("game-of-life-canvas");

// TODO compute the size of the canvas container in function of the number of cell to represent.
canvas.height =  500;
canvas.width = 1000;

const ctx = canvas.getContext('2d');




let animationId = null;

const playPauseButton = document.getElementById("play-pause");

const play = () => {
  // launch the animation.
  playPauseButton.textContent = "pause";
  renderLoop();
};

const pause = () => {
  // stop the animation.
  playPauseButton.textContent = "play";
  cancelAnimationFrame(animationId);
  animationId = null;
};

const isPaused = () => {
    return animationId === null;
};

playPauseButton.addEventListener("click", event => {
  // play/pause the animation.
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});



const renderLoop = () => {
    // rendering loop
    // TODO - compute next state of the game.
    // TODO - render both grid and the aliving cell.
    animationId = requestAnimationFrame(renderLoop);
};

const drawGrid = () => {
    ctx.beginPath();
    // TODO - draw the grid.
    ctx.stroke();
};

  
const drawCells = () => {
    // get the cells from univers as a pointer 
    // reading  the cell value in wasm share memory
    // convert it as Uint8Array
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, universe.width() * universe.height());
  
    ctx.beginPath();
    // TODO - draw the cells.
    
  
    ctx.stroke();
};


// launch the animation.s
play();



