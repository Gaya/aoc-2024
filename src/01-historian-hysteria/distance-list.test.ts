import { distanceList, similarityScore, splitInput } from './distance-list';

const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe('distanceList', () => {

  it('should calculate the distance between numbers', () => {
    expect(distanceList(input)).toEqual(11);
  });
});

describe('splitInput', () => {
  it('should split the lists in two arrays and sort them', () => {
    const [a, b] = splitInput(input);

    a.sort();
    b.sort();

    expect(a).toEqual([1, 2, 3, 3, 3, 4]);
    expect(b).toEqual([3, 3, 3, 4, 5, 9]);
  });
});

describe('similarityScore', () => {
  it('should calculate the similarityScore', () => {
    expect(similarityScore(input)).toEqual(31);
  })
});
