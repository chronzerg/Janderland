var g = require('gulp'),
    $ = require('gulp-load-plugins')(),
    b = require('bower');

// Configuration
// =============

var jsFiles = [
    'bower_components/foundation-sites/dist/foundation.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/what-input/what-input.js',
    'bower_components/jQuery-Flex-Vertical-Center/jquery.flexverticalcenter.js'
];
var sassPaths = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

// Tasks
// =====

g.task('bower', () => {
    b.commands.install();   
});

g.task('js', ['bower'], () => {
    return g.src(jsFiles)
        .pipe(g.dest('source/js/lib'));
});

g.task('sass', ['bower'], () => {
    return g.src('source/_scss/foundation-app.scss')
        .pipe($.sass({
            includePaths: sassPaths
        }))
        .on('error', $.sass.logError)
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe($.rename('foundation.css'))
        .pipe(g.dest('source/css/lib'));
});

g.task('default', ['js', 'sass']);