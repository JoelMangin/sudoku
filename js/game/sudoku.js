  const Board = require("./board.js");
  const BoardSolver = require("./../solver/board_solver.js");
  const SudokuSolver = require("./../solver/sudoku_solver.js");

// purpose of this class:
  // 1) Get one board
  // 2) Get the solution of the board
 //  3) save the inputsVal to display the hint (ex: {1: 3, 2:0, 3: 2})

class Sudoku {
  constructor(difficulty = 15){
    this.board = new Board(difficulty);
    this.inputsVal = this.board.inputsVal;
    const boardSolver = new BoardSolver(this.board);
    this.solution = new SudokuSolver(boardSolver).solve();
  }
}

module.exports = Sudoku;
