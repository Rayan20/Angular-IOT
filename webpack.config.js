const path = require('path');

module.exports = {
  entry: './server.js',
  mode: 'production',
  target: 'node',
    // alias: {
    //   'pg-native': './donotdelete.js',
    // 'dns': './donotdelete.js'
    // },
    plugins: [
        new webpack.IgnorePlugin(/^pg-native$/)
    ],
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'server.bundle.js'
  }
};
