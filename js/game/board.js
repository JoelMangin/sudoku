import Grid from "./grid.js";
import Util from "./util.js";

// purpose of this class:
// 1) Build a grid ( take an existing grid or build a new one is none)
// 2) save difficulty (number of tile with a value of 0)
//    and the inputsVal( hash: {1: 2, 3: 4 etc..})
// 2) Provide a solved method to check if the grid is solved
// 3) update the grid according to correct input => val is a number and a num between 0 and 9

class Board {

  constructor(difficulty, grid = null){
    this.difficulty = difficulty;
    this.boardGrid = new Grid(difficulty, grid);
    this.inputsVal = this.boardGrid.inputsVal;
  }

  getValues(){
    return this.boardGrid.getValues();
  }

  updateVal(pos, val){

    let tile = this.getTile(pos);
    if(!tile.blocked && this.valid(val)){
      tile.val = val;
    } else if ( !(val !== val)) {
      alert("Please, enter a value between 0 and 9.")
    }
  }

  getTile(pos){
    let x = pos[0];
    let y = pos[1];
    return this.boardGrid.grid[x][y];
  }

  valid(val){
    return Number.isInteger(val) && val >= 0 && val <= 9;
  }

  // method to divide the grid values into squares


  getAllSquares(){
    let squares = [];
    [0, 3, 6].forEach((indexCol) => {
      this.getThreeSquaresIndexCol(indexCol).forEach((square) => {
        squares.push(square);
      })
    })
    return squares;
  }

  getThreeSquaresIndexCol(indexCol){
    let squares = [];
    let square = [];
    this.boardGrid.getValues().forEach((line, index)=> {
      square.push( line.slice(indexCol, indexCol+3));
      if((index + 1) % 3 === 0){
        squares.push(square);
        square = [];
      }
    })
    return squares;
  }

  //methods to check if the board is solved!

  solved(){
    return this.checkLinesColsBoard() && this.checkSquares();
  }

  checkSquares(){
    let result = true;
    this.getAllSquares().forEach(square => {
      if (!this.checkSquare(square)){
        result = false;
      }
    })
    return result;
  }


  checkSquare(square){
    let line = Util.flatten(square);
    return this.check(line);
  }

  checkLinesColsBoard(){
    let grid = this.boardGrid.getValues();
    let transposeGrid = Util.transpose(grid);
    return this.checkLines(grid) && this.checkLines(transposeGrid);
  }

  check(line){
    const b = Util.mergeSort(line);
      if (b[0] === 0) {
        return false;
      }
    return Util.similar(b , [1,2,3,4,5,6,7,8,9]);
  }

  checkLines(grid1){
    grid1.forEach((line) => {
      if (!this.check(line)) {
        return false;
      }
    })
    return true;
  }
}

export default Board;
