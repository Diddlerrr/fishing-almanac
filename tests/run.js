/* Runs every suite in turn and fails the run if any check or JS error does.
   Each suite starts its own server on its own port and closes it again, so
   they are independent — run one on its own with `node tests/app.test.js`. */
const { spawnSync } = require('child_process');
const path = require('path');

const SUITES = ['app.test.js', 'edges.test.js', 'nearby.test.js', 'tools.test.js'];
let failed = 0;

for (const suite of SUITES) {
  process.stdout.write('\n── ' + suite + '\n');
  const r = spawnSync(process.execPath, [path.join(__dirname, suite)], { stdio: 'inherit' });
  if (r.status !== 0) failed++;
}

process.stdout.write('\n' + (failed ? failed + ' of ' + SUITES.length + ' suites failed\n' : 'all ' + SUITES.length + ' suites passed\n'));
process.exit(failed ? 1 : 0);
