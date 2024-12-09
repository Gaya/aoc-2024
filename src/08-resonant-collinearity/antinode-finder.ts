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

export function getAntinodes(grid: AntennaGrid, doubled = false): number {
  const Locations = new Set();

  Object.values(grid.antennas).forEach((antennas) => {
    antennas.forEach((antenna, index) => {
      if (doubled) {
        Locations.add(antenna.join(':'));
      }

      if (index === antennas.length - 1) {
        return;
      }

      const [x, y] = antenna;
      const others = antennas.slice(index + 1);
      others.forEach((otherAntenna) => {
        const [ox, oy] = otherAntenna;
        const xDist = x - ox;
        const yDist = y - oy;

        let canAdd = true;
        let j = 1;
        while (canAdd) {
          let success = 0;
          const nx = x + (xDist * j);
          const ny = y + (yDist * j);

          if (nx >= 0 && nx < grid.cols && ny >= 0 && ny < grid.rows) {
            Locations.add([nx, ny].join(':'));
            success++;
          }

          const onx = ox - (xDist * j);
          const ony = oy - (yDist * j);

          if (onx >= 0 && onx < grid.cols && ony >= 0 && ony < grid.rows) {
            Locations.add([onx, ony].join(':'));
            success++;
          }

          j++;
          canAdd = doubled && success > 0;
        }
      });
    });
  });

  return Locations.size;
}
