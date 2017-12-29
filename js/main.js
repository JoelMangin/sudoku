
const SudokuView = require("./sudoku_view.js")
const SudokuGame = require("./sudoku.js")

$(()=> {
  const rootEl = $("#sudoku");
  const game = new SudokuGame();
  new SudokuView(rootEl, game)
})
