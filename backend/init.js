const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const JWT_SECRET = `JWT_SECRET=${crypto.randomBytes(32).toString('hex')}`;
const mode = 'NODE_ENV=production';
const envData = [JWT_SECRET, mode].join('\n');

fs.writeFile(path.resolve(__dirname, '.env'), envData, { flag: 'wx' }, (err) => {
  if (err) {
    return -1;
  }

  return 1;
});
