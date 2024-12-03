export function isSafe(numbers: number[], dampener = false): boolean {
  return numbers.every((current, i) => {
    const prevPrev = numbers[i - 2];
    const prev = numbers[i - 1];
    const distance = current - prev;
    const direction = typeof prevPrev !== 'undefined' ? prev - prevPrev : 0;

    if (
      distance === 0
      || Math.abs(distance) > 3
      || (direction < 0 && distance > 0)
      || (direction > 0 && distance < 0)
    ) {
      if (dampener) {
        // try again with all combinations without a number
        return numbers
          .map((_, j) => numbers.filter((_, index) => index !== j))
          .find((report) => isSafe(report));
      }

      return false;
    }

    return true;
  });
}

export function safeReports(input: string, dampener = false): number {
  const lines = input
    .split('\n')
    .map((line) => line.split(' ').map((i) => parseInt(i, 10)));

  return lines.filter((report) => isSafe(report, dampener)).length;
}
