// https://adventofcode.com/2024/day/8

import { getAntinodes, parseInput } from './antinode-finder';

export default function solution(input: string) {
  const part1 = getAntinodes(parseInput(input));
  const part2 = 0;

  return [part1, part2];
}
