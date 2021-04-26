import React from "react"
import seeds, { seedFrom, matrixFrom } from "../life/seeds"
import Styled from "./board-grid.styles"
import { Button } from "../common"

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
 * @returns the remainder of a divided by b, in accordance with the Euclidean definition
 */
function mod(a, b) {
  return ((a % b) + b) % b
}

/** a map of (key=seed.name: val=seed) pairs for ease of access to each seed by its name */
const seedMap = Object.fromEntries(seeds.public.map(seed => [seed.name, seed]))


const BoardGrid = props => {
  // --------------------------------------
  // COMPONENT STATE
  // --------------------------------------

  /** the current generation of cells */
  const [current, setCurrent] = React.useState(null)

  /** the current dimension-size of our life grid */
  const [dim, setDim] = React.useState({ numRows: 0, numCols: 0 })
  const { numRows, numCols } = dim;

  /** the name of the selected seed */
  const [seed, setSeed] = React.useState(seeds.default.name)

  /** the rate at which to swap between generations (in milliseconds) */
  const [speed, setSpeed] = React.useState(1000) // default to 1 second

  /** true if our simulation is actively running */
  const [isRunning, setIsRunning] = React.useState(false)
  const stopPlaying = () => setIsRunning(false)
  const startPlaying = () => setIsRunning(true)

  /** true if our user has triggered a "clear" */
  const [isClearing, setIsClearing] = React.useState(false)

  /** true if our user has triggered a resize of rows or columns */
  const [isResizing, setIsResizing] = React.useState(false)

  // --------------------------------------
  // EFFECTS
  // --------------------------------------

  /** snags data from selected seed, sets relevant slices of state */
  React.useEffect(() => {
    const seedData = seedMap[seed]
    setDim({ numRows: seedData.numRows, numCols: seedData.numCols })
    setCurrent({ ...seedData.dict })
    return () => setIsClearing(false)
    // dep @isClearing -- b/c we'll reset to seed's data if user "clear"s
    // dep @seed --  selected seed. set state any time seed is changed
  }, [isClearing, seed])

  /** attempts to preserve as much data possible while resizing the column & rows of our grid */
  React.useEffect(() => {
    if (
      !isResizing
      || !current
      || Object.entries(current).length === 0
    ) {
      // this check prevents this effect from running on initial mount
      // and any time `current` changes without the user triggering a resize
      return // exit effect
    }

    const matrix = matrixFrom({ ...current });
    const copyMatrix = matrix.map(sub => [...sub])
    const diffRow = numRows - matrix.length
    const diffCol = numCols - matrix[0].length

    if (diffRow === 0 && diffCol === 0) {
      // if there isn't a difference in size,
      // then we most certainly shouldn't resize
      return // exit effect
    }

    for (let i = 0; i < Math.abs(diffRow); i++) {
      if (diffRow > 0) {
        copyMatrix.push(new Array(parseInt(numCols)).fill(0))
      } else {
        copyMatrix.pop()
      }
    }

    for (let i = 0; i < copyMatrix.length; i++) {
      for (let j = 0; j < Math.abs(diffCol); j++) {
        if (diffCol > 0) {
          copyMatrix[i].push(0);
        } else {
          copyMatrix[i].pop()
        }
      }
    }

    const { dict } = seedFrom(copyMatrix.map(sub => [...sub]))
    setCurrent(dict)

    return () => {
      setIsResizing(false)
    }
    // dep @numRows and @numCols -- we want to fire this effect whenever we resize the grid
    // dep @current -- effect depends on current 
    // dep @isResizing -- to determine when we're truly resizing rather than simply changing `current`
  }, [numRows, numCols, current, isResizing])


  /** memoized b/c generateNext will always return the same result given the same argument */
  const generateMemoized = React.useCallback(generateNext,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current])

  /** simulates life if the user has clicked "play" button */
  React.useEffect(() => {
    if (!isRunning) {
      // if simulation is not running
      return // exit effect
    }
    // step through each generation at the given `speed` (ms)
    const timer = setInterval(() => {
      setCurrent({ ...generateMemoized() })
    }, speed)
    // cleanup timer
    return () => clearInterval(timer)
    // dep @isRunning -- we want to run if isRunning changes
    // dep @generateMemoized -- the memoized `generateNext` fn
    // dep @speed -- the pace (in ms) at which we'd like to swap generations
  }, [isRunning, generateMemoized, speed])


  // --------------------------------------
  // UTILITIES
  // --------------------------------------

  /** given row and column coordinates, return the dictionary key format */
  const key = (i, j) => `${i}.${j}`
  /** given a key representation of a row, column location, return coordinate pair */
  const unKey = k => k.split(".")
  /** essentially a NOT operator for our 1 and 0 */
  const flip = entry => entry === 0 ? 1 : 0

  // --------------------------------------
  // HANDLERS
  // --------------------------------------

  /** toggle cell state at the given coordinates */
  function handleCellClick(i, j) {
    const k = key(i, j)
    setCurrent(prev => ({ ...prev, [k]: flip(prev[k]) }))
  }
  /** set the selected seed */
  function selectSeed(evt) {
    setSeed(evt.target.value)
  }
  /** updates dimension state and triggers the resize effect */
  function handleResize(evt) {
    const { name, value } = evt.target;
    setDim(prev => ({ ...prev, [name]: value }))
    setIsResizing(true)
  }

  // --------------------------------------
  // CORE FUNCTIONALITY FOR "Game of Life"
  // --------------------------------------


  /**
   * Finds all neighbor coordinates for the given cell.
   * If the cell resides on the edge of the board, their neighbors wrap 
   * to the other side of the board.
   * 
   * @param {int} i Index of sub-array where the relevant cell lives
   * @param {int} j Index of cell for which to find neighbors
   * @returns List of neighbor coordinates; edges of board wrap infinitely
   */
  function getNeighborCoords(i, j) {
    // coordinate pairs that have not yet been modulo-ed to wrap edge
    const noMod = [
      [i - 1, j - 1], // up left
      [i - 1, j],     // up 
      [i - 1, j + 1], // up right
      [i, j + 1],     // right
      [i + 1, j + 1], // down right
      [i + 1, j],     // down
      [i + 1, j - 1], // down left
      [i, j - 1],     // left
    ]
    // map through the neighbor coords and modulo each to wrap around the edge
    return noMod.map(([ni, nj]) => [mod(ni, dim.numRows), mod(nj, dim.numCols)])
  }

  /** counts the number of neighbor cells that are living for the given cell */
  function countLiveNeighbors(i, j) {
    return getNeighborCoords(i, j)
      .filter(([ni, nj]) => current[key(ni, nj)] !== 0)
      .length
  }

  /** generates the next layer of cells. */
  function generateNext() {
    // make a copy that does not reference the same place in memory
    const next = { ...current }
    // for each cell in the grid, apply the rules of life
    for (let i = 0; i < dim.numRows; i++) {
      for (let j = 0; j < dim.numCols; j++) {
        const k = key(i, j)
        const isAlive = current[k] !== 0
        const numLiveNeighbors = countLiveNeighbors(i, j)
        const hasTwo = numLiveNeighbors === 2
        const hasThree = numLiveNeighbors === 3
        // if the cell is alive and has 2-3 live neighbors, sustain life
        // if the cell is dead and has 3 live neighbors, become alive
        // otherwise, die or stay dead
        next[k] = (isAlive ? (hasTwo || hasThree) : hasThree) ? 1 : 0
      }
    }
    // return the next generation
    return next
  }

  /** swap our current generation with the next */
  function step() {
    setCurrent({ ...generateMemoized() })
  }

  // --------------------------------------
  // Render the following JSX
  // --------------------------------------
  return (
    <>
      <Styled.Page>
        <Styled.Board>
          {
            current &&
            <Styled.Grid num_col={dim.numCols} num_rows={dim.numRows}>
              {
                Object.entries(current)?.map(([k, value]) => {
                  const [i, j] = unKey(k)
                  return (
                    <Styled.Cell
                      key={k}
                      onClick={() => handleCellClick(i, j)}
                      active={value}
                    />
                  )
                }
                )
              }
            </Styled.Grid>
          }
        </Styled.Board>
        <Styled.Toolbar>
          <div className="toolbar--one">
            {
              isRunning
                ? <Button onClick={stopPlaying}>Stop</Button>
                : <Button onClick={startPlaying}>Play</Button>
            }
            <Button onClick={step}>Step</Button>
            <Button onClick={() => setIsClearing(true)}>Clear</Button>
          </div>
          <div className="toolbar--two">
            <div>
              <label htmlFor="seed">Seed:</label>
              <select name="seed" value={seed} onChange={selectSeed}>
                {seeds.public.map(({ name }) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="speed">Speed:</label>
              <input type="number" name="speed" value={speed} onChange={({ target: { value } }) => setSpeed(value)} />
            </div>
            <div>
              <label htmlFor="numRows">Rows:</label>
              <input type="number" name="numRows" value={dim.numRows} onChange={handleResize} />
            </div>
            <div>
              <label htmlFor="numCols">Columns:</label>
              <input type="number" name="numCols" value={dim.numCols} onChange={handleResize} />
            </div>
          </div>
        </Styled.Toolbar>
      </Styled.Page>
    </>
  )
};


export default BoardGrid
