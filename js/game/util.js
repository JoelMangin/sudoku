import Tile from "./tile.js";

// purpose of this class:
// set of method created and use through all the different classes of the game


const Util = {

  merge: (left, right) => {
                            const merged = [];
                            while (left.length > 0 && right.length > 0) {
                              let nextItem = (left[0] < right[0]) ? left.shift() : right.shift();
                              merged.push(nextItem);
                            }

                            return merged.concat(left, right);

                          },

  mergeSort: (arr) =>     {
                           if (arr.length < 2) {
                              return arr;
                            } else {

                              const middle = Math.floor(arr.length / 2);
                              const left = Util.mergeSort(arr.slice(0, middle));
                              const right = Util.mergeSort(arr.slice(middle));

                              return Util.merge(left, right);
                            }
                           },

  uniq: (arr) =>           {
                              var hash = {}, uniq = [];
                              for ( let i = 0; i < arr.length; i++ ) {
                                  if ( !hash.hasOwnProperty(arr[i]) ) {
                                      hash[ arr[i] ] = true;
                                      uniq.push(arr[i]);
                                    }
                                  }
                              return uniq;
                            },

  similar: (arr1, arr2) =>  {
                             arr1.forEach((val, index)=> {
                                if(arr2[index] !== val){
                                  return false;
                                }
                              })
                              return true;
                            },

  transpose: (grid) =>      {
                              const newGrid = [];
                              grid.forEach((line, rowIdx) => {
                                let newRow = [];
                                line.forEach((val, colIdx)=> {
                                  newRow.push(grid[colIdx][rowIdx])
                                })
                                newGrid.push(newRow);
                              })
                              return newGrid;
                            },

  flatten: (arr) =>         {
                              let result = [];
                              arr.forEach( el => {
                                if( el instanceof Array){
                                  result = result.concat(Util.flatten(el))
                                }  else {
                                  result.push(el)
                                }
                              })
                              return result;
                            },

  deepDup: (grid) =>        {
                              let newGrid = [];
                              grid.forEach(line => {
                                let newLine = [];
                                line.forEach(tile => {
                                  let val = tile.val;
                                  let blocked = tile. blocked;
                                  let newTile = new Tile(val, blocked);
                                  newLine.push(newTile);
                                })
                                newGrid.push(newLine);
                              })
                              return newGrid;
                            },

  randomPos: (val) =>       {
                              const row = Math.floor(val * Math.random());
                              const col = Math.floor(val * Math.random());
                              return [row, col];
                            },

  deleteVal: (arr, val) =>  {
                              let index = arr.indexOf(val);
                                if(index !== -1){
                                  arr.splice(index, 1);
                                }
                            },

  shuffle: (arr) =>         {
                                let count = arr.length;
                                while (count > 0) {

                                    let index = Math.floor(Math.random() * count);
                                    count--;

                                    let temp = arr[count];
                                    arr[count] = arr[index];
                                    arr[index] = temp;
                                }
                                return arr;
                            },

   update: (positions1, positions2) => {
                                          let result = [];
                                          let hash = {};

                                           positions2.forEach(pos2 => {
                                             hash[`${pos2}`] = true;
                                           });

                                           positions1.forEach(pos1 => {
                                             if(!hash[`${pos1}`]){
                                              result.push(pos1);
                                             }
                                           });
                                           return result;
                                        }
}

let positions1 = [[0,0], [1,2]];


export default Util;
