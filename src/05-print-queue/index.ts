// https://adventofcode.com/2024/day/5

import { findAndAddMiddle, findCorrect, parseInput } from './print-queue';

export default function solution(input: string) {
  const part1 = findAndAddMiddle(findCorrect(parseInput(input)));
  const part2 = 0;

  return [part1, part2];
}
