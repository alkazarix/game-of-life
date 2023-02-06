## Game of life

The [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) developed by the English mathematician [John Horton Conway](https://en.wikipedia.org/wiki/John_Horton_Conway) is a **cellular automaton**. 

Cellular automata are discrete models that consist of a regular grid in which each cell has a defined state. The simulation proceeds in discrete time steps. The new state of a cell only depends on the state of the neighboring cells in the previous time step. 

![game of life](./Gospers_glider_gun.gif)

#### Rules

The simulation starts in the first time step with a specified initial state. Each cell in the game has one of two states: **Alive** or **Dead**.
For the next time step, the states of the cells are calculated according to the following rules:

- A living cell dies if it has fewer than two living neighboring cells.
- A living cell with two or three living neighbors lives on.
- A living cell with more than three living neighboring cells dies in the next time step.
- A dead cell is revived if it has exactly three living neighboring cells.


#### Instruction

The goal of this exercise  is to implement a [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). 
The instruction provided three application 's template to help you get started.

- [template typescript](typescript#README.md)
- [template python](python#README.md)
- [template webassembly](wasm#README.md)

