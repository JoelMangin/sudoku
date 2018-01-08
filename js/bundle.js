/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Grid = __webpack_require__(7);
const Util = __webpack_require__(2);

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

module.exports = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports) {


// purpose of this class:
// Well it s a tile object which hold three characteristics:
  //  1) tile is blocked (meaning we can t change the value of the tile)
  //  2) the value of the tile
   // 3) possible values of this tile according to the grid (this.marks)

class Tile {
  constructor(val, blocked = true){
    this.val = val;
    this.blocked =  val === null ? false : blocked ;
    this.marks = [];
  }
}

module.exports = Tile;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(1);

// purpose of this class:
// set of method created and use through all the different classes of the game


const Util = {

  merge: (left, right) => {
                            const merged = [];
                            while (left.length > 0 && right.length > 0) {
                              let nextItem = (left[0] < right[0]) ? left.shift() : right.shift();
                              merged.push(nextItem);
                            }

                            return merged.concat(left, right);

                          },

  mergeSort: (arr) =>     {
                           if (arr.length < 2) {
                              return arr;
                            } else {

                              const middle = Math.floor(arr.length / 2);
                              const left = Util.mergeSort(arr.slice(0, middle));
                              const right = Util.mergeSort(arr.slice(middle));

                              return Util.merge(left, right);
                            }
                           },

  uniq: (arr) =>           {
                              var hash = {}, uniq = [];
                              for ( let i = 0; i < arr.length; i++ ) {
                                  if ( !hash.hasOwnProperty(arr[i]) ) {
                                      hash[ arr[i] ] = true;
                                      uniq.push(arr[i]);
                                    }
                                  }
                              return uniq;
                            },

  similar: (arr1, arr2) =>  {
                             arr1.forEach((val, index)=> {
                                if(arr2[index] !== val){
                                  return false;
                                }
                              })
                              return true;
                            },

  transpose: (grid) =>      {
                              const newGrid = [];
                              grid.forEach((line, rowIdx) => {
                                let newRow = [];
                                line.forEach((val, colIdx)=> {
                                  newRow.push(grid[colIdx][rowIdx])
                                })
                                newGrid.push(newRow);
                              })
                              return newGrid;
                            },

  flatten: (arr) =>         {
                              let result = [];
                              arr.forEach( el => {
                                if( el instanceof Array){
                                  result = result.concat(Util.flatten(el))
                                }  else {
                                  result.push(el)
                                }
                              })
                              return result;
                            },

  deepDup: (grid) =>        {
                              let newGrid = [];
                              grid.forEach(line => {
                                let newLine = [];
                                line.forEach(tile => {
                                  let val = tile.val;
                                  let blocked = tile. blocked;
                                  let newTile = new Tile(val, blocked);
                                  newLine.push(newTile);
                                })
                                newGrid.push(newLine);
                              })
                              return newGrid;
                            },

  randomPos: (val) =>       {
                              const row = Math.floor(val * Math.random());
                              const col = Math.floor(val * Math.random());
                              return [row, col];
                            },

  deleteVal: (arr, val) =>  {
                              let index = arr.indexOf(val);
                                if(index !== -1){
                                  arr.splice(index, 1);
                                }
                            },

  shuffle: (arr) =>         {
                                let count = arr.length;
                                while (count > 0) {

                                    let index = Math.floor(Math.random() * count);
                                    count--;

                                    let temp = arr[count];
                                    arr[count] = arr[index];
                                    arr[index] = temp;
                                }
                                return arr;
                            },

   update: (positions1, positions2) => {
                                          let result = [];
                                          let hash = {};

                                           positions2.forEach(pos2 => {
                                             hash[`${pos2}`] = true;
                                           })

                                           positions1.forEach(pos1 => {
                                             if(!hash[`${pos1}`]){
                                              result.push(pos1);
                                             }
                                           })
                                           return result;
                                        }
}


module.exports = Util;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

  const Board = __webpack_require__(0);
  const BoardSolver = __webpack_require__(4);
  const SudokuSolver = __webpack_require__(9);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


const Util = __webpack_require__(2);
const Board = __webpack_require__(0);

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
    this.updateMarks();
  }

  updateTile(pos, val){
    this.board.updateVal(pos, val)
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
      this.updateMarks();
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
    return this.board.boardGrid.getValues()[x];
  }

  getCol(pos){
    let transpose = Util.transpose(this.board.boardGrid.getValues());
    let y = pos[1];
    return transpose[y];
  }

  getSquare(pos){
    let squares = this.board.getAllSquares();
    let index = this.getIndexSquare(pos);
    return Util.flatten(squares[index]);
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

module.exports = BoardSolver;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sudoku_select_level_view_js__ = __webpack_require__(12);



class SudokuGridView extends __WEBPACK_IMPORTED_MODULE_0__sudoku_select_level_view_js__["a" /* default */] {

    constructor(game){
      super(game);
      this.buildGrid();
      this.$inputs = $(".sudoku-grid input[type= text]");
      this.$inputs.change(this.handleChange.bind(this));
      // method coming from SudokuHintView class
      this.$inputs.on("click", this.handleSelect.bind(this));
      //
    }

    // method to build a new Grid (ul => lis).

    buildGrid(){
      const $sudokuGrid = $(".sudoku-grid");
      this.game.board.getValues().forEach( (line, row) => {
        let $ul = $("<ul></ul>");
        this.buildLis(line, $ul, row);
        $sudokuGrid.append($ul);
      });
    }

    buildLis(line, ul, row){
      line.forEach( (value, col)=> {
        let $li = $("<li></li>");
        $li.addClass(`li-${row}-${col} sudoku-grid-tile`);
        if(value !==0 ){
          $li.append(`${value}`);
          $li.addClass("tile-blocked");
        } else{
          let $input = $("<input></input>");
          $input.attr({type:"text", value: "" });
          $li.append($input);
        }
        ul.append($li);
      })
    }


    handleChange(event){
      let $input = $(event.target);
      let className = $input.parent().attr("class");
      let pos = this.getPos(className);
      let previousVal = this.game.board.getTile(pos).val;
      let value = parseInt($input.val());
      this.updateInputsVal(previousVal, value);
          value = value !== value ? 0 : value;
      this.game.board.updateVal(pos, value);
      // method coming from SudokuHintView class
      this.updateHint();
      //
      this.game.board.solved() ? this.printWinMessage() : false
    }

    getPos(className){
      let x = parseInt(className[3]);
      let y = parseInt(className[5]);
      return [x, y];
    }

    updateInputsVal(previousVal, value){
      if( value !== value ){
        this.game.inputsVal[previousVal] += 1;
      } else if(this.game.board.valid(previousVal) && this.game.board.valid(value)){
        this.game.inputsVal[previousVal] += 1;
        this.game.inputsVal[value] -= 1;
      }else if(this.game.board.valid(value)){
        this.game.inputsVal[value] -= 1;
      }
    }

    printWinMessage(){
      alert("Well played! You finished the grid!");
    }

  // methods to render a new BoardGrid from a new game created according to the level.

    render(grid){
      grid.forEach((line, row)=> {
        this.updateLis(line,row);
      });
    }

    updateLis(line, row){
      line.forEach((value, col) => {
        let $li = $(`.li-${row}-${col}`);
        $li.removeClass("tile-blocked tile-selected");
        $li.html('');
        if(value !== 0 ){
          $li.html(`${value}`);
          $li.addClass("tile-blocked");
        } else{
          let $input = $("<input></input>");
              $input.attr({type:"text", value: "" });
              $input.change(this.handleChange.bind(this));
              // method coming from SudokuHintView class
              $input.on("click", this.handleSelect.bind(this));
              //
          $li.append($input);
        }
      })
    }
}


/* harmony default export */ __webpack_exports__["a"] = (SudokuGridView);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view_sudoku_view_js__ = __webpack_require__(10);


const SudokuGame = __webpack_require__(3);


$(()=> {
  const game = new SudokuGame();
  new __WEBPACK_IMPORTED_MODULE_0__view_sudoku_view_js__["a" /* default */](game);
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const solvedSudoku = __webpack_require__(8);
const Tile = __webpack_require__(1);
const Util = __webpack_require__(2);


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


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const solvedSudokus = ["123456789547819362968273154219645873684732591375198426451967238792381645836524917",
"123456789478192536956873241381245967547369128269781354794528613835617492612934875",
"123456789657938214849721536318279645275164398496583127581692473734815962962347851",
"123456789596837214847192635735281946684379152912645378451963827379528461268714593",
"123456789468973125795821436542739618839612547671584392284167953317295864956348271",
"123456789947381625586927431672819543859634172314275896495762318768193254231548967",
"123456789685719243479823651854631927931247865267985134798364512542198376316572498",
"123456789869732145574189623395274816781563294642891537217945368938627451456318972",
"123456789457893621689127534261978453895234167734615892948762315572381946316549278",
"123456789469718235857932416531624897274893651698175324312567948785349162946281573",
"123456789769182435584937162918265347246379851357814296472598613891623574635741928",
"123456789679832154845179326531697248984213567267548913712364895498725631356981472",
"123456789649871235857329146962734851375618492418592673736185924281943567594267318",
"123456789984372516765891324347589162816234957259617438632745891498123675571968243",
"123456789864179523957823614539761842641982375782345196318694257475238961296517438",
"123456789586279431794381625451792863962813547837564192375628914649137258218945376",
"123456789458937261796812435287594613941673852635281974374169528562348197819725346",
"123456789687319425549287613365142897298763154714895236952671348471938562836524971",
"123456789568279431794318256487195623912683547356742918875921364239864175641537892",
"123456789864793152579218463248971635795632841316584297637825914981347526452169378",
"123456789684379215579128346435892167812637594796541832267983451948215673351764928",
"123456789756983421849217653687532194234891576915674832568349217491725368372168945",
"123456789576981234984723615741238956865149372392567148657394821219875463438612597",
"123456789586917342497283165875149623312865974964732851258691437631574298749328516",
"123456789894217356567389241736928415459631827281574963672895134315742698948163572",
"123456789876923514459781632265349871918672345734815926647298153592137468381564297",
"123456789695278431847391652719685243532914867486723915371849526254167398968532174",
"123456789496782351785391426867149235351627894249835617938564172514273968672918543",
"123456789485179362769823415846791253391542678257638941672915834914387526538264197",
"123456789569783142784291635412369578958127463376548291841635927697812354235974816",
"123456789694178523857329146471962358536784912289531674912645837745893261368217495",
"123456789946728315785139462834697251269514837571382946658273194497861523312945678",
"123456789847921365659873142435198627918267453762345918296534871371682594584719236",
"123456789659187432874923615961248573532671894487395126795862341346719258218534967",
"123456789794283516586971324672198453941635278835742691267319845418567932359824167",
"123456789458379162976821534761542398892137645534968217389715426247683951615294873",
"123456789657189324894237165519623847238741596476895213345912678781564932962378451",
"123456789798123465546978321365789142472531896819264537281395674934617258657842913",
"123456789584937261679821534496375812851642397237189456948763125712598643365214978",
"123456789965378214784129356692837541478591632351264897549682173237915468816743925",
"123456789846179235795382164362598417451723896987641352578914623234865971619237548",
"123456789678392541945187623786243915419765832352918467591634278867521394234879156",
"123456789574981623896327145945172836732869451681534297219645378458713962367298514",
"123456789685917324947832516534298671862371495791564238476129853259683147318745962",
"123456789576819243948732651659378124234691875781524936862145397417983562395267418",
"123456789574983162869217435987364251416592378235178694642835917751649823398721546",
"123456789854197362967832451472968135391245678685371294238719546549623817716584923",
"123456789859172463746938251634295178218764395597381624482517936375649812961823547",
"123456789748392156695871432314285697956734821872619345239168574581947263467523918",
"123456789576289134498173526289361475715842963364597218637915842852734691941628357",
"123456789879213564654879321367581492491732856285964173512648937746395218938127645",
"123456789846179325975832461652948173719365842384721956537694218291587634468213597",
"123456789875239641964178325641582973738941256259763418416325897397814562582697134",
"123456789986127354475839126258974613317265948649318275862743591591682437734591862",
"123456789476198532589372416617523948895741263234869157768915324341287695952634871",
"123456789574982316896173452347615298951827634682349175468791523219534867735268941",
"123456789698271354574398612761845293352967841849123567936784125487512936215639478",
"123456789459827316678139524264571938397284651581693247715368492836942175942715863",
"123456789564789312987123546479215638235864971816937425752391864391648257648572193",
"123456789459738261876912534794685312238147695615329847987264153541873926362591478",
"123456789479183526856279341764321958591864237238597164612738495387945612945612873",
"123456789945287316867913524718392645692845173354671892486139257279568431531724968",
"123456789648729135795318426954173862286594371371862594439685217567231948812947653",
"123456789975218364648397152369542871482761935751983246297634518836125497514879623",
"123456789849317562657982431295164378761538924384729156912675843478293615536841297",
"123456789475298613968173245754832961619547328832961574347619852586324197291785436",
"123456789957281436864379152389765241615842973742913865431628597276594318598137624",
"123456789478912635695837124567184293934625817812793456356278941249561378781349562",
"123456789645789231879321564716534892234978156958162473481695327567243918392817645",
"123456789679183425854927361382569174946271853517834296298345617465718932731692548",
"123456789849172365765839124698724531512963847437518692954687213276391458381245976",
"123456789954817263678392145587621394316974528249538617865143972492765831731289456",
"123456789645789132987321546231675894768194253594238617456917328319862475872543961",
"123456789796821453584739621972613548615984237438572916259168374361247895847395162",
"123456789547829613689731452894672531312945867765183924938264175271598346456317298",
"123456789796832514584791632438965271671324958259178463342587196867219345915643827",
"123456789546897321789321456698542137312678594457139862831264975965713248274985613",
"123456789569871243487923615942637158375148962618592374231785496896314527754269831",
"123456789846937512795128364519284673274613895638579241952761438361842957487395126",
"123456789659278413784319265392861574476592831815734692567143928938625147241987356",
"123456789695718243748932516254691378986347152317825964471269835839574621562183497",
"123456789946837512587192463471529638235648197869371254758964321692713845314285976",
"123456789675819234849372165481527693736194528592683471358261947217948356964735812",
"123456789468927153597381624276145398384269517951738462712593846845672931639814275",
"123456789867129534459873612615734928342985167798612453984361275576248391231597846",
"123456789679183524845927631532741968784569312961238457316894275457612893298375146",
"123456789584972136967138425631547892492681357875293641746829513359714268218365974",
"123456789468792351759318642371925468586134927942687135817563294695241873234879516",
"123456789765983142849712536251368497397124865486597213534879621618235974972641358",
"123456789478912536695387142861594273734128965952673418389745621546231897217869354",
"123456789685379214974128563841265397597843126362791458736912845419587632258634971",
"123456789475983261968217453596872134781364925342591678254639817819725346637148592",
"123456789985237461467981523519328674276514938348679152631792845854163297792845316",
"123456789867139254954278136379861425486527913215394867531942678648713592792685341",
"123456789658179423947823651276384915481295376395617842832761594769542138514938267",
"123456789954782631876391254789623415641579328235814976492135867567248193318967542",
"123456789784192653596873124315624978249718536867935412672589341431267895958341267",
"123456789859172346647398521982743165365219478714685932478921653596837214231564897",
"123456789746891253985723461562174398814639527379285146438912675291567834657348912",
"123456789847219356965837124214583697598674231736921845472365918351798462689142573",
"123456789459827136876391542964782351587613924231549867342978615718265493695134278",
"123456789968723541574918632735892164286147395419635278347281956692574813851369427",
"123456789549817236687932145762184953415329867398675421851293674976548312234761598",
"123456789658719243974832651597321468861594372342678195736185924489263517215947836",
"123456789986317254547928316478563192291874563365291847714635928659782431832149675",
"123456789985327461746981235578132694462598317391764528257619843614873952839245176",
"123456789895273614674189523358917246746328951219564378581632497932741865467895132",
"123456789859127634647398152468735291395214876712689543974861325536972418281543967",
"123456789958173624674829513249561837815397246367248195592614378781935462436782951",
"123456789975382641846197532357869124689241375214735968592674813731528496468913257",
"123456789478913256956872341249781635361295478587364912634128597892537164715649823",
"123456789498723516576918432712849365964531278385672941837195624649287153251364897",
"123456789549871326678239541962514837385967214714328965857642193491783652236195478",
"123456789875391624946728513398645172217839465564172938482567391759213846631984257",
"123456789546897123879312456495128637618739245732645891367584912281963574954271368",
"123456789958732614476918253241863597569174328837529461384295176792641835615387942",
"123456789964873125857219364578634912391782456246591837432968571685147293719325648",
"123456789486927153759183264645791832297538416318642975874369521562814397931275648",
"123456789697823154458197326586241973279365418314978265965714832841532697732689541",
"123456789597238614648719235361942578952871346874563921736194852489325167215687493",
"123456789687912534594738621715864293862593417439127865258379146341685972976241358",
"123456789698237541457198236372519864869724153541863972716945328935682417284371695",
"123456789569817342748293165285369471476125938931748526854932617397681254612574893",
"123456789964782153578139624619547832357218496842963517296875341435621978781394265",
"123456789495871263867239154672193548538764921941528376356947812784312695219685437",
"123456789756289134498731265569842371847913652231675948615328497972564813384197526",
"123456789867912543594783216245137968376829154918645372432561897781394625659278431",
"123456789567928413489317256634781925912534867875692341341869572298175634756243198",
"123456789658197243479382156892643571761925834534871962947238615315769428286514397",
"123456789847329651965718342538691427214873965796542813359164278472985136681237594",
"123456789748931256569827134957318462632549817814762593381294675275683941496175328",
"123456789867392451594718623456289317782134965931675248678921534219543876345867192",
"123456789756918243849327156932541678675832914481769325398175462567294831214683597",
"123456789948271635576398214857619342294837561361542897485923176619785423732164958",
"123456789975382614486971532541297863897635241362148975234769158759813426618524397",
"123456789467829351985173462714695823639218574852347916298764135341582697576931248",
"123456789967318524485792163652931847794685231318247695841563972236179458579824316",
"123456789569871243874392561237918456958643172416725398682537914741269835395184627",
"123456789485179326796328451918764235572813694364295817249537168851642973637981542",
"123456789598173462476829351845297136917638245362541897231985674754362918689714523",
"123456789568279143947138652651843297289761435374925816835617924712594368496382571",
"123456789856729314974381526698217435531694278742538961369842157217965843485173692",
"123456789569873421874192653392745168781269534645381972236514897917638245458927316",
"123456789854917362769283145678521493315649827492378516581762934237894651946135278",
"123456789876293514459817236741932865538764921692581473384125697967348152215679348",
"123456789967821543458793621319572468782964135546318972231645897874139256695287314",
"123456789549871263867932415712398654958164372634527891485613927296745138371289546",
"123456789479812536586937124864125973712369458395748261258691347641573892937284615",
"123456789694873521587912346458329617712568493369147852846231975275694138931785264",
"123456789847291653695378421216749538379685214458123976962837145781564392534912867",
"123456789598372641764819352487693215916528473352147968231784596849265137675931824",
"123456789549872613867913245296347851415628397378591426654789132931264578782135964",
"123456789847219653659837412512984367968173245734562891375641928286795134491328576",
"123456789854971623976328154268734915539612478741589362612843597385197246497265831",
"123456789475839162968172453892713546347965218651248937716324895584697321239581674",
"123456789586927314497183625835619247619274853742835196378542961264391578951768432",
"123456789684197532579382146237649851941825367865713924316574298752968413498231675",
"123456789879132564465978231237861495594723816681594372318645927946287153752319648",
"123456789948731526567982341481675293356298174279314865892163457615847932734529618",
"123456789759821346648739215512364978374598162896217453965172834287643591431985627",
"123456789694187325785923641936712458572864193418395276357648912869271534241539867",
"123456789574983126698172345985347261731268594462519873817695432249731658356824917",
"123456789796318524845792163354867291279134658618925437531679842982541376467283915",
"123456789758139264469782351672841935391527846584963172947315628235698417816274593",
"123456789748932561659817324815729436364581972972643815237195648491368257586274193",
"123456789589173642647829531362581974894762315715934826238645197451397268976218453",
"123456789458791263769823541834275196512964837697318425376582914245139678981647352",
"123456789687319254954287631231698475876541923549723816768134592392865147415972368",
"123456789495178362768239415217694538589713624346825971874961253651342897932587146",
"123456789498173652765982341354729816687315924912864537839641275271598463546237198",
"123456789867219354945738621316982475284375916579641832792563148638124597451897263",
"123456789784139265965827431419675328652348917837291654546913872278564193391782546",
"123456789897312456564897231479685312381279645256134897738561924612948573945723168",
"123456789498273615675189423384967152517342968269815374831724596952631847746598231",
"123456789894371265765289413972635841346718952581924637638597124459162378217843596",
"123456789895372146674819325941765832362148597587293461218637954456981273739524618",
"123456789847913562956827341684379125791265438235184976572631894418792653369548217",
"123456789859327416764198325386971542975284163412563897631742958548639271297815634",
"123456789769318542485927136548269317972183654316745928851672493297534861634891275",
"123456789856793124947182635479518263312967548568324917735241896284679351691835472",
"123456789796813524854927613678594132345162897219378465937641258481235976562789341",
"123456789896172534745389612672514893581937246439628157958263471367841925214795368",
"123456789947318526685927143819632457756149832432785961271864395364591278598273614",
"123456789469781523587329164398572641674198235251643897712834956945267318836915472",
"123456789845917632976823451281679543457138296639542817792385164564291378318764925",
"123456789859317462674289315947528136386791254512634978231965847768142593495873621",
"123456789846179325597823641935648172761532894284791536358214967479365218612987453",
"123456789654879231978312456342961578791285364586743192219637845867524913435198627",
"123456789457893162986721453764218395895347216312569874241685937638974521579132648",
"123456789857239416469178523385697241216345897974812635792581364538964172641723958",
"123456789746893251589721436692175348374982165815364927261539874458217693937648512",
"123456789458917263796283154365891427941572836872634915619348572537129648284765391",
"123456789749283651865917243316879524492561378587342916674135892238794165951628437",
"123456789948372516675981234587269341319845672264713895756134928891527463432698157",
"123456789584793261796128453879315642345672918261849537652981374917534826438267195",
"123456789795238164684971352271685493958314276436792815542167938819543627367829541",
"123456789875932416469781325218365974954278163736194258647513892592847631381629547",
"123456789794238516586791243659142378248367195371985624837624951462519837915873462",
"123456789549872631786319452671238945854791263392564178265187394437925816918643527",
"123456789468397251597821364285943176371268945649715823956172438734689512812534697"]

module.exports = solvedSudokus;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


const BoardSolver = __webpack_require__(4);
const Board = __webpack_require__(0);
const Tile = __webpack_require__(1);

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


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sudoku_hint_view_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sudoku_grid_view_js__ = __webpack_require__(5);




// chain inheritance explanations:
// 1) SudokuHintView extends from SudokuGridView
// 2) SudokuGridView extends from SudokuSelectLevelView
// 3) SudokuSelectLevelView extends from SudokuCalculateSolutionView


class SudokuView {
  constructor(game){
    this.SudokuHintView = new __WEBPACK_IMPORTED_MODULE_0__sudoku_hint_view_js__["a" /* default */](game);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SudokuView);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sudoku_grid_view_js__ = __webpack_require__(5);



class SudokuHintView extends __WEBPACK_IMPORTED_MODULE_0__sudoku_grid_view_js__["a" /* default */] {

  constructor(game){
    super(game);
    this.$displayHint = $(".display-hint");
    this.$displayHint.on("click", this.displayHint.bind(this));
  }


    updateHint(){
    const check = $(".display-hint").children().html();

      if(check === "Hide Hint"){
        let $ul = $(".hint");
        $ul.remove();
        this.buildHint();
      }
    }


    buildHint(){
      const $sudokuGrid = $(".sudoku-grid");
      let $ul = $("<ul></ul>");
      $ul.addClass("hint");
      for(let i = 1; i < 10; i++){
        let $li = $("<li></li>");
            $li.addClass("sudoku-grid-tile");
        let num = this.game.inputsVal[i];
        $li.html(`num${i} ${num}`)
        $ul.append($li);
      }
      $sudokuGrid.append($ul);
    }


  displayHint(event){
    const $a = $(event.currentTarget).children();

    this.handleHint($a.html());
      if($a.html() === "Display Hint"){
        $a.html("Hide Hint");
      } else {
        $a.html("Display Hint");
      }
  }

  handleHint(value){
     if(value === "Display Hint"){
       this.buildHint();
       this.buildCheckValuesButton();
     } else {
       let $ul = $(".hint");
       let $button =$(".check-values");
       $button.remove();
       $ul.remove()
     }
  }

// check value button methods:
// ( update the backgoung color tile in red if false input value)

  buildCheckValuesButton(){
    const $footer = $(".footer");
    let $button = $("<button></button>")
    $button.html("Check values");
    $button.addClass("check-values");
    $button.on("click", this.checkValues.bind(this));
    $footer.append($button);
  }

  checkValues(event){
    this.updateConflictValues();
    setTimeout(function(){
      let $liConflict = $(".conflict-value");
      $liConflict.removeClass("conflict-value");
    }, 3000);
  }

  updateConflictValues(){
    this.game.solution.forEach((line, row)=>{
      line.forEach((value, col)=> {
        let pos = [row, col];
        let boardVal= this.game.board.getTile(pos).val;
        if( boardVal !== 0 && boardVal !== value ){
          let $li = $(`.li-${row}-${col}`);
          $li.addClass("conflict-value");
        }
      });
    });
  }

  //method to update tile color backgroung (green) when an input is selected


    handleSelect(event){
      this.removeSelectedLis();
      const $li = $(event.currentTarget).parent();
      const col = $li.attr("class")[5];
      const $ul = $li.parent();
      const $liLines = $ul.children();
      $liLines.addClass("tile-selected");
      for(let index=0; index < 9; index++){
        const $li = $(".sudoku-grid").find(`.li-${index}-${col}`)
              $li.addClass("tile-selected");
      }
    }

    removeSelectedLis(){
      const $selectedLi = $(".tile-selected");
      if($selectedLi.length !== 0){
        $selectedLi.removeClass("tile-selected");
      }
    }

}

 /* harmony default export */ __webpack_exports__["a"] = (SudokuHintView);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sudoku_calculate_solution_view_js__ = __webpack_require__(13);



const Sudoku = __webpack_require__(3);

class SudokuSelectLevelView extends __WEBPACK_IMPORTED_MODULE_0__sudoku_calculate_solution_view_js__["a" /* default */] {

  constructor(game){
    super(game)
    this.$headerLevel = $(".header-level");
    this.$headerLevel.on("click", "li", this.selectLevel.bind(this));

  }

  // select level and create a new game event method:

  selectLevel(event){
    const content = $(event.currentTarget).text();

    switch(content){
      case "Super Easy":
        this.game = new Sudoku(15);
        break;
      case "Easy":
        this.game = new Sudoku(25);
        break;
      case "Medium":
        this.game = new Sudoku(35);
        break;
      case "Hard":
        this.game = new Sudoku(45);
        break;
      case "Super Hard":
        this.game = new Sudoku(55);
        break;
    }
    this.cleanAfterSelectLevel(event);

    // render() comes from SudokuGridView class.
    this.render(this.game.board.getValues());
    //
  }

  cleanAfterSelectLevel(event){
    const $ulHeaderLevel = $(event.currentTarget).parent();
    $ulHeaderLevel.addClass("no-display");
    this.cleanNoDisplayHeaderLevel();
    this.cleanHint()
  }

  cleanNoDisplayHeaderLevel(){
    setTimeout(function(){
      let $ul = $(".no-display");
      $ul.removeClass("no-display");
    }, 200);
  }

  cleanHint(){
    let $ulHint = $(".hint");
    let $button =$(".check-values");
    $button.remove();
    $ulHint.remove();
    let $li = $(".display-hint");
    $li.children().html("Display Hint");
  }

}

/* harmony default export */ __webpack_exports__["a"] = (SudokuSelectLevelView);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class SudokuCalculateSolutionView {

  constructor(game){
    this.game = game;
    this.$calculateSolution = $(".calculate-solution");
    this.$calculateSolution.on("click", this.calculateSolution.bind(this));
  }

  // calculateSolution of the grid event method:

  calculateSolution(){
    // render() comes from SudokuGridView class.
    this.render(this.game.solution);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (SudokuCalculateSolutionView);


/***/ })
/******/ ]);