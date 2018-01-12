 import SudokuView from "./view/sudoku_view.js";
 import Sudoku from './game/sudoku.js'

 $(()=> {
   let game = new Sudoku();
   new SudokuView(game);
 });
