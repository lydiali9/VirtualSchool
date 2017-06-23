var $      = require('gulp-load-plugins')();
var gulp = require('gulp');
var argv   = require('yargs').argv;
var browser = require('browser-sync');
var gulp   = require('gulp');
var rimraf = require('rimraf');
var panini = require('panini');
var sequence = require('run-sequence');
var sherpa = require('style-sherpa');
var sassGlob = require('gulp-sass-glob');
var lab = require('gulp-lab');
var copy = require('gulp-copy');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var addsrc = require("gulp-add-src");
var uncss = require('gulp-uncss');
var concat = require('gulp-concat');
var fs = require("fs");
var path = require("path");
var changed = require('gulp-changed');
var clean = require('gulp-clean');

var isVerbose = process.argv.some(function (arg) {
  return arg === '-v' || arg === '--verbose';
});

require('gulp-grunt')(gulp, { verbose: isVerbose });


// Check for specific flags during GULP BUILD TASK
var isProduction = !!(argv.production);
var isDevelopment = !!(argv.development);
var minifycss = $.if(isProduction, cssnano());

// Development Server Port
var PORT = 3000;

// Browser Compatibilty Target for IE
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

var PATHS = {
  assets: [
    'src/assets/**/*',
    '!src/assets/{!img,js,scss}/**/*'
  ],
  sass : [
    'node_modules/foundation-sites/scss',
    'node_modules/motion-ui/src',
    'node_modules/slick-carousel/slick',
  ],
  javascript: [
    'node_modules/foundation-sites/vendor/jquery/dist/jquery.js',
    'node_modules/what-input/what-input.js',
    'node_modules/foundation-sites/dist/foundation.js',
    'node_modules/slick-carousel/slick/slick.js',
    'src/assets/js/**/*.js',
    'src/assets/js/app.js'
  ],
  minified_js: [
    'node_modules/object-fit-images/dist/ofi.browser.js'
  ],
  images: [
    'src/assets/img/**/*'
  ],
  output: './dist'
};

// CLEAN OUTPUT FOLDER(S)
gulp.task('clean', function(done) {
  rimraf(PATHS.output, done);
});

// Copy files out of the assets folder
// This task skips over the "js" and "scss" folders, which are parsed separately
gulp.task('copy', function() {
  gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.output + '/assets'));
});

// Compile PAGES
gulp.task('pages', function() {
  gulp.src('./src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: './src/pages/',
      layouts: './src/layouts/',
      partials: './src/partials/',
      data: './src/data/',
      helpers: './src/helpers/'
    }))
    .pipe(gulp.dest(PATHS.output))
    .pipe(browser.stream());
});

// Gulp Rebuilding Partials!
gulp.task('refresh', function(cb){
  panini.refresh();
  cb();
});

gulp.task('pages-rebuild', ['refresh'], function(cb) {
  gulp.src('./src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: './src/pages/',
      layouts: './src/layouts/',
      partials: './src/partials/',
      data: './src/data/',
      helpers: './src/helpers/'
    }))
    .pipe(gulp.dest('./dist'));
    cb();
});

gulp.task('reset', ['pages-rebuild'], function(){
  setTimeout(function(){
    browser.reload();
  }, 2000);
});

// Wrap Gulp Refreshing/Resetting Watch functions into one queue
gulp.task('pages:reset', function(){
  sequence('grunt-build', ['refresh', 'pages-rebuild', 'reset']);
});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function () {
  var minifycss = $.if(isProduction, cssnano());

  return gulp.src('./src/assets/scss/app.scss')
    .pipe(sassGlob())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.output + '/css'))
    .pipe(browser.stream());
});

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    //.pipe(modernizr())
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.output + '/js'))
    .pipe(browser.stream());
});

// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function() {
  var imagemin = $.if(isProduction, $.imagemin({
    progressive: true
  }));

  return gulp.src('./src/assets/img/**/*')
    .pipe(imagemin)
    .pipe(gulp.dest(PATHS.output + '/assets/img'))
    .pipe(browser.stream());
});

// FINAL GULP TASKS - ROUTED INTO npm
// Build the "dist" folder by running all of the above tasks
gulp.task('build', function(done) {
  sequence('clean', ['grunt-clean'], ['grunt-assemble'], ['pages', 'sass', 'javascript', 'images', 'copy'], done);
});

gulp.task('development', function(done) {
  sequence('clean', ['grunt-clean'], ['grunt-assemble'], ['pages', 'sass', 'javascript', 'images', 'copy'], 'watch');
});

// Build the site, run the server, and watch for file changes
gulp.task('watch', function() {
  gulp.watch(PATHS.assets, ['copy', browser.reload]);
  gulp.watch(['./src/pages/**/*.html'], ['grunt-build', 'pages', browser.reload]);
  gulp.watch(['./src/{layouts,partials}/**/*.{html,hbs,handlebars}'], ['grunt-clean', 'grunt-assemble', 'pages:reset', browser.reload]);
  gulp.watch(['./src/assets/scss/**/*.scss'], ['sass', browser.reload]);
  gulp.watch(['./src/partials/**/*.scss'], ['sass', browser.reload]);
  gulp.watch(['./src/assets/js/**/*.js'], ['javascript', browser.reload]);
  gulp.watch(['./src/assets/img/**/*'], ['images', browser.reload]);
});


// Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
  browser.init({
    server: PATHS.output, port: PORT
  });
});

// Build the site, run the server, and watch for file changes
gulp.task('default', function(done) {
  sequence(['build', 'server'], 'watch');
});

gulp.task('grunt-build', function() {
  sequence('grunt-clean', 'grunt-assemble');
});

function handleDataFile(dir) {
  dir = dir + '\\src\\data\\temp';
  fs.readdir(dir, function(error, files) {

    if(files && files.length !== 0) {
      for(var i = 0; i < files.length; i++) {
        formatDataFile(dir + "\\" + files[i]);
      }
    }
  });
}

function formatDataFile(filePath) {
  fs.stat(filePath, function(err, stats) {

    if(stats.isFile()) {
      var documentData = [];
      var fileName = path.basename(filePath).split('.')[0];
      var fileContent = JSON.stringify(fs.readFileSync(filePath).toString());

      if(fileContent.slice(1, 10) == "data:\\r\\n") {
        fileContent = "\"" + fileName + ":\\r\\n  " + fileContent.slice(1).replace(/\\r\\n/g, '\\r\\n  ');
        writeDataFile(filePath, JSON.parse(fileContent));
      }
    } else if(stats.isDirectory()) {
        console.log('This is directory');
    } else {
      console.log('unknow type of file');
    }
  });
}

function writeDataFile(fileName, data) {
  fs.writeFileSync(fileName, data, 'utf-8');
}

// Copy data file
gulp.task('copy-file', function() {
  return gulp.src('src/data/learningPaths/*.yml')
        .pipe(changed('src/data/temp/'))
        .pipe(gulp.dest('src/data/temp/'));
});

// Concat file
gulp.task('concat-file', function() {
  return gulp.src('src/data/temp/*.yml')
    .pipe(concat('learningPaths.yml', handleDataFile(path.dirname(__filename))))
    .pipe(gulp.dest('src/data'));
});

// Clean temporary file
gulp.task('clean-copy-file', function() {
  return gulp.src('src/data/temp/')
    .pipe(clean({force: true}));
});

gulp.task('concat', function(callback) {
  sequence('copy-file', 'concat-file', 'clean-copy-file', callback);
});
