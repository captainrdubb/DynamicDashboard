import { CacheService } from './cache.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackeryDirective } from './packery.directive';
import { DraggabillyDirective } from './draggabilly.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PackeryDirective, DraggabillyDirective],
  exports: [PackeryDirective, DraggabillyDirective],
  providers: [CacheService]
})
export class SharedModule { }
