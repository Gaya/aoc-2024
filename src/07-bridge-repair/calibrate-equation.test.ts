import { calibrationResult, findCorrectEquations, parseInput } from './calibrate-equation';

const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe('parseInput', () => {
  it('should parse input', () => {
    expect(parseInput(input)).toStrictEqual([
      [190, 10, 19],
      [3267, 81, 40, 27],
      [83, 17, 5],
      [156, 15, 6],
      [7290, 6, 8, 6, 15],
      [161011, 16, 10, 13],
      [192, 17, 8, 14],
      [21037, 9, 7, 18, 13],
      [292, 11, 6, 16, 20],
    ]);
  });
});

describe('findCorrectEquations', () => {
  it('should find the possible equations', () => {
    expect(findCorrectEquations(parseInput(input))).toStrictEqual([190, 3267, 292]);
  });

  it('should find the possible equations with concat', () => {
    expect(findCorrectEquations(parseInput(input), true)).toStrictEqual([
      190,
      3267,
      156,
      7290,
      192,
      292,
    ]);
  });
});

describe('calibrationResult', () => {
  it('should add up all possible equations', () => {
    expect(calibrationResult(input)).toBe(3749);
  });

  it('should add up all possible equations with concat', () => {
    expect(calibrationResult(input, true)).toBe(11387);
  });
});
