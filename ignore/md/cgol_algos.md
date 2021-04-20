# Game of Life — Algorithms

## Wikipedia Overview

Early patterns with unknown futures, such as the R-pentomino, led computer programmers to write programs to track the evolution of patterns in the Game of Life. Most of the early algorithms were similar: they represented the patterns as two-dimensional arrays in computer memory. Typically, two arrays are used: one to hold the current generation, and one to calculate its successor. Often 0 and 1 represent dead and live cells, respectively. A nested for loop considers each element of the current array in turn, counting the live neighbours of each cell to decide whether the corresponding element of the successor array should be 0 or 1. The successor array is displayed. For the next iteration, the arrays swap roles so that the successor array in the last iteration becomes the current array in the next iteration.

A variety of minor enhancements to this basic scheme are possible, and there are many ways to save unnecessary computation. A cell that did not change at the last time step, and none of whose neighbours changed, is guaranteed not to change at the current time step as well, so a program that keeps track of which areas are active can save time by not updating inactive zones.

Game of Life on the surface of a trefoil knot
The Game of Life on the surface of a trefoil knot
To avoid decisions and branches in the counting loop, the rules can be rearranged from an egocentric approach of the inner field regarding its neighbours to a scientific observer's viewpoint: if the sum of all nine fields in a given neighbourhood is three, the inner field state for the next generation will be life; if the all-field sum is four, the inner field retains its current state; and every other sum sets the inner field to death.

To save memory, the storage can be reduced to one array plus two line buffers. One line buffer is used to calculate the successor state for a line, then the second line buffer is used to calculate the successor state for the next line. The first buffer is then written to its line and freed to hold the successor state for the third line. If a toroidal array is used, a third buffer is needed so that the original state of the first line in the array can be saved until the last line is computed.


Glider gun within a toroidal array. The stream of gliders eventually wraps around and destroys the gun.

Red glider on the square lattice with periodic boundary conditions
In principle, the Game of Life field is infinite, but computers have finite memory. This leads to problems when the active area encroaches on the border of the array. Programmers have used several strategies to address these problems. The simplest strategy is to assume that every cell outside the array is dead. This is easy to program but leads to inaccurate results when the active area crosses the boundary. A more sophisticated trick is to consider the left and right edges of the field to be stitched together, and the top and bottom edges also, yielding a toroidal array. The result is that active areas that move across a field edge reappear at the opposite edge. Inaccuracy can still result if the pattern grows too large, but there are no pathological edge effects. Techniques of dynamic storage allocation may also be used, creating ever-larger arrays to hold growing patterns. The Game of Life on a finite field is sometimes explicitly studied; some implementations, such as Golly, support a choice of the standard infinite field, a field infinite only in one dimension, or a finite field, with a choice of topologies such as a cylinder, a torus, or a Möbius strip.

Alternatively, programmers may abandon the notion of representing the Game of Life field with a two-dimensional array, and use a different data structure, such as a vector of coordinate pairs representing live cells. This allows the pattern to move about the field unhindered, as long as the population does not exceed the size of the live-coordinate array. The drawback is that counting live neighbors becomes a hash-table lookup or search operation, slowing down simulation speed. With more sophisticated data structures this problem can also be largely solved.

For exploring large patterns at great time depths, sophisticated algorithms such as Hashlife may be useful. There is also a method for implementation of the Game of Life and other cellular automata using arbitrary asynchronous updates whilst still exactly emulating the behavior of the synchronous game Source code examples that implement the basic Game of Life scenario in various programming languages, including C, C++, Java and Python can be found at Rosetta Code.

## Breakdown

### Early Iterations

- Patterns represented as two-dimensional arrays in computer memory.
- Two arrays were used:
  - one to hold the current generation
  - one to calculate its successor
- 0 and 1 represent dead and live cells, respectively
- Nested for-loop considers each element of the current array in turn
  - counting the live neighbors of each to decide whether the corresponding element should be a 0 or a 1
- finally, the successor array is displayed

Some crude python pseudo-code to depict this simplest of approaches:

```python
# x, y representation
# 
# -1, 1     0, 1      1, 1
# -1, 0,    0, 0      1, 0
# -1, -1    0, -1     1, -1
#
# arr[x][y]
# 
# [0][0]    [0][1]    [0][2]
# [1][0]    [1][1]    [1][2]
# [2][0]    [2][1]    [2][2]
#
# arr[i][j]
# 
# [i-1][j-1]    [i-1][j  ]    [i-1][j+1]
# [i  ][j-1]    [i=1][j=1]    [i  ][j+1]
# [i+1][j-1]    [i+1][j  ]    [i+1][j+1]

# for any given cell at (i, j), neighbors can be represented like so:
def get_neighbor_coords(i, j):
  return {
    "up_left"    :   ( i-1 , j-1 ),
    "up"         :   ( i-1 , j   ),
    "up_right"   :   ( i-1 , j+1 ),
    "right"      :   ( i   , j+1 ),
    "down_right" :   ( i+1 , j+1 ),
    "down"       :   ( i+1 , j   ),
    "down_left"  :   ( i+1 , j+1 ),
    "left"       :   ( i   , j-1 ),
  }


def main(current_gen):  # current generation given as argument
  # the successor generation
  # two-dimensional array with
  successor_gen = [
    [ None for _ in range(len(current_gen[i])) ]
    for i in range(len(current_gen))
  ]
  # successor_gen = [ [None] * len(current_gen[0]) ] * len(current_gen)
  
  for i in len(current_gen):
    for j in len(current_gen[i]):

      cell_coords = (i, j)

      is_alive = current_gen[i][j]

      num_live_neighbors = 0
    
      for direction, neighbor_coords in get_neighbor_coords(i, j).items():
        ni, nj = neighbor_coords
        if current_gen[ni][nj] != 0:
          num_live_neighbors += 1
      
      has_two = num_live_neighbors == 2
      has_three = num_live_neighbors == 3

      # 1. Any live cell with two or three live neighbors survives.
      if is_alive and (has_two or has_three):
        successor_gen[i][j] = 1
      # 2. Any dead cell with three live neighbors becomes a live cell.
      elif (not is_alive) and has_three:
        successor_gen[i][j] = 1
      # 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
      else:
        successor_gen[i][j] = 0
```
