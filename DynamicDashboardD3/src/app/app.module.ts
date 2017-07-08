import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventBusService } from './core/event-bus.service';
import { WindowDataService } from './core/window-data.service';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [EventBusService, WindowDataService],
  bootstrap: [AppRoutingModule.components]
})
export class AppModule { }
