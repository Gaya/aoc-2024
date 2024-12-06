// https://adventofcode.com/2024/day/6

import { countSteps, parseInput } from './predict-path';

export default function solution(input: string) {
  const part1 = countSteps(parseInput(input));
  const part2 = 0;

  return [part1, part2];
}
