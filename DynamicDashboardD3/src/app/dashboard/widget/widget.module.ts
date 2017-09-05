import { NgModule, Component, Type } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CommonModule } from '@angular/common';

import { WidgetHostDirective } from './widget-host.directive';
import { NoteWidgetComponent } from './note-widget/note-widget.component';
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
  declarations: [WidgetHostDirective, NoteWidgetComponent, ChartWidgetComponent, HealthCareWidgetComponent, ChatWidgetComponent],
  entryComponents: [NoteWidgetComponent, ChartWidgetComponent, HealthCareWidgetComponent, ChatWidgetComponent]
})
export class WidgetModule {
  static WIDGET_KEYS = {
    NOTE: 'NoteWidgetComponent',
    CHAT: 'ChatWidgetComponent',
    CHART: 'ChartWidgetComponent',
    GRAPHIC: 'HealthCareWidgetComponent'
  }

  static WidgetComponentTypes: { [key: string]: Type<{}> } = {
    'NoteWidgetComponent': NoteWidgetComponent,
    'ChartWidgetComponent': ChartWidgetComponent,
    'HealthCareWidgetComponent': HealthCareWidgetComponent,
    'ChatWidgetComponent': ChatWidgetComponent
  }
}
