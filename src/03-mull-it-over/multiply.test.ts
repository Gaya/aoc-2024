import { extractMultiplications, parseAndMultiplyNumbers } from './multiply';

describe('extractMultiplications', () => {
  it('should extract correct multiplications', () => {
    const input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

    expect(extractMultiplications(input)).toEqual([
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ])
  });

  it('should extract correct multiplications with filter', () => {
    const input = 'xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()';

    expect(extractMultiplications(input, true)).toEqual([
      [2, 4],
      [8, 5],
    ])
  });
});

describe('parseAndMultiplyNumbers', () => {
  it('should parse and multiply the input', () => {
    const input: [number, number][] = [
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ];

    expect(parseAndMultiplyNumbers(input)).toEqual(161);
  });
});
