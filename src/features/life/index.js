/** Game of Life */


/**
 * Modulo operator that follows Python's functionality rather than JS
 * This will be used to organize edge-overflow for cellular neighbors
 * on the Life Board
 * 
 * JS:        -1 % 5 = -1
 * Python:    -1 % 5 = 4
 * mod:       mod(-1, 4) = 4
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns 
 */
const mod = (a, b) => ((a % b) + b) % b;


/**
 * Contains the logic and functionality to run Conway's "Game of Life".
 */
export class Generation {

  /**
   * Constructor method for Generation class
   * @param  {...any} args The seed data for this generation. 
   * Can take any shape that an Array constructor consumes
   */
  constructor(...args) {
    this.current = new Array(...args);
    this.next = [...this.current];
    this.m = this.current.length;
    this.n = this.current[0].length;
  }

  //======================================= 
  // UTILITY FUNCTIONS 
  //======================================= 

  /** checks whether there are any living cells in the life board */
  hasLife() {
    for (const sub_array of this.current) {
      if (sub_array.includes(1)) { return true }
    }
    return false
  }

  /** prints the table out to the console */
  printTable(msg = undefined) {
    console.groupCollapsed(msg);
    console.table(this.next);
    console.groupEnd();
  }

  equals(a, b = undefined) {
    if (!b) {
      b = this.next;
    }
    if (a === b) {
      return true
    }
    return a.length === b.length &&
      a.every((v, i) => v.every((v2, i2) => v2 === b[i][i2]));
  }

  /**
   * Creates a deep copy of 
   * @returns a copy of the nested array without references
   */
  deepCopy() {
    return this.next.map(sub => [...sub]);
  }

  /**
   * Finds all neighbor coordinates for the given cell.
   * If the cell resides on the edge of the board, their neighbors wrap 
   * to the other side of the board.
   * 
   * @param {int} i Index of sub-array where the relevant cell lives
   * @param {int} j Index of cell for which to find neighbors
   * @returns List of neighbor coordinates; edges of board wrap infinitely
   */
  getNeighborCoords(i, j) {
    // the keys here are just for other developers to understand
    // how the indices are laid out
    const original = {
      upLeft: [i - 1, j - 1],
      up: [i - 1, j],
      upRight: [i - 1, j + 1],
      right: [i, j + 1],
      downRight: [i + 1, j + 1],
      down: [i + 1, j],
      downLeft: [i + 1, j - 1],
      left: [i, j - 1],
    };

    // `mod` function matches the functionality of Python's modulo operator.
    return Object.values(original).map(([ni, nj]) => [mod(ni, this.m), mod(nj, this.n)]);
  }

  /** counts the number of neighbor cells are living for the given cell */
  countLiveNeighbors(i, j) {
    return this.getNeighborCoords(i, j)
      .filter(([ni, nj]) => this.current[ni][nj] !== 0)
      .length;
  }


  //======================================= 
  // MAIN FUNCTIONALITY
  // =======================================

  /** generates the next layer of cells. */
  generateNext() {
    this.current = this.deepCopy();
    for (let i = 0; i < this.current.length; i++) {
      for (let j = 0; j < this.current[i].length; j++) {
        const isAlive = this.current[i][j] !== 0;
        const numLiveNeighbors = this.countLiveNeighbors(i, j);
        const hasTwo = numLiveNeighbors === 2;
        const hasThree = numLiveNeighbors === 3;
        this.next[i][j] = (isAlive ? (hasTwo || hasThree) : hasThree) ? 1 : 0
      }
    }
  }

  /** 
   * carries out a complete lifecycle from seed to death. 
   * 
   * The loop is killed if:
   * 1. we repeat the same frame twice in a row, as that would result in an infinite loop
   * 2. we surpass 250 frames. (though this facet is temporary)
   */
  live() {
    this.printTable("SEED GENERATION");
    let lastSelf = this.deepCopy();
    let frameCount = 1;
    let stuck = false;

    while (!stuck && frameCount < 250) {
      this.generateNext();
      this.printTable(`GENERATION ${frameCount}`);
      if (this.equals(lastSelf)) {
        stuck = true;
        break;
      }
      lastSelf = this.deepCopy();
      frameCount++;
    }
    if (stuck) {
      this.printTable("STUCK AT THIS FRAME");
    } else if (frameCount === 250) {
      console.log("CAPPING OFF FRAMES AT 250");
    } else {
      this.printTable("NO LIFE TO CONTINUE");
    }
  }

  /**
   * Memoize a game of life given the starting point, stopping point, and step factor
   * @param {int} start (optional) the starting time frame (defaults to 0)
   * @param {int} stop (required) the stopping time frame (must be provided)
   * @param {int} step (optional) the step between each (defaults to 1)
   * @returns A memoized cache of the life board at each time in the 
   * range specified by our three arguments
   */
  memoize(start, stop, step) {
    // this switch organizes our array of arguments
    // to match Python's range(start:stop:step) API
    switch (arguments.length) {
      case 0:
        // if no arguments given, throw 
        throw new Error('cannot memoize without at least a stopping point... life could last a while');
      case 1:
        // if one argument, prioritize stop and default start to  0, default step to 1
        start = 0;
        stop = arguments[0];
        step = 1;
        break;
      case 2:
        // if two args, prioritize start & stop (in that order) and default step to 1
        start = arguments[0];
        stop = arguments[1];
        step = 1;
        break;
      case 3:
        // if two args, prioritize start & stop (in that order) and default step to 1
        [start, stop, step] = arguments
        break;
      default:
        // if we're here, somebody misused our arguments...
        // we'll try to use em but if shit goes down we'll toss that error at their feet
        try {
          [start, stop, step] = arguments.slice(0, 3);
        } catch (e) {
          throw new Error('invalid arguments given')
        }
    }

    let lastSelf = this.deepCopy();
    let frameCount = 0;
    const cache = {
      start: lastSelf,
    };

    while (frameCount < stop) {
      this.generateNext();
      if (this.equals(lastSelf)) {
        // if our current frame matches our last frame then we'd infinitely loop forever
        // so just fill the rest of the cache up now without calculating again
        for (let i = frameCount; i < stop; i++) {
          cache[i] = lastSelf;
        }
        // and stop looping; we've filled our whole cache
        break;
      }
      // otherwise, continue with the life cycle
      lastSelf = this.deepCopy();
      cache[frameCount] = lastSelf;
      frameCount++;
    }
    // here's where we'll really use their range arguments. we needed to calculate each frame 
    // of life to get to the stopping point, but our user only cares about whatever they specified.
    const scoped_cache = {};
    for (let i = start; i < stop; i += step) {
      scoped_cache[i] = cache[i];
    }
    return scoped_cache;
  }
}

/** a function for manual testing  */
export function main() {
  const seeds = {
    0: [
      [0, 0, 1],
      [0, 1, 1],
      [0, 0, 1],
    ],
    1: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  }

  const gen = new Generation(...seeds[1]);
  const res = gen.memoize(5, 20, 4);
  console.log(res);
}
