## Game of life

typescript implementation of [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).


#### setup 

install dependencies:
```
npm install
```

start the dev server:
```
npm start 
```

Then open the url [localhost:8080](http://localhost:8080) on your favorite browser to display the ui. 

#### projet structure

Let take a look at the project contents:

```
typescript/
├── index.html
├── README.md
└── src
    ├── main.ts
    └── univers.ts
```

`src/univers.ts`
This file contains the logic of the [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). We are going to compute the next state of game here.

`src/main.ts`
This file contain the render logic of the [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). It interact with the DOM element and contains the main `loop` of the game.

`index.html`
This is the root HTML file for the Web page. It load the result of the compilation of typescript source. It also content the `<canvas>` HTML element we are going to use to display the [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) ui.


#### canvas

the project use a `<canvas>` element to draw the state of the game. Let take a brief look how to use javascript api to draw graphic element.

First, we need to instanciate 2D context.

```typescript
let canvas = document.getElementById('game-of-life-canvas') as HTMLCanvasElement;
let ctx = ctx = canvas.getContext("2d");
```

To draw of the  `<canvas>` element, we need first to start a new path with method `CanvasRenderingContext2D.beginPath()` and then close the path with the method  `CanvasRenderingContext2D.stroke()`.

```typescript
ctx.beginPath();
//TODO: draw some line, rectangle ...
ctx.stroke(); 
```

For this exercise, we need to draw to thing: a *line* for the grid and a *rectangle*  for aliving cell.

To draw a line:
```typescript
// set line color
ctx.strokeStyle = "#CCCCCC";

// move to starting point (in pixel).
ctx.moveTo(0, 0); 

// adds a straight line to the current sub-path by connecting the sub-path's 
// last point to the specified (x, y) coordinates.
ctx.lineTo(200, 100);  
```

To draw a rectangle:
```typescript
// set rectangle color
ctx.fillStyle = "#CCCCCC";

// The fillRect() method draws a filled rectangle whose starting point is at (x, y) and whose size is specified by width and height.
ctx.fillRect(x,y, width, height);
```


Last thing, we need to do is to run the animation loop.

```typescript
 function renderLoop() {
    
        // TODO - compute next state of the game - ie alive cell
        // TODO - draw aliving cell on canvas. 

        let animationId = requestAnimationFrame(() => {
            renderLoop();
        });
  
    }
```