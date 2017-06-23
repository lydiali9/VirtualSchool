import * as gulp from 'gulp';
import { join } from 'path';
var browser = require('browser-sync');
var panini = require('panini');

import { Task } from '../task';
import Config from '../../config';

/**
 * Executes the build process, copying the assets located in `src/client` over to the appropriate
 * `dist/dev` directory.
 */
export =
  class BuildPagesTask extends Task {
    run() {
      let paths: {
        root: '/src/design/pages',
        layouts: '/dist/tmp/layouts/',
        partials: '/src/design/partials/',
        data: '/src/design/data/',
        helpers: '/src/design/helpers/'
      };

      return gulp.src(join(Config.DESIGN_PAGES_SRC, '**', '*.{html, hbs, handlebars}'))
        .pipe(panini({
          root: '/src/design/pages',
          layouts: '/dist/tmp/layouts/',
          partials: '/src/design/partials/',
          data: '/src/design/data/',
          helpers: '/src/design/helpers/'
        }))
        .pipe(gulp.dest(Config.DESIGN_DEST))
        .pipe(browser.stream());
    }
  };
