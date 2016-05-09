var g = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');


// Configuration
// =============

var js = {
    input: 'source/_js',
    output: 'source/js'
};

var css = {
    input: 'source/_scss',
    includes: [
        'node_modules/foundation-sites/scss',
        'bower_components/foundation-icon-fonts'
    ],
    icons: 'bower_components/foundation-icon-fonts/foundation-icons.!(css)',
    output: 'source/css'
};

// JS Tasks
// ========

g.task('js-build', () => {
    var b = browserify(js.input + '/app.js', { debug: true });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .pipe($.uglify())
        .on('error', $.util.log)
        .pipe($.sourcemaps.write('./'))
        .pipe(g.dest(js.output));
});

g.task('js', ['js-build']);


// CSS Tasks
// ==========

g.task('css-build', () => {
    var sass = $.sass({
        includePaths: css.includes 
    }).on('error', $.sass.logError);

    var autoprefixer = $.autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9']
    });

    return g.src(css.input + '/app.scss')
        .pipe($.sourcemaps.init())
        .pipe(sass)
        .pipe(autoprefixer)
        .pipe($.sourcemaps.write())
        .pipe(g.dest(css.output));
});

g.task('css-icons', () => {
    return g.src(css.icons)
        .pipe(g.dest(css.output));
});

g.task('css', ['css-build', 'css-icons']);


// Clean Tasks
// ===========

g.task('clean-css', () => {
    return g.src(css.output).pipe($.clean());
});

g.task('clean-js', () => {
    return g.src(js.output).pipe($.clean());
})

g.task('clean', ['clean-css', 'clean-js']);


// Watch Tasks
// ===========

g.task('watch', ['default'], () => {
    g.watch(css.input + '/*.scss', ['css']);
    g.watch(js.input + '/*.js', ['js']);
});


// Default Task
// ============

g.task('default', ['css', 'js']);