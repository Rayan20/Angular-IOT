const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './server.js',
  mode: 'production',
  target: 'node',
  plugins: [ new webpack.IgnorePlugin(/^pg-native$/)],
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'server.bundle.js'
  }
};
