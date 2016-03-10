var g = require('gulp'),
    $ = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files')


// Configuration
// =============

// External JS Libraries
var jsLibs = bowerFiles(/.*\.js/)

// Foundation Sass
var foundSass = 'source/_scss/found.scss'

// Jander Sass
var janderSass = [
    'source/_scss/index.scss'
]

// Sass Includes
var sassInc = [
    'bower_components/foundation-sites/scss'
]

var iconFiles = 'bower_components/foundation-icon-fonts/foundation-icons.*'

// Destinations
var jsDst = 'source/js/lib',
    cssDst = 'source/css'


// JS Tasks
// ========

g.task('js', () => {
    return g.src(jsLibs)
        .pipe(g.dest(jsDst))
})


// SASS Tasks
// ==========

g.task('sass-foundation', () => {
    return g.src(foundSass)
        .pipe($.sass({
            includePaths: sassInc
        }))
        .on('error', $.sass.logError)
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe($.rename('foundation.css'))
        .pipe(g.dest(cssDst))
})

g.task('sass-jander', () => {
    return g.src(janderSass)
        .pipe($.sass({
            includePaths: sassInc
        }))
        .on('error', $.sass.logError)
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(g.dest(cssDst))
})

g.task('sass', ['sass-foundation', 'sass-jander'])


// Icon Tasks
// ==========

g.task('icons', () => {
    return g.src(iconFiles)
        .pipe(g.dest(cssDst))
})


// Clean Tasks
// ===========

g.task('clean-js', () => {
    return g.src(jsDst)
        .pipe($.clean())
})

g.task('clean-css', () => {
    return g.src(cssDst)
        .pipe($.clean())
})

g.task('clean', ['clean-js', 'clean-css'])


// Watch Tasks
// ===========

g.task('watch', ['default'], () => {
    g.watch(jsLibs, ['js'])
    g.watch(foundSass, ['sass-foundation'])
    g.watch(janderSass, ['sass-jander'])
    g.watch(iconFiles, ['icons'])
})


// Default Task
// ============

g.task('default', ['js', 'sass', 'icons'])