import { IWidgetMetadata } from './../../shared/interfaces';
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
  entryComponents: [DisplayWidgetComponent, ChartWidgetComponent, HealthCareWidgetComponent, ChatWidgetComponent]
})
export class WidgetModule {
  static WidgetMetadata: { [key: string]: IWidgetMetadata } = {
    'DisplayWidgetComponent': { type: DisplayWidgetComponent, size: 'singleWidth' },
    'ChartWidgetComponent': { type: ChartWidgetComponent, size: 'singleWidth' },
    'HealthCareWidgetComponent': { type: HealthCareWidgetComponent, size: 'doubleWidth' },
    'ChatWidgetComponent': { type: ChatWidgetComponent, size: 'doubleWidth' }
  }
}
