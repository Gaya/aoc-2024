// https://adventofcode.com/2024/day/9

import { checksum } from './fragmenter';

export default function solution(input: string) {
  const part1 = checksum(input);
  const part2 = checksum(input, true);

  return [part1, part2];
}
