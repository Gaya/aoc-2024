interface Queue {
  rules: Record<string, string[]>;
  updates: string;
}

export function parseInput(input: string): Queue {
  const rules = Array.from(input.matchAll(/(\d+)\|(\d+)/gm)) || [];

  return {
    rules: rules.reduce((acc: Record<string, string[]>, [_, a, b]) => {
      return {
        ...acc,
        [a]: acc[a] ? [...acc[a], b] : [b],
      };
    }, {}),
    updates: (input.match(/^(?:(\d+),?)+$/gm) || []).join('\n'),
  };
}

export function findCorrect(queue: Queue): string {
  const rules = Object.entries(queue.rules).map(([key, values]) => {
    return `(?:^|.+)(?:(?<=,|^)${values.join('|')})(.+)(?=(?<=,)${key}).+$`;
  });

  return queue.updates.replace(new RegExp(rules.join('|'), 'gm'), '')
    .split('\n').filter((r) => r !== '').join('\n');
}

export function findAndAddMiddle(input: string): number {
  return input.split('\n').reduce((acc, row) => {
    const numbers = row.split(',');
    return acc + parseInt(numbers[Math.floor(numbers.length / 2)], 10);
  }, 0);
}
