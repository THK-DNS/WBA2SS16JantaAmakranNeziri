var gulp = require('gulp');
var babel = require('gulp-babel');

var dir = {
	src: 'src/**/**.js',
	dist: 'dist/',
	test: 'test/',
	docs: 'docs'
};

gulp.task('default', function() {
	return gulp.src(dir.src)
			.pipe(babel())
			.pipe(gulp.dest(dir.dist));
});