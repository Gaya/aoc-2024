export function splitInput(input: string): [number[], number[]] {
  const matches = input.match(/[0-9]+/gm);

  if (!matches) {
    return [[], []];
  }

  return matches
    .map((i: string) => parseInt(i, 10))
    .reduce((acc: [number[], number[]], item: number, index: number): [number[], number[]] => {
      return [
        index % 2 === 0 ? [...acc[0], item]: acc[0],
        index % 2 === 1 ? [...acc[1], item]: acc[1],
      ];
    }, [[], []]);
}

export function similarityScore(input: string): number {
  const [a, b] = splitInput(input);

  const scores = b.reduce((acc: Record<number, number>, number): Record<number, number> => {
    acc[number] = acc[number] ? acc[number] + 1 : 1;
    return acc;
  }, {})

  return a.reduce((acc, item) => {
    if (!scores[item]) {
      return acc;
    }

    return (item * scores[item]) + acc;
  }, 0);
}

export function distanceList(input: string): number {
  const [a, b] = splitInput(input);

  a.sort();
  b.sort();

  return a.reduce((acc, item, index) => {
    const distance = b[index] - item;

    return Math.abs(distance) + acc;
  }, 0);
}
