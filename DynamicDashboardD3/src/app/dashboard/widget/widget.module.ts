import { NgModule, Component, Type } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CommonModule } from '@angular/common';

import { WidgetHostDirective } from './widget-host.directive';
import { DisplayWidgetComponent } from './display-widget/display-widget.component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { HealthCareWidgetComponent } from './healthcare-widget/healthcare-widget.component';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    WidgetHostDirective
  ],
  declarations: [WidgetHostDirective, DisplayWidgetComponent, ChartWidgetComponent, HealthCareWidgetComponent, ChatWidgetComponent],
  entryComponents: [DisplayWidgetComponent, ChartWidgetComponent, HealthCareWidgetComponent]
})
export class WidgetModule {
  static WidgetComponents: { [key: string]: Type<{}> } = {
    "DisplayWidgetComponent": DisplayWidgetComponent,
    "ChartWidgetComponent": ChartWidgetComponent,
    "HealthCareWidgetComponent": HealthCareWidgetComponent
  }
}
