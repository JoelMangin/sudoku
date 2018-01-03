
import SudokuGridView from "./sudoku_grid_view.js" ;

class SudokuHintView extends SudokuGridView {

  constructor(game){
    super(game);
    this.$displayHint = $(".display-hint");
    this.$displayHint.on("click", this.displayHint.bind(this));
  }


  updateHint(){
    const check = $(".display-hint").html();
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

 export default SudokuHintView;
