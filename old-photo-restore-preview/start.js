const net = require('net');
const { spawn } = require('child_process');

function findFreePort(startPort = 1234) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findFreePort(startPort + 1));
      } else {
        reject(err);
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(startPort);
    });
    
    server.listen(startPort);
  });
}

async function startServer() {
  try {
    const port = await findFreePort(1234);
    console.log(`找到空闲端口: ${port}`);
    console.log(`正在启动开发服务器...`);
    console.log(`服务器地址: http://localhost:${port}`);
    console.log('----------------------------------------');
    
    const child = spawn('npx', ['parcel', 'index.html', '--port', port], {
      cwd: __dirname,
      stdio: 'inherit'
    });
    
    child.on('error', (err) => {
      console.error('启动失败:', err);
      process.exit(1);
    });
    
    child.on('close', (code) => {
      process.exit(code);
    });
  } catch (err) {
    console.error('启动失败:', err);
    process.exit(1);
  }
}

startServer();
