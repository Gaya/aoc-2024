export function isSafe(numbers: number[], dampener = false): boolean {
  return numbers.every((current, i) => {
    if (i === 0) {
      return true;
    }

    const prev = numbers[i - 1];
    const distance = current - prev;
    const prevPrev = numbers[i - 2];
    const direction = prevPrev !== undefined
      ? prev - prevPrev : 0;

    if (
      distance === 0
      || Math.abs(distance) > 3
      || (direction < 0 && distance > 0)
      || (direction > 0 && distance < 0)
    ) {
      if (dampener) {
        // try again with all combinations without a number
        return numbers
          .map((_, j) => numbers
            .filter((_, index) => index !== j))
          .some((report) => isSafe(report));
      }

      return false;
    }

    return true;
  });
}

export function safeReports(input: string, dampener = false): number {
  const reports = input
    .split('\n')
    .map((line) => line.split(' ').map((i) => parseInt(i, 10)));

  return reports.filter((report) => isSafe(report, dampener)).length;
}
