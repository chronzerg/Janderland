var g = require('gulp'),
    $ = require('gulp-load-plugins')();


// Configuration
// =============

var js = {
    input: 'source/_js',
    config: {
        name: 'app',
        baseUrl: 'source/_js',
        include: ['requireLib'],
        insertRequire: ['app'],
        paths: {
            requireLib: '../../bower_components/requirejs/require',
            underscore: '../../bower_components/underscore/underscore',
            foundation: '../../bower_components/foundation-sites/dist/foundation',
            jquery:     '../../bower_components/jquery/dist/jquery',
        },
        shim: {
            'underscore': {
                exports: '_'
            },
            'foundation': {
                deps: ['jquery']
            }
        }
    },
    output: 'source/js'
};

var css = {
    input: 'source/_scss',
    includes: [
        'bower_components/foundation-sites/scss',
        'bower_components/foundation-icon-fonts'
    ],
    icons: 'bower_components/foundation-icon-fonts/foundation-icons.!(css)',
    output: 'source/css'
};

// JS Tasks
// ========

g.task('js-build', () => {
    return g.src(js.input + '/app.js')
        .pipe($.sourcemaps.init())
        .pipe($.requirejsOptimize(js.config))
        .pipe($.sourcemaps.write())
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