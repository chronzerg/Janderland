var g = require('gulp'),
    $ = require('gulp-load-plugins')();


// Configuration
// =============

var js = {
    input: 'source/_js',
    output: 'source/js'
};

var css = {
    input: 'source/_scss',
    includes: [
        'bower_components/foundation-sites/scss',
        'bower_components/foundation-icon-fonts',
        'bower_components/datatables/media/css'
    ],
    icons: 'bower_components/foundation-icon-fonts/foundation-icons.!(css)',
    output: 'source/css'
};

var require = {
    // Source folder
    baseUrl: js.input,

    // Entry point
    name: 'app',
    insertRequire: ['app'],

    // Forced includes.
    // All the page-specific modules should be included in this list because
    // they aren't an explicit dependency of the entry point. They instead are
    // loaded as needed by the 'loader' module. We also include the requireJS
    // module so that we don't have to load it with another HTTP request.
    include: [
        'face',
        'search',
        'searchQuery',
        'requireLib'
    ],

    // External modules which aren't located in the source folder.
    paths: {
        requireLib: '../../bower_components/requirejs/require',
        jquery:     '../../bower_components/jquery/dist/jquery',
        underscore: '../../bower_components/underscore/underscore',
        foundation: '../../bower_components/foundation-sites/dist/foundation',
        datatables: '../../bower_components/datatables/media/js/jquery.dataTables'
    },

    // Config for non-AMD modules.
    shim: {
        'underscore': {
            exports: '_'
        }
    }
}

// JS Tasks
// ========

g.task('js-build', () => {
    return g.src(js.input + '/app.js')
        .pipe($.sourcemaps.init())
        .pipe($.requirejsOptimize(require))
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