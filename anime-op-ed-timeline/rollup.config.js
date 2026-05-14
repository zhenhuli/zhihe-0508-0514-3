import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import terser from '@rollup/plugin-terser';
import { createServer } from 'net';

const isProduction = process.env.NODE_ENV === 'production';

function findAvailablePort(startPort = 3000, maxPort = 3100) {
  return new Promise((resolve) => {
    const server = createServer();
    
    server.once('error', () => {
      if (startPort < maxPort) {
        resolve(findAvailablePort(startPort + 1, maxPort));
      } else {
        resolve(3000);
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(startPort);
    });
    
    server.listen(startPort);
  });
}

export default async () => {
  const port = await findAvailablePort(3000, 3100);
  console.log(`Using port: ${port}`);

  return {
    input: 'src/main.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
      sourcemap: !isProduction,
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      nodeResolve({
        extensions: ['.js', '.vue'],
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      vue({
        compileTemplate: true,
        needMap: false
      }),
      !isProduction && serve({
        open: true,
        contentBase: ['public', 'dist'],
        port: port,
        historyApiFallback: true,
        verbose: true
      }),
      !isProduction && livereload({
        watch: 'dist',
        port: port + 1000,
        verbose: false
      }),
      isProduction && terser()
    ]
  };
};
