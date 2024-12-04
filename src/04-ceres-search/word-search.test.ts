import { searchWord, xSearch } from './word-search';

describe('searchWord', () => {
  it('should find all instances of XMAS', () => {
    const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

    expect(searchWord(input, 'XMAS')).toBe(18);
  });
});

describe('xSearch', () => {
  it('should find all the crosses', () => {
    const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

    expect(xSearch(input)).toBe(9);
  });
});
