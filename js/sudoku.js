  const Board = require("./board.js");
  const BoardSolver = require("./board_solver.js")
  const SudokuSolver = require("./sudoku_solver.js")

class Sudoku {
  constructor(difficulty = 15){
    this.board = new Board(difficulty);
    this.inputsVal = this.board.inputsVal;
    const boardSolver = new BoardSolver(this.board);
    this.solution = new SudokuSolver(boardSolver).solve();
  }
}

module.exports = Sudoku;
