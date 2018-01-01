
// purpose of this class:
// Well it s a tile object which hold three characteristics:
  //  1) tile is blocked (meaning we can t change the value of the tile)
  //  2) the value of the tile
   // 3) possible values of this tile according to the grid (this.marks)

class Tile {
  constructor(val, blocked = true){
    this.val = val;
    this.blocked =  val === null ? false : blocked ;
    this.marks = [];
  }
}

module.exports = Tile;
