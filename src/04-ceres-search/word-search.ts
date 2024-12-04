function letterInGrid(grid: string[][], y: number, x: number): string {
  if (grid[y] && grid[y][x]) {
    return grid[y][x];
  }

  return '';
}

export function searchWord(input: string, word = 'XMAS'): number {
  const grid = input.split('\n').map((line) => line.split(''));

  let total = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (letterInGrid(grid, y, x) === word[0]) {
        const f = {
          e: true, s: true, w: true, n: true,
          ne: true, se: true, sw: true, nw: true,
        }

        for (let w = 1; w < word.length; w++) {
          if (f.e && word[w] !== letterInGrid(grid, y, x + w)) {
            f.e = false;
          }

          if (f.s && word[w] !== letterInGrid(grid, y + w, x)) {
            f.s = false;
          }

          if (f.w && word[w] !== letterInGrid(grid, y, x - w)) {
            f.w = false;
          }

          if (f.n && word[w] !== letterInGrid(grid, y - w, x)) {
            f.n = false;
          }

          if (f.ne && word[w] !== letterInGrid(grid, y - w, x + w)) {
            f.ne = false;
          }

          if (f.se && word[w] !== letterInGrid(grid, y + w, x + w)) {
            f.se = false;
          }

          if (f.sw && word[w] !== letterInGrid(grid, y + w, x - w)) {
            f.sw = false;
          }

          if (f.nw && word[w] !== letterInGrid(grid, y - w, x - w)) {
            f.nw = false;
          }
        }

        total += Object.values(f).filter((v) => v).length;
      }
    }
  }

  return total;
}

export function xSearch(input: string): number {
  const grid = input.split('\n').map((line) => line.split(''));

  let total = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (letterInGrid(grid, y, x) === 'A') {
        const nw = letterInGrid(grid, y - 1, x - 1);
        const ne = letterInGrid(grid, y - 1, x + 1);
        const se = letterInGrid(grid, y + 1, x + 1);
        const sw = letterInGrid(grid, y + 1, x - 1);

        const we = (nw === 'M' && se === 'S') || (nw === 'S' && se === 'M');
        const ew = (ne === 'M' && sw === 'S') || (ne === 'S' && sw === 'M');

        if (we && ew) {
          total++;
        }
      }
    }
  }

  return total;
}
