
export function createEmpty(rows, columns) {
  const out = new Array(rows)
  for (let i = 0; i < rows; i++) {
    out[i] = new Array(columns).fill(0)
  }
  return out;
}

export function dictFrom(matrix) {
  const dict = {}
  matrix.forEach((row, i) => row.forEach((cell, j) => dict[`${i}.${j}`] = cell))
  return dict;
}

export function matrixFrom(dict) {
  const deKey = k => k.split(".").map(num => parseInt(num))
  const key = (i, j) => `${i}.${j}`

  let maxI = -1;
  let maxJ = -1;

  for (const k in dict) {
    const [i, j] = deKey(k);
    maxI = Math.max(maxI, i)
    maxJ = Math.max(maxJ, j)
    if (isNaN(maxJ) || isNaN(maxI)) console.log({ i, j, k, s: k.split(".").map(num => parseInt(num)) })
  }

  if (maxI === -1) {
    return []
  } else if (maxJ === -1) {
    return new Array(maxI).fill(0)
  }

  const matrix = createEmpty(maxI + 1, maxJ + 1)
  for (let i = 0; i < maxI; i++) {
    for (let j = 0; j < maxJ; j++) {
      const val = dict[key(i, j)]
      matrix[i][j] = val
    }
  }

  return matrix

}

export function seedFrom(matrix) {
  return {
    matrix,
    dict: dictFrom(matrix),
    numRows: matrix.length,
    numCols: matrix[0].length
  }
}

const infinite1 = seedFrom(
  [
    // 8 rows x 10 columns
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
)
infinite1.name = "Infinite 1";

const infinite2 = seedFrom(
  [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]
)
infinite2.name = "Infinite 2"

// 6 rows by 6 columns
const toad = seedFrom([
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
])
toad.name = "Toad"

const pulsar = seedFrom(
  // 17 rows x 17 columns
  [
    //, 1, 2, 3, 4, 5, 6, 7, X, 9, 0, 1, 2, 3, 4, 5, 6
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 0  */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 1  */
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 2  */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 3  */
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], /* 4  */
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], /* 5  */
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], /* 6  */
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 7  */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 8  */
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 9  */
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], /* 10 */
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], /* 11 */
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], /* 12 */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 13 */
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 14 */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 15 */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 16 */
  ]
)
pulsar.name = "Pulsar"


// 18 rows x 11 col
const iColumn = seedFrom(
  [
    //, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 0  */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 1  */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 2  */
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 3  */
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], /* 4  */
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], /* 5  */
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 6  */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 7  */
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 8  */
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 9  */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 10 */
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 11 */
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], /* 12 */
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], /* 13 */
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 14 */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 15 */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 16 */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 17 */
  ],
)
iColumn.name = "I-Column"

const def = seedFrom(createEmpty(25, 25))
def.name = "DEFAULT"


const seeds = {
  protected: [
    infinite1,
    infinite2,
  ],
  public: [
    def,
    pulsar,
    toad,
    iColumn,
  ],
  default: def,
}


export default seeds
