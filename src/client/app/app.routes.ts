import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { LearningPathRoutes } from './learningPath/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...LearningPathRoutes
];
