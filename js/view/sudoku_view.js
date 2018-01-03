
import SudokuHintView from "./sudoku_hint_view.js";
import SudokuGridView from "./sudoku_grid_view.js";

class SudokuView {

  constructor(game){
    this.SudokuHintView = new SudokuHintView(game);
  }

}

export default SudokuView;