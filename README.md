# Sudoku (HTML5, CSS, ES6, responsive design, jQuery)

## Description:

Here you will find a sudoku game i designed entirely alone from scratch. [Living demo](https://joelmangin.github.io/sudoku/)

  The existing_sudoku folder provide a set of sudoku grid already solved (form: "12342323 etc..."). So why did i choose to implement a sudoku solver if i already have access to solved grid? Because this is fun...( Of course if we wants to optimize the game, it's way faster to display a grid already solved than calculating the solution...). I hope you will enjoy the game! :+1:

 ## Responsive Design  

  - Media queries
  - Flex

 ## Browser compatibility

  Due to the fact that i used Es6, this game is not supported by Internet Explorer...
  It should be fine on the others browser though !

 ## Arctitecture

The game hierachy is defined as follow:

  * css/
  * existing_sudoku/
  * images/
  * js/
  * index.html

 ## List of functionalities


  - Different level of difficulty available:
    - Super Easy ( 15 free spot )
    - Easy ( 25 free spot )
    - medium ( 35 free spot )
    - Hard (45 free spot )
    - Super Hard ( 55 free spot )
    - Nightmare ( 65 free spot )
    - Demo Solver ( 77 free spot: you can do it! )

  - Display Hint:
    You can check the value you already put in the grid by clicking on the check values button. If there is any wrong  inputs based on the calculated solution, it will display the square in red for 3 sec. Display grid also provide a line helper which count the number of number 1, number 2 etc... still available on the current grid.

  - Calculate Solution:
   Provide the solution of the current grid.

  - View helper:
    Display line and colums in green according to the current square selected.

  - Reduced user inputs:
    You can put only numbers between 1 and 9 on squares.

  - Game adapt according to screen size.

  - Designed a solver which is running everytime you load a new grid.

  - Build a menu.


   Feel Free to copy my code, but don't forget to add where it comes from! Thanks!
