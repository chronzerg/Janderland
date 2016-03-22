var g = require('gulp'),
    $ = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files');


// Configuration
// =============

var js = {
    libaries: bowerFiles(/.*\.js/)
};

var css = {
    inputFolder: 'source/_scss',
    inputFile: 'app.scss',
    includes: [
        'bower_components/foundation-sites/scss',
        'bower_components/foundation-icon-fonts'
    ],
    icons: 'bower_components/foundation-icon-fonts/foundation-icons.!(css)',
    output: 'source/css'
};


// CSS Tasks
// ==========

g.task('css-sass', () => {
    var sass = $.sass({
        includePaths: css.includes 
    }).on('error', $.sass.logError);

    var autoprefixer = $.autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9']
    });

    return g.src(css.inputFolder + '/' + css.inputFile)
        .pipe($.sourcemaps.init())
        .pipe(sass)
        .pipe(autoprefixer)
        .pipe($.sourcemaps.write())
        .pipe(g.dest(css.output));
});

g.task('css-icons', () => {
    return g.src(css.icons)
        .pipe($.rename((path) => {
            path.basename = 'icons';
        }))
        .pipe(g.dest(css.output));
});

g.task('css', ['css-sass', 'css-icons']);


// Clean Tasks
// ===========

g.task('clean-css', () => {
    return g.src(css.output).pipe($.clean());
});

g.task('clean', ['clean-css']);


// Watch Tasks
// ===========

g.task('watch', ['default'], () => {
    g.watch(css.inputFolder + '/*.scss', ['css']);
});


// Default Task
// ============

g.task('default', ['css']);