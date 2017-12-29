const Sudoku = require("./sudoku.js")

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
    this.$inputs.on("input", this.handleChange.bind(this));
  }

  initiatePage(){
    const $sudokuGrid = $(".sudoku-grid");
    this.game.board.getValues().forEach( (line, row) => {
      let $ul = $("<ul></ul>");
      line.forEach( (value, col)=> {
        let $li = $("<li></li>");
          if(value !==0 ){
            $li.append(`${value}`);
            $li.css("background-color", "#CCC");
          } else{
            let $input = $("<input></input>");
                $input.attr("type", "text");
                $input.attr("value", "");
            $li.append($input);
          }
        $li.addClass(`li-${row}-${col}`);
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
    if(previousVal !== 0){
      this.game.inputsVal[previousVal] += 1
    }
    this.game.inputsVal[value] -= 1;
  }

  updateHint(){
    const check = $(".display-hint").html();
    if(check === "Hide Hint"){
      let $ul = $(".hint");
      $ul.remove();
      this.buildHint();
    }
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

        $li.css("background-color", "#F3F3F3");
        $li.html('');
        if(value !== 0 ){
          $li.html(`${value}`);
          $li.addClass("blocked");
          $li.css("background-color", "#CCC");
        } else{
          let $input = $("<input></input>");
              $input.attr("type", "text");
              $input.attr("value", "");
              $input.bind("input", this.handleChange.bind(this));
          $li.append($input);
        }
      })
    })

  }

}

module.exports = SudokuView;
