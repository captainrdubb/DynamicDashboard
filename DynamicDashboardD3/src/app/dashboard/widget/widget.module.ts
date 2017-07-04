import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { WidgetHostDirective } from './widget-host.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    WidgetHostDirective
  ],
  declarations: [WidgetComponent, WidgetHostDirective],
  entryComponents:[WidgetComponent]
})
export class WidgetModule { }
