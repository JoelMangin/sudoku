

class Tile {
  constructor(val, blocked = true){
    this.val = val;
    this.blocked =  val === null ? false : blocked ;
    this.marks = [];
  }
}

module.exports = Tile;
