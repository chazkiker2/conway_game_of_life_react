import React from "react"
import seeds, { seedFrom, matrixFrom } from "../life/seeds"
import Styled from "./board-grid.styles"
import { Button } from "../common"

function mod(a, b) {
  return ((a % b) + b) % b
}

function arr_eq(a, b) {
  if (a === b) {
    return true;
  }
  return a.length === b.length &&
    a.every((v, i) => v.every((v2, i2) => v2 === b[i][i2]))
}

const seedMap = Object.fromEntries(seeds.public.map(seed => [seed.name, seed]))


const BoardGrid = props => {
  // COMPONENT STATE
  const [current, setCurrent] = React.useState(null)
  const [dim, setDim] = React.useState({ num_rows: 0, num_cols: 0 })
  const { num_rows, num_cols } = dim;
  const [playing, setPlaying] = React.useState(false)
  const [clear, setClear] = React.useState(false)
  const [seed, setSeed] = React.useState(seeds.default.name)
  const [speed, setSpeed] = React.useState(1000) // default to 1 second
  const [isResizing, setIsResizing] = React.useState(false);
  const stopPlaying = () => setPlaying(false)
  const startPlaying = () => setPlaying(true)

  // EFFECTS
  React.useEffect(() => {
    const { dict, num_rows, num_cols } = seedMap[seed]
    setDim({ num_rows, num_cols })
    setCurrent({ ...dict })
    return () => setClear(false)
  }, [clear, seed])

  React.useEffect(() => {
    if (
      !isResizing
      || !current
      || Object.entries(current).length === 0
    ) {
      return
    }

    const matrix = matrixFrom({ ...current });
    const copy_matrix = matrix.map(sub => [...sub])
    const diff_row = num_rows - matrix.length
    const diff_col = num_cols - matrix[0].length

    if (diff_row === 0 && diff_col === 0) {
      return
    }

    for (let i = 0; i < Math.abs(diff_row); i++) {
      if (diff_row > 0) {
        copy_matrix.push(new Array(parseInt(num_cols)).fill(0))
      } else {
        copy_matrix.pop()
      }
    }

    for (let i = 0; i < copy_matrix.length; i++) {
      for (let j = 0; j < Math.abs(diff_col); j++) {
        if (diff_col > 0) {
          copy_matrix[i].push(0);
        } else {
          copy_matrix[i].pop()
        }
      }
    }

    const { dict } = seedFrom(copy_matrix.map(sub => [...sub]))
    debugger
    setCurrent(dict)
    return () => {
      setIsResizing(false)
    }
  }, [num_rows, num_cols, current, isResizing])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateMemoized = React.useCallback(generateNext, [current])

  React.useEffect(() => {
    if (!playing) {
      return
    }
    const timer = setInterval(() => {
      setCurrent({ ...generateMemoized() })
    }, speed)
    return () => clearInterval(timer);
  }, [playing, generateMemoized, speed])

  // UTILITIES
  const key = (i, j) => `${i}.${j}`
  const unKey = k => k.split(".")
  const flip = entry => entry === 0 ? 1 : 0

  // HANDLERS
  function handleCellClick(i, j) {
    const k = key(i, j)
    setCurrent(prev => ({ ...prev, [k]: flip(prev[k]) }))
  }

  function selectSeed(evt) {
    const { value } = evt.target;
    setSeed(value)
  }

  function handleResize(evt) {
    const { name, value } = evt.target;
    setDim(prev => ({ ...prev, [name]: value }))
    setIsResizing(true);
  }

  // CORE FUNCTIONALITY

  function getNeighborCoords(i, j) {
    const noMod = [
      [i - 1, j - 1],
      [i - 1, j],
      [i - 1, j + 1],
      [i, j + 1],
      [i + 1, j + 1],
      [i + 1, j],
      [i + 1, j - 1],
      [i, j - 1],
    ]
    return noMod.map(([ni, nj]) => [mod(ni, dim.num_rows), mod(nj, dim.num_cols)])
  }

  function countLiveNeighbors(i, j) {
    return getNeighborCoords(i, j)
      .filter(([ni, nj]) => current[key(ni, nj)] !== 0)
      .length;
  }

  function generateNext() {
    const copy = { ...current }
    for (let i = 0; i < dim.num_rows; i++) {
      for (let j = 0; j < dim.num_cols; j++) {
        const k = key(i, j)
        const isAlive = current[k] !== 0
        const numLiveNeighbors = countLiveNeighbors(i, j)
        const hasTwo = numLiveNeighbors === 2
        const hasThree = numLiveNeighbors === 3
        copy[k] = (isAlive ? (hasTwo || hasThree) : hasThree) ? 1 : 0
      }
    }
    return copy
  }

  function step() {
    setCurrent({ ...generateMemoized() })
  }

  return (
    <>
      <Styled.Page>
        <Styled.Toolbar>
          <div className="toolbar--one">
            {
              playing
                ? <Button onClick={stopPlaying}>Stop</Button>
                : <Button onClick={startPlaying}>Play</Button>
            }
            <Button onClick={step}>Step</Button>
            <Button onClick={() => setClear(true)}>Clear</Button>
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
              <label htmlFor="num_rows">Rows:</label>
              <input type="number" name="num_rows" value={dim.num_rows} onChange={handleResize} />
            </div>
            <div>
              <label htmlFor="num_cols">Columns:</label>
              <input type="number" name="num_cols" value={dim.num_cols} onChange={handleResize} />
            </div>
          </div>
        </Styled.Toolbar>
        <Styled.Board>
          {
            current &&
            <Styled.Grid num_col={dim.num_cols} num_rows={dim.num_rows}>
              {
                Object.entries(current)?.map(([k, value]) => {
                  const [i, j] = unKey(k);
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
      </Styled.Page>
    </>
  )
};


export default BoardGrid;
