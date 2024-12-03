import { readdir, readFile, writeFile } from 'fs/promises';

interface Module {
  default(input: string): [number | string, number | string];
}

const days = process.argv.slice(2).map((b) => parseInt(b, 10));

const totalStart = +new Date();

readdir(__dirname)
  .then((files) => files.filter((file) => file.match(/^(\d+)+.+$/)))
  .then((files): Promise<[Module, string][]> => {
    const modules = files.map((dir): Promise<[Module, string]> => {
      return Promise.all([
        import(`${__dirname}/${dir}`),
        readFile(`${__dirname}/${dir}/input.txt`).then((o) => o.toString()),
      ]);
    });

    return Promise.all(modules);
  })
  .then((modAndInputs) => {
    const start = +new Date();
    let totalTime = 0;

    let output = '';

    function log(input: string) {
      output = [output, input].join('\n');
      console.log(input);
    }

    for (let i = 1; i < modAndInputs.length; i++) {
      if (days.length > 0 && !days.includes(i)) {
        console.log('Skip day:', i);
        continue;
      }

      const startDay = process.hrtime.bigint();
      const [module, input] = modAndInputs[i];
      const [p1, p2] = module.default(input);
      const time = Number(process.hrtime.bigint() - startDay) / 1e6;
      totalTime += time;

      log(`======== Day ${i} ========`);
      log(`Part 1: ${p1}`);
      log(`Part 2: ${p2}`);
      log(`⏱ Day ${i} time: ${time.toPrecision(5)}ms`);
    }

    log('========================');
    log(`Execution time: ${totalTime.toPrecision(5)}ms`);
    log(`⏱ Total time with cleanup: ${+new Date() - start}ms`);
    log(`⏱ Total time with loading and cleanup: ${+new Date() - totalStart}ms`);

    return output;
  })
  .then((output) => {
    const path = `${__dirname}/../README.md`;
    return readFile(path)
      .then((o) => o.toString())
      .then((readme) => readme.replace(/```(\n.+)+\n```/, ['```', output, '\n```'].join('')))
      .then((newReadme) => writeFile(path, newReadme))
      .then(() => {
        console.log('Updated README.md');
      });
  })
  .catch(console.error);
