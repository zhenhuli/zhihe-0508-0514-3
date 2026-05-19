const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const portfinder = require('portfinder')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    open: true,
    compress: true,
    disableHostCheck: true
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 8080
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      devWebpackConfig.devServer.port = port
      console.log('\n=====================================')
      console.log(`  笛子指法图谱库已启动`)
      console.log(`  本地访问: http://localhost:${port}`)
      console.log('=====================================\n')
      resolve(devWebpackConfig)
    }
  })
})
