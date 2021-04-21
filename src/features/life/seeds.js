
function createEmpty(rows, columns) {
  return new Array(rows).fill(new Array(columns).fill(0));
}

function dictFrom(matrix) {
  const dict = {}
  matrix.forEach((row, i) => row.forEach((cell, j) => dict[`${i}.${j}`] = cell))
  return dict;
}

function seedFrom(matrix) {
  return {
    matrix,
    dict: dictFrom(matrix),
    m: matrix.length,
    n: matrix[0].length
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
    // 0, 1, 2, 3, 4, 5, 6, 7, X, 9, 0, 1, 2, 3, 4, 5, 6
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
const i_column = seedFrom(
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
i_column.name = "I-Column"

const def = createEmpty(25, 25)
def.name = "DEFAULT"

const data = {
  infinite1,
  infinite2,
  pulsar,
  toad,
  i_column,
  default: def,
}

export default data
