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

export function checksum(input: string): number {
  return fragmentInput(parseInput(input)).reduce((acc, id, index) => acc + (id * index), 0);
}
