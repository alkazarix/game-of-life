import pygame
import numpy as np

GOSPER_GILDER_GUN_PATTERN = np.array([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
                                        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]])

CELL_SIZE: int = 10
HEIGHT: int = 50
WIDTH: int = 80

COLOR_GRID = (229, 209, 203)
COLOR_ALIVE = (255, 255, 215)
COLOR_BACKGROUND = (10, 10, 40)

def tick(cells):
    next = np.zeros((cells.shape[0], cells.shape[1]))
    for r, c in np.ndindex(cells.shape):
        num_alive = np.sum(cells[r-1:r+2, c-1:c+2]) - cells[r, c]
        if cells[r, c] == 1 and num_alive < 2 or num_alive > 3:
            next[r,c] = 0
        elif (cells[r, c] == 1 and 2 <= num_alive <= 3) or (cells[r, c] == 0 and num_alive == 3):
            next[r, c] = 1
    return next




def init_cells(width: int, height: int):
    cells = np.zeros((height, width))
    pos = (3,3)
    cells[pos[0]:pos[0]+ GOSPER_GILDER_GUN_PATTERN.shape[0], pos[1]:pos[1]+ GOSPER_GILDER_GUN_PATTERN.shape[1]] = GOSPER_GILDER_GUN_PATTERN
    return cells



def draw_grid(surface):

    for i in range(0, WIDTH + 1, 1):
        pygame.draw.line(
            surface=surface, 
            color=COLOR_GRID, 
            start_pos=(i * (CELL_SIZE + 1), 0), 
            end_pos=(i * (CELL_SIZE + 1), (CELL_SIZE + 1) * HEIGHT + 1)
        )

    for j in range(0, HEIGHT + 1, 1):
        pygame.draw.line(
            surface=surface, 
            color=COLOR_GRID, 
            start_pos=(0, j * (CELL_SIZE + 1)), 
            end_pos=((CELL_SIZE + 1) * WIDTH + 1, j * (CELL_SIZE + 1))

        )

def draw_cells(surface, cells):
    for row, col in np.ndindex(cells.shape):
        color = COLOR_ALIVE if cells[row, col] == 1 else COLOR_BACKGROUND
        pygame.draw.rect(
            surface=surface,
            color=color,
            rect=(col * (CELL_SIZE + 1) + 1,row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE)
        )


def update_surface(surface, cells):
    draw_grid(surface)
    draw_cells(surface, cells)



if __name__ == "__main__":
    pygame.init()

    size =  ((CELL_SIZE + 1) * WIDTH + 1, (CELL_SIZE + 1) * HEIGHT + 1)
    surface = pygame.display.set_mode(size)
    pygame.display.set_caption("John Conway's Game of Life")

    cells = init_cells(width=WIDTH, height=HEIGHT)
    
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit(1)
        
        update_surface(surface , cells)
        cells = tick(cells)
        pygame.display.update()

 

