import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LearningPathComponent } from './learningPath.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [LearningPathComponent],
  exports: [LearningPathComponent]
})
export class LearningPathModule { }
