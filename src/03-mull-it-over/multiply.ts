export function extractMultiplications(input: string, withFilter = false): [number, number][] {
  let inputString = input;

  if (withFilter) {
    inputString = inputString.replace(/don't\(\).+do\(\)/gm, '');
  }

  const matches = inputString.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm);

  const numbers: [number, number][] = [];

  for (let result of matches) {
    const [_, a, b] = result;
    numbers.push([parseInt(a, 10), parseInt(b, 10)]);
  }

  return numbers;
}

export function parseAndMultiplyNumbers(input: [number, number][]): number {
  return input.reduce((acc, [a, b]) => {
    return acc + (a * b);
  }, 0);
}
