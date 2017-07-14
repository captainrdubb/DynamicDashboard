import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventBusService } from './event-bus.service';
import { WindowDataService } from './window-data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[EventBusService, WindowDataService],
  declarations: []
})
export class CoreModule { }
