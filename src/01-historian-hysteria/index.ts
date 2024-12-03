// https://adventofcode.com/2024/day/1

import { distanceList, similarityScore } from './distance-list';

export default function solution(input: string) {
  const part1 = distanceList(input);
  const part2 = similarityScore(input);

  return [part1, part2];
}
