// https://adventofcode.com/2024/day/6

import { countSteps, findLoops } from './predict-path';

export default function solution(input: string) {
  const part1 = countSteps(input);
  const part2 = findLoops(input);

  return [part1, part2];
}
