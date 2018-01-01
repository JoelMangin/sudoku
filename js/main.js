
const SudokuView = require("./sudoku_view.js");
const SudokuGame = require("./game/sudoku.js");

$(()=> {
  const game = new SudokuGame();
  new SudokuView(game);
})
