var gulp = require('gulp');
var cache = require('gulp-cached');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var ngAnnotate = require('gulp-ng-annotate');
var vinylPaths = require('vinyl-paths');
var del = require('del');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var less = require('gulp-less');
var lessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new lessPluginCleanCSS({advanced: true});
var htmlMin = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var karma = require('karma').server;

var path = {
    src: 'src/**/*.js',
    output: 'dist/'
};

var compilerOptions = {
  modules: 'umd',
  // moduleIds: false,
  // externalHelpers: true,
  comments: true,
  compact: false,
};

gulp.task('clean', function() {
  return gulp.src([path.output])
    .pipe(vinylPaths(del));
});

gulp.task('compile', function(){
    return gulp.src(path.src)
        .pipe(cache('es6'))
        .pipe(plumber())
        .pipe(changed(path.output, { extension: '.js' }))
        .pipe(sourcemaps.init())
        .pipe(babel(compilerOptions))
        .pipe(ngAnnotate({
          sourceMap: true,
          gulpWarnings: false
        }))
        .pipe(uglify())
        .pipe(concat('angular-translate-loader-pluggable.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.output));
});

gulp.task('test', ['compile'], function (done) {
  karma.start({
    configFile: __dirname + '/test/conf/karma.conf.js',
    singleRun: true
  }, function(){
    done();
  });
});

gulp.task('build', ['clean', 'compile']);

gulp.task('default', []);