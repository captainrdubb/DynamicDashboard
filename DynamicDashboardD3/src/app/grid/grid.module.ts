import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridRoutingModule } from './grid-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GridRoutingModule
  ],
  declarations: [GridRoutingModule.components]
})
export class GridModule { }
