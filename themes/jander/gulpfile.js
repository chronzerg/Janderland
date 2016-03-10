var g = require('gulp'),
    $ = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files')

// Configuration
// =============

var jsDstPath = 'source/js/lib',
    sassDstPath = 'source/css/lib'

// Tasks
// =====

g.task('js', () => {
    return g.src(bowerFiles(/.*\.js/))
        .pipe(g.dest(jsDstPath))
})

g.task('sass', () => {
    return g.src('source/_scss/app.scss')
        .pipe($.sass({
            includePaths: 'bower_components/foundation-sites/scss'
        }))
        .on('error', $.sass.logError)
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe($.rename('foundation.css'))
        .pipe(g.dest(sassDstPath))
})

g.task('clean', () => {
    // TODO - Clean bower files too.
    return g.src([jsDstPath, sassDstPath])
    .pipe($.clean())
})

g.task('default', ['js', 'sass'])