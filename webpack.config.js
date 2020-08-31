const path = require('path');

module.exports = {
  entry: './server.js',
  mode: 'production',
  target: 'node',
    // alias: {
    //   'pg-native': './donotdelete.js',
    // 'dns': './donotdelete.js'
    // },
    alias: {
        'pg-native': path.join(__dirname, 'pg-native.js'),
        'pgpass$': path.join(__dirname, 'pgpass.js'),
    },
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'server.bundle.js'
  }
};
