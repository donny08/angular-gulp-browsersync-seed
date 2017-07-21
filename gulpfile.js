//Use the required plugins
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
//var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var watchify = require('gulp-watchify');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var minifyHtml = require("gulp-minify-html");
var gulpNgConfig = require('gulp-ng-config');

var bundlePaths = {
    src: [
        'app/css/*.css',
        'app/modules/**/*.html',
        'app/modules/**/*.js',
        'app/*.js',
        'app/*.html'
    ],
    dest: 'app/build'
}

//For server hosting use BrowserSync
gulp.task('build:serve', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'dist',
        }
    });
});
/****************************************

Use this command "gulp serve" to host the app on local server.
In this task, gulp watches the specified files for changes and reloads the browser on every change made.

****************************************/
// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['clean', 'browserify'], function(done) {

    // Reloads the browser whenever HTML or JS or CSS files change and Uses browserSync.reload to reload the browser
    browserSync.reload();
    done();
});

gulp.task('serve', ['clean', 'browserify'], function() {

    //For server hosting use BrowserSync
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'app',
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(bundlePaths.src, ['js-watch']);
});


// Lint
gulp.task('lint', function() {
    gulp.src(['./app/modules/**/*.js', './app/ui_components/*.js', './app/config.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
    gulp.src('./app/js/bundled.js')
        .pipe(clean({ force: true }));
});

gulp.task('clean:build', function() {
    gulp.src('./dist/*')
        .pipe(clean({ force: true }));
});

gulp.task('minify-css', function() {
    var opts = { comments: true, spare: true };
    gulp.src(['./app/**/*.css'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-js', function() {
    gulp.src('./app/ui_components/**/*.js')
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('./dist/ui_components/'));

    gulp.src('./app/config.js')
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-config-js', function() {
    gulp.src(['./app/config.js'])
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-bower-components', function() {
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('minify-html', function() {
    gulp.src('./app/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/'));

    gulp.src('./app/modules/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/modules'));
});

// gulp.task('browserify', function() {
//     gulp.src(['app/app.js'])        
//         .pipe(browserify({
//             insertGlobals: true,
//             debug: true
//         }))
//         .pipe(concat('bundled.js'))
//         .pipe(gulp.dest('./app/build'));
// });

gulp.task('browserify', function() {
    return browserify('./app/app.js')
        .bundle()
        .pipe(source('bundled.js')) // gives streaming vinyl file object
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        //.pipe(uglify().on('error', gutil.log)) // now gulp-uglify works 
        .pipe(gulp.dest('./app/build'));
});

gulp.task('browserifyDist', function() {
    return browserify('./app/app.js')
        .bundle()
        .pipe(source('bundled.js')) // gives streaming vinyl file object
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        .pipe(uglify().on('error', gutil.log)) // now gulp-uglify works 
        .pipe(gulp.dest('./dist/build'));
});

gulp.task('dev', function() {
    gulp.src('config.json')
        .pipe(gulpNgConfig('config', {
            environment: 'development'
        }))
        .pipe(gulp.dest('./app/'));
});

gulp.task('prod', function() {
    gulp.src('config.json')
        .pipe(gulpNgConfig('config', {
            environment: 'production'
        }))
        .pipe(uglify({}))
        .pipe(gulp.dest('./dist/'));
});

// *** default task *** //
gulp.task('default', function() {
    runSequence(
        ['clean'], ['dev', 'browserify', 'serve']
    );
});

// *** build task *** //
gulp.task('build', function() {
    runSequence(
        ['clean:build'], ['prod', 'minify-js', 'minify-css', 'minify-html', 'browserifyDist']
    );
});