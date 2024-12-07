export function parseInput(input: string): number[][] {
  return input.split('\n')
    .map((line) => line
      .replace(':', '')
      .split(' ')
      .map((n) => parseInt(n, 10)));
}

export function findCorrectEquations(equations: number[][], withConcat = false): number[] {
  return equations.filter(([outcome, ...numbers]) => {
    const outcomeLength = Math.floor(Math.log10(outcome)) + 1;
    const outcomes = numbers.reduce((acc: number[], num, index) => {
      if (index === 0) {
        return [num];
      }

      return acc.reduce((newAcc: number[], lastNum) => {
        const added = lastNum + num;
        if (added <= outcome) newAcc.push(added);

        const product = lastNum * num;
        if (product <= outcome) newAcc.push(product);

        if (withConcat) {
          const lastNumLength = Math.floor(Math.log10(lastNum)) + 1;
          const numLength = Math.floor(Math.log10(num)) + 1;

          if (lastNumLength + numLength <= outcomeLength) {
            newAcc.push((lastNum * Math.pow(10, numLength)) + num);
          }
        }

        return newAcc;
      }, []);
    }, []);

    return outcomes.find((n) => n === outcome);
  }).map(([outcome]) => outcome);
}

export function calibrationResult(input: string, withConcat = false): number {
  const equations = parseInput(input);
  const correct = findCorrectEquations(equations, withConcat);

  return correct.reduce((a, b) => a + b);
}
