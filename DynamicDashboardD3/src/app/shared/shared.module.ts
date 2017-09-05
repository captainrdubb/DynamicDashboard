import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackeryDirective } from './packery.directive';
import { DraggabillyDirective } from './draggabilly.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PackeryDirective, DraggabillyDirective],
  exports: [PackeryDirective, DraggabillyDirective]
})
export class SharedModule { }
