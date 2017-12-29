
const BoardSolver = require("./board_solver.js")
const Board = require("./board.js")
const Tile = require("./tile.js")

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
