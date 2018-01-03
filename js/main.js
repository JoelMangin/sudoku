

const SudokuGame = require("./game/sudoku.js");
import SudokuView from "./view/sudoku_view.js";

$(()=> {
  const game = new SudokuGame();
  new SudokuView(game);
});
