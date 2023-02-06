mod utils;

use std::fmt;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

extern crate web_sys;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// the macro [wasm_bindgen] indicate to the compiler to export this function into generated javascript module.
// the macro [repr(u8)] indicate how to represente the enum for javascript runtime.
#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead  = 0,
    Alive = 1,
}

const GOSPER_GILDER_GUN_PATTERN: [[u8; 43]; 11] = 
[
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
[0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];


fn init_gosper_gilder_gun(height: u32, width: u32) -> Vec<Cell> {
    let cells = (0..height).flat_map(|i| {
        (0..width).map(|j| {
            if i < 11 && j < 43 {
                let value = GOSPER_GILDER_GUN_PATTERN[(i as usize)][(j as usize)];
                if value == 1 {
                    return Cell::Alive;
                }
            }
            Cell::Dead
        }).collect::<Vec<Cell>>()
    }).collect::<Vec<Cell>>();
    cells
}


#[wasm_bindgen]
pub struct Universe {
    height: u32,
    width: u32,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
// represent the game of life state
// Due to the structure of the memory in webassembly - a linear array
// we cannot share a two dimensionnal array between rust and javascript (ie the grid) - only one dimensional array
// to contour this restriction the grid as two dimensionnal array will be flatten into a Vec<>
//
// for example the following grid:
// [
//  [0, 1, 0],
//  [1, 1, 1],
//  [0, 1, 0],
// ]
//  will become:
// [0, 1, 0, 1, 1, 1, 0, 1, 0]
// | - 1r - | - 2r - | - 3r -|
//  
impl Universe {
    // initiate game of life game with a grid of 100 x 60 with a gosper gilder gun
    pub fn new() -> Universe {
        utils::set_panic_hook();
        let width = 100;
        let height = 60;
        let cells = init_gosper_gilder_gun(height, width);

        Universe {
            width,
            height,
            cells,
        }
    }

    // compute the next state of the game
    pub fn tick(&mut self) {
        unimplemented!("todo")
    }

    // return the width of the grid
    pub fn width(&self) -> u32 {
        self.width
    }

     // return the  heigth of the grid
    pub fn height(&self) -> u32 {
        self.height
    }

    // return the cell as array of fixed sized
    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }  
}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }

        Ok(())
    }
}

