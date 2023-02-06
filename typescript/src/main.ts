import { Cell, Univers } from "./univers";


class DrawingApp {

    private static readonly CELL_SIZE = 10; // px
    private static readonly  GRID_COLOR = "#CCCCCC";
    private static readonly  DEAD_COLOR = "#FFFFFF";
    private static readonly  ALIVE_COLOR = "#000000";

    private ctx: CanvasRenderingContext2D | null;
    private animationId : number | null = null;

    private univers: Univers

    public constructor(canvas: HTMLCanvasElement) {

        this.univers = Univers.gosperGilderGun(50, 100);

        canvas.height = (DrawingApp.CELL_SIZE + 1) * this.univers.height + 1;
        canvas.width = (DrawingApp.CELL_SIZE + 1) * this.univers.width + 1;

        this.ctx = canvas.getContext("2d");
    }

    public stop() {
        cancelAnimationFrame(this.animationId);
        this.animationId = null; 
    }

    public play() {
        this.renderLoop();
    }

    public isPaused() {
        return this.animationId === null
    }

    private renderLoop() {
        this.univers.tick();
        this.drawGrid();
        this.drawCells();

        this.animationId = requestAnimationFrame(() => {
            this.renderLoop();
        });
  
    }

    private drawGrid() {
        this.ctx?.beginPath();
        this.ctx!.strokeStyle = DrawingApp.GRID_COLOR;
      
        // Vertical lines.
        for (let i = 0; i <= this.univers.width; i++) {
          this.ctx?.moveTo(i * (DrawingApp.CELL_SIZE + 1) + 1, 0);
          this.ctx?.lineTo(i * (DrawingApp.CELL_SIZE + 1) + 1, (DrawingApp.CELL_SIZE + 1) * this.univers.height + 1);
        }
      
        // Horizontal lines.
        for (let j = 0; j <= this.univers.height; j++) {
          this.ctx?.moveTo(0, j * (DrawingApp.CELL_SIZE + 1) + 1);
          this.ctx?.lineTo((DrawingApp.CELL_SIZE + 1) * this.univers.width + 1, j * (DrawingApp.CELL_SIZE + 1) + 1);
        }
      
        this.ctx?.stroke();
    }


    private drawCells() {
        this.ctx?.beginPath();
  
        for (let row = 0; row < this.univers.height; row++) {
            for (let col = 0; col < this.univers.width; col++) {
            
  
                this.ctx!.fillStyle = this.univers.cells[row][col] === Cell.Dead
                    ? DrawingApp.DEAD_COLOR
                    : DrawingApp.ALIVE_COLOR;
  
                this.ctx?.fillRect(
                col * (DrawingApp.CELL_SIZE + 1) + 1,
                    row * (DrawingApp.CELL_SIZE + 1) + 1,
                    DrawingApp.CELL_SIZE,
                    DrawingApp.CELL_SIZE
                );
            }
        }
        this.ctx?.stroke();
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


