
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as util from 'gulp-util';
import { join/*, sep, relative*/ } from 'path';

import Config from '../../config';
import { makeTsProject, templateLocals } from '../../utils';
import { TypeScriptTask } from '../typescript_task';

const browser = require('browser-sync');
const uglify = require('gulp-uglify');

const plugins = <any>gulpLoadPlugins();
const isProd = Config.BUILD_TYPE === 'prod';
const jsonSystemConfig = JSON.stringify(Config.SYSTEM_CONFIG_DEV);

//var uglify = plugins.if(isProd, plugins.uglify());

let typedBuildCounter = Config.TYPED_COMPILE_INTERVAL; // Always start with the typed build.

function ProcessDesignJS() {
  return gulp.src(Config.DESIGN_JS_COMPONENTS)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('app.js'))
    //.pipe(modernizr())
    //.pipe(uglify)
    .pipe(plugins.if(!isProd, plugins.sourcemaps.write()))
    .pipe(gulp.dest(Config.JS_DEST))
    .pipe(browser.stream());
}

function ProcessAngularTS() {
  let tsProject: any;
  let typings = gulp.src([
    Config.TOOLS_DIR + '/manual_typings/**/*.d.ts'
  ]);
  let src = [
    join(Config.APP_SRC, '**/*.ts'),
    '!' + join(Config.APP_SRC, '**/*.spec.ts'),
    '!' + join(Config.APP_SRC, '**/*.e2e-spec.ts'),
    '!' + join(Config.APP_SRC, `**/${Config.NG_FACTORY_FILE}.ts`)
  ];

  let projectFiles = gulp.src(src);
  let result: any;
  let isFullCompile = true;

  // Only do a typed build every X builds, otherwise do a typeless build to speed things up
  if (typedBuildCounter < Config.TYPED_COMPILE_INTERVAL) {
    isFullCompile = false;
    tsProject = makeTsProject({isolatedModules: true});
    projectFiles = projectFiles.pipe(plugins.cached());
    util.log('Performing typeless TypeScript compile.');
  } else {
    tsProject = makeTsProject();
    projectFiles = merge(typings, projectFiles);
  }

  result = projectFiles
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(tsProject())
    .on('error', () => {
      typedBuildCounter = Config.TYPED_COMPILE_INTERVAL;
    });

  if (isFullCompile) {
    typedBuildCounter = 0;
  } else {
    typedBuildCounter++;
  }

  return result.js
    .pipe(plugins.sourcemaps.write())
    // Use for debugging with Webstorm/IntelliJ
    // https://github.com/mgechev/angular2-seed/issues/1220
    //    .pipe(plugins.sourcemaps.write('.', {
    //      includeContent: false,
    //      sourceRoot: (file: any) =>
    //        relative(file.path, PROJECT_ROOT + '/' + APP_SRC).replace(sep, '/') + '/' + APP_SRC
    //    }))
    .pipe(plugins.template(Object.assign(
      templateLocals(), {
        SYSTEM_CONFIG_DEV: jsonSystemConfig
      }
     )))
    .pipe(gulp.dest(Config.APP_DEST));
  }

/**
 * Executes the build process, transpiling the TypeScript files (except the spec and e2e-spec files) for the development
 * environment.
 */
export =
  class BuildJsDev extends TypeScriptTask {
    run() {
      return merge(ProcessAngularTS(), ProcessDesignJS());
    }
  };
