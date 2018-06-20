var gulp       = require('gulp'), // Подключаем Gulp
		sass         = require('gulp-sass'), //Подключаем Sass пакет,
		browserSync  = require('browser-sync'), // Подключаем Browser Sync
		concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
		cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
		rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
		del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
		imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
		pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
		cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
		autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
		spritesmith  = require('gulp.spritesmith');

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('source/sass/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('source/css')) // Выгружаем результата в папку source/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'source' // Директория для сервера - source
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('source/css/libs.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('source/css')); // Выгружаем в папку source/css
});

gulp.task('watch', ['browser-sync', 'css-libs'], function() {
	gulp.watch('source/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('source/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('source/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('source/img/**/*') // Берем все изображения из source
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'source/css/*.css',
		'source/output/*.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'source/output/*.css'
		])
	.pipe(gulp.dest('dist/output'))

	var buildFonts = gulp.src('source/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('source/js/*js') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('source/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
