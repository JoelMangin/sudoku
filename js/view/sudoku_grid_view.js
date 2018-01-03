
import SudokuSelectLevelView from "./sudoku_select_level_view.js"

class SudokuGridView extends SudokuSelectLevelView {

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


export default SudokuGridView;
