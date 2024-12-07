// https://adventofcode.com/2024/day/7

import { calibrationResult } from './calibrate-equation';

export default function solution(input: string) {
  const part1 = calibrationResult(input);
  const part2 = calibrationResult(input, true);

  return [part1, part2];
}
