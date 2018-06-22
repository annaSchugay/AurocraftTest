const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync')
const concat = require('gulp-concat')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const del = require('del')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const cache = require('gulp-cache')
const autoprefixer = require('gulp-autoprefixer')
const spritesmith = require('gulp.spritesmith')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('sass', () => {
  return gulp.src('source/sass/**/*.scss')
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('clean-index-js', () => del.sync('source/js/index.js'))

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    notify: false,
    open: false
  });
});

gulp.task('css-libs', ['sass'], () => {
  return gulp.src('source/css/index.css')
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/css'))
});

gulp.task('fonts', () => {
  gulp.src('source/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('html', () => {
  gulp.src('source/*.html')
  .pipe(gulp.dest('dist'))
});

gulp.task('babel', () =>
  gulp.src('source/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['latest']
  }))
  .pipe(concat('index.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.reload({stream: true}))
)

gulp.task('clean', () => del.sync('dist'))

gulp.task('img', () =>
  gulp.src('source/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'))
)

gulp.task('watch', ['browser-sync', 'babel', 'css-libs', 'fonts', 'img', 'html'], () => {
  gulp.watch('source/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch('source/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('source/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('build', ['clean', 'img', 'sass', 'css-libs', 'babel'], () => {

  const buildCss = gulp.src([
    'source/css/index.min.css',
    // 'source/output/*.css'
  ])
  .pipe(gulp.dest('dist/css'))

  const buildFonts = gulp.src('source/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))

  const buildJs = gulp.src('source/js/index.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(gulp.dest('dist/js'))

  const buildHtml = gulp.src('source/*.html')
  .pipe(gulp.dest('dist'))
});

gulp.task('clear', callback => cache.clearAll())


gulp.task('default', ['watch']);
