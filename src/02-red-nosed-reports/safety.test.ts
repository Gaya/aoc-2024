import { isSafe, safeReports } from './safety';

describe('isSafe', () => {
  it('should look at a list of numbers and know if safe', () => {
    // normal increase
    expect(isSafe([7, 6, 4, 2, 1])).toBe(true);
    // increase too much
    expect(isSafe([1, 2, 7, 8, 9])).toBe(false);
    // decrease too much
    expect(isSafe([9, 7, 6, 2, 1])).toBe(false);
    // increase and decrease
    expect(isSafe([1, 3, 2, 4, 5])).toBe(false);
    // cannot have same numbers
    expect(isSafe([8, 6, 4, 4, 1])).toBe(false);
    // normal decrease
    expect(isSafe([8, 6, 4, 4, 1])).toBe(false);
  });

  it('should look at a list of numbers and know if safe with dampener', () => {
    // normal increase
    expect(isSafe([7, 6, 4, 2, 1], true)).toBe(true);
    // increase too much
    expect(isSafe([1, 2, 7, 8, 9], true)).toBe(false);
    // decrease too much
    expect(isSafe([9, 7, 6, 2, 1], true)).toBe(false);
    // increase and decrease
    expect(isSafe([1, 3, 2, 4, 5], true)).toBe(true);
    // cannot have same numbers
    expect(isSafe([8, 6, 4, 4, 1], true)).toBe(true);
    // normal decrease
    expect(isSafe([8, 6, 4, 4, 1], true)).toBe(true);
  });
});

describe('safeReports', () => {
  it('should correctly determine correct number of safe reports', () => {
    const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

    expect(safeReports(input, false)).toBe(2);
  });

  it('should correctly determine correct number of safe reports with dampener', () => {
    const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

    expect(safeReports(input, true)).toBe(4);
  });
});
