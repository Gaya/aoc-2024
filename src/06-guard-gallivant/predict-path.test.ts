import { countSteps, findLoops, parseInput } from './predict-path';

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe('parseInput', () => {
  it('should parse the input to usable data', () => {

    expect(parseInput(input)).toEqual({
      obstacles: {
        x: {
          4: [0],
          9: [1],
          2: [3],
          7: [4],
          1: [6],
          8: [7],
          0: [8],
          6: [9],
        },
        y: {
          0: [4],
          1: [9],
          3: [2],
          4: [7],
          6: [1],
          7: [8],
          8: [0],
          9: [6],
        },
      },
      guard: [4, 6],
      gridSize: [10, 10],
      direction: 'N',
    });
  });
});

describe('countSteps', () => {
  it('should predict the amount of steps of the guard', () => {
    expect(countSteps(input)).toBe(41);
  });
});

describe('findLoops', () => {
  it('should find 6 loops for the original input', () => {
    expect(findLoops(input)).toBe(6);
  })
});
