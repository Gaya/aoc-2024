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

  return input.reduce((acc: number[], num, index) => {
    const empty = index % 2 === 1;

    const items = empty ? numbers.slice(num * -1).reverse() : numbers.slice(0, num);
    numbers = empty ? numbers.slice(0, num * -1) : numbers.slice(num);

    if (items.length === 0) {
      return acc;
    }

    return [...acc, ...items];
  }, []);
}

export function checksum(input: string): number {
  return fragmentInput(parseInput(input)).reduce((acc, id, index) => acc + (id * index), 0);
}
