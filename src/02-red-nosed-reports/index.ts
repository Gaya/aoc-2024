// https://adventofcode.com/2024/day/2

import { safeReports } from './safety';

export default function solution(input: string) {
  const part1 = safeReports(input);
  const part2 = safeReports(input, true);

  return [part1, part2];
}
