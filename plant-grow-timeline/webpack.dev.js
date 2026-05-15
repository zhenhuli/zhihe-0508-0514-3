const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (port) => merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    port: port,
    open: true
  }
});
