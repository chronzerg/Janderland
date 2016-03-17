var g = require('gulp'),
    $ = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files'),
    stream2Array = require('stream-to-array'),
    fs = require('hexo-fs'),
    _ = require('lodash'),
    p = require('path');


// Configuration
// =============

var js = {
    common:   'source/js/common/app.js',
    libaries: bowerFiles(/.*\.js/),
    output: {
        lib: 'source/js/lib',
        ejs: 'layout/_generated/common_js.ejs'
    }
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
        specific: 'source/css',
        ejs:      'layout/_generated/common_css.ejs'
    }
};


// Helpers
// =======

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

function toFileList (gulpSrc) {
    return stream2Array(gulpSrc)
    .then((array) => {
        return array.map((vinyl) => {
            return p.relative('./source', vinyl.path)
        }).map((path) => {
            // make windows paths url friendly
            return path.replace(/\\+/g, '/');
        });
    });
}


// JS Tasks
// ========

g.task('js-libraries', () => {
    return g.src(js.libaries).pipe(g.dest(js.output.lib));
});

g.task('js-ejs', ['js-libraries'], () => {
    return toFileList(g.src([js.output.lib + '/*.js', js.common]))
    .then((files) => {
        var data = '<%- js(' + JSON.stringify(files, null, 4) + ') %>';
        return fs.writeFile(js.output.ejs, data);
    });
});

g.task('js', ['js-libraries', 'js-ejs']);


// CSS Tasks
// ==========

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

g.task('css-ejs', ['css-specific', 'css-common', 'css-foundation', 'css-icons'], () => {
    return toFileList(g.src(css.output.common + '/*.css'))
    .then((files) => {
        var data = '<%- css(' + JSON.stringify(files, null, 4) + ') %>';
        return fs.writeFile(css.output.ejs, data);
    });
});

g.task('css', ['css-specific', 'css-common', 'css-foundation', 'css-icons', 'css-ejs']);


// Clean Tasks
// ===========

g.task('clean-js', () => {
    return g.src(_.toArray(js.output))
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