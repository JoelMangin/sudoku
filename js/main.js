

const SudokuGame = require("./game/sudoku.js");
import SudokuView2 from "./view/sudoku_view2.js";

$(()=> {
  const game = new SudokuGame();
  new SudokuView2(game);
});
