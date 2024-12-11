export function parseInput(input: string): number[] {
  return [...(input.match(/\d/gm) || [])].map((d) => parseInt(d, 10));
}

export function fragmentInput(input: number[]): number[] {
  let numbers = input.reduce((acc: number[], num, index) => {
    const empty = index % 2 === 1;
    const id = index / 2;

    if (empty) return acc;

    for (let i = 0; i < num; i++) {
      acc.push(id);
    }

    return acc;
  }, []);

  const output: number[] = [];

  for (let i = 0; i < input.length; i++) {
    const num = input[i];
    const empty = i % 2 === 1;

    for (let j = 0; j < num; j++) {
      if (numbers.length === 0) {
        return output;
      }

      output.push((empty ? numbers.pop() : numbers.shift()) || 0);
    }

  }

  return output;
}

export function betterFragmentInput(input: number[]): (number | undefined)[] {
  const output: (number | undefined)[] = [];
  const couples = input.length / 2;
  const indexes: Record<number, boolean> = {};

  for (let i = 0; i < couples; i++) {
    const index = (i * 2);
    const num = input[index];
    let empty = input[index + 1];
    const id = index / 2;

    for (let j = 0; j < num; j++) {
      output.push(!indexes[index] ? id : undefined);
    }

    while (empty > 0) {
      const fits = input.findLastIndex(((n, ind) => !indexes[ind] && ind % 2 === 0 && n <= empty));
      const amount = fits > -1 ? input[fits] : empty;
      const fitsId = fits > -1 ? fits / 2 : undefined;

      if (fits > -1) {
        indexes[fits] = true;
      }

      for (let j = 0; j < amount; j++) {
        output.push(fitsId);
      }

      empty = empty - amount;
    }
  }

  return output;
}

export function checksum(input: string, better = false): number {
  const parsed = parseInput(input);
  const fragmented = !better ? fragmentInput(parsed) : betterFragmentInput(parsed);

  return fragmented.reduce((acc: number, id, index) => id !== undefined ? acc + (id * index) : acc, 0);
}
