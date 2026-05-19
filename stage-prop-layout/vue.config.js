const net = require('net');

function findFreePort(startPort, endPort) {
  return new Promise((resolve, reject) => {
    const port = startPort;
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        if (port < endPort) {
          resolve(findFreePort(port + 1, endPort));
        } else {
          reject(new Error('No free ports available'));
        }
      } else {
        reject(err);
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(port);
    });
    
    server.listen(port);
  });
}

module.exports = async () => {
  const port = await findFreePort(8080, 8100);
  console.log(`Using port: ${port}`);
  
  return {
    devServer: {
      port: port,
      open: true
    },
    css: {
      sourceMap: true
    }
  };
};
