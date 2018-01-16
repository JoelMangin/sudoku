
import Util from "./../game/util.js";
import Board from "./../game/board.js";

// purpose of this class:
// 1) take the existing board and create a new Board with a deep copy of the previous grid
// 2) update the board by calculating the possible values for each tile of value 0(the marks):
   // loop through each available positions and update the tile with possible values
// 3) update the board if there is a unique possible value on one tile
  // (tile is updated and available positions as well)
// 4) Check after update if the board has a solution through (this.solvable)

class BoardSolver{

  constructor(board, availablePositions = null){
    this.availablePositions = availablePositions === null ? board.boardGrid.availablePosistions : availablePositions;
    this.board = new Board( board.difficulty, Util.deepDup(board.boardGrid.grid));

    this.solvable = true;
    this.updateDatas();
  }

  updateDatas(){
    this.lines = this.board.boardGrid.getValues();
    this.columns = Util.transpose(this.board.boardGrid.getValues());
    this.squares = this.board.getAllSquares();
  }

  updateTile(pos, val){
    this.board.updateVal(pos, val);
    this.updateDatas();
    this.updateMarks();
  }

  solved(){
    return this.board.solved();
  }

  updateMarks(){
    let positions = [];
    let update = false;

    for(let index=0; index < this.availablePositions.length; index++){
      let pos = this.availablePositions[index];
      let tile = this.board.getTile(pos);
      tile.marks = this.possibleMarks(pos);

      if(tile.marks.length === 0){
        this.solvable = false;
        break;
      } else if (tile.marks.length === 1){
        this.board.updateVal(pos, tile.marks.pop());
        positions.push(pos);
        update = true;
      }
    }

    this.updateAvailablePositions(update, positions);
  }

  updateAvailablePositions(update, positions){
    if(update){
      this.availablePositions = Util.update(this.availablePositions, positions);
    }
  }

  possibleMarks(pos){
    let values = this.getLine(pos).concat(this.getCol(pos)).concat(this.getSquare(pos));
    let uniqValues = Util.uniq(values);
    let result = [];
     [1,2,3,4,5,6,7,8,9].forEach(val => {
       if(!uniqValues.includes(val)){
         result.push(val)
       }
     })
     return result;
  }

  getLine(pos){
    let x = pos[0];
    return this.lines[x];
  }

  getCol(pos){
    let y = pos[1];
    return this.columns[y];
  }

  getSquare(pos){
    let index = this.getIndexSquare(pos);
    return Util.flatten(this.squares[index]);
  }

  getLineIndexSquare(pos){
    let line = pos[0];

    switch(line){
      case 0:
      case 1:
      case 2:
        return [0,3,6];
      case 3:
      case 4:
      case 5:
        return [1,4,7];
      case 6:
      case 7:
      case 8:
        return [2,5,8];
    }
  }

  getIndexSquare(pos){
    let col = pos[1];
    let indexes = this.getLineIndexSquare(pos);

    switch(col){
      case 0:
      case 1:
      case 2:
        return indexes[0];
      case 3:
      case 4:
      case 5:
        return indexes[1];
      case 6:
      case 7:
      case 8:
        return indexes[2];
    }

  }
}

export default BoardSolver;
