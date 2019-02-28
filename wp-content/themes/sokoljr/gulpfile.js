'use strict';

/**
 *  Gulp config
 *
 *  Author:   Serhii Sokol
 *  Version:  1.0
 *  Date:     February 12, 2019
 */



/**
 *  Gulp & NodeJS modules:
 */
let gulp        = require( 'gulp' ),                // Gulp
    notify      = require( 'gulp-notify' ),         // Notify on errors
    browserify  = require( 'gulp-browserify' ),     // Bundler for JS modules
    util        = require( 'gulp-util' ),           // Gulp utils
    watch       = require( 'gulp-watch' ),          // File watcher, for run tasks on file change
    prefixer    = require( 'gulp-autoprefixer' ),   // Vendor autoprefixer, for CSS
    sourcemap   = require( 'gulp-sourcemaps' ),     // Sourcemap generator, works with SASS, SCSS, LESS, Stylus, JS, coffee and other
    uglify      = require( 'gulp-uglify' ),         // All file in 1 string, no spaces and line brakes, for production builds
    sass        = require( 'gulp-sass' ),           // SASS/SCSS compiler
    cssmin      = require( 'gulp-clean-css' ),      //
    imagemin    = require( 'gulp-imagemin' ),       // Minifier for images, .gif, .jpg, .png, .svg
    pngquant    = require( 'imagemin-pngquant' ),   // Used by gulp-imagemin for .png compression
    rimraf      = require( 'rimraf' ),              // Unix «rm -rf» equal for NodeJS
    browserSync = require( 'browser-sync' ),        // Powerful browser live reload, web-server, remote debugger (ex.: for mobile)
    spritesmith = require( 'gulp.spritesmith' ),    // Icons sprite builder
    gulpif      = require( 'gulp-if' ),             // Conditional operator for gulp
    plumber     = require( 'gulp-plumber' ),        // Catch syntax error and print it to console
    rename      = require( 'gulp-rename' ),         // Rename file (used for file.ext -> file.min.ext),
    fs          = require( 'file-system' ),         // Tools for filesystem usage
    wait        = require( 'gulp-wait' ),           // For delay before task start
    reload      = browserSync.reload;               // Reload browser method



/**
 *  For PHP sites we need proxy to local domain,
 *  for example env.proxyurl can be http://localhost etc.
 *
 *  gulpenv.js - ignored by .gitignore file
 *
 *  Each developer can use different local domain,
 *  like http://test.lan, http://test.dev, http://test
 *
 *  So, he can just write his own domain for proxying
 *
 */
let env, proxyurl;

if( fs.existsSync( './gulpenv.js' ) ){
    env = require( './gulpenv' );
} else {
    env = {
        proxyurl: 'http://localhost'
    }
}

proxyurl = env.proxyurl;



/**
 *  Our projects have structure like this:
 *
 *  ./
 *  -- assets
 *    -- dist
 *      -- css
 *      -- fonts
 *      -- img
 *      -- js
 *      -- svg
 *    -- src
 *      -- fonts
 *      -- img
 *      -- js
 *          --vendor
 *      -- svg
 *      -- scss
 *  -- index.php
 *  ... other markup or php files and dirs
 *
 *  You can re-config compiler path for your folders structure ease.
 *  Just edit object path for your needs
 */
let path = {
    build: {
        js:         './assets/dist/js/',
        vendor:     './assets/dist/vendor/',
        css:        './assets/dist/css/',
        img:        './assets/dist/img/',
        svg:        './assets/dist/svg/',
        fonts:      './assets/dist/fonts/',
    },
    src: {
        js:         [ './assets/src/js/app.js' ],
        vendor:     [ './assets/src/js/vendor/**/*.js', './assets/src/js/vendor/**/*.scss', './assets/src/js/vendor/**/*.css' ],
        scss:       [ './assets/src/scss/*.scss' ],
        img:        [ './assets/src/img/*.*' ],
        svg:        [ './assets/src/svg/*.svg' ],
        fonts:      [ './assets/src/fonts/**/*.*' ],
    },
    watch: {
        js:         [ './assets/src/js/app.js' ],
        vendor:     [ './assets/src/js/vendor/**/*.js', './assets/src/js/vendor/**/*.scss', './assets/src/js/vendor/**/*.css' ],
        img:        [ './assets/src/img/*.*' ],
        scss:       [ './assets/src/scss/**/*.scss'],
        svg:        [ './assets/src/svg/*.svg' ],
        fonts:      [ './assets/src/fonts/**/*.*' ],
        php:        [ './**/*.php' ],
    },
    clean:    './assets/build'
};



