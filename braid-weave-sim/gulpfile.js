const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const detectPort = require('detect-port');
const { exec } = require('child_process');

const paths = {
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  html: 'src/**/*.html'
};

function style() {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function js() {
  return gulp.src(paths.js)
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

function html() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function watch() {
  const defaultPort = 3000;
  
  detectPort(defaultPort, (err, port) => {
    if (err) {
      console.error('端口检测失败:', err);
      return;
    }
    
    browserSync.init({
      server: {
        baseDir: './dist'
      },
      port: port,
      open: true,
      notify: false
    });
    
    if (port !== defaultPort) {
      console.log(`端口 ${defaultPort} 已被占用，使用端口 ${port}`);
    }
    
    const url = `http://localhost:${port}`;
    console.log(`项目已启动: ${url}`);
    
    const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
    exec(start + ' ' + url);
  });
  
  gulp.watch(paths.scss, style);
  gulp.watch(paths.js, js);
  gulp.watch(paths.html, html);
}

const build = gulp.series(style, js, html);

exports.style = style;
exports.js = js;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = gulp.series(build, watch);
