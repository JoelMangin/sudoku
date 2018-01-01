const solvedSudoku = require("./../../existing_sudoku/solved_sudokus.js");
const Tile = require("./tile.js");
const Util = require("./util.js");


// Purpose of this class:
// 1) Select a grid solved ( grid form: "1233434534...") if none provided
// 2) Build tile: ( grid  form: [Tile1, Tile2, etc...])
// 3) change grid form to get lines (grid form: [[line1], [line2], etc...])
// 4) Insert inputsVal (which is a tile of value 0) according to
//    the number of inputs we want( which define the difficulty of the game)
//    then save the previous val to display the hint (this.inputsVal = {1: 2, 3:0, 7:3 etc...})
      // At this step: we also save the available positions
      // (which are the positions of the tile of value 0)
// 5) Provide a getValues() to get the grid form: [[1,3,4,..], [9,4,3, ...], ...]


class Grid {

  constructor(difficulty, grid = null){

    if(grid !== null){
      this.grid = grid;
    } else {
      this.availablePosistions = [];
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

// set the difficulty of the game

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
// provide a set of all positions of the grid

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
