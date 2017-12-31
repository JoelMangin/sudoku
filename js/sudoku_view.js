const Sudoku = require("./sudoku.js")

// purpose of this class:
  // 1) Set a new grid build with <ul> and <li>
  // 2) create all the events of the game and menu

class SudokuView {
  constructor(rootEl, game){
    this.$el = $(rootEl);
    this.game = game;

    this.$headerLevel = $(".header-level");
    this.$headerLevel.on("click", "li", this.selectLevel.bind(this));

    this.$calculateSolution = $(".calculate-solution");
    this.$calculateSolution.on("click", this.calculateSolution.bind(this));

    this.$displayHint = $(".display-hint");
    this.$displayHint.on("click", this.displayHint.bind(this));

    this.initiatePage();
    this.$inputs = $(".sudoku-grid input[type= text]");
    this.$inputs.change(this.handleChange.bind(this));

    this.$inputs.on("click", this.handleSelect.bind(this));
  }

  initiatePage(){
    const $sudokuGrid = $(".sudoku-grid");
    this.game.board.getValues().forEach( (line, row) => {
      let $ul = $("<ul></ul>");
      line.forEach( (value, col)=> {
        let $li = $("<li></li>");
        $li.addClass(`li-${row}-${col}`);
        $li.addClass('sudoku-grid-tile');
          if(value !==0 ){
            $li.append(`${value}`);
            $li.addClass("tile-blocked");
          } else{
            let $input = $("<input></input>");
                $input.attr("type", "text");
                $input.attr("value", "");
            $li.append($input);
          }
        $ul.append($li);
      })
      $sudokuGrid.append($ul);
    })
  }


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
    this.render(this.game.board.getValues());

  }

  calculateSolution(){
    this.render(this.game.solution);
  }

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
  }


  handleChange(event){
    let $input = $(event.target);
    let className = $input.parent().attr("class");
    let pos = this.getPos(className);

    let previousVal = this.game.board.getTile(pos).val;
    let value = parseInt($input.val());
    this.updateInputsVal(previousVal, value);

    this.game.board.updateVal(pos, value);
    this.updateHint();

    if(this.game.board.solved()){
      this.printWinMessage();
    }
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

  handleSelect(event){
    const $selectedLi = $(".tile-selected");
    if($selectedLi.length !== 0){
      this.removeSelectedClass();
    }
    const $li = $(event.currentTarget).parent();
    const col = $li.attr("class")[5];
    const $ul = $li.parent();
    const $liLines = $ul.children();
    $liLines.addClass("tile-selected");
    const $liCol = [];
    for(let index=0; index < 9; index++){
      const $li = $(".sudoku-grid").find(`.li-${index}-${col}`)
            $li.addClass("tile-selected");
    }
  }

  removeSelectedClass(){
    const $selectedLi = $(".tile-selected");
    $selectedLi.removeClass("tile-selected");
  }

  getPos(className){
    let x = parseInt(className[3]);
    let y = parseInt(className[5]);
    return [x, y];
  }

  printWinMessage(){
    alert("Well played! You finished the grid!");
  }

  cleanDisplay(){
    let $ul = $(".hint");
    $ul.remove();
    let $li = $(".display-hint");
    $li.html("Display Hint");
  }

  render(grid){
    this.cleanDisplay();

    grid.forEach((line, row)=> {
      line.forEach((value, col) => {
        let $li = $(`.li-${row}-${col}`);
        $li.removeClass("tile-blocked");
        $li.removeClass("tile-selected");
        $li.html('');
        if(value !== 0 ){
          $li.html(`${value}`);
          $li.addClass("tile-blocked");
        } else{
          let $input = $("<input></input>");
              $input.attr("type", "text");
              $input.attr("value", "");
              $input.change(this.handleChange.bind(this));
              $input.on("click", this.handleSelect.bind(this));
          $li.append($input);
        }
      })
    })

  }

}

module.exports = SudokuView;
