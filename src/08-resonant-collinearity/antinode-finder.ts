interface AntennaGrid {
  antennas: Record<string, [number, number][]>;
  rows: number;
  cols: number;
}

export function parseInput(input: string): AntennaGrid {
  const lines = input.split('\n');
  const cols = lines[0].length;
  const rows = lines.length;

  const matches = [...lines.join('').matchAll(/(?!\.|$)./gm)];

  const antennas = matches.reduce((acc: AntennaGrid['antennas'], match) => {
    const x = match.index % cols;
    const y = Math.floor(match.index / cols);

    const pos: [number, number] = [x, y];

    return {
      ...acc,
      [match[0]]: [...(acc[match[0]] || []), pos],
    };
  }, {});

  return {
    antennas,
    cols,
    rows
  };
}

export function getAntinodes(grid: AntennaGrid): number {
  const Locations = new Set();

  Object.values(grid.antennas).forEach((antennas) => {
    antennas.forEach((antenna, index) => {
      if (index === antennas.length - 1) {
        return;
      }

      const [x, y] = antenna;
      const others = antennas.slice(index + 1);
      others.forEach((otherAntenna) => {
        const [ox, oy] = otherAntenna;
        const xDist = x - ox;
        const yDist = y - oy;
        const positions = [
          [x + xDist, y + yDist],
          [ox - xDist, oy - yDist],
        ];

        positions.forEach((pos) => {
          if (pos[0] >= 0 && pos[0] < grid.cols && pos[1] >= 0 && pos[1] < grid.rows) {
            Locations.add(pos.join(':'));
          }
        });
      });
    });
  });

  return Locations.size;
}
