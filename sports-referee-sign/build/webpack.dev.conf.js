const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const net = require('net')

function getPort(startPort = 8080) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.listen(startPort, '127.0.0.1', () => {
      server.close()
      resolve(startPort)
    })
    server.on('error', () => {
      resolve(getPort(startPort + 1))
    })
  })
}

module.exports = async () => {
  const port = await getPort(8080)
  console.log(`可用端口: ${port}`)

  return merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      host: '127.0.0.1',
      port: port,
      hot: true,
      open: true,
      historyApiFallback: {
        index: '/'
      },
      static: {
        publicPath: '/'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        publicPath: '/'
      })
    ]
  })
}
