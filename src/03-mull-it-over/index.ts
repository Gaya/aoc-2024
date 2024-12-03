// https://adventofcode.com/2024/day/3

import { extractMultiplications, parseAndMultiplyNumbers } from './multiply';

export default function solution(input: string) {
  const part1 = parseAndMultiplyNumbers(extractMultiplications(input));
  const part2 = parseAndMultiplyNumbers(extractMultiplications(input, true));

  return [part1, part2];
}
