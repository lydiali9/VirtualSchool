import * as gulp from 'gulp';
import { join } from 'path';

import { AssetsTask } from '../assets_task';
import Config from '../../config';

/**
 * Executes the build process, copying the assets located in `src/client` over to the appropriate
 * `dist/dev` directory.
 */
export =
  class BuildAssetsTask extends AssetsTask {
    run() {
      let paths: string[] = [
        join(Config.DESIGN_ASSETS_SRC, '**'),
        '!' + join(Config.DESIGN_ASSETS_SRC, '**', '*.ts'),
        '!' + join(Config.DESIGN_ASSETS_SRC, '**', '*.scss'),
        '!' + join(Config.DESIGN_ASSETS_SRC, '**', '*.sass'),
        '!' + join(Config.DESIGN_ASSETS_SRC, 'js', '*.js'),
        '!' + join(Config.DESIGN_ASSETS_SRC, 'scss', '**', '*'),
        '!' + join(Config.DESIGN_ASSETS_SRC, 'scss'),
        '!' + join(Config.DESIGN_ASSETS_SRC, 'js')
            ].concat(Config.TEMP_FILES.map((p) => { return '!' + p; }));

      return gulp.src(paths)
        .pipe(gulp.dest(Config.DESIGN_ASSETS_DEST));
    }
  };
