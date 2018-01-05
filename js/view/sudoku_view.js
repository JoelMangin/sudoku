
import SudokuHintView from "./sudoku_hint_view.js";
import SudokuGridView from "./sudoku_grid_view.js";

// chain inheritance explanations:
// 1) SudokuHintView extends from SudokuGridView
// 2) SudokuGridView extends from SudokuSelectLevelView
// 3) SudokuSelectLevelView extends from SudokuCalculateSolutionView

class SudokuView {
  constructor(game){
    this.SudokuHintView = new SudokuHintView(game);
  }
}

export default SudokuView;
