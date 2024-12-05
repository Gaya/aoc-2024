import { findAndAddMiddle, findCorrect, parseInput } from './print-queue';

const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

describe('parseInput', () => {
  it('should parse the input', () => {
    expect(parseInput(input)).toEqual({
      rules: {
        '47': ['53', "13", "61", "29"],
        '97': ['13', '61', '47', '29', '53', '75'],
        '75': ['29', '53', '47', '61', '13'],
        '29': ['13'],
        '53': ['29', '13'],
        '61': ['13', '53', '29'],
      },
      updates: [
        '75,47,61,53,29',
        '97,61,53,29,13',
        '75,29,13',
        '75,97,47,61,53',
        '61,13,29',
        '97,13,75,29,47',
      ],
    })
  })
})

describe('findCorrect', () => {
  it('should return the correct print queues', () => {
    expect(findCorrect(parseInput(input))).toEqual([
      '75,47,61,53,29',
      '97,61,53,29,13',
      '75,29,13',
    ]);
  })
})

describe('findAndAddMiddle', () => {
  it('should return the middle numbers added', () => {
    expect(findAndAddMiddle([
      '75,47,61,53,29',
      '97,61,53,29,13',
      '75,29,13',
    ])).toBe(143);
  });
});
