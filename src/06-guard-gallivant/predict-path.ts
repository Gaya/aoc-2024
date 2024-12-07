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

type GuardSteps = Record<string, Record<'N' | 'E' | 'S' | 'W', boolean>>;

function addToStep(currentSteps: GuardSteps, position: string, direction: 'N' | 'E' | 'S' | 'W'): GuardSteps {
  if (!currentSteps[position]) {
    currentSteps[position] = {
      'N': direction === 'N',
      'E': direction === 'E',
      'S': direction === 'S',
      'W': direction === 'W',
    }
  }

  return currentSteps;
}

function guardPaths(state: GuardState, currentSteps: GuardSteps = {}, countAll = true): [GuardSteps, boolean] {
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

      for (let i = countAll ? 0 : distance - 1; i < distance; i++) {
        let pos = '';
        switch (state.direction) {
          case 'N': {
            pos = `${x}:${y-i}`;
          }
            break;
          case 'E': {
            pos = `${x+i}:${y}`;
          }
            break;
          case 'S': {
            pos = `${x}:${y+i}`;
          }
            break;
          case 'W': {
            pos = `${x-i}:${y}`;
          }
            break;
        }

        if (currentSteps[pos] && currentSteps[pos][state.direction]) {
          return [currentSteps, true];
        }

        addToStep(currentSteps, pos, state.direction);
      }

      switch (state.direction) {
        case 'N': {
          state.guard = [x, y - distance];
          state.direction = 'E';
        }
          break;
        case 'E': {
          state.guard = [x + distance, y];
          state.direction = 'S';
        }
          break;
        case 'S': {
          state.guard = [x, y + distance];
          state.direction = 'W';
        }
          break;
        case 'W': {
          state.guard = [x - distance, y];
          state.direction = 'N';
        }
          break;
      }

      return guardPaths(
        state,
        currentSteps,
        countAll,
      );
    }
  }

  switch (state.direction) {
    case 'N': {
      for (let i = 0; i < y; i++) {
        addToStep(currentSteps, `${x}:${y-i}`, 'N');
      }
    }
    break;
    case 'E': {
      const distanceToEnd = state.gridSize[0] - x;
      for (let i = 0; i < distanceToEnd; i++) {
        addToStep(currentSteps, `${x + i}:${y}`, 'E');
      }
    }
    break;
    case 'S': {
      const distanceToEnd = state.gridSize[1] - y;
      for (let i = 0; i < distanceToEnd; i++) {
        addToStep(currentSteps, `${x}:${y + i}`, 'S');
      }
    }
    break;
    case 'W': {
      for (let i = 0; i < x; i++) {
        addToStep(currentSteps, `${x - i}:${y}`, 'W');
      }
    }
    break;
  }

  return [currentSteps, false];
}

export function countSteps(input: string) {
  const steps = guardPaths(parseInput(input));
  return Object.keys(steps[0]).length
}

export function findLoops(input: string): number {
  const state = parseInput(input);
  const [normalPath] = guardPaths({ ...state });
  const guard = state.guard.join(':');

  return Object.keys(normalPath).filter((pos) => {
    if (pos === guard) {
      return false;
    }

    const [xs, ys] = pos.split(':');
    const x = parseInt(xs, 10);
    const y = parseInt(ys, 10);

    const [_, loop] = guardPaths({
      ...state,
      obstacles: {
        x: {
          ...state.obstacles.x,
          [x]: [...(state.obstacles.x[x] || []), y],
        },
        y: {
          ...state.obstacles.y,
          [y]: [...(state.obstacles.y[y] || []), x],
        },
      },
    }, {}, false);

    return loop;
  }).length;
}
