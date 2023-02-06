

const GOSPER_GILDER_GUN_PATTERN = [
    [0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

export enum Cell {
    Alive = 1,
    Dead = 0,
}


export class Univers {

    public readonly width: number = 64;
    public readonly height : number = 64;
    private _cells: Cell[][] = [];

    public static gosperGilderGun(height: number, width: number) : Univers{
        let cells: Cell[][] = [...Array(height)].map(() => {
            return [...Array(width)].map(() => Cell.Dead)
        });

        GOSPER_GILDER_GUN_PATTERN.forEach((row, i) => {
            row.forEach((elt, j) => {
                if (elt === 1) cells[i][j] = Cell.Alive
            })
        })

        return new Univers(width, height, cells);
    }

    constructor(width: number, height: number, initialState:Cell[][]) {
        this.height = height;
        this.width = width;
        this._cells = initialState;
    }

    public tick() {
        let next: Cell[][] = [...Array(this.height)].map(() => {
            return [...Array(this.width)].map(() => Cell.Dead)
        });

        for (let row=0; row < this.height; row++) {
            for (let col=0; col < this.width; col++) {
                let livingNeighbors = this.liveNeigborCount(row, col)
                let currentCell = this._cells[row][col]
                if (currentCell ===  Cell.Alive && livingNeighbors <= 3  && livingNeighbors >= 2 ) {
                    next[row][col] = Cell.Alive;
                }
                else if (currentCell === Cell.Dead && livingNeighbors == 3) {
                    next[row][col] = Cell.Alive;
                }
            }
        }
        this._cells = next;
    }

    private liveNeigborCount(row: number, col: number) : number {
        let count = 0;
        for (let i = - 1; i <= 1; i++) {
            for (let j = - 1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue
                }
                let neighborRow = row + i 
                let neighborCol = col + j

                if (neighborRow < 0 || neighborRow >= this.height || neighborCol < 0 || neighborCol >= this.width)
                    continue
                count += (this._cells[neighborRow][neighborCol] === Cell.Alive) ? 1 : 0
            }
        }
        return count;
        
    }

    public get cells() :  Cell[][]  {
        return this._cells
    }
}