

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

export default SudokuCalculateSolutionView;
