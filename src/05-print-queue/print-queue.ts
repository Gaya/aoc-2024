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

function isInCorrectUpdate(regExps: Record<string, RegExp>, update: string): boolean {
  return Object.entries(regExps).some(([key, regexp]) => update.includes(key)
    && regexp.test(update));
}

function createRegExps(queue: Queue): Record<string, RegExp> {
  return Object.entries(queue.rules).reduce((acc, [key, values]) => {
    return {
      ...acc,
      [key]: new RegExp(`(?:${values.join('|')})(.+)(?=${key})`),
    };
  }, {});

}

export function findCorrect(queue: Queue): string[] {
  const regExps = createRegExps(queue);

  return queue.updates.filter((update) => !isInCorrectUpdate(regExps, update));
}

export function findAndAddMiddle(input: string[]): number {
  return input.reduce((acc, row) => {
    const numbers = row.split(',');
    return acc + parseInt(numbers[Math.floor(numbers.length / 2)], 10);
  }, 0);
}

export function findInCorrect(queue: Queue): string[] {
  const regExps = createRegExps(queue);

  return queue.updates.filter((update) => isInCorrectUpdate(regExps, update));
}

export function fixUpdate(queue: Queue, update: string, regExps = createRegExps(queue)) {
  const numbers = update.split(',');

  for (let  i = 0; i < numbers.length; i++ ) {
    const rule = queue.rules[numbers[i]];
    if (rule) {
      for (let  j = 0; j < rule.length; j++ ) {
        const index = numbers.indexOf(rule[j]);
        if (index !== -1 && index < i) {
          const before = numbers.slice(0, index);
          const after = numbers.slice(index).filter((number) => number !== numbers[i]);
          const newNumbers = [...before, numbers[i], ...after].join(',');

          if (isInCorrectUpdate(regExps, newNumbers)) {
            return fixUpdate(queue, newNumbers, regExps);
          } else {
            return newNumbers;
          }
        }
      }
    }
  }

  return update;
}

export function fixInput(queue: Queue) {
  return findInCorrect(queue).map((update) => fixUpdate(queue, update));
}
