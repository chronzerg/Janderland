var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    bower = require('bower');

gulp.task('bower', () => {
    bower.commands.install();   
});

gulp.task('js', ['bower'], () => {
    return gulp.src([
            'bower_components/foundation-sites/dist/foundation.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/what-input/what-input.js'
        ])
        .pipe(gulp.dest('source/js'));
});

gulp.task('sass', ['bower'], () => {
    return gulp.src('source/_scss/app.scss')
        .pipe($.sass({
            includePaths: [
                'bower_components/foundation-sites/scss',
                'bower_components/motion-ui/src'
            ]
        }))
        .on('error', $.sass.logError)
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('source/css'));
});

gulp.task('default', ['js', 'sass']);