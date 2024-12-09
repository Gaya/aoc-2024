// https://adventofcode.com/2024/day/8

import { getAntinodes, parseInput } from './antinode-finder';

export default function solution(input: string) {
  const grid = parseInput(input);
  const part1 = getAntinodes(grid);
  const part2 = getAntinodes(grid, true);

  return [part1, part2];
}
