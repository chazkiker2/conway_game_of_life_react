# Life Patterns

## Still Life Organisms

### Blinker (period 2)

![blinker gif](https://upload.wikimedia.org/wikipedia/commons/9/95/Game_of_life_blinker.gif)

- Dimensions required: 5 rows x 5 col

```javascript
const blinker = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
]
```

### Toad (period 2)

![toad gif](https://upload.wikimedia.org/wikipedia/commons/1/12/Game_of_life_toad.gif)

```javascript
// 6 rows by 6 columns
const toad = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
]
```

### Beacon (period 2)

### Pulsar (period 3)

![pulsar gif](https://upload.wikimedia.org/wikipedia/commons/0/07/Game_of_life_pulsar.gif)

```javascript
// 17 rows x 17 columns
const pulsar = [
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
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], /* 10 */
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], /* 11 */
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], /* 12 */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 13 */
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], /* 14 */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 15 */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 16 */
]
```

### Penta-decathlon (period 15)

## Oscillators

## Spaceships

## Infinite Patterns

Infinite 1:

![infinite 1](https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Game_of_life_infinite1.svg/162px-Game_of_life_infinite1.svg.png)

```javascript
// 8 rows x 10 columns
const infinite1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
```

Infinite 2:

![infinite 2](https://upload.wikimedia.org/wikipedia/commons/a/ae/Game_of_life_infinite2.svg)

```javascript
// 7 rows x 7 columns
const infinite2 = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
]
```

![infinite 3](https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Game_of_life_infinite3.svg/658px-Game_of_life_infinite3.svg.png)
