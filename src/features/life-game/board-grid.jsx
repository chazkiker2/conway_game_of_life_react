import React from "react"
import { seeds } from "../life"
import Styled from "./board-grid.styles"
import { Button } from "../common"

function mod(a, b) {
  return ((a % b) + b) % b
}

const seedMap = Object.fromEntries(seeds.public.map(seed => [seed.name, seed]))

const BoardGrid = props => {
  // COMPONENT STATE
  const [current, setCurrent] = React.useState(null)
  const [dim, setDim] = React.useState({ m: 0, n: 0 })
  const [playing, setPlaying] = React.useState(false)
  const [clear, setClear] = React.useState(false)
  const [seed, setSeed] = React.useState(seeds.default.name)
  const stopPlaying = () => setPlaying(false)
  const startPlaying = () => setPlaying(true)

  // EFFECTS
  React.useEffect(() => {
    const { dict, m, n } = seedMap[seed]
    setDim({ m, n })
    setCurrent({ ...dict })
    return () => setClear(false)
  }, [clear, seed])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateMemoized = React.useCallback(generateNext, [current])

  React.useEffect(() => {
    if (!playing) {
      return
    }
    const timer = setInterval(() => {
      const next = generateMemoized();
      setCurrent({ ...next })
    }, 1000)
    return () => clearInterval(timer);
  }, [playing, generateMemoized])

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
    return Object.values(noMod).map(([ni, nj]) => [mod(ni, dim.m), mod(nj, dim.n)])
  }

  function countLiveNeighbors(i, j) {
    return getNeighborCoords(i, j)
      .filter(([ni, nj]) => current[key(ni, nj)] !== 0)
      .length;
  }

  function generateNext() {
    const copy = { ...current }
    for (let i = 0; i < dim.m; i++) {
      for (let j = 0; j < dim.n; j++) {
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
        <div>
          {
            playing
              ? <Button onClick={stopPlaying}>Stop</Button>
              : <Button onClick={startPlaying}>Play</Button>
          }
          <Button onClick={step}>Step</Button>
          <Button onClick={() => setClear(true)}>Clear</Button>
          <select name="Seed" value={seed} onChange={selectSeed}>
            {seeds.public.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}

          </select>
        </div>
        <Styled.Board>
          {
            current &&
            <Styled.Grid num_col={dim.n} num_rows={dim.m}>
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
