// https://adventofcode.com/2024/day/4

import { searchWord, xSearch } from './word-search';

export default function solution(input: string) {
  const part1 = searchWord(input, 'XMAS');
  const part2 = xSearch(input);

  return [part1, part2];
}
