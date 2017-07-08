import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackeryDirective } from './packery.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PackeryDirective],
  exports:[PackeryDirective]
})
export class SharedModule { }
