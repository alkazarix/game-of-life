import pygame
import numpy as np

# 0 - dead cell
# 1 - alive cell
GOSPER_GILDER_GUN_PATTERN = np.array([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
                                        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]])

CELL_SIZE: int = 10 # size of the cell in pixel
HEIGHT: int = 50    # number of cell to display on the surface
WIDTH: int = 80     # number of cell to display on the surface

# rgb color for the ui.
COLOR_GRID = (229, 209, 203)
COLOR_ALIVE = (255, 255, 215)
COLOR_BACKGROUND = (10, 10, 40)

def tick(cells):
    # this function compute the next state of the game 
    # arguments
    #   cells: np.array - the previous state
    # return
    #   next: np.array - the next state
    pass




def init_cells(width: int, height: int):
    # initiate game with GOSPER_GILDER_GUN
    # return a np.array 
    cells = np.zeros((height, width))
    pos = (3,3)
    cells[pos[0]:pos[0]+ GOSPER_GILDER_GUN_PATTERN.shape[0], pos[1]:pos[1]+ GOSPER_GILDER_GUN_PATTERN.shape[1]] = GOSPER_GILDER_GUN_PATTERN
    return cells



def draw_grid(surface):
    # this function display the grid to delimited the cell
    pass

def draw_cells(surface, cells):
    # this function display the aliving cell on the surface
    pass


def update_surface(surface, cells):
    # this function display the state of the game on the surfaces
    draw_grid(surface)
    draw_cells(surface, cells)



if __name__ == "__main__":
    pygame.init()

    # TODO: compute the size of the windows in function of the size of the cell 
    # and the inital state
    size =  (500, 500)
    surface = pygame.display.set_mode(size)
    pygame.display.set_caption("John Conway's Game of Life")

    # init state - gosper gilder gun
    cells = init_cells(width=WIDTH, height=HEIGHT)
    
    # game main render loop
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit(1)
        
        update_surface(surface , cells)
        cells = tick(cells)

        pygame.display.update()

 

