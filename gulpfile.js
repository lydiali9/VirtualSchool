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

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');


var isVerbose = process.argv.some(function (arg) {
  return arg === '-v' || arg === '--verbose';
});
require('gulp-grunt')(gulp, { verbose: isVerbose });

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
  	'react-dom'
];
// keep a count of the times a task refires
var scriptsCount = 0;

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
    'src/app/scss/components'
  ],
  javascript: [
    'node_modules/foundation-sites/vendor/jquery/dist/jquery.js',
    'node_modules/what-input/what-input.js',
    'node_modules/foundation-sites/dist/foundation.js',
    'node_modules/slick-carousel/slick/slick.js',
    'src/assets/js/**/*.js',
    'src/assets/js/app.js',
  ],
  minified_js: [
    'node_modules/object-fit-images/dist/ofi.browser.js'
  ],
  react: {
    js: ['./src/app/js/*.{js,jsx}', './src/app/js/**/*.{js,jsx}'],
  },
  images: [
    'src/assets/img/**/*'
  ],
  output: './dist'
};

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
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
    .pipe(gulp.dest(PATHS.output + '/assets/css'))
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
    .pipe(gulp.dest(PATHS.output + '/assets/js'))
    .pipe(browser.stream());
});

// Compile REACT.js Web-Application components
gulp.task('react', function(){
  if(isProduction) {
    bundleApp(true)
  } else {
    bundleApp(false)
  }
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
  sequence('clean', 'grunt-build', ['pages', 'sass', 'react', 'javascript', 'images', 'copy'], done);
});

gulp.task('development', function(done) {
  sequence('clean', 'grunt-build', ['pages', 'sass', 'react', 'javascript', 'images', 'copy'], 'watch');
});

// Build the site, run the server, and watch for file changes
gulp.task('watch', function() {
  gulp.watch(PATHS.assets, ['copy', browser.reload]);
  gulp.watch(['./src/pages/**/*.html'], ['grunt-build', 'pages', browser.reload]);
  gulp.watch(['./src/{layouts,partials}/**/*.{html,hbs,handlebars}'], ['grunt-build', 'pages:reset', browser.reload]);
  gulp.watch(['./src/assets/scss/**/*.scss'], ['sass', browser.reload]);
  gulp.watch(['./src/partials/**/*.scss'], ['sass', browser.reload]);
  gulp.watch(['./src/app/scss/**/*.scss'], ['sass', browser.reload]);
  gulp.watch(['./src/assets/js/**/*.js'], ['javascript', browser.reload]);
	gulp.watch(['./src/app/js/**/*.js'], ['react']);
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
})

gulp.task('grunt-build', function() {
  sequence('grunt-clean', 'grunt-assemble');
})

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
	scriptsCount++;
	// Browserify will bundle all our js files together in to one and will let
	// us use modules in the front end.
	var appBundler = browserify({
    	entries: './src/app/js/index.js',
    	debug: true
  	})

	// If it's not for production, a separate vendors.js file will be created
	// the first time gulp is run so that we don't have to rebundle things like
	// react everytime there's a change in the js file
  	if (!isProduction && scriptsCount === 1){
  		// create vendors.js for dev environment.
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest(PATHS.output + '/assets/js/'));
  	}
  	if (!isProduction){
  		// make the dependencies external so they dont get bundled by the
		// app bundler. Dependencies are already bundled in vendor.js for
		// development environments.
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}

  	appBundler
  		// transform ES6 and JSX to ES5 with babelify
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest(PATHS.output + '/assets/js/'));
}
