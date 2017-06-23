import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import * as runSequence from 'run-sequence';

import Config from '../../config';
import { notifyLiveReload } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Watches the task with the given taskname.
 * @param {string} taskname - The name of the task.
 * @param {Array<string>} pathname - Location of Paths to watch
 */
export function watchCustom(taskname: string, pathname: Array<string>) {
  return function () {
    plugins.watch(pathname, (e: any) => {
      runSequence(taskname);
    });
  };
}
