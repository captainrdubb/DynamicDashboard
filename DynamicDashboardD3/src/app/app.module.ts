import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AboutModule } from './about/about.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AboutModule,
    BrowserModule,
    NgbModalModule.forRoot()
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
