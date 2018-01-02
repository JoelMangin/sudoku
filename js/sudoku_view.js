const Sudoku = require("./game/sudoku.js");

// purpose of this class:
  // 1) Set a new grid build with <ul> and <li>
  // 2) create all the events of the game and menu

class SudokuView {
  constructor(game){
    this.game = game;

    this.setHeaderEvents();
    this.$displayHint = $(".display-hint");
    this.$displayHint.on("click", this.displayHint.bind(this));

    this.buildGrid();
    this.setGridEvents();
  }

  setHeaderEvents(){
    this.$headerLevel = $(".header-level");
    this.$headerLevel.on("click", "li", this.selectLevel.bind(this));
    this.$calculateSolution = $(".calculate-solution");
    this.$calculateSolution.on("click", this.calculateSolution.bind(this));
  }

  // select level event method:

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
    this.render(this.game.board.getValues());
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
    }, 150);
  }

  cleanHint(){
    let $ulHint = $(".hint");
    let $button =$(".check-values");
    $button.remove();
    $ulHint.remove();
    let $li = $(".display-hint");
    $li.html("Display Hint");
  }

  // calculateSolution of the grid event method:

  calculateSolution(){
    this.render(this.game.solution);
  }

  // build Grid method:

  buildGrid(){
    const $sudokuGrid = $(".sudoku-grid");
    this.game.board.getValues().forEach( (line, row) => {
      let $ul = $("<ul></ul>");
      this.buildLis(line, $ul, row);
      $sudokuGrid.append($ul);
    })
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

  // set all the events on the grid

  setGridEvents(){
    this.$inputs = $(".sudoku-grid input[type= text]");
    this.$inputs.change(this.handleChange.bind(this));
    this.$inputs.on("click", this.handleSelect.bind(this));
  }

  // change color of li(s) event according to which input is selected by the user (handleSelect)

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

//method to handle user inputs on the grid: handleChange event

    handleChange(event){
      let $input = $(event.target);
      let className = $input.parent().attr("class");
      let pos = this.getPos(className);

      let previousVal = this.game.board.getTile(pos).val;
      let value = parseInt($input.val());
      this.updateInputsVal(previousVal, value);
          value = value !== value ? 0 : value;
      this.game.board.updateVal(pos, value);
      this.updateHint();
      this.game.board.solved() ? this.printWinMessage() : false;

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

    updateHint(){
      const check = $(".display-hint").html();
      if(check === "Hide Hint"){
        let $ul = $(".hint");
        $ul.remove();
        this.buildHint();
      }
    }

    printWinMessage(){
      alert("Well played! You finished the grid!");
    }


// method to display the Hint event:

  displayHint(event){
    const $li = $(event.currentTarget);
    this.handleHint($li.html());
      if($li.html() === "Display Hint"){
        $li.html("Hide Hint");
      } else {
        $li.html("Display Hint");
      }
  }

  handleHint(value){
     if(value === "Display Hint"){
       this.buildHint();
     } else {
       let $ul = $(".hint");
       let $button =$(".check-values");
       $button.remove();
       $ul.remove()
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
    this.buildCheckValuesButton();
  }

  buildCheckValuesButton(){
    const $footer = $(".footer");
    let $button = $("<button></button>")
        $button.html("Check values");
        $button.addClass("check-values");
        $button.on("click", this.checkValues.bind(this));
        $footer.append($button);
  }

  // methods for checkvalues event

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
            console.log([value, boardVal]);
            let $li = $(`.li-${row}-${col}`);
            $li.addClass("conflict-value");
          }
        });
      });
    }


  // methods to render an existing grid coming from the SelectLevel method:

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
            $input.on("click", this.handleSelect.bind(this));
        $li.append($input);
      }
    })
  }

}

module.exports = SudokuView;
