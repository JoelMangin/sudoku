
import SudokuCalculateSolutionView from "./sudoku_calculate_solution_view.js"

const Sudoku = require("./../game/sudoku.js");

class SudokuSelectLevelView extends SudokuCalculateSolutionView {

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
  }

  cleanAfterSelectLevel(event){
    const $ulHeaderLevel = $(event.currentTarget).parent().parent();

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
    $li.children().html("Display Hint");
  }

}

export default SudokuSelectLevelView;
