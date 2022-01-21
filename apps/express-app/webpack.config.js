const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './index.js',
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
