/* Scratch space for downloads the suites capture, plus the 8x8 PNG they
   upload wherever a photo is needed. */
const fs = require('fs');
const os = require('os');
const path = require('path');

const TMP = path.join(os.tmpdir(), 'fishing-almanac-tests');
fs.mkdirSync(TMP, { recursive: true });

const SHOT = path.join(__dirname, 'fixtures', 'shot.png');

module.exports = { TMP, SHOT };
