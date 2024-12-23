import { getAntinodes, parseInput } from './antinode-finder';

const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

describe('parseInput', () => {
  it('should parse the input', () => {
    expect(parseInput(input)).toEqual({
      antennas: {
        0: [[8,1],[5,2],[7,3],[4,4]],
        A: [[6,5],[8,8],[9,9]],
      },
      cols: 12,
      rows: 12,
    })
  });
});

describe('getAntinodes', () => {
  it('should return the correct number of antinode positions', () => {
    expect(getAntinodes(parseInput(input))).toEqual(14);
  });

  it('should return the correct number of antinode double positions', () => {
    expect(getAntinodes(parseInput(input), true)).toEqual(34);
  });
})
