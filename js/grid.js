const solvedSudoku = require("./../existing_sudoku/solved_sudokus.js")
const Tile = require("./tile.js")
const Util = require("./util.js")

class Grid {

  constructor(difficulty, grid = null){
    this.availablePosistions = [];

    if(grid !== null){
      this.grid = grid;
    } else {
      this.inputsVal = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0
      };
      this.grid = this.buildOneLineGrid();
      this.grid = this.getLines();
      this.insertInputTile(difficulty);
    }

  }

  randomIndex(val){
    return Math.floor(val * Math.random());
  }

  buildOneLineGrid(){
    const index = this.randomIndex(200);
    let gridString = solvedSudoku[index];
    let gridTile = [];

    gridString.split("").forEach((string) => {
      let val = parseInt(string);
      let newTile = new Tile(val);
      gridTile.push(newTile);
    });
    return gridTile;
  }


  insertInputTile(number){
    let positions = this.allPositions();
    let inputPos = []
    for(let val = 0; val < number; val++){
      let pos = positions.pop();
      let currentVal = this.grid[pos[0]][pos[1]].val;
      this.inputsVal[currentVal] += 1;
      this.grid[pos[0]][pos[1]] = new Tile(0, false)
      inputPos.push(pos)
    }
    this.availablePosistions = inputPos;
  }

  getValues(){
    let gridValues = [];
    this.grid.forEach( line => {
      let newLine = []
      line.forEach((tile) => {
        newLine.push(tile.val);
      })
      gridValues.push(newLine);
    });
    return gridValues;
  }

  getLines(){
    let index = 0;
    let lineGrid = [];
      for(let i =0; i< 9; i++){
        lineGrid.push(this.grid.slice(index, index+9))
        index += 9
      }
    return lineGrid;
  }

  allPositions(){
    let positions = [];
    for(let row=0; row< 9; row++){
      for(let col= 0; col<9; col++){
        positions.push([row, col])
      }
    }
    return Util.shuffle(positions);
  }

}

module.exports = Grid;
