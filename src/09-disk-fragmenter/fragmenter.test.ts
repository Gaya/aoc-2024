import { checksum, fragmentInput, parseInput } from './fragmenter';

describe('parseInput', () => {
  it('should quickly parse input', () => {
    expect(parseInput('12345')).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('fragmentInput', () => {
  it('should correctly fragment input', () => {
    expect(fragmentInput([1, 2, 3, 4, 5]))
      .toEqual([0, 2, 2, 1, 1, 1, 2, 2, 2]);

    expect(fragmentInput([2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2]))
      .toEqual([0, 0, 9, 9, 8, 1, 1, 1, 8, 8, 8, 2, 7, 7, 7, 3, 3, 3, 6, 4, 4, 6, 5, 5, 5, 5, 6, 6]);
  });
});

describe('checksum', () => {
  it('should correctly fragment input and get checksum', () => {
    expect(checksum('2333133121414131402'))
      .toEqual(1928);
  });
});
