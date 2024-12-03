export function extractMultiplications(input: string, withFilter = false): [number, number][] {
  const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do(n't)?\(\)/gm);

  const numbers: [number, number][] = [];
  let enabled = true;

  for (let result of matches) {
    const [instruction, a, b] = result;

    if (instruction === 'do()') {
      enabled = true;
    } else if (instruction === 'don\'t()') {
      enabled = false;
    } else if (enabled || !withFilter) {
      numbers.push([parseInt(a, 10), parseInt(b, 10)]);
    }
  }

  return numbers;
}

export function parseAndMultiplyNumbers(input: [number, number][]): number {
  return input.reduce((acc, [a, b]) => {
    return acc + (a * b);
  }, 0);
}
