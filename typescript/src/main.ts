import { Cell, Univers } from "./univers";


class DrawingApp {
    // Wrapper class around the canvas element. 
    // Control the animation.

    private static readonly CELL_SIZE = 10; // cell size in pixel

    // display colors
    private static readonly  GRID_COLOR = "#CCCCCC";
    private static readonly  DEAD_COLOR = "#FFFFFF";
    private static readonly  ALIVE_COLOR = "#000000";

    private ctx: CanvasRenderingContext2D | null;
    private animationId : number | null = null;

    private univers: Univers

    public constructor(canvas: HTMLCanvasElement) {

        // initiate the game with a 50 x 100 grid 
        this.univers = Univers.gosperGilderGun(50, 100); 

        // initiate canvas size - +1px for the grid width.
        canvas.height = (DrawingApp.CELL_SIZE + 1) * this.univers.height + 1;
        canvas.width = (DrawingApp.CELL_SIZE + 1) * this.univers.width + 1;

        // initiate can
        this.ctx = canvas.getContext("2d");
    }

    public stop() {
         // stop the animation.
        cancelAnimationFrame(this.animationId);
        this.animationId = null; 
    }

    public play() {
        // launch the animation. 
        this.renderLoop();
    }

    public isPaused() {
        return this.animationId === null
    }

    private renderLoop() {
        // TODO - compute univers next state + draw grid and cell on the canvas element

        this.animationId = requestAnimationFrame(() => {
            this.renderLoop();
        });
  
    }

    private drawGrid() {
       // TODO - draw grid of the canvas.
    }


    private drawCells() {
        // TODO - draw aliving cell on the canvas.
    }
}


(function(window, document, undefined){
    window.onload = init;
    
      function init(){
        // the code to be called when the dom has loaded
        // #document has its nodes
        let canvas = document.getElementById('game-of-life-canvas') as HTMLCanvasElement;
        let button = document.getElementById('btn') as HTMLButtonElement; 

        const app: DrawingApp = new DrawingApp(canvas);
        button?.addEventListener('click', (e : MouseEvent) => {
            if (app.isPaused()) {
                button!.textContent = "pause";
                app.play();
            } else {
                button!.textContent = "plays";
                app.stop();
            }       
        });
    }
    
})(window, document, undefined);


