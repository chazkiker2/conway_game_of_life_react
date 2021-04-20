/** Game of Life */

const mod = (a, b) => ((a % b) + b) % b;

export class Generation {
  constructor(...args) {
    this.storage = new Array(...args);
    this.currentGen = [...this.storage];
  }

  hasLife() {
    for (const sub_array in this.storage) {
      if (sub_array.includes(1)) {
        return true
      }
    }
    return false
  }

  getNeighborCoords(i, j) {
    const M = this.currentGen.length;
    const N = this.currentGen[0].length;
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
    return Object.values(original).map(([ni, nj]) => [mod(ni, M), mod(nj, N)]);
  }

  countLiveNeighbors(i, j) {
    return Array.from(this.getNeighborCoords(i, j)).filter(([ni, nj]) => this.currentGen[ni][nj] !== 0).length;
  }

  generateSuccessor() {
    this.currentGen = this.deepCopy();
    for (let i = 0; i < this.currentGen.length; i++) {
      for (let j = 0; j < this.currentGen[i].length; j++) {
        const isAlive = this.currentGen[i][j] !== 0;
        const numLiveNeighbors = this.countLiveNeighbors(i, j);
        const hasTwo = numLiveNeighbors === 2;
        const hasThree = numLiveNeighbors === 3;
        this.storage[i][j] = (isAlive ? (hasTwo || hasThree) : hasThree) ? 1 : 0
      }
    }
  }

  printTable(msg = undefined) {
    console.groupCollapsed(msg);
    console.table(this.storage);
    console.groupEnd();
  }

  live() {
    this.printTable("SEED GENERATION");
    let lastSelf = this.deepCopy();
    let frameCount = 1;
    let stuck = false;

    while (!stuck && frameCount < 250) {
      this.generateSuccessor();
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

  equals(a, b = undefined) {
    if (!b) {
      b = this.storage;
    }
    if (a === b) {
      return true
    }
    return a.length === b.length &&
      a.every((v, i) => v.every((v2, i2) => v2 === b[i][i2]));
  }

  deepCopy() {
    return this.storage.map(sub => [...sub]);
  }

}

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
  gen.live();
}
