export function parseInput(input: string): number[][] {
  return input.split('\n')
    .map((line) => line
      .replace(':', '')
      .split(' ')
      .map((n) => parseInt(n, 10)));
}

export function findCorrectEquations(equations: number[][]): number[] {
  return equations.filter(([outcome, ...numbers]) => {
    const outcomes = numbers.reduce((acc: number[], num, index) => {
      if (index === 0) {
        return [num];
      }

      const lastNumbers = acc
        .slice(Math.pow(2, index - 1) * -1)
        .reduce((last: number[], lastNum) => [
          ...last,
          lastNum + num,
          lastNum * num,
        ], []);

      return [
        ...acc,
        ...lastNumbers,
      ]
    }, []);

    return outcomes.indexOf(outcome) > -1;
  }).map(([outcome]) => outcome);
}

export function calibrationResult(input: string): number {
  const equations = parseInput(input);
  const correct = findCorrectEquations(equations);

  return correct.reduce((a, b) => a + b);
}
