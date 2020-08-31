const path = require('path');

module.exports = {
  entry: './server.js',
  mode: 'production',
  target: 'node',
    alias: {
      'pg-native': './donotdelete.js',
    'dns': './donotdelete.js'
    },
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'server.bundle.js'
  }
};
