'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var wiredep = require('wiredep').stream; 
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var Server = require('karma').Server;
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var ngAnnotate = require('gulp-ng-annotate');
var angularTemplateCache = require('gulp-angular-templatecache');
var cleanCSS = require('gulp-clean-css');


gulp.task('inject', function() {
  var injectFiles = gulp.src(['!app/**/*.test.js','!app/browserify/*','app/**/*.js']).pipe(angularFilesort());
  var injectCss = gulp.src(['app/assets/**/*.css']);
  var wiredepOptions = {
    directory: 'bower_components',
    exclude: [ 'bower_components/material-design-icons-iconfont/dist/fonts/iconjar-map.js', 'bower_components/angular-mocks/angular-mocks.js' ]
  };

  return gulp.src('app/*.html')
    .pipe(inject(injectFiles, {relative: true}))
    .pipe(inject(injectCss, {relative: true}))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.stream());
});


gulp.task('fonts', function() {
    return gulp.src([
                    'bower_components/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.*'])
            .pipe(gulp.dest('dist/assets/css/fonts/'));
});


gulp.task('templates', function() {
    return gulp.src('app/**/*.html')
        .pipe(angularTemplateCache('templates.js', {
            module: 'app',
            root: 'app'
        }))
        .pipe(gulp.dest('app/assets/templates'));
});


gulp.task('browserify', function() {
    return browserify('app/browserify/components.js')
        .bundle()
        .pipe(source('browserify.bundle.js'))
        .pipe(gulp.dest('app/shared'));
});


gulp.task('test', function(done){
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
      }, done).start();
});


gulp.task('dist', ['browserify', 'templates', 'inject', 'fonts'], function() {
    return gulp.src(['app/index.html'])
      .pipe(useref())
      .pipe(gulpif('*.js', ngAnnotate()))
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', cleanCSS()))
      .pipe(gulp.dest('dist'));
});


gulp.task('live', ['templates', 'inject'], function() {

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'
  }));

  gulp.watch('app/**/*.js', function(event) {
    if (event.type === 'changed') {
      gulp.start('inject');
    }
  });

  gulp.watch('app/**/*.html', function(event) {
    if (event.type === 'changed') {
      gulp.start('templates');
    }
    browserSync.reload(event.path);
  });

  gulp.watch(['app/*.html', 'bower.json'], ['inject']);

  browserSync.init({
    server: {
    baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    browser: 'app',
    startPath: '/'
  });
});
