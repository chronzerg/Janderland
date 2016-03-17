var g = require('gulp'),
    $ = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files'),
    _ = require('lodash');


// Configuration
// =============

var js = {
    libaries: bowerFiles(/.*\.js/),
    output:   'source/js/lib'
};

var css = {
    jander: {
        common:   'source/_scss/app.scss',
        specific: 'source/_scss/!(app).scss'
    },
    foundation: {
        entry:    'source/_scss/foundation/entry.scss',
        settings: 'source/_scss/foundation/settings.scss',
        icons:    'bower_components/foundation-icon-fonts/foundation-icons.*',
        includes: 'bower_components/foundation-sites/scss'
    },
    output: {
        common:   'source/css/common',
        specific: 'source/css'
    }
};


// JS Tasks
// ========

// Copy JavaScript libraries into the the output folder.
g.task('js', () => {
    return g.src(js.libaries).pipe(g.dest(js.output));
});


// SASS Tasks
// ==========

function compileSass (gulpSrc) {
    return gulpSrc
        .pipe($.sass({
            includePaths: css.foundation.includes
        }))
        .on('error', $.sass.logError)
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }));
}

g.task('css-specific', () => {
    return compileSass(g.src(css.jander.specific))
        .pipe(g.dest(css.output.specific));
});

g.task('css-common', () => {
    return compileSass(g.src(css.jander.common))
        .pipe(g.dest(css.output.common));
});

g.task('css-foundation', () => {
    return compileSass(g.src(css.foundation.entry))
        .pipe($.rename('foundation.css'))
        .pipe(g.dest(css.output.common));
});

g.task('css-icons', () => {
    return g.src(css.foundation.icons).pipe(g.dest(css.output.common));
});

g.task('css', ['css-specific', 'css-common', 'css-foundation', 'css-icons']);


// Clean Tasks
// ===========

g.task('clean-js', () => {
    return g.src(js.output)
        .pipe($.clean());
});

g.task('clean-css', () => {
    return g.src(_.toArray(css.output))
        .pipe($.clean());
});

g.task('clean', ['clean-js', 'clean-css']);


// Watch Tasks
// ===========

g.task('watch', ['default'], () => {
    g.watch([
            css.foundation.settings,
            css.jander.specific
        ], ['css-specific']);

    g.watch([
            css.foundation.settings,
            css.jander.common
        ], ['css-common']);

    g.watch([css.foundation.settings], ['css-foundation']);
});


// Default Task
// ============

g.task('default', ['js', 'css']);