/**
 *  Web-server config
 *  used by BrowserSync module
 */
let config = {};

if( util.env.production !== true ){
    config = {
        logPrefix:  "CRISP Devil",
        proxy:      env.proxyurl,
        port:       3000
    };
} else {
    config = {
        server: {
            base: '/'
        }
    }
}



/**
 *  Build JavaScripts
 */
gulp.task('js:build', () => {
    return gulp.src(path.src.js)
        .pipe(sourcemap.init())
        .pipe(browserify({transform: ['babelify', 'aliasify']}).on('error', notify.onError()))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
});

/**
 *  Build JavaScripts Libraries
 */
gulp.task('vendor:build', () => {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
    ]).pipe(gulp.dest(path.build.vendor))
        .pipe(reload({ stream: true }));
});



/**
 *  Build SCSS
 */
gulp.task('scss:build', () => {
    return gulp.src(path.src.scss)
        .pipe(sourcemap.init())
        .pipe(sass().on('error', notify.onError()))
        .pipe(prefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemap.write())
        .pipe(gulp.dest( path.build.css ))
        .pipe(reload({ stream: true }));

});



/**
 *  Copy and compress images
 */
gulp.task('image:build', () => {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({ stream: true }));
});



/**
 *  SVG Builds
 */
gulp.task('svg:build', () => {
    return gulp.src(path.src.svg)
        .pipe(gulp.dest(path.build.svg));
});



/**
 *  Fonts Builds
 */
gulp.task('fonts:build', () => {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});



/**
 *  PHP Builds
 *  If for sure - it's just watcher for reload browser, when you edit .php files =)
 */
gulp.task('php:build', () => { reload() });



/**
 *  Build task
 *  run all tasks
 */
gulp.task('build', [
    'js:build',
    'vendor:build',
    'scss:build',
    'image:build',
    'svg:build',
    'fonts:build'
]);



/**
 *  File watchers
 */
gulp.task('watch', function(){
    watch(path.watch.scss,      () => { gulp.start('scss:build') });
    watch(path.watch.js,        () => { gulp.start('js:build') });
    watch(path.watch.vendor,    () => { gulp.start('vendor:build') });
    watch(path.watch.img,       () => { gulp.start('image:build') });
    watch(path.watch.svg,       () => { gulp.start('svg:build') });
    watch(path.watch.fonts,     () => { gulp.start('fonts:build') });
    watch(path.watch.php,       () => { gulp.start('php:build') });
});



/**
 *  Start web-server
 */
gulp.task('server', function(){
    browserSync(config);
});



/**
 *  Clean up build folder
 */
gulp.task('clean', function(cd){
    rimraf(path.clean, cd);
});



/**
 *  Default task for
 *  $ gulp
 *  with no args
 */
gulp.task('default', ['build', 'server', 'watch']);


/**
 * -------------------------------------
 *  Production build
 * -------------------------------------
 */


/**
 * JavaScript production build
 */
gulp.task('js:prod', function(){
    return gulp.src(path.src.js)
        .pipe(browserify({transform: ['babelify', 'aliasify']}).on('error', notify.onError()))
        .pipe(uglify())
        .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js));
});

/**
 *  Production JavaScripts Libraries
 */
gulp.task('vendor:prod', () => {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
    ]).pipe(gulp.dest(path.build.vendor))
        .pipe(reload({ stream: true }));
});


/**
 * SCSS production build
 */
gulp.task('scss:prod', function () {
    return gulp.src(path.src.scss)
        .pipe(sass().on('error', notify.onError()))
        .pipe(prefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css));
});


/**
 * Images production build
 */
gulp.task('images:prod', function(){
    return gulp.src(path.src.img)
        .pipe(imagemin().on('error', notify.onError()))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({ stream: true }));
});


/**
 * SVG production build
 */
gulp.task('svg:prod', function(){
    return gulp.src(path.src.svg)
        .pipe(gulp.dest(path.build.svg));
});


/**
 * Fonts production build
 */
gulp.task('fonts:prod', function(){
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});


/**
 * Run production builds
 */
gulp.task('prod', ['js:prod', 'vendor:prod', 'scss:prod', 'images:prod', 'svg:prod', 'fonts:prod']);
