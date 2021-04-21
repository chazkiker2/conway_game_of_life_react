import React from "react";
import { seeds } from "../life";
import Styled from "./board-grid.styles";
import { Button } from "../common";

function mod(a, b) {
  return ((a % b) + b) % b;
}


const Cell = props => (
  <Styled.Cell2 onClick={props.handleCellClick} active={props.active} />
)

const BoardGrid = props => {
  const [current, setCurrent] = React.useState(null);
  const [next, setNext] = React.useState(null);
  const [dim, setDim] = React.useState({ m: 0, n: 0 });
  const [playing, setPlaying] = React.useState(true);

  const stopPlaying = () => setPlaying(false);
  const startPlaying = () => setPlaying(true);


  React.useEffect(() => {
    const copy = {}
    seeds[2].forEach((row, i) => row.forEach((cell, j) => copy[`${i}.${j}`] = cell))
    setDim({ m: seeds[2].length, n: seeds[2][0].length })
    setCurrent(copy)
    setNext({ ...copy })
  }, [])

  const key = (i, j) => `${i}.${j}`
  const unkey = k => k.split(".")
  const flip = entry => entry === 0 ? 1 : 0

  function setCell(i, j, v, setter) {
    const setState = setter ?? setCurrent
    setState(prev => ({ ...prev, [key(i, j)]: v }))
  }

  const handleCellClick = (i, j) => {
    setCell(i, j, flip(current[key(i, j)]))
  }

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
    // `mod` function matches the functionality of Python's modulo operator.
    return Object.values(noMod).map(([ni, nj]) => [mod(ni, dim.m), mod(nj, dim.n)]);
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
        const k = key(i, j);
        const isAlive = current[k] !== 0;
        const numLiveNeighbors = countLiveNeighbors(i, j);
        const hasTwo = numLiveNeighbors === 2;
        const hasThree = numLiveNeighbors === 3;
        copy[k] = (isAlive ? (hasTwo || hasThree) : hasThree) ? 1 : 0
        // setNext(prev => ({ ...prev, [k]: (isAlive ? (hasTwo || hasThree) : hasThree) ? 1 : 0 }))
      }
    }
    // setCurrent({ ...next });
    return copy
  }

  function step() {
    const next = generateNext();
    console.log({ next })
    setCurrent({ ...next })
  }

  function memoize(start, stop, step) {
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
    setNext({ ...current })
    let lastSelf = { ...next }
    let frameCount = 0;
    const cache = {
      start: lastSelf,
    };

    while (frameCount < stop) {
      generateNext();
      if (lastSelf === current) {
        // if our current frame matches our last frame then we'd infinitely loop forever
        // so just fill the rest of the cache up now without calculating again
        for (let i = frameCount; i < stop; i++) {
          cache[i] = lastSelf;
        }
        // and stop looping; we've filled our whole cache
        break;
      }
      // otherwise, continue with the life cycle
      lastSelf = { ...next };
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


  React.useEffect(() => {
    if (!playing) {
      return
    }
    const timer = setInterval(() => {
      step()
    }, 1000)
    return () => clearInterval(timer);
  }, [step, playing])

  return (
    <>
      <Styled.Page>
        <div>
          <Button onClick={startPlaying}>Play</Button>
          <Button onClick={stopPlaying}>Stop</Button>
          <Button onClick={step}>Step</Button>
        </div>
        <Styled.Board>
          {
            current &&
            <Styled.AltContainer num_col={dim.n} num_rows={dim.m}>
              {
                Object.entries(current)?.map(([k, value]) => {
                  const [i, j] = unkey(k);
                  return (
                    <Cell
                      key={k}
                      handleCellClick={() => handleCellClick(i, j)}
                      active={value}
                    />
                  )
                }
                )
              }
            </Styled.AltContainer>
          }
        </Styled.Board>
      </Styled.Page>
    </>
  )
};


export default BoardGrid;
