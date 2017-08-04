import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { EventBusService } from './event-bus.service';
import { D3PieFactoryService } from './d3-pie-factory.service';
import { CensusDataService } from './census-data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [EventBusService, D3PieFactoryService, CensusDataService],
  declarations: []
})
export class CoreModule { }
