interface GuardState {
  obstacles: {
    x: Record<number, number[]>;
    y: Record<number, number[]>;
  },
  gridSize: [number, number];
  guard: [number, number];
  direction: 'N' | 'E' | 'S' | 'W';
}

export function parseInput(input: string): GuardState {
  const rows = input.split('\n');
  const rowLength = rows[0].length;
  let guard: [number, number] = [0, 0];

  const obstacles = [...rows.join('').matchAll(/[#^]/gm)].reduce((acc: GuardState['obstacles'], obstacle) => {
    const x = obstacle.index % rowLength;
    const y = Math.floor(obstacle.index / rowLength);

    if (obstacle[0] === '#') {
      if (!acc.x[x]) {
        acc.x[x] = [];
      }

      if (!acc.y[y]) {
        acc.y[y] = [];
      }

      acc.x[x].push(y)
      acc.y[y].push(x)
    } else if (obstacle[0] === '^') {
      guard = [x, y];
    }

    return acc;
  }, { x: {}, y: {}});

  return {
    obstacles,
    guard,
    gridSize: [rowLength, rows.length],
    direction: 'N',
  };
}

export function countSteps(state: GuardState, currentSteps: Record<string, boolean> = {}): number {
  const [x, y] = state.guard;

  const obstaclesInDirection = state.direction === 'N' || state.direction === 'S'
    ? state.obstacles.x[x] : state.obstacles.y[y];
  const positionToCheck = state.direction === 'N' || state.direction === 'S' ? y : x;

  if (obstaclesInDirection) {
    const decreasedCheck = state.direction === 'N' || state.direction === 'W';
    const obstaclesInView = obstaclesInDirection.filter((num) => {
      if (decreasedCheck) {
        return num < positionToCheck;
      } else {
        return num > positionToCheck;
      }
    });

    if (obstaclesInView.length !== 0) {
      obstaclesInView.sort((a, b) => decreasedCheck ? b - a : a - b);
      const firstCollision = obstaclesInView[0];
      const distance = Math.abs(firstCollision - positionToCheck) - 1;

      switch (state.direction) {
        case 'N': {
          state.guard = [x, y - distance];
          state.direction = 'E';

          for (let i = 0; i < distance; i++) {
            currentSteps[`${x}:${y-i}`] = true;
          }
        }
        break;
        case 'E': {
          state.guard = [x + distance, y];
          state.direction = 'S';

          for (let i = 0; i < distance; i++) {
            currentSteps[`${x+i}:${y}`] = true;
          }
        }
        break;
        case 'S': {
          state.guard = [x, y + distance];
          state.direction = 'W';

          for (let i = 0; i < distance; i++) {
            currentSteps[`${x}:${y+i}`] = true;
          }
        }
        break;
        case 'W': {
          state.guard = [x - distance, y];
          state.direction = 'N';

          for (let i = 0; i < distance; i++) {
            currentSteps[`${x-i}:${y}`] = true;
          }
        }
        break;
      }

      return countSteps(
        state,
        currentSteps,
      );
    }
  }

  switch (state.direction) {
    case 'N': {
      for (let i = 0; i < y; i++) {
        currentSteps[`${x}:${y - i}`] = true;
      }
    }
    break;
    case 'E': {
      const distanceToEnd = state.gridSize[0] - x;
      for (let i = 0; i < distanceToEnd; i++) {
        currentSteps[`${x + i}:${y}`] = true;
      }
    }
    break;
    case 'S': {
      const distanceToEnd = state.gridSize[1] - y;
      for (let i = 0; i < distanceToEnd; i++) {
        currentSteps[`${x}:${y + i}`] = true;
      }
    }
    break;
    case 'W': {
      for (let i = 0; i < x; i++) {
        currentSteps[`${x - i}:${y}`] = true;
      }
    }
    break;
  }

  return Object.keys(currentSteps).length;
}
