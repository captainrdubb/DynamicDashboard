import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from './widget/widget.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    WidgetModule,
    SharedModule,
    CoreModule
  ],
  declarations: [DashboardRoutingModule.components]
})
export class DashboardModule { }
