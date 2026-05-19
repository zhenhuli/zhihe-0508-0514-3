const net = require('net');
const { spawn } = require('child_process');

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
}

async function findFreePort(startPort = 4000) {
  let port = startPort;
  while (!(await checkPort(port))) {
    port++;
  }
  return port;
}

async function main() {
  const port = await findFreePort(4000);
  console.log(`Starting dev server on port ${port}...`);
  console.log(`Open http://localhost:${port} in your browser\n`);
  
  const child = spawn('npx', ['snowpack', 'dev', '--port', port.toString()], {
    stdio: 'inherit',
    cwd: __dirname + '/..'
  });
  
  child.on('exit', (code) => {
    process.exit(code);
  });
}

main();
