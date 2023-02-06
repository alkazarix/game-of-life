## Game of life

python implementation of [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).


#### requirements

- python >= 3.6

#### setup 

create a virtual environment (optional):
```
python3 -m venv venv 

source ./venv/bin/activate
```

install dependencies:
```
pip install -r requirements.txt
```

run the application:
```
python main.py
```

#### pygame

the application template use the package [pygame](https://www.pygame.org/news) to render the [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) interface.

The first thing,  we have to do is to create a windows with [pygame](https://www.pygame.org/news).

```python
# initialize pygame 
pygame.init()

HEIGHT = 450
WIDTH = 400
 
# create a window of dimension HEIGHT * WIDTH 
surface = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("John Conway's Game of Life")
```

Then we have to to deal with the **game loop**.

```python
# main game loop
while True:
    # handle quit event
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            exit(1)
        
        # TODO: compute next game state
        # TODO: draw grid and alive cell on the surface

        pygame.display.update() # update window - rendering process
```

to display the game state on the surface you need to thing:

- draw a line (for the grid)
- draw a rectangle (for the alive cell)

to draw a line with [pygame](https://www.pygame.org/news).

```python
start_pos = (0,0)       # set start position at (0,0) - in pixel
end_pos = (30,30)       # set end position at (30,30) - in pixel
color = (229, 209, 203) # (r, g, b) color

pygame.draw.line(
            surface=surface, 
            color=color, 
            start_pos=start_pos, 
            end_pos=end_pos
        )
```

to draw a rectangle with [pygame](https://www.pygame.org/news).

```python
(x,y) = (0,0)           # position of the left - up corner
(h, w) = (30,30)        # height and witdh of the rectangle
color = (229, 209, 203) # (r, g, b) color

 pygame.draw.rect(
            surface=surface,
            color=color,
            rect=(x, y, h, w)
        )
```

