import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import { watchCustom } from '../../utils';
import * as runSequence from 'run-sequence';

import Config from '../../config';
import { changeFileManager } from './code_change_tools';
import { notifyLiveReload } from '../../utils';

const plugins = <any>gulpLoadPlugins();

require('gulp-grunt')(gulp, { verbose: false });

/**
 * Watches the task with the given taskname.
 * @param {string} taskname - The name of the task.
 */
export function watch(taskname: string) {
  return function () {
    plugins.watch(Array(join(Config.DESIGN_ASSETS_SRC, '**', '*.scss')), (e: any) => {
      changeFileManager.addFile(e.path);

      setTimeout(() => {
        runSequence('build.sass', () => {
          changeFileManager.clear();
          notifyLiveReload(e);
        });
      }, 100);
    });

    plugins.watch(Config.DESIGN_JS_COMPONENTS, (e: any) => {
      changeFileManager.addFile(e.path);

      setTimeout(() => {
        runSequence('build.js.dev', () => {
          changeFileManager.clear();
          notifyLiveReload(e);
        });
      }, 100);
    });

    plugins.watch(Array(Config.DESIGN_PARTIALS_SRC), (e: any) => {
      changeFileManager.addFile(e.path);

      setTimeout(() => {
        runSequence(
          'build.pages.design.dev',
          'grunt-assemble'
        );
          changeFileManager.clear();
          notifyLiveReload(e);
      }, 100);
    });

    plugins.watch(Array(Config.DESIGN_PAGES_SRC), (e: any) => {
      changeFileManager.addFile(e.path);

      setTimeout(() => {
        runSequence('build.index.dev', () => {
          changeFileManager.clear();
          notifyLiveReload(e);
        });
      }, 100);
    });

    let app_paths:string[]=[
      join(Config.APP_SRC,'**'),
    ]//.concat(Config.TEMP_FILES.map((p) => { return '!'+p; }));

    plugins.watch(app_paths, (e: any) => {
      changeFileManager.addFile(e.path);


      // Resolves issue in IntelliJ and other IDEs/text editors which
      // save multiple files at once.
      // https://github.com/mgechev/angular-seed/issues/1615 for more details.
      setTimeout(() => {

        runSequence(taskname, () => {
          changeFileManager.clear();
          notifyLiveReload(e);
        });

      }, 100);
    });

  };
}
