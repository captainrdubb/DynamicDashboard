import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WindowDataService } from './shared/window-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
  ],  
  providers: [WindowDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
