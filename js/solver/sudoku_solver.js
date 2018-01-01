
const BoardSolver = require("./board_solver.js");
const Board = require("./../game/board.js");
const Tile = require("./../game/tile.js");

// Purpose of this class:
// 1) Accept a boardSolver
// 2) define the children of this boardSolver:
        // 2.1) get the next available position of the current boardSolver
        // 2.2) get the tile on the position
        // 2.3) Loop through each available marks of the tile
        // 2.4) Create a new boardSolver for each mark
             // and update the tile of the new board Solver with the mark
        // 2.5) If the new boardSolver has a solution: push to children
// 3) build a stack with initial value: boardSolver at creation
// 4) pop one element of the stack: return the board if board is solved
   // if not get the children of the current board and push on the stack
// 5) keep going while the stack is not empty or if we find a solution

// Pros and cons:
  // Pros: boardSolver are already simpilied (singeton value updated)
        // which accelerate the process of finding a solution.
 //  Cons: we create  new board for each tile.marks
        // which could be a lot of boards on high difficulty (bad space complexity and
        // time complexity on the worse case scenario)
        // checking if the board is solved add a lot of extra step:
        // there should be a way to do that faster

class SudokuSolver {

  constructor(boardSolver){
    this.positions = boardSolver.availablePositions;
    this.root = boardSolver;
  }

  solve(){
    let stack = [this.root];

    while(stack.length > 0){
      let currentBoard = stack.pop();
      if(currentBoard.solved()){
        return currentBoard.board.getValues();
      }
      this.children(currentBoard).forEach( board => stack.push(board))
    }
    return null;
  }

  children(boardSolver){
    let children = []
    let nextAvailablePosition = boardSolver.availablePositions[0];
    let positions = boardSolver.availablePositions.slice(1, boardSolver.availablePositions.length);
    let tile = boardSolver.board.getTile(nextAvailablePosition);

    tile.marks.forEach((mark) => {

      let newBoardSolver = new BoardSolver(boardSolver.board, positions);
      newBoardSolver.updateTile(nextAvailablePosition, mark);
      if(newBoardSolver.solvable){
        children.push(newBoardSolver)
      }
    })
    return children;
  }

}


module.exports = SudokuSolver;
