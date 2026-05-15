const detectPort = require('detect-port');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const DEFAULT_PORT = 3000;

detectPort(DEFAULT_PORT, (err, port) => {
  if (err) {
    console.error('检测端口失败:', err);
    process.exit(1);
  }

  if (port !== DEFAULT_PORT) {
    console.log(`端口 ${DEFAULT_PORT} 已被占用，使用端口 ${port}`);
  }

  const config = require('../webpack.dev.js')(port);
  const compiler = webpack(config);
  const server = new WebpackDevServer(config.devServer, compiler);

  server.start().then(() => {
    console.log(`开发服务器已启动在 http://localhost:${port}`);
  }).catch((err) => {
    console.error('启动服务器失败:', err);
    process.exit(1);
  });
});
