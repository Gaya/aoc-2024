interface Queue {
  rules: Record<string, string[]>;
  updates: string[];
}

export function parseInput(input: string): Queue {
  const rules = Array.from(input.matchAll(/(\d{2})\|(\d{2})/gm)) || [];

  return {
    rules: rules.reduce((acc: Record<string, string[]>, [_, a, b]) => {
      return {
        ...acc,
        [a]: acc[a] ? [...acc[a], b] : [b],
      };
    }, {}),
    updates: (input.match(/^(?:(\d{2}),?)+$/gm) || []),
  };
}

export function findCorrect(queue: Queue): string[] {
  return queue.updates.filter((update) => {
    return Object.entries(queue.rules).every(([key, values]) => {
      if (update.includes(key)) {
        return !update.match(`(?:${values.join('|')})(.+)(?=${key}).+$`);
      }

      return true;
    });
  });
}

export function findAndAddMiddle(input: string[]): number {
  return input.reduce((acc, row) => {
    const numbers = row.split(',');
    return acc + parseInt(numbers[Math.floor(numbers.length / 2)], 10);
  }, 0);
}
