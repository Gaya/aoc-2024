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

      return acc.reduce((newAcc: number[], lastNum) => [
          ...newAcc,
          lastNum + num,
          lastNum * num,
        ], []);
    }, []);

    return outcomes.find((n) => n === outcome);
  }).map(([outcome]) => outcome);
}

export function calibrationResult(input: string): number {
  const equations = parseInput(input);
  const correct = findCorrectEquations(equations);

  return correct.reduce((a, b) => a + b);
}